import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { requireAdminAuth } from "@/lib/adminAuth";
import { supabase } from "@/integrations/supabase/client";
import Logo from "@/components/Logo";
import { ArrowLeft, Download, MessageCircle, Plus, CheckCircle2 } from "lucide-react";

interface CompanyDetails {
  id: string;
  name: string;
  state?: string;
  formation_date?: string;
  ein?: string;
  status?: string;
}

interface ClientDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  country?: string;
  address?: string;
  created_at?: string;
  company: CompanyDetails | null;
}

interface ClientService {
  id: string;
  service_name: string;
  status: string;
  description?: string;
  deadlines?: Array<{
    id: string;
    deadline_date: string;
    description: string;
    status: string;
    notes?: string;
  }>;
}

interface DocumentItem {
  id: string;
  file_name: string;
  file_path: string;
  uploaded_at: string;
}

interface ClientPageProps {
  client: ClientDetails;
  services: ClientService[];
  documents: DocumentItem[];
}

type ClientFormValues = {
  name: string;
  email: string;
  phone: string;
  country: string;
  address: string;
  companyName: string;
  companyState: string;
  formationDate: string;
  ein: string;
  companyStatus: string;
};

export default function AdminClientDetailPage({ client, services, documents }: ClientPageProps) {
  const router = useRouter();
  const [dirty, setDirty] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deadlines, setDeadlines] = useState<ClientService[]>(services);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const { register, handleSubmit, reset, watch } = useForm<ClientFormValues>({
    defaultValues: {
      name: client.name,
      email: client.email,
      phone: client.phone,
      country: client.country || "",
      address: client.address || "",
      companyName: client.company?.name || "",
      companyState: client.company?.state || "",
      formationDate: client.company?.formation_date || "",
      ein: client.company?.ein || "",
      companyStatus: client.company?.status || "active",
    },
  });

  useEffect(() => {
    reset({
      name: client.name,
      email: client.email,
      phone: client.phone,
      country: client.country || "",
      address: client.address || "",
      companyName: client.company?.name || "",
      companyState: client.company?.state || "",
      formationDate: client.company?.formation_date || "",
      ein: client.company?.ein || "",
      companyStatus: client.company?.status || "active",
    });
  }, [client, reset]);

  const timeline = useMemo(() => {
    const events = [
      { label: "Client created", date: client.created_at, detail: "New client record was added." },
      ...(services || []).flatMap((service) =>
        (service.deadlines || []).map((deadline) => ({
          label: `Deadline for ${service.service_name}`,
          date: deadline.deadline_date,
          detail: `${deadline.status === "completed" ? "Completed" : "Pending"} • ${deadline.description}`,
        }))
      ),
    ]);
    return events.sort((a, b) => (a.date > b.date ? -1 : 1));
  }, [client.created_at, services]);

  const handleUpdateClient = async (values: ClientFormValues) => {
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const adminSupabase = supabase as any;
      const { error: clientError } = await adminSupabase
        .from("clients")
        .update({
          name: values.name,
          email: values.email,
          phone: values.phone,
          country: values.country,
          address: values.address,
        })
        .eq("id", client.id);

      if (clientError) throw clientError;

      if (client.company?.id) {
        const { error: companyError } = await adminSupabase
          .from("companies")
          .update({
            name: values.companyName,
            state: values.companyState,
            formation_date: values.formationDate || null,
            ein: values.ein || null,
            status: values.companyStatus,
          })
          .eq("id", client.company.id);

        if (companyError) throw companyError;
      }

      setStatusMessage("Client details updated successfully.");
      setDirty(false);
    } catch (err: any) {
      setErrorMessage(err?.message || "Unable to update client details.");
    }
  };

  const handleDeadlineChange = (serviceId: string, deadlineId: string, field: string, value: string) => {
    setDeadlines((current) =>
      current.map((service) => {
        if (service.id !== serviceId) return service;
        return {
          ...service,
          deadlines: service.deadlines?.map((deadline) =>
            deadline.id === deadlineId ? { ...deadline, [field]: value } : deadline
          ),
        };
      })
    );
  };

  const handleSaveDeadline = async (serviceId: string, deadlineItem: any) => {
    setStatusMessage(null);
    setErrorMessage(null);

    try {
      const adminSupabase = supabase as any;
      const { error } = await adminSupabase
        .from("deadlines")
        .update({
          deadline_date: deadlineItem.deadline_date,
          notes: deadlineItem.notes || null,
          status: deadlineItem.status,
        })
        .eq("id", deadlineItem.id);

      if (error) throw error;
      setStatusMessage("Deadline updated successfully.");
    } catch (err: any) {
      setErrorMessage(err?.message || "Unable to update deadline.");
    }
  };

  const handleMarkComplete = async (serviceId: string, deadlineItem: any) => {
    const updated = { ...deadlineItem, status: "completed" };
    handleDeadlineChange(serviceId, deadlineItem.id, "status", "completed");
    await handleSaveDeadline(serviceId, updated);
  };

  const handleUploadPlaceholder = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setSelectedFileName(event.target.files[0].name);
      setStatusMessage("Upload to Google Drive is configured as a placeholder. File not stored yet.");
    }
  };

  const totalDeadlines = services.reduce((sum, service) => sum + (service.deadlines?.length || 0), 0);

  return (
    <>
      <SEO
        title="Client Detail - Admin | ecomifyUSA"
        description="Admin view for client detail, deadlines, documents, and activity."
      />
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Logo />
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">Admin</p>
                  <h1 className="text-3xl font-bold text-slate-900">{client.name}</h1>
                </div>
              </div>
              <p className="text-slate-600 mt-2">Manage client record, deadline status, documents, and reminders.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/clients/new">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  New Client
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-10 space-y-8">
          <section className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 border-slate-200">
              <CardHeader>
                <CardTitle>Client & Company Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(handleUpdateClient)} className="space-y-6">
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input {...register("name")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" {...register("email")} />
                    </div>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-2">
                      <Label>WhatsApp</Label>
                      <Input {...register("phone")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Input {...register("country")} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Address</Label>
                    <Textarea {...register("address")} rows={3} />
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input {...register("companyName")} />
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input {...register("companyState")} />
                    </div>
                  </div>
                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Formation Date</Label>
                      <Input type="date" {...register("formationDate")} />
                    </div>
                    <div className="space-y-2">
                      <Label>EIN</Label>
                      <Input {...register("ein")} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Input {...register("companyStatus")} placeholder="active" />
                  </div>
                  {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
                  {statusMessage && <p className="text-sm text-green-600">{statusMessage}</p>}
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={!dirty && !statusMessage}>
                    Save Details
                  </Button>
                </form>
              </CardContent>
            </Card>

            <aside className="space-y-6">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle>Documents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {documents.length === 0 ? (
                    <p className="text-sm text-slate-600">No documents uploaded yet.</p>
                  ) : (
                    documents.map((doc) => (
                      <div key={doc.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-slate-900">{doc.file_name}</p>
                          <p className="text-sm text-slate-500">Uploaded {new Date(doc.uploaded_at).toLocaleDateString()}</p>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <a href={doc.file_path} target="_blank" rel="noreferrer noopener">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </a>
                        </Button>
                      </div>
                    ))
                  )}
                  <div className="rounded-3xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
                    Uploads are currently placeholder-only and will be connected to Google Drive later.
                  </div>
                  <label className="inline-flex w-full cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                    <input type="file" className="hidden" onChange={handleUploadPlaceholder} />
                    Upload Document
                  </label>
                  {selectedFileName && <p className="text-sm text-slate-600">Selected file: {selectedFileName}</p>}
                </CardContent>
              </Card>
            </aside>
          </section>

          <section className="grid gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-2 border-slate-200">
              <CardHeader>
                <CardTitle>Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deadlines.flatMap((service) =>
                      (service.deadlines || []).map((deadline) => (
                        <TableRow key={deadline.id}>
                          <TableCell>{service.service_name}</TableCell>
                          <TableCell>
                            <Input
                              type="date"
                              value={deadline.deadline_date}
                              onChange={(event) => handleDeadlineChange(service.id, deadline.id, "deadline_date", event.target.value)}
                            />
                          </TableCell>
                          <TableCell>
                            <Badge className={deadline.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                              {deadline.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Textarea
                              rows={2}
                              value={deadline.notes || ""}
                              onChange={(event) => handleDeadlineChange(service.id, deadline.id, "notes", event.target.value)}
                            />
                          </TableCell>
                          <TableCell className="space-y-2">
                            <Button size="sm" className="w-full" onClick={() => handleSaveDeadline(service.id, deadline)}>
                              Save
                            </Button>
                            {deadline.status !== "completed" && (
                              <Button size="sm" variant="outline" className="w-full" onClick={() => handleMarkComplete(service.id, deadline)}>
                                Mark Complete
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              asChild
                            >
                              <a
                                href={`https://wa.me/13072180376?text=Please%20review%20this%20deadline%3A%20${encodeURIComponent(
                                  `${service.service_name} due ${deadline.deadline_date}`
                                )}`}
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                <MessageCircle className="w-4 h-4 mr-1" />
                                Reminder
                              </a>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <aside className="space-y-6">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle>Activity History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {timeline.length === 0 ? (
                    <p className="text-sm text-slate-600">No activity recorded yet.</p>
                  ) : (
                    timeline.map((event, index) => (
                      <div key={`${event.label}-${index}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                        <p className="font-semibold text-slate-900">{event.label}</p>
                        <p className="text-sm text-slate-600 mt-1">{event.detail}</p>
                        <p className="text-xs text-slate-500 mt-2">{event.date ? new Date(event.date).toLocaleDateString() : "No date"}</p>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </aside>
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
  const adminSupabase = supabase as any;

  const clientResponse = await adminSupabase
    .from("clients")
    .select("id,name,email,phone,country,address,created_at,company:companies(id,name,state,formation_date,ein,status)")
    .eq("id", id)
    .single();

  const servicesResponse = await adminSupabase
    .from("client_services")
    .select("id,service_name,status,description,deadlines(id,deadline_date,description,status,notes)")
    .eq("client_id", id);

  const documentsResponse = await adminSupabase
    .from("documents")
    .select("id,file_name,file_path,uploaded_at")
    .eq("client_id", id)
    .order("uploaded_at", { ascending: false });

  return {
    props: {
      client: clientResponse.data || null,
      services: servicesResponse.data || [],
      documents: documentsResponse.data || [],
    },
  };
};
