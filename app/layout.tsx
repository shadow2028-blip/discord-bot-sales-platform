import type { Metadata } from 'next';
import { Navbar } from '@components/layout/Navbar';
import { Footer } from '@components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'BotHub - Premium Discord Bots',
  description: 'Browse and purchase premium Discord bots for your server.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-discord-dark text-white">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
