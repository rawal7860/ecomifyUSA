import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import {
    ArrowRight, ArrowLeft, CheckCircle, User, Building2,
    FileText, CreditCard, Phone, MapPin, Calendar,
    Mail, Globe, ChevronDown, AlertCircle, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@supabase/supabase-js";
import { SEO } from "@/components/SEO";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
import Logo from "@/components/Logo";
import Footer from "@/components/Footer";

// Country codes for WhatsApp
const countryCodes = [
    { code: "+1", name: "United States", flag: "🇺🇸" },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+92", name: "Pakistan", flag: "🇵🇰" },
    { code: "+971", name: "UAE", flag: "🇦🇪" },
    { code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+1", name: "Canada", flag: "🇨🇦" },
    { code: "+61", name: "Australia", flag: "🇦🇺" },
    { code: "+49", name: "Germany", flag: "🇩🇪" },
    { code: "+33", name: "France", flag: "🇫🇷" },
    { code: "+81", name: "Japan", flag: "🇯🇵" },
    { code: "+86", name: "China", flag: "🇨🇳" },
    { code: "+55", name: "Brazil", flag: "🇧🇷" },
    { code: "+27", name: "South Africa", flag: "🇿🇦" },
    { code: "+234", name: "Nigeria", flag: "🇳🇬" },
    { code: "+20", name: "Egypt", flag: "🇪🇬" },
    { code: "+7", name: "Russia", flag: "🇷🇺" },
    { code: "+82", name: "South Korea", flag: "🇰🇷" },
    { code: "+65", name: "Singapore", flag: "🇸🇬" },
    { code: "+60", name: "Malaysia", flag: "🇲🇾" },
];

// US States
const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

// Service options
const serviceOptions = [
    { id: "sales_tax", name: "Sales Tax Filing", description: "Monthly/quarterly/annual sales tax compliance", price: 99 },
    { id: "annual_report", name: "Annual Report", description: "State annual report filing", price: 149 },
    { id: "registered_agent", name: "Registered Agent", description: "Official registered agent service", price: 199 },
    { id: "irs_filing", name: "IRS Filing", description: "Federal tax filings and compliance", price: 299 },
    { id: "delaware_franchise", name: "Delaware Franchise Tax", description: "Delaware franchise tax filing", price: 199 },
    { id: "boir_report", name: "BOIR Report", description: "Beneficial Ownership reporting", price: 99 }
];

// Formation packages
const formationPackages = [
    { id: "wyoming_llc", name: "Wyoming LLC Formation", price: 197, description: "Complete Wyoming LLC formation with EIN" },
    { id: "wyoming_compliance", name: "Wyoming + Compliance", price: 297, description: "Wyoming LLC + 1 year compliance package" },
    { id: "delaware_llc", name: "Delaware LLC Formation", price: 347, description: "Premium Delaware LLC formation with EIN" },
    { id: "sales_tax_registration", name: "Sales Tax Registration", price: 149, description: "Multi-state sales tax registration" },
    { id: "tax_exemption", name: "Tax Exemption Service", price: 199, description: "Resale certificate and tax exemption setup" },
    { id: "annual_report_service", name: "Annual Report Service", price: 99, description: "Annual report filing service" },
    { id: "reminders_only", name: "Just Set Up Reminders", price: 0, description: "Free deadline tracking and reminders" }
];

type FormData = {
    // Step 1: Personal Info
    fullName: string;
    email: string;
    whatsappCountryCode: string;
    whatsappNumber: string;
    country: string;
    address: string;

    // Step 2: Company Status
    companyStatus: "existing" | "formation" | "reminders";

    // Step 3A: Company Details (existing/reminders)
    companyName?: string;
    stateOfIncorporation?: string;
    dateOfFormation?: string;
    einNumber?: string;
    activeServices?: string[];
    salesTaxFrequency?: "monthly" | "quarterly" | "annual";

    // Step 3B: Formation Intent (formation)
    interestedState?: string;
    businessType?: string;
    timeline?: string;
    specificQuestions?: string;

    // Step 4: Service Selection
    selectedServices?: string[];
};

export default function RegisterPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            whatsappCountryCode: "+1",
            companyStatus: "existing",
            activeServices: [],
            selectedServices: []
        }
    });

    const watchedCompanyStatus = watch("companyStatus");
    const watchedActiveServices = watch("activeServices") || [];
    const watchedSelectedServices = watch("selectedServices") || [];

    const totalSteps = 5;
    const progress = (currentStep / totalSteps) * 100;

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            // Create company first
            const { data: company, error: companyError } = await supabase
                .from('companies')
                .insert({
                    name: data.companyName || `${data.fullName}'s Company`,
                    user_id: null // Will be set when user authenticates
                })
                .select()
                .single();

            if (companyError) throw companyError;

            // Create client
            const { data: client, error: clientError } = await supabase
                .from('clients')
                .insert({
                    company_id: company.id,
                    name: data.fullName,
                    email: data.email,
                    phone: `${data.whatsappCountryCode}${data.whatsappNumber}`
                })
                .select()
                .single();

            if (clientError) throw clientError;

            // Create services based on selection
            if (data.selectedServices && data.selectedServices.length > 0) {
                const servicesToInsert = data.selectedServices.map(serviceId => {
                    const service = formationPackages.find(p => p.id === serviceId);
                    return {
                        client_id: client.id,
                        service_name: service?.name || serviceId,
                        description: service?.description || '',
                        status: 'active'
                    };
                });

                const { error: servicesError } = await supabase
                    .from('client_services')
                    .insert(servicesToInsert);

                if (servicesError) throw servicesError;
            }

            // If existing company, create services from active services
            if ((data.companyStatus === 'existing' || data.companyStatus === 'reminders') && data.activeServices) {
                const existingServices = data.activeServices.map(serviceId => {
                    const service = serviceOptions.find(s => s.id === serviceId);
                    return {
                        client_id: client.id,
                        service_name: service?.name || serviceId,
                        description: service?.description || '',
                        status: 'active'
                    };
                });

                if (existingServices.length > 0) {
                    const { error: existingServicesError } = await supabase
                        .from('client_services')
                        .insert(existingServices);

                    if (existingServicesError) throw existingServicesError;
                }
            }

            // Move to confirmation step
            setCurrentStep(5);

        } catch (error: any) {
            console.error('Registration error:', error);
            setSubmitError(error.message || 'An error occurred during registration');
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Personal Information</h2>
                            <p className="text-slate-600">Let's start with your basic information</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name *</Label>
                                <Input
                                    id="fullName"
                                    {...register("fullName", { required: "Full name is required" })}
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.fullName.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    placeholder="your@email.com"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>WhatsApp Number *</Label>
                            <div className="flex gap-2">
                                <Select
                                    value={watch("whatsappCountryCode")}
                                    onValueChange={(value) => setValue("whatsappCountryCode", value)}
                                >
                                    <SelectTrigger className="w-40">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countryCodes.map((country) => (
                                            <SelectItem key={country.code} value={country.code}>
                                                {country.flag} {country.code} {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input
                                    {...register("whatsappNumber", {
                                        required: "WhatsApp number is required",
                                        pattern: {
                                            value: /^\d{7,15}$/,
                                            message: "Invalid phone number"
                                        }
                                    })}
                                    placeholder="1234567890"
                                    className="flex-1"
                                />
                            </div>
                            {errors.whatsappNumber && (
                                <p className="text-sm text-red-600 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    {errors.whatsappNumber.message}
                                </p>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="country">Country of Residence *</Label>
                                <Select
                                    value={watch("country")}
                                    onValueChange={(value) => setValue("country", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your country" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {countryCodes.map((country) => (
                                            <SelectItem key={country.name} value={country.name}>
                                                {country.flag} {country.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {!watch("country") && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        Country is required
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Residential Address *</Label>
                                <Input
                                    id="address"
                                    {...register("address", { required: "Address is required" })}
                                    placeholder="Street address, city, state, zip"
                                />
                                {errors.address && (
                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                        <AlertCircle className="w-4 h-4" />
                                        {errors.address.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Company Status</h2>
                            <p className="text-slate-600">Tell us about your business situation</p>
                        </div>

                        <RadioGroup
                            value={watchedCompanyStatus}
                            onValueChange={(value: "existing" | "formation" | "reminders") => setValue("companyStatus", value)}
                            className="space-y-4"
                        >
                            <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                                <RadioGroupItem value="existing" id="existing" />
                                <div className="flex-1">
                                    <Label htmlFor="existing" className="font-semibold text-slate-900 cursor-pointer">
                                        I have an existing US/UK company
                                    </Label>
                                    <p className="text-sm text-slate-600 mt-1">
                                        I need compliance tracking and services for my current business
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                                <RadioGroupItem value="formation" id="formation" />
                                <div className="flex-1">
                                    <Label htmlFor="formation" className="font-semibold text-slate-900 cursor-pointer">
                                        I want to form a new company
                                    </Label>
                                    <p className="text-sm text-slate-600 mt-1">
                                        I need help setting up a new US/UK business entity
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                                <RadioGroupItem value="reminders" id="reminders" />
                                <div className="flex-1">
                                    <Label htmlFor="reminders" className="font-semibold text-slate-900 cursor-pointer">
                                        Just set up deadline reminders
                                    </Label>
                                    <p className="text-sm text-slate-600 mt-1">
                                        I have a company but only need deadline tracking (free)
                                    </p>
                                </div>
                            </div>
                        </RadioGroup>
                    </div>
                );

            case 3:
                if (watchedCompanyStatus === "formation") {
                    return (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Formation Intent</h2>
                                <p className="text-slate-600">Tell us about your business plans</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Interested State</Label>
                                    <Select
                                        value={watch("interestedState")}
                                        onValueChange={(value) => setValue("interestedState", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select preferred state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Wyoming">Wyoming (Most Popular)</SelectItem>
                                            <SelectItem value="Delaware">Delaware (Premium)</SelectItem>
                                            <SelectItem value="New Mexico">New Mexico (Budget)</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Business Type</Label>
                                    <Select
                                        value={watch("businessType")}
                                        onValueChange={(value) => setValue("businessType", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select business type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Amazon FBA">Amazon FBA</SelectItem>
                                            <SelectItem value="Shopify">Shopify Store</SelectItem>
                                            <SelectItem value="Consulting">Consulting Services</SelectItem>
                                            <SelectItem value="Services">General Services</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Timeline</Label>
                                <Select
                                    value={watch("timeline")}
                                    onValueChange={(value) => setValue("timeline", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="When do you need this?" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="urgent">Urgent (ASAP)</SelectItem>
                                        <SelectItem value="month">Within a month</SelectItem>
                                        <SelectItem value="exploring">Just exploring options</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Specific Questions or Requirements</Label>
                                <Textarea
                                    {...register("specificQuestions")}
                                    placeholder="Any specific questions about formation, compliance, or services..."
                                    rows={4}
                                />
                            </div>
                        </div>
                    );
                } else {
                    // Existing company or reminders
                    return (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <Building2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Company Details</h2>
                                <p className="text-slate-600">Tell us about your existing company</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="companyName">Company Name *</Label>
                                    <Input
                                        id="companyName"
                                        {...register("companyName", { required: "Company name is required" })}
                                        placeholder="Your LLC or Ltd name"
                                    />
                                    {errors.companyName && (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.companyName.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label>State of Incorporation *</Label>
                                    <Select
                                        value={watch("stateOfIncorporation")}
                                        onValueChange={(value) => setValue("stateOfIncorporation", value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {usStates.map((state) => (
                                                <SelectItem key={state} value={state}>
                                                    {state}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {!watch("stateOfIncorporation") && (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            State is required
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="dateOfFormation">Date of Formation</Label>
                                    <Input
                                        id="dateOfFormation"
                                        type="date"
                                        {...register("dateOfFormation")}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="einNumber">EIN Number (Optional)</Label>
                                    <Input
                                        id="einNumber"
                                        {...register("einNumber")}
                                        placeholder="XX-XXXXXXX"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label>Active Services (Check all that apply)</Label>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {serviceOptions.map((service) => (
                                        <div key={service.id} className="flex items-start space-x-3 p-3 border border-slate-200 rounded-lg">
                                            <Checkbox
                                                id={service.id}
                                                checked={watchedActiveServices.includes(service.id)}
                                                onCheckedChange={(checked) => {
                                                    const current = watchedActiveServices || [];
                                                    if (checked) {
                                                        setValue("activeServices", [...current, service.id]);
                                                    } else {
                                                        setValue("activeServices", current.filter(id => id !== service.id));
                                                    }
                                                }}
                                            />
                                            <div className="flex-1">
                                                <Label htmlFor={service.id} className="font-medium text-slate-900 cursor-pointer">
                                                    {service.name}
                                                </Label>
                                                <p className="text-sm text-slate-600 mt-1">{service.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {watchedActiveServices.includes("sales_tax") && (
                                    <div className="space-y-2">
                                        <Label>Sales Tax Filing Frequency</Label>
                                        <RadioGroup
                                            value={watch("salesTaxFrequency")}
                                            onValueChange={(value: "monthly" | "quarterly" | "annual") => setValue("salesTaxFrequency", value)}
                                            className="flex gap-6"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="monthly" id="monthly" />
                                                <Label htmlFor="monthly">Monthly</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="quarterly" id="quarterly" />
                                                <Label htmlFor="quarterly">Quarterly</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="annual" id="annual" />
                                                <Label htmlFor="annual">Annual</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                }

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Service Selection</h2>
                            <p className="text-slate-600">Choose the services you need</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {formationPackages.map((pkg) => (
                                <Card
                                    key={pkg.id}
                                    className={`cursor-pointer transition-all hover:shadow-lg ${
                                        watchedSelectedServices.includes(pkg.id)
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-slate-200 hover:border-blue-300'
                                    }`}
                                    onClick={() => {
                                        const current = watchedSelectedServices || [];
                                        if (current.includes(pkg.id)) {
                                            setValue("selectedServices", current.filter(id => id !== pkg.id));
                                        } else {
                                            setValue("selectedServices", [...current, pkg.id]);
                                        }
                                    }}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-slate-900">{pkg.name}</h3>
                                                <p className="text-sm text-slate-600 mt-1">{pkg.description}</p>
                                            </div>
                                            <Checkbox
                                                checked={watchedSelectedServices.includes(pkg.id)}
                                                onChange={() => {}} // Handled by card click
                                            />
                                        </div>
                                        <div className="text-lg font-bold text-blue-600">
                                            {pkg.price === 0 ? 'Free' : `$${pkg.price}`}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {watchedSelectedServices.length > 0 && (
                            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                                <h3 className="font-semibold text-slate-900 mb-2">Selected Services:</h3>
                                <div className="space-y-1">
                                    {watchedSelectedServices.map((serviceId) => {
                                        const service = formationPackages.find(p => p.id === serviceId);
                                        return (
                                            <div key={serviceId} className="flex justify-between text-sm">
                                                <span>{service?.name}</span>
                                                <span className="font-medium">
                                                    {service?.price === 0 ? 'Free' : `$${service?.price}`}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="border-t border-slate-200 mt-3 pt-3 flex justify-between font-bold">
                                    <span>Total:</span>
                                    <span>${watchedSelectedServices.reduce((total, serviceId) => {
                                        const service = formationPackages.find(p => p.id === serviceId);
                                        return total + (service?.price || 0);
                                    }, 0)}</span>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 5:
                return (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Account Created Successfully!</h2>
                        <p className="text-slate-600 mb-6">
                            Welcome to ecomifyUSA! Your client portal account has been set up.
                        </p>

                        <div className="bg-slate-50 rounded-lg p-6 text-left max-w-md mx-auto">
                            <h3 className="font-semibold text-slate-900 mb-4">Next Steps:</h3>
                            <ul className="space-y-2 text-sm text-slate-600">
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    Check your email for login credentials
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    Set up your dashboard preferences
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    Upload your company documents
                                </li>
                                <li className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4 text-green-500" />
                                    Configure deadline reminders
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/portal">
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    Go to Portal <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="outline">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const canProceedToNext = () => {
        switch (currentStep) {
            case 1:
                return watch("fullName") && watch("email") && watch("whatsappNumber") && watch("country") && watch("address");
            case 2:
                return watchedCompanyStatus;
            case 3:
                if (watchedCompanyStatus === "formation") {
                    return watch("interestedState") && watch("businessType") && watch("timeline");
                } else {
                    return watch("companyName") && watch("stateOfIncorporation");
                }
            case 4:
                return watchedSelectedServices && watchedSelectedServices.length > 0;
            default:
                return true;
        }
    };

    return (
        <>
            <SEO
                title="Register for Client Portal - ecomifyUSA"
                description="Create your free client portal account for deadline tracking, document management, and compliance monitoring."
            />
            <div className="min-h-screen bg-slate-50 font-sans">
                {/* Navigation */}
                <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                        <Logo />
                        <nav className="hidden md:flex items-center gap-8">
                            <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Home</Link>
                            <Link href="/portal" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Portal</Link>
                            <Link href="/login" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Login</Link>
                        </nav>
                    </div>
                </header>

                {/* Progress Bar */}
                <div className="bg-white border-b border-slate-200">
                    <div className="max-w-4xl mx-auto px-4 py-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-medium text-slate-600">Step {currentStep} of {totalSteps}</span>
                            <span className="text-sm text-slate-500">{Math.round(progress)}% Complete</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        <div className="flex justify-between mt-2 text-xs text-slate-500">
                            <span>Personal Info</span>
                            <span>Company Status</span>
                            <span>Details</span>
                            <span>Services</span>
                            <span>Complete</span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 py-12">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {renderStepContent()}

                        {submitError && (
                            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-800 text-sm">{submitError}</p>
                            </div>
                        )}

                        {currentStep < 5 && (
                            <div className="flex justify-between mt-8">
                                {currentStep > 1 ? (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={prevStep}
                                        disabled={isSubmitting}
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Previous
                                    </Button>
                                ) : (
                                    <div />
                                )}

                                {currentStep < 4 ? (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={!canProceedToNext() || isSubmitting}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        Next
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={!canProceedToNext() || isSubmitting}
                                        className="bg-blue-600 hover:bg-blue-700"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating Account...
                                            </>
                                        ) : (
                                            <>
                                                Create Account
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        )}
                    </form>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </>
    );
}