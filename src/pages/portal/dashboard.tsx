import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
    Calendar, FileText, Building2, Clock, CheckCircle2,
    AlertTriangle, Download, MessageCircle, Upload, Settings,
    LogOut, User, Bell, TrendingUp, DollarSign, MapPin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@supabase/supabase-js";
import { SEO } from "@/components/SEO";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

export default function PortalDashboard() {
    const router = useRouter();
    const { user, signOut, loading: authLoading } = useAuth();
    const [client, setClient] = useState<any>(null);
    const [deadlines, setDeadlines] = useState<any[]>([]);
    const [documents, setDocuments] = useState<any[]>([]);
    const [companyDetails, setCompanyDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/portal/login");
            return;
        }

        if (user) {
            fetchDashboardData();
        }
    }, [user, authLoading, router]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch client data
            const { data: clientData, error: clientError } = await supabase
                .from('clients')
                .select(`
                    id,
                    name,
                    email,
                    phone,
                    created_at,
                    company:companies(id, name)
                `)
                .eq('id', user!.id) // Assuming client ID matches user ID for now
                .single();

            if (clientError) {
                // If no client found, try to find by user_id in companies
                const { data: companyData } = await supabase
                    .from('companies')
                    .select(`
                        id,
                        name,
                        clients(id, name, email, phone, created_at)
                    `)
                    .eq('user_id', user!.id)
                    .single();

                if (companyData?.clients?.[0]) {
                    setClient({
                        ...companyData.clients[0],
                        company: { id: companyData.id, name: companyData.name }
                    });
                }
            } else {
                setClient(clientData);
            }

            // Fetch deadlines
            const { data: deadlinesData, error: deadlinesError } = await supabase
                .from('deadlines')
                .select(`
                    id,
                    deadline_date,
                    description,
                    status,
                    created_at,
                    client_service:client_services(
                        service_name,
                        client:clients(
                            name,
                            company:companies(name)
                        )
                    )
                `)
                .order('deadline_date', { ascending: true });

            if (!deadlinesError) {
                setDeadlines(deadlinesData || []);
            }

            // Fetch documents
            const { data: documentsData, error: documentsError } = await supabase
                .from('documents')
                .select(`
                    id,
                    file_name,
                    file_path,
                    uploaded_at,
                    service:client_services(service_name)
                `)
                .order('uploaded_at', { ascending: false });

            if (!documentsError) {
                setDocuments(documentsData || []);
            }

        } catch (err: any) {
            setError(err.message || "Failed to load dashboard data");
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        router.push("/portal/login");
    };

    const getDaysRemaining = (deadlineDate: string) => {
        const today = new Date();
        const deadline = new Date(deadlineDate);
        const diffTime = deadline.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'overdue': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getDeadlineStats = () => {
        const now = new Date();
        const thirtyDaysFromNow = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
        const sixtyDaysFromNow = new Date(now.getTime() + (60 * 24 * 60 * 60 * 1000));

        return {
            overdue: deadlines.filter(d => new Date(d.deadline_date) < now && d.status !== 'completed').length,
            dueThisMonth: deadlines.filter(d =>
                new Date(d.deadline_date) >= now &&
                new Date(d.deadline_date) <= thirtyDaysFromNow &&
                d.status !== 'completed'
            ).length,
            upcoming60Days: deadlines.filter(d =>
                new Date(d.deadline_date) > thirtyDaysFromNow &&
                new Date(d.deadline_date) <= sixtyDaysFromNow &&
                d.status !== 'completed'
            ).length,
            completed: deadlines.filter(d => d.status === 'completed').length
        };
    };

    const stats = getDeadlineStats();

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect in useEffect
    }

    return (
        <>
            <SEO
                title="Client Portal Dashboard - ecomifyUSA"
                description="Manage your compliance deadlines, documents, and business information."
            />
            <div className="min-h-screen bg-slate-50 font-sans">
                {/* Header */}
                <header className="bg-white border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Logo />
                            <div className="hidden md:block">
                                <h1 className="text-lg font-semibold text-slate-900">Client Portal</h1>
                                {client && (
                                    <p className="text-sm text-slate-600">
                                        {client.name} • {client.company.name}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm">
                                <Bell className="w-4 h-4 mr-2" />
                                Notifications
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleSignOut}
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid lg:grid-cols-4 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-8">
                            {/* Welcome Section */}
                            <div className="bg-white rounded-lg border border-slate-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-900">
                                            Welcome back, {client?.name?.split(' ')[0] || 'Client'}!
                                        </h2>
                                        <p className="text-slate-600 mt-1">
                                            Here's your compliance overview for {client?.company.name}
                                        </p>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                            <User className="w-8 h-8 text-blue-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Deadline Overview Cards */}
                            <div className="grid md:grid-cols-4 gap-4">
                                <Card className="border-red-200 bg-red-50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
                                                <p className="text-sm text-red-700">Overdue</p>
                                            </div>
                                            <AlertTriangle className="w-8 h-8 text-red-500" />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-orange-200 bg-orange-50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold text-orange-600">{stats.dueThisMonth}</p>
                                                <p className="text-sm text-orange-700">Due This Month</p>
                                            </div>
                                            <Clock className="w-8 h-8 text-orange-500" />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-yellow-200 bg-yellow-50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold text-yellow-600">{stats.upcoming60Days}</p>
                                                <p className="text-sm text-yellow-700">Upcoming (60 days)</p>
                                            </div>
                                            <Calendar className="w-8 h-8 text-yellow-500" />
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="border-green-200 bg-green-50">
                                    <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                                                <p className="text-sm text-green-700">Completed</p>
                                            </div>
                                            <CheckCircle2 className="w-8 h-8 text-green-500" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Deadlines Table */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5" />
                                        Upcoming Deadlines
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {deadlines.length === 0 ? (
                                        <div className="text-center py-8">
                                            <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                            <p className="text-slate-600">No deadlines found</p>
                                            <p className="text-sm text-slate-500 mt-1">
                                                Your compliance deadlines will appear here once set up
                                            </p>
                                        </div>
                                    ) : (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Service</TableHead>
                                                    <TableHead>Company</TableHead>
                                                    <TableHead>Due Date</TableHead>
                                                    <TableHead>Days Left</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {deadlines.slice(0, 10).map((deadline) => {
                                                    const daysLeft = getDaysRemaining(deadline.deadline_date);
                                                    return (
                                                        <TableRow key={deadline.id}>
                                                            <TableCell className="font-medium">
                                                                {deadline.client_service.service_name}
                                                            </TableCell>
                                                            <TableCell>
                                                                {deadline.client_service.client.company.name}
                                                            </TableCell>
                                                            <TableCell>
                                                                {new Date(deadline.deadline_date).toLocaleDateString()}
                                                            </TableCell>
                                                            <TableCell>
                                                                <span className={`font-medium ${
                                                                    daysLeft < 0 ? 'text-red-600' :
                                                                    daysLeft <= 7 ? 'text-orange-600' :
                                                                    'text-slate-600'
                                                                }`}>
                                                                    {daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` :
                                                                     daysLeft === 0 ? 'Due today' :
                                                                     `${daysLeft} days`}
                                                                </span>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge className={getStatusColor(deadline.status)}>
                                                                    {deadline.status}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    asChild
                                                                >
                                                                    <a
                                                                        href={`https://wa.me/13072180376?text=Hi, I need help with my ${deadline.client_service.service_name} deadline on ${new Date(deadline.deadline_date).toLocaleDateString()}`}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                    >
                                                                        <MessageCircle className="w-4 h-4 mr-1" />
                                                                        Contact
                                                                    </a>
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Documents Section */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <FileText className="w-5 h-5" />
                                        Recent Documents
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {documents.length === 0 ? (
                                        <div className="text-center py-8">
                                            <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                            <p className="text-slate-600">No documents uploaded yet</p>
                                            <p className="text-sm text-slate-500 mt-1">
                                                Your business documents will appear here
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {documents.slice(0, 5).map((doc) => (
                                                <div key={doc.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="w-5 h-5 text-slate-400" />
                                                        <div>
                                                            <p className="font-medium text-slate-900">{doc.file_name}</p>
                                                            <p className="text-sm text-slate-500">
                                                                Uploaded {new Date(doc.uploaded_at).toLocaleDateString()}
                                                                {doc.service && ` • ${doc.service.service_name}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Button size="sm" variant="outline">
                                                        <Download className="w-4 h-4 mr-1" />
                                                        Download
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Company Details */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Building2 className="w-5 h-5" />
                                        Company Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-sm text-slate-500">Company Name</p>
                                        <p className="font-medium">{client?.company.name || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">State of Incorporation</p>
                                        <p className="font-medium flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            {companyDetails?.state || 'Not set'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Formation Date</p>
                                        <p className="font-medium">
                                            {companyDetails?.formation_date
                                                ? new Date(companyDetails.formation_date).toLocaleDateString()
                                                : 'Not set'
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">EIN</p>
                                        <p className="font-medium">{companyDetails?.ein || 'Not set'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-500">Registered Agent</p>
                                        <p className="font-medium">ecomifyUSA Registered Agent Service</p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button className="w-full justify-start" variant="outline">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload Document
                                    </Button>
                                    <Button className="w-full justify-start" variant="outline" asChild>
                                        <a
                                            href="https://wa.me/13072180376"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <MessageCircle className="w-4 h-4 mr-2" />
                                            Contact Support
                                        </a>
                                    </Button>
                                    <Button className="w-full justify-start" variant="outline">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Update Details
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Compliance Score */}
                            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                                <CardContent className="p-6">
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <TrendingUp className="w-8 h-8 text-blue-600" />
                                        </div>
                                        <h3 className="font-semibold text-blue-900 mb-2">Compliance Score</h3>
                                        <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
                                        <p className="text-sm text-blue-700">Excellent! All major deadlines met.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
}
