import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bread Calculator',
  description: 'Calculate bread ingredients based on baker\'s percentages',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}