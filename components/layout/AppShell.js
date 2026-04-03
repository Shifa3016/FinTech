'use client';

import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';

export default function AppShell({ children }) {
  return (
    <div className="relative min-h-screen bg-slate-50 bg-grid-light dark:bg-navy-950 dark:bg-grid-dark">
      {/* Ambient glow — dark mode only */}
      <div className="pointer-events-none fixed left-64 top-0 hidden h-96 w-96 -translate-x-1/2 rounded-full bg-gold-500/5 blur-3xl dark:block" />
      <div className="pointer-events-none fixed bottom-0 right-0 hidden h-64 w-64 rounded-full bg-blue-500/5 blur-3xl dark:block" />

      {/* Desktop sidebar — hidden on mobile via its own hidden lg:flex */}
      <Sidebar />

      {/* Mobile header + drawer — hidden on desktop via its own lg:hidden wrapper */}
      <MobileHeader />

      {/* Main content:
          - On mobile (< lg): no left margin, top padding accounts for the fixed 56px header
          - On desktop (>= lg): left margin equals sidebar width, normal top padding  */}
      <main className="min-h-screen lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-[72px] sm:px-6 lg:px-8 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}
