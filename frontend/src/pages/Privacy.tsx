import React from 'react';
import { PublicLayout, SEO } from '../components';

export const Privacy: React.FC = () => {
  return (
    <PublicLayout>
      <SEO
        title="Privacy Policy"
        description="Read the Commute Connect privacy policy to learn how we protect and manage your personal details and location data."
      />
      <article className="prose dark:prose-invert max-w-none space-y-6">
        <h1 className="text-h1 font-bold text-neutral-textMain dark:text-slate-100 mb-2">Privacy Policy</h1>
        <p className="text-small text-neutral-textSub dark:text-slate-400">Last updated: July 25, 2026</p>
        
        <p className="text-neutral-textSub dark:text-slate-300 leading-relaxed pt-2">
          At Commute Connect, we value your privacy. This privacy policy explains what personal details we collect when you use our web platform and mobile services, how we store and process them, and your privacy choices.
        </p>

        <h2 className="text-h2 font-bold text-neutral-textMain dark:text-slate-200 mt-6">1. Information We Collect</h2>
        <p className="text-neutral-textSub dark:text-slate-350 leading-relaxed">
          We collect account credentials (name, email address, password) and profile data (college/company associations, profile photographs, bio details, vehicle specifications, and commute ride matching route parameters) to offer coordinated carpooling.
        </p>

        <h2 className="text-h2 font-bold text-neutral-textMain dark:text-slate-200 mt-6">2. Location Data Usage</h2>
        <p className="text-neutral-textSub dark:text-slate-350 leading-relaxed">
          Commute Connect requires geolocation coordinate details to match drivers and passengers heading along similar route directions. Precise route tracking details are shared with other members of your matched carpool only during active trip sessions.
        </p>

        <h2 className="text-h2 font-bold text-neutral-textMain dark:text-slate-200 mt-6">3. Data Retention and Deletion</h2>
        <p className="text-neutral-textSub dark:text-slate-350 leading-relaxed">
          We retain user profile data for as long as your account remains active. You can request complete deletion of your profile data, registration metrics, and booking histories at any time through your account settings panel.
        </p>
      </article>
    </PublicLayout>
  );
};

export default Privacy;
