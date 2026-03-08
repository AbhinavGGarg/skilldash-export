import type { Metadata } from "next";
import "./globals.css";
import { FirebaseClientProvider } from "@/firebase";
import "katex/dist/katex.min.css";

export const metadata: Metadata = {
  title: "PERSONA | Voice-First AI Personas",
  description:
    "Talk in real time with simulated personas like Einstein, Steve Jobs, Napoleon, and Shakespeare.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body min-h-screen bg-background text-foreground antialiased">
        <FirebaseClientProvider>
          <main>{children}</main>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
