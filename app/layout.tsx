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
  await checkFileAge('cookies.json');
  console.log('Authentication verified, requesting data...');

  const data = await searchSeries(2025, 2);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Header apiAvailability={true} />
        <main>
          <DataProvider initialData={data}>{children}</DataProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
