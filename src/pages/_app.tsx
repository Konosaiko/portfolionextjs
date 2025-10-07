import type { AppProps } from 'next/app';
import I18nProvider from '@/components/I18nProvider';
import { AvailabilityProvider } from '@/contexts/AvailabilityContext';
import Sidebar from '@/components/Sidebar';
import '../app/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider>
      <AvailabilityProvider>
        <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          <Sidebar />
          <main className="flex-1 ml-64 p-4">
            <Component {...pageProps} />
          </main>
        </div>
      </AvailabilityProvider>
    </I18nProvider>
  );
}


