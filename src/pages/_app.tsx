import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <WhatsAppButton />
      <Toaster />
    </>
  );
}
