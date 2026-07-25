import React from 'react';
import { PublicLayout, SEO } from '../components';

export const Terms: React.FC = () => {
  return (
    <PublicLayout>
      <SEO
        title="Terms of Service"
        description="Read the Commute Connect terms of service to understand user guidelines, bookings rules, and vehicle responsibilities."
      />
      <article className="prose dark:prose-invert max-w-none space-y-6">
        <h1 className="text-h1 font-bold text-neutral-textMain dark:text-slate-100 mb-2">Terms of Service</h1>
        <p className="text-small text-neutral-textSub dark:text-slate-400">Last updated: July 25, 2026</p>
        
        <p className="text-neutral-textSub dark:text-slate-300 leading-relaxed pt-2">
          By signing up, logging in, or using the Commute Connect platform, you agree to comply with and be bound by the following terms of service. Please review them carefully.
        </p>

        <h2 className="text-h2 font-bold text-neutral-textMain dark:text-slate-200 mt-6">1. Safety & Eligibility</h2>
        <p className="text-neutral-textSub dark:text-slate-350 leading-relaxed">
          You must be an active student or employee affiliated with a verified organization (college or company) to participate in Commute Connect rides. You are responsible for ensuring that your account registration matches your true identity.
        </p>

        <h2 className="text-h2 font-bold text-neutral-textMain dark:text-slate-200 mt-6">2. Driver Responsibilities</h2>
        <p className="text-neutral-textSub dark:text-slate-350 leading-relaxed">
          Drivers must maintain a valid driver's license, active vehicle registration, and matching liability insurance coverage as mandated by local state legislation. Shared fuel costs must never exceed reasonable transport expense ratios.
        </p>

        <h2 className="text-h2 font-bold text-neutral-textMain dark:text-slate-200 mt-6">3. Code of Conduct</h2>
        <p className="text-neutral-textSub dark:text-slate-350 leading-relaxed">
          All participants must treat community partners with respect. Safe driving habits, punctuality, and open communication regarding route cancellations or delays are required for maintaining your account access.
        </p>
      </article>
    </PublicLayout>
  );
};

export default Terms;
