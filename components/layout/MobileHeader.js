'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp, ROLES } from '@/context/AppContext';
import {
  LayoutDashboard, ArrowLeftRight, Lightbulb,
  TrendingUp, Menu, X, Shield, Eye, Sun, Moon, RotateCcw
} from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { href: '/', label: 'Overview', icon: LayoutDashboard },
  { href: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { href: '/insights', label: 'Insights', icon: Lightbulb },
];

export default function MobileHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { role, setRole, darkMode, setDarkMode, isAdmin, resetData } = useApp();

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    // Only visible below lg breakpoint
    <div className="lg:hidden">
      {/* Top bar */}
      <header className="fixed left-0 right-0 top-0 z-50 flex h-14 items-center justify-between
                         border-b border-slate-200 bg-white/95 px-4 backdrop-blur-xl
                         dark:border-white/5 dark:bg-navy-900/95">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600">
            <TrendingUp size={15} className="text-white dark:text-navy-950" strokeWidth={2.5} />
          </div>
          <span className="font-display text-base font-bold text-slate-900 dark:text-white">Finvue</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800
                     dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Backdrop */}
      <div
        className={clsx(
          'fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm dark:bg-navy-950/80 transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setOpen(false)}
      />

      {/* Drawer — slides in from the LEFT */}
      <nav
        className={clsx(
          'fixed left-0 top-0 z-50 flex h-full w-72 flex-col',
          'border-r border-slate-200 bg-white dark:border-white/5 dark:bg-navy-900',
          'transition-transform duration-300 ease-in-out',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Drawer header */}
        <div className="flex h-14 items-center justify-between border-b border-slate-100 px-5 dark:border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600">
              <TrendingUp size={15} className="text-white dark:text-navy-950" strokeWidth={2.5} />
            </div>
            <span className="font-display text-base font-bold text-slate-900 dark:text-white">Finvue</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700
                       dark:hover:bg-white/5 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex flex-1 flex-col overflow-y-auto p-4">
          {/* Role Switcher */}
          <div className="mb-5 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-white/5 dark:bg-navy-950/50">
            <p className="label-text mb-2">Active Role</p>
            <div className="flex gap-1.5">
              <button
                onClick={() => setRole(ROLES.VIEWER)}
                className={clsx(
                  'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition',
                  role === ROLES.VIEWER
                    ? 'bg-slate-200 text-slate-700 dark:bg-slate-700/80 dark:text-slate-200'
                    : 'text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
                )}
              >
                <Eye size={11} /> Viewer
              </button>
              <button
                onClick={() => setRole(ROLES.ADMIN)}
                className={clsx(
                  'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium transition',
                  role === ROLES.ADMIN
                    ? 'bg-gold-100 text-gold-700 ring-1 ring-gold-300 dark:bg-gold-500/20 dark:text-gold-400 dark:ring-gold-500/30'
                    : 'text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-slate-300'
                )}
              >
                <Shield size={11} /> Admin
              </button>
            </div>
          </div>

          {/* Nav links */}
          <p className="label-text mb-3 px-2">Navigation</p>
          <div className="space-y-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={clsx(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                    active
                      ? 'bg-gold-50 text-gold-700 dark:bg-gold-500/15 dark:text-gold-400'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white'
                  )}
                >
                  <Icon size={17} strokeWidth={active ? 2.5 : 2} />
                  {label}
                  {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold-500 dark:bg-gold-400" />}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom controls */}
        <div className="space-y-1 border-t border-slate-100 p-4 dark:border-white/5">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="btn-ghost w-full justify-start text-xs"
          >
            {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          {isAdmin && (
            <button
              onClick={() => { resetData(); setOpen(false); }}
              className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium
                         text-slate-400 transition hover:text-slate-600
                         dark:text-slate-500 dark:hover:text-slate-300"
            >
              <RotateCcw size={13} /> Reset to Sample Data
            </button>
          )}
          <p className="px-2 pt-1 text-[10px] font-mono text-slate-400 dark:text-slate-700">
            {isAdmin ? '⚡ Admin: Full access enabled' : '👁 Viewer: Read-only mode'}
          </p>
        </div>
      </nav>
    </div>
  );
}
