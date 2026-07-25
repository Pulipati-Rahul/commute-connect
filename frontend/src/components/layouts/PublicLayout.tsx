import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Compass } from '../icons';
import { Footer } from '../navigation/Footer';

export const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-bg dark:bg-slate-950 transition-colors duration-theme-normal">
      {/* Sticky Public Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/85 backdrop-blur-md border-b border-neutral-borderLine dark:border-slate-800 transition-colors duration-theme-normal">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-brand-primary dark:text-blue-400 font-bold text-lg select-none hover:opacity-90 transition-opacity">
            <Compass className="w-6 h-6" />
            <span>Commute Connect</span>
          </Link>
          <div>
            {user ? (
              <Link
                to="/"
                className="inline-flex items-center justify-center px-4 py-2 text-small font-semibold text-white bg-brand-primary hover:bg-brand-primary/95 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-radius-md shadow-shadow-small transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-4 py-2 text-small font-semibold text-white bg-brand-primary hover:bg-brand-primary/95 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-radius-md shadow-shadow-small transition-all focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
