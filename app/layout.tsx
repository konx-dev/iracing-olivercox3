import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';

import { checkFileAge } from '@/helpers/fs';
import { searchSeries } from '@/api/results/searchSeries';
import { DataProvider } from '@/context/DataProvider';

// Components
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'iRacing stats - Oliver Cox3',
  description: 'Consuming the Data API endpoint for iRacing for my personal account'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  let apiAvailability = false;
  let data = null;

  try {
    // Check authentication status
    await checkFileAge('cookies.json');
    console.log('Authentication verified, requesting data...');

    // Attempt to fetch data to verify API availability
    data = await searchSeries(2025, 2);
    apiAvailability = true;
    console.log('API is available and responding');
  } catch (error) {
    console.error('API unavailable or authentication failed:', error);
    apiAvailability = false;
    // You might want to set some default/fallback data here
    data = [];
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Header apiAvailability={apiAvailability} />
        <main>
          <DataProvider initialData={data}>{children}</DataProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
