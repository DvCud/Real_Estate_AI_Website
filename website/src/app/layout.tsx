import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navigation from '@/components/Navigation';
import { UserProvider } from '@/lib/context/UserContext';
import { FooterLinks } from '@/components/FooterLinks';

// Import mock API for development
if (process.env.NODE_ENV === 'development') {
  require('@/lib/api/initMockApi');
}

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter' 
});

const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-montserrat' 
});

export const metadata: Metadata = {
  title: "Real Estate AI Investment Platform",
  description: "AI-powered real estate investment analysis and recommendations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        <UserProvider>
          <div className="flex min-h-screen flex-col">
            <Navigation />
            <main className="flex-1 bg-gray-100">{children}</main>
          <footer className="border-t border-gray-200 bg-white py-6">
            <div className="container mx-auto px-4 text-center text-sm text-gray-600">
              <p>© 2023 Real Estate AI Investment Platform. All rights reserved.</p>
              <p className="mt-2">
                <FooterLinks />
              </p>
            </div>
          </footer>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
