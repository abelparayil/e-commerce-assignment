import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Commerce App',
  description: 'An e-commerce app built with Next.js and TyepScript',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 flex flex-col min-h-screen">
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
