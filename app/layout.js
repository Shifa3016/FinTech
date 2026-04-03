import { DM_Sans, DM_Mono, Playfair_Display } from 'next/font/google';
import { AppProvider } from '@/context/AppContext';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600', '700'],
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  variable: '--font-dm-mono',
  weight: ['300', '400', '500'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

export const metadata = {
  title: 'Finvue — Finance Dashboard',
  description: 'Track your financial activity with clarity and insight',
  icons: {
    icon: '/favicon.ico',
  },
};

// Inline script runs before React hydration — reads saved preference and
// applies the correct class to <html> immediately, preventing any flash.
const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem('finance_dashboard_state');
    var dark = true; // default
    if (saved) {
      var parsed = JSON.parse(saved);
      if (typeof parsed.darkMode === 'boolean') dark = parsed.darkMode;
    }
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({ children }) {
  return (
    // No className="dark" here — the inline script handles it before paint
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* dangerouslySetInnerHTML is intentional: must run synchronously before render */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${dmSans.variable} ${dmMono.variable} ${playfair.variable} font-sans antialiased`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
