import React from 'react';
import { Link, NavLink } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link to="/site" className="font-semibold tracking-tight text-lg">
            Creator Site
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <NavLink to="/site" className={({ isActive }) => isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}>
              Home
            </NavLink>
            <NavLink to="/site/about" className={({ isActive }) => isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}>
              About
            </NavLink>
            <NavLink to="/site/services" className={({ isActive }) => isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}>
              Services
            </NavLink>
            <NavLink to="/site/work" className={({ isActive }) => isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}>
              Work
            </NavLink>
            <NavLink to="/site/links" className={({ isActive }) => isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}>
              Links
            </NavLink>
            <NavLink to="/site/contact" className={({ isActive }) => isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}>
              Contact
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4 py-12 grow">
        {children}
      </main>

      <footer className="mt-auto border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Your Brand</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-900">Instagram</a>
            <a href="#" className="hover:text-slate-900">Twitter</a>
            <a href="#" className="hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
