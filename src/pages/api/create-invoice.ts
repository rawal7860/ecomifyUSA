import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

// Zod schema — every field validated, amount strictly bounded.
const invoiceSchema = z.object({
  customerEmail: z.string().email().max(254),
  customerName: z.string().min(1).max(200),
  amount: z.number().positive().max(10_000), // $10k ceiling — bump if you sell larger packages
  description: z.string().min(1).max(500),
  metadata: z
    .object({
      state: z.string().max(50).optional(),
      entityType: z.string().max(50).optional(),
      businessName: z.string().max(200).optional(),
      phone: z.string().max(30).optional(),
    })
    .optional(),
});

type InvoiceInput = z.infer<typeof invoiceSchema>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  // Rate limit: 5 invoice creations per IP per 10 minutes. Adjust if real users hit this.
  const ip = getClientIp(req);
  const limit = rateLimit(`invoice:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    res.setHeader("Retry-After", String(limit.retryAfterSeconds));
    return res
      .status(429)
      .json({ success: false, error: "Too many invoice requests. Try again shortly." });
  }

  // Validate input.
  const parsed = invoiceSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid request",
      details: parsed.error.flatten(),
    });
  }
  const { customerEmail, customerName, amount, description, metadata } =
    parsed.data as InvoiceInput;

  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return res.status(500).json({
        success: false,
        error:
          "Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables.",
      });
    }

    // Create or retrieve customer.
    const customersResponse = await fetch("https://api.stripe.com/v1/customers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ email: customerEmail, name: customerName }),
    });
    const customer = await customersResponse.json();
    if (!customersResponse.ok) {
      throw new Error(customer.error?.message || "Failed to create customer");
    }

    // Create invoice item.
    const invoiceItemResponse = await fetch(
      "https://api.stripe.com/v1/invoiceitems",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          customer: customer.id,
          amount: Math.round(amount * 100).toString(),
          currency: "usd",
          description,
        }),
      },
    );
    const invoiceItem = await invoiceItemResponse.json();
    if (!invoiceItemResponse.ok) {
      throw new Error(invoiceItem.error?.message || "Failed to create invoice item");
    }

    // Create invoice.
    const invoiceResponse = await fetch("https://api.stripe.com/v1/invoices", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        customer: customer.id,
        auto_advance: "true",
        collection_method: "send_invoice",
        days_until_due: "7",
        ...(metadata && {
          "metadata[state]": metadata.state || "",
          "metadata[entityType]": metadata.entityType || "",
          "metadata[businessName]": metadata.businessName || "",
          "metadata[phone]": metadata.phone || "",
        }),
      }),
    });
    const invoice = await invoiceResponse.json();
    if (!invoiceResponse.ok) {
      throw new Error(invoice.error?.message || "Failed to create invoice");
    }

    // Finalize.
    const finalizeResponse = await fetch(
      `https://api.stripe.com/v1/invoices/${invoice.id}/finalize`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${stripeSecretKey}` },
      },
    );
    const finalizedInvoice = await finalizeResponse.json();
    if (!finalizeResponse.ok) {
      throw new Error(
        finalizedInvoice.error?.message || "Failed to finalize invoice",
      );
    }

    // Send the invoice email and surface the result instead of silently swallowing it.
    const sendResponse = await fetch(
      `https://api.stripe.com/v1/invoices/${invoice.id}/send`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${stripeSecretKey}` },
      },
    );
    const sendBody = await sendResponse.json().catch(() => null);
    const emailWarning = !sendResponse.ok
      ? sendBody?.error?.message || "Invoice created but email delivery failed."
      : null;

    return res.status(200).json({
      success: true,
      invoiceId: invoice.id,
      invoiceUrl: finalizedInvoice.hosted_invoice_url,
      ...(emailWarning ? { warnings: [emailWarning] } : {}),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create invoice";
    return res.status(500).json({ success: false, error: message });
  }
}
