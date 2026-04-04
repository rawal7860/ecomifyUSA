import { GetServerSideProps } from "next";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@supabase/supabase-js";
import { requireAdminAuth } from "@/lib/adminAuth";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
import Logo from "@/components/Logo";

type Company = {
  id: string;
  name: string;
  state?: string;
  formation_date?: string;
  ein?: string;
  status?: string;
};

type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country?: string;
  address?: string;
  created_at?: string;
  company?: Company | null;
};

type Deadline = {
  id: string;
  deadline_date: string;
  description: string;
  status: string;
};

type Service = {
  service_name: string;
  status: string;
  deadlines: Deadline[];
};

type DocumentItem = {
  id: string;
  file_name: string;
  file_path: string;
  uploaded_at: string;
};

type ClientPageProps = {
  client: Client;
  services: Service[];
  documents: DocumentItem[];
};

function formatDate(value?: string) {
  return value ? new Date(value).toLocaleDateString() : "-";
}

export default function AdminClientDetailPage({ client, services, documents }: ClientPageProps) {
  return (
    <>
      <SEO
        title="Client Detail - Admin | ecomifyUSA"
        description="Admin view for client detail, deadlines, documents, and activity."
      />
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <Logo />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">Admin</p>
                <h1 className="text-3xl font-bold text-slate-900">{client.name}</h1>
              </div>
            </div>
            <Link href="/admin">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to dashboard
              </Button>
            </Link>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
          <section className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2 border-slate-200">
              <CardHeader>
                <CardTitle>Client & Company Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">Name</p>
                    <p className="mt-1 text-slate-900 font-medium">{client.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="mt-1 text-slate-900 font-medium">{client.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="mt-1 text-slate-900 font-medium">{client.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Country</p>
                    <p className="mt-1 text-slate-900 font-medium">{client.country || "-"}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="mt-1 text-slate-900 font-medium">{client.address || "-"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">Company name</p>
                  <p className="mt-1 text-slate-900 font-medium">{client.company?.name || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">State</p>
                  <p className="mt-1 text-slate-900 font-medium">{client.company?.state || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">EIN</p>
                  <p className="mt-1 text-slate-900 font-medium">{client.company?.ein || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  <Badge className="bg-slate-100 text-slate-700">{client.company?.status || "Unknown"}</Badge>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Services & Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.length === 0 ? (
                  <p className="text-slate-600">No services have been added for this client.</p>
                ) : (
                  services.map((service) => (
                    <div key={service.service_name} className="rounded-3xl border border-slate-200 bg-white p-5">
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <p className="font-semibold text-slate-900">{service.service_name}</p>
                        <Badge className="bg-slate-100 text-slate-700">{service.status}</Badge>
                      </div>
                      {service.deadlines.length === 0 ? (
                        <p className="text-slate-600">No deadlines for this service.</p>
                      ) : (
                        <div className="space-y-3">
                          {service.deadlines.map((deadline) => (
                            <div key={deadline.id} className="rounded-3xl border border-slate-200 p-4 bg-slate-50">
                              <p className="font-medium text-slate-900">{deadline.description}</p>
                              <p className="text-sm text-slate-600 mt-2">Due date: {formatDate(deadline.deadline_date)}</p>
                              <Badge className={deadline.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                {deadline.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </section>

          <section className="space-y-4">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {documents.length === 0 ? (
                  <p className="text-slate-600">No documents uploaded yet.</p>
                ) : (
                  documents.map((document) => (
                    <div key={document.id} className="rounded-3xl border border-slate-200 bg-white p-4 flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium text-slate-900">{document.file_name}</p>
                        <p className="text-sm text-slate-500">Uploaded {formatDate(document.uploaded_at)}</p>
                      </div>
                      <Button variant="outline" asChild>
                        <a href={document.file_path} target="_blank" rel="noreferrer noopener">
                          <Download className="w-4 h-4 mr-2" /> Download
                        </a>
                      </Button>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </section>
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

  const { id } = ctx.params as { id: string };

  const clientResponse = await supabase
    .from("clients")
    .select("id,name,email,phone,country,address,created_at,company:companies(id,name,state,formation_date,ein,status)")
    .eq("id", id)
    .single();

  const servicesResponse = await supabase
    .from("client_services")
    .select("service_name,status,deadlines(id,deadline_date,description,status)")
    .eq("client_id", id);

  const documentsResponse = await supabase
    .from("documents")
    .select("id,file_name,file_path,uploaded_at")
    .eq("client_id", id)
    .order("uploaded_at", { ascending: false });

  if (!clientResponse.data) {
    return { notFound: true };
  }

  return {
    props: {
      client: clientResponse.data,
      services: servicesResponse.data || [],
      documents: documentsResponse.data || [],
    },
  };
};
