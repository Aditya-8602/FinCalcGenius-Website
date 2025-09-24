import { injectSpeedInsights } from "@vercel/speed-insights";
import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "FinCalcGenius - Your Financial Calculator",
  description: "A comprehensive suite of financial calculators for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="d-flex flex-column min-vh-100">
          <Header />
          <main className="container py-4">
            {children}
          </main>
          <Footer />
        </div>
       {injectSpeedInsights()} 
      </body>
    </html>
  );
}
