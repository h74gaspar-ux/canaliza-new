import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { QuizProvider } from "@/context/QuizContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Canaliza DIY - Diagnóstico Inteligente",
  description: "Resolva problemas de canalização com diagnóstico inteligente e economia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans bg-slate-50 text-slate-800">
        {/* Premium Glassmorphism Background Orbs Global */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-400/20 blur-[120px]" />
          <div className="absolute top-[30%] left-[50%] w-[40vw] h-[40vw] rounded-full bg-indigo-500/10 blur-[100px]" />
        </div>
        <QuizProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </QuizProvider>
      </body>
    </html>
  );
}

