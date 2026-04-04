import { useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/Logo";
import { requireAdminAuth } from "@/lib/adminAuth";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Plus, CheckCircle2, MessageCircle } from "lucide-react";

const countryCodes = [
  { code: "+1", label: "United States" },
  { code: "+44", label: "United Kingdom" },
  { code: "+91", label: "India" },
  { code: "+61", label: "Australia" },
  { code: "+971", label: "UAE" },
];

const usStates = [
  "Wyoming", "Delaware", "New Mexico", "California", "Texas", "Florida", "New York", "Nevada", "Arizona", "Washington",
];

const serviceOptions = [
  { id: "sales_tax", name: "Sales Tax Filing", description: "Monthly/quarterly/annual sales tax service" },
  { id: "annual_report", name: "Annual Report", description: "State annual report filing" },
  { id: "registered_agent", name: "Registered Agent", description: "Official registered agent service" },
  { id: "irs_filing", name: "IRS Filing", description: "Federal IRS filing management" },
  { id: "delaware_franchise", name: "Delaware Franchise Tax", description: "Delaware franchise tax service" },
  { id: "boir_report", name: "BOIR Report", description: "Beneficial ownership report" },
];

const frequencyOptions = [
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly" },
  { id: "annual", label: "Annual" },
];

type NewClientForm = {
  fullName: string;
  email: string;
  whatsappCountryCode: string;
  whatsappNumber: string;
  country: string;
  address: string;
  companyName: string;
  stateOfIncorporation: string;
  formationDate: string;
  ein: string;
  activeServices: string[];
  salesTaxFrequency: string;
  sendWelcomeMessage: boolean;
};

const deadlineOffsets: Record<string, number> = {
  sales_tax: 30,
  annual_report: 365,
  registered_agent: 365,
  irs_filing: 180,
  delaware_franchise: 90,
  boir_report: 30,
};

function getDeadlineDate(base: string, offset: number) {
  const date = new Date(base || new Date().toISOString().split("T")[0]);
  date.setDate(date.getDate() + offset);
  return date.toISOString().split("T")[0];
}

