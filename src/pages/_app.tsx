import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import localFont from "next/font/local";
import ScrollReveal from "@/components/motion/ScrollReveal";

// Geist + Geist Mono ship on disk (src/pages/fonts) — wired here at zero added bundle.
// Geist = UI/body, Geist Mono = numbers/money ("mono-for-money" fintech tell).
const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  display: "swap",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
  weight: "100 900",
});

// The concierge dock (WhatsApp + AI chat) is one component now. Client-side only
// so it stays out of the critical render path.
const ChatWidget = dynamic(() => import("@/components/chat/ChatWidget"), {
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className={`${geist.variable} ${geistMono.variable} font-sans`}>
        <Component {...pageProps} />
        <ScrollReveal />
        <ChatWidget />
        <Toaster />
      </div>
    </AuthProvider>
  );
}
