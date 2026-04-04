import Link from "next/link";
import { GetServerSideProps } from "next";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/Logo";
import { requireAdminAuth } from "@/lib/adminAuth";
import { createClient } from "@supabase/supabase-js";
import { LogOut, Plus, Clock, Calendar, FileText, Users, Bell, ArrowRight } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface ClientRow {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: { name: string; state?: string; formation_date?: string; status?: string } | null;
  created_at?: string;
}

interface ReminderRow {
  id: string;
  reminder_date: string;
  message: string;
}

interface DashboardProps {
  totalClients: number;
  remindersThisWeek: number;
  overdueDeadlines: number;
  newSignupsThisMonth: number;
  recentClients: ClientRow[];
  upcomingReminders: ReminderRow[];
}

export default function AdminDashboard({
  totalClients,
  remindersThisWeek,
  overdueDeadlines,
  newSignupsThisMonth,
  recentClients,
  upcomingReminders,
}: DashboardProps) {
  return (
    <>
      <SEO
        title="Admin Dashboard - ecomifyUSA"
        description="Admin control panel for ecomifyUSA client portal management."
      />
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-3xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">Admin Portal</p>
                  <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                </div>
              </div>
              <p className="text-slate-600 max-w-2xl">
                Manage clients, reminders, deadlines, and onboarding from one secure admin panel.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/admin/clients/new">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Client
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="bg-white border-slate-200">
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Total Clients</p>
                    <p className="text-3xl font-semibold text-slate-900">{totalClients}</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-slate-200">
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Reminders This Week</p>
                    <p className="text-3xl font-semibold text-slate-900">{remindersThisWeek}</p>
                  </div>
                  <Bell className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-slate-200">
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Overdue Deadlines</p>
                    <p className="text-3xl font-semibold text-slate-900">{overdueDeadlines}</p>
                  </div>
                  <Clock className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white border-slate-200">
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Signups This Month</p>
                    <p className="text-3xl font-semibold text-slate-900">{newSignupsThisMonth}</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2 space-y-6">
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle>Recent Clients</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>WhatsApp</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentClients.map((client) => (
                        <TableRow key={client.id}>
                          <TableCell>{client.name}</TableCell>
                          <TableCell>{client.email}</TableCell>
                          <TableCell>{client.phone}</TableCell>
                          <TableCell>{client.company?.name || "—"}</TableCell>
                          <TableCell>{client.company?.state || "—"}</TableCell>
                          <TableCell>
                            <Badge variant={client.company?.status === "active" ? "default" : "secondary"}>
                              {client.company?.status || "Unknown"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle>Upcoming Reminders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingReminders.length === 0 ? (
                    <p className="text-sm text-slate-600">No reminders scheduled for the next 30 days.</p>
                  ) : (
                    upcomingReminders.map((reminder) => (
                      <div key={reminder.id} className="rounded-3xl border border-slate-200 p-4 bg-slate-50">
                        <div className="flex items-center justify-between gap-4">
                          <p className="font-medium text-slate-900">{new Date(reminder.reminder_date).toLocaleDateString()}</p>
                          <Badge className="bg-blue-100 text-blue-700">Upcoming</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mt-2">{reminder.message}</p>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </section>

            <aside className="space-y-6">
              <Card className="bg-white border-slate-200">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/admin/clients/new">
                    <Button className="w-full justify-start" variant="default">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Client
                    </Button>
                  </Link>
                  <Link href="/admin/clients/new">
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Create Reminder
                    </Button>
                  </Link>
                  <Link href="/admin/login">
                    <Button className="w-full justify-start" variant="outline">
                      <ArrowRight className="w-4 h-4 mr-2" />
                      Reauthenticate
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </aside>
          </div>
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

  const adminSupabase = supabase as any;
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  const thirtyDays = new Date(today);
  thirtyDays.setDate(today.getDate() + 30);
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();

  const totalClientsResp = await adminSupabase.from("clients").select("id", { head: true, count: "exact" });
  const remindersThisWeekResp = await adminSupabase
    .from("reminders")
    .select("id", { head: true, count: "exact" })
    .gte("reminder_date", today.toISOString().split("T")[0])
    .lte("reminder_date", nextWeek.toISOString().split("T")[0]);
  const overdueDeadlinesResp = await adminSupabase
    .from("deadlines")
    .select("id", { head: true, count: "exact" })
    .or(`status.eq.overdue,deadline_date.lt.${today.toISOString().split("T")[0]}`);
  const newSignupsResp = await adminSupabase
    .from("clients")
    .select("id", { head: true, count: "exact" })
    .gte("created_at", firstOfMonth);

  const recentClientsResp = await adminSupabase
    .from("clients")
    .select("id,name,email,phone,created_at,company:companies(name,state,formation_date,status)")
    .order("created_at", { ascending: false })
    .limit(10);

  const upcomingRemindersResp = await adminSupabase
    .from("reminders")
    .select("id,reminder_date,message")
    .gte("reminder_date", today.toISOString().split("T")[0])
    .lte("reminder_date", thirtyDays.toISOString().split("T")[0])
    .order("reminder_date", { ascending: true })
    .limit(10);

  return {
    props: {
      totalClients: totalClientsResp.count ?? 0,
      remindersThisWeek: remindersThisWeekResp.count ?? 0,
      overdueDeadlines: overdueDeadlinesResp.count ?? 0,
      newSignupsThisMonth: newSignupsResp.count ?? 0,
      recentClients: recentClientsResp.data || [],
      upcomingReminders: upcomingRemindersResp.data || [],
    },
  };
};
