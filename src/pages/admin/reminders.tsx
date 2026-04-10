import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { requireAdminAuth } from "@/lib/adminAuth";
import { ArrowRight, Bell, Clock } from "lucide-react";

interface ReminderRow {
  id: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
  deadlineType: string;
  deadlineDate: string;
  daysRemaining: number;
  status: string;
}

export default function AdminRemindersPage() {
  const [reminders, setReminders] = useState<ReminderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const loadReminders = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/reminders/check-deadlines");
      const json = await response.json();
      setReminders(json.upcoming || []);
    } catch (error) {
      console.error(error);
      setMessage("Unable to load upcoming reminders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  const handleSendReminders = async () => {
    setSending(true);
    setMessage(null);

    try {
      const response = await fetch("/api/reminders/check-deadlines", {
        method: "POST",
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || "Failed to send reminders.");
      }

      const successCount = json.sent?.filter((item: any) => item.success).length || 0;
      setMessage(`${successCount} reminder email(s) sent successfully.`);
      await loadReminders();
    } catch (error: any) {
      console.error(error);
      setMessage(error.message || "Failed to send reminder emails.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SEO title="Admin Reminders - ecomifyUSA" description="Manage upcoming deadline reminders for ecomifyUSA clients." />
      <div className="min-h-screen bg-slate-50">
        <header className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-3xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-blue-600 font-semibold">Admin Portal</p>
                  <h1 className="text-3xl font-bold text-slate-900">Deadline Reminders</h1>
                </div>
              </div>
              <p className="text-slate-600 max-w-2xl">Review deadlines due in the next 60 days and send reminder emails with one click.</p>
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleSendReminders} disabled={sending || loading}>
                {sending ? "Sending…" : "Send Reminder Emails"}
              </Button>
              <Link href="/admin">
                <Button variant="outline">
                  <ArrowRight className="w-4 h-4 mr-2" /> Admin Home
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          {message && (
            <div className="rounded-3xl bg-blue-50 border border-blue-100 px-6 py-4 text-blue-700">
              {message}
            </div>
          )}

          <Card className="bg-white border-slate-200">
            <CardHeader>
              <CardTitle>Upcoming Reminders</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-slate-500">Loading reminders…</p>
              ) : reminders.length === 0 ? (
                <p className="text-slate-500">No deadlines found for the next 60 days.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Days Left</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reminders.map((reminder) => (
                      <TableRow key={reminder.id}>
                        <TableCell>{reminder.clientName}</TableCell>
                        <TableCell>{reminder.companyName}</TableCell>
                        <TableCell>{reminder.deadlineType}</TableCell>
                        <TableCell>{reminder.deadlineDate}</TableCell>
                        <TableCell>{reminder.daysRemaining}</TableCell>
                        <TableCell>
                          <Badge variant={reminder.daysRemaining <= 7 ? "destructive" : reminder.daysRemaining <= 30 ? "secondary" : "default"}>
                            {reminder.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const redirect = requireAdminAuth(ctx);
  if (redirect) {
    return redirect;
  }

  return {
    props: {},
  };
};
