import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <WhatsAppButton />
      <Toaster />
    </AuthProvider>
  );
}
