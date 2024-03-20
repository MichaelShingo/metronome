import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/utils/ThemeRegistry';
import { Analytics } from '@vercel/analytics/react';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	manifest: '/manifest.json',
	title: 'Miitronome | Online Metronome',
	description:
		'Miitronome, a customizable web metronome controllable from your keyboard. Great for desktop, mobile, and tablet.',
	metadataBase: new URL('https://metronome.michaelshingo.com/'),
	twitter: {
		card: 'summary_large_image',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeRegistry options={{ key: 'mui-theme' }}>{children}</ThemeRegistry>
				<Analytics />
			</body>
		</html>
	);
}
