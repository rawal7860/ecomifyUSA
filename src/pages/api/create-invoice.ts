import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { customerEmail, customerName, amount, description, metadata } = req.body;

  if (!customerEmail || !customerName || !amount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return res.status(500).json({ 
        success: false, 
        error: "Stripe not configured. Please add STRIPE_SECRET_KEY to environment variables." 
      });
    }

    // Create or retrieve customer
    const customersResponse = await fetch("https://api.stripe.com/v1/customers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email: customerEmail,
        name: customerName,
      }),
    });

    const customer = await customersResponse.json();

    if (!customersResponse.ok) {
      throw new Error(customer.error?.message || "Failed to create customer");
    }

    // Create invoice item
    const invoiceItemResponse = await fetch("https://api.stripe.com/v1/invoiceitems", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        customer: customer.id,
        amount: (amount * 100).toString(), // Convert to cents
        currency: "usd",
        description: description,
      }),
    });

    const invoiceItem = await invoiceItemResponse.json();

    if (!invoiceItemResponse.ok) {
      throw new Error(invoiceItem.error?.message || "Failed to create invoice item");
    }

    // Create invoice
    const invoiceResponse = await fetch("https://api.stripe.com/v1/invoices", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
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

    // Finalize and send invoice
    const finalizeResponse = await fetch(`https://api.stripe.com/v1/invoices/${invoice.id}/finalize`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
      },
    });

    const finalizedInvoice = await finalizeResponse.json();

    if (!finalizeResponse.ok) {
      throw new Error(finalizedInvoice.error?.message || "Failed to finalize invoice");
    }

    // Send invoice email
    await fetch(`https://api.stripe.com/v1/invoices/${invoice.id}/send`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
      },
    });

    return res.status(200).json({
      success: true,
      invoiceId: invoice.id,
      invoiceUrl: finalizedInvoice.hosted_invoice_url,
    });

  } catch (error) {
    console.error("Stripe invoice error:", error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to create invoice",
    });
  }
}