export default function AdminNewClientPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue } = useForm<NewClientForm>({
    defaultValues: {
      fullName: "",
      email: "",
      whatsappCountryCode: "+1",
      whatsappNumber: "",
      country: "United States",
      address: "",
      companyName: "",
      stateOfIncorporation: "Wyoming",
      formationDate: new Date().toISOString().split("T")[0],
      ein: "",
      activeServices: [],
      salesTaxFrequency: "monthly",
      sendWelcomeMessage: false,
    },
  });

  const watchedServices = watch("activeServices") || [];

  const onSubmit = async (values: NewClientForm) => {
    setError(null);
    setMessage(null);
    setIsSubmitting(true);

    try {
      const adminSupabase = supabase as any;
      const { data: company, error: companyError } = await adminSupabase
        .from("companies")
        .insert({
          name: values.companyName,
          state: values.stateOfIncorporation,
          formation_date: values.formationDate || null,
          ein: values.ein || null,
          status: "active",
        })
        .select()
        .single();

      if (companyError) {
        throw companyError;
      }

      const { data: client, error: clientError } = await adminSupabase
        .from("clients")
        .insert({
          company_id: company.id,
          name: values.fullName,
          email: values.email,
          phone: `${values.whatsappCountryCode}${values.whatsappNumber}`,
          country: values.country,
          address: values.address,
        })
        .select()
        .single();

      if (clientError) {
        throw clientError;
      }

      const serviceInserts = (values.activeServices || []).map((serviceId) => {
        const service = serviceOptions.find((item) => item.id === serviceId);
        return {
          client_id: client.id,
          service_name: service?.name || serviceId,
          description:
            service?.description +
            (serviceId === "sales_tax" ? ` (${values.salesTaxFrequency})` : ""),
          status: "active",
        };
      });

      const { data: services, error: servicesError } = await adminSupabase
        .from("client_services")
        .insert(serviceInserts)
        .select();

      if (servicesError) {
        throw servicesError;
      }

      const deadlinesInsert = (services || []).flatMap((service: any, index: number) => {
        const serviceId = values.activeServices[index];
        const offset = deadlineOffsets[serviceId] || 30;
        return [
          {
            client_service_id: service.id,
            deadline_date: getDeadlineDate(values.formationDate, offset),
            description: `${service.service_name} deadline`,
            status: "pending",
          },
        ];
      });

      if (deadlinesInsert.length > 0) {
        const { error: deadlinesError } = await adminSupabase
          .from("deadlines")
          .insert(deadlinesInsert);

        if (deadlinesError) {
          throw deadlinesError;
        }
      }

      setMessage("Client created successfully.");
      router.push(`/admin/clients/${client.id}`);
    } catch (err: any) {
      setError(err?.message || "Unable to create client.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Add New Client - Admin | ecomifyUSA"
        description="Create a new client record for the ecomifyUSA admin portal."
      />
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Logo />
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">Admin</p>
                  <h1 className="text-3xl font-bold text-slate-900">New Client</h1>
                </div>
              </div>
            </div>
            <Link href="/admin">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-10">
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-8">
            <section className="grid lg:grid-cols-2 gap-6">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" {...register("fullName", { required: true })} placeholder="Client full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" {...register("email", { required: true })} placeholder="client@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>WhatsApp Number</Label>
                      <div className="flex gap-2">
                        <Select value={watch("whatsappCountryCode")} onValueChange={(value) => setValue("whatsappCountryCode", value)}>
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {countryCodes.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.label} {country.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input id="whatsappNumber" {...register("whatsappNumber", { required: true })} placeholder="1234567890" className="flex-1" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Input {...register("country", { required: true })} placeholder="Country of residence" />
                    </div>
                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Textarea {...register("address", { required: true })} placeholder="Residential address" rows={4} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle>Company Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input {...register("companyName", { required: true })} placeholder="Company name" />
                  </div>
                  <div className="space-y-2">
                    <Label>State of Incorporation</Label>
                    <Select value={watch("stateOfIncorporation")} onValueChange={(value) => setValue("stateOfIncorporation", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {usStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Formation Date</Label>
                      <Input type="date" {...register("formationDate")} />
                    </div>
                    <div className="space-y-2">
                      <Label>EIN</Label>
                      <Input {...register("ein")} placeholder="XX-XXXXXXX" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle>Service Selection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    {serviceOptions.map((service) => (
                      <label key={service.id} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 cursor-pointer hover:border-blue-300">
                        <Checkbox
                          checked={watchedServices.includes(service.id)}
                          onCheckedChange={(checked) => {
                            const current = watchedServices || [];
                            if (checked) {
                              setValue("activeServices", [...current, service.id]);
                            } else {
                              setValue("activeServices", current.filter((id) => id !== service.id));
                            }
                          }}
                        />
                        <div>
                          <p className="font-semibold text-slate-900">{service.name}</p>
                          <p className="text-sm text-slate-600">{service.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>

                  {watchedServices.includes("sales_tax") && (
                    <div className="space-y-2">
                      <Label>Sales Tax Frequency</Label>
                      <Select value={watch("salesTaxFrequency")} onValueChange={(value) => setValue("salesTaxFrequency", value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {frequencyOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle>Final Setup</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Send Welcome WhatsApp Message</Label>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        {...register("sendWelcomeMessage")}
                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-600">Generate a welcome reminder link after creation.</span>
                    </div>
                  </div>
                  <div className="rounded-3xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">
                    <p className="font-medium">Auto deadline calculation</p>
                    <p>Deadlines are generated based on state and selected services.</p>
                  </div>
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                    <p className="font-semibold">Example due dates:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Sales tax: 30 days after formation</li>
                      <li>Annual report: 365 days after formation</li>
                      <li>Delaware franchise: 90 days after formation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {error && (
              <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {error}
              </div>
            )}
            {message && (
              <div className="rounded-3xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                {message}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link href="/admin" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                Cancel
              </Link>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? "Creating client…" : "Create Client"}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authRedirect = requireAdminAuth(ctx);
  if (authRedirect) {
    return authRedirect;
  }

  return { props: {} };
};
