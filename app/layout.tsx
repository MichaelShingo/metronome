import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/utils/ThemeRegistry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	manifest: '/manifest.json',
	title: 'Miitronome | Online Metronome',
	description:
		'Miitronome, a customizable web metronome controllable from your keyboard. Great for desktop, mobile, and tablet.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeRegistry options={{ key: 'mui-theme' }}>{children}</ThemeRegistry>
			</body>
		</html>
	);
}
