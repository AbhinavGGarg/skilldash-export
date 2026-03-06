
import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { FirebaseClientProvider } from '@/firebase';
import { AiTutorWidget } from '@/components/AiTutorWidget';
import 'katex/dist/katex.min.css';

export const metadata: Metadata = {
  title: 'SkillDash | Mini Practice Tests',
  description: 'Quick, interactive practice for standardized tests.',
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground flex flex-col min-h-screen">
        <FirebaseClientProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <AiTutorWidget />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
