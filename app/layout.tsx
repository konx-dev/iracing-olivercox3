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

let apiIsAvailable = false;

export const metadata: Metadata = {
  title: 'iRacing stats - Oliver Cox3',
  description: 'Consuming the Data API endpoint for iRacing for my personal account'
};

if (checkFileAge('cookies.json')) {
  // user authenticated, fetch data
  console.log('application ready to request data from API');
  apiIsAvailable = true;
} else {
  alert('Authentication issue.');
  apiIsAvailable = false;
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await searchSeries(2025, 2);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <Header apiAvailability={apiIsAvailable} />
        <main>
          <DataProvider initialData={data}>{children}</DataProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
