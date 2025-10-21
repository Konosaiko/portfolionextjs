import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AvailabilityProvider } from '@/contexts/AvailabilityContext';
import Sidebar from '@/components/Sidebar';
import I18nProvider from '@/components/I18nProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FullStack React/Symfony Developer & Lua Modder - Portfolio',
  description: 'Portfolio of a fullstack developer specialized in React, TypeScript, Symfony and Lua modding. Discover my projects and skills.',
  keywords: ['portfolio', 'developer', 'react', 'typescript', 'symfony', 'lua', 'modding'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'FullStack Developer Portfolio',
    description: 'Discover my projects and skills as a fullstack developer',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          <AvailabilityProvider>
            <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
              <Sidebar />
              <main className="flex-1 lg:ml-64 p-2 sm:p-4 md:p-6">
                {children}
              </main>
            </div>
          </AvailabilityProvider>
        </I18nProvider>
      </body>
    </html>
  );
}