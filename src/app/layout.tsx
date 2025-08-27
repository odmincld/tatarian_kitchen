import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Provider } from '@/providers/provider';
import { siteConfig } from '@/config/siteConfig';
import Header from '@/components/UI/layout/Header';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth/auth';
import { AppLoader } from '@/hoc/app-loader';
import MainPageTitle from '@/components/UI/layout/MainPageTitle';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <SessionProvider session={session}>
            <AppLoader>
              <Header></Header>

              <main className="flex flex-col items-center max-w-[1024px] justify-start mx-auto px-[24px]">
                <MainPageTitle />

                {children}
              </main>

              <footer></footer>
            </AppLoader>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
