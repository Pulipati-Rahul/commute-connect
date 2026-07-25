import React from 'react';
import { PublicLayout, SEO } from '../components';

export const About: React.FC = () => {
  return (
    <PublicLayout>
      <SEO
        title="About Us"
        description="Learn more about Commute Connect, our mission to build safe, reliable, and sustainable carpooling communities."
      />
      <article className="prose dark:prose-invert max-w-none space-y-6">
        <h1 className="text-h1 font-bold text-neutral-textMain dark:text-slate-100 mb-6">About Commute Connect</h1>
        <p className="text-neutral-textSub dark:text-slate-300 text-large leading-relaxed">
          Commute Connect is a premium recurring commute platform designed to help students and professionals find safe, reliable, and affordable rides. By matching drivers and passengers heading along the same routes, we make daily travel more social, cost-effective, and environmentally friendly.
        </p>
        
        <h2 className="text-h2 font-bold text-neutral-textMain dark:text-slate-200 mt-8">Our Mission</h2>
        <p className="text-neutral-textSub dark:text-slate-350 leading-relaxed">
          Our mission is to reduce traffic congestion, lower travel expenses, and foster local community trust. We believe that shared mobility can transform daily commutes from a stressful chore into a seamless, cost-effective, and environmentally sustainable experience.
        </p>
        
        <h2 className="text-h2 font-bold text-neutral-textMain dark:text-slate-200 mt-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-radius-lg border border-neutral-borderLine dark:border-slate-800 bg-white dark:bg-slate-900 shadow-shadow-small">
            <h3 className="font-semibold text-neutral-textMain dark:text-slate-200 mb-2">1. Create a Profile</h3>
            <p className="text-small text-neutral-textSub dark:text-slate-400">Sign up using your college or corporate credentials and verify your email to unlock community access.</p>
          </div>
          <div className="p-5 rounded-radius-lg border border-neutral-borderLine dark:border-slate-800 bg-white dark:bg-slate-900 shadow-shadow-small">
            <h3 className="font-semibold text-neutral-textMain dark:text-slate-200 mb-2">2. Match & Connect</h3>
            <p className="text-small text-neutral-textSub dark:text-slate-400">Search for active pools matching your travel coordinate preferences or offer your vehicle seats.</p>
          </div>
          <div className="p-5 rounded-radius-lg border border-neutral-borderLine dark:border-slate-800 bg-white dark:bg-slate-900 shadow-shadow-small">
            <h3 className="font-semibold text-neutral-textMain dark:text-slate-200 mb-2">3. Ride & Share</h3>
            <p className="text-small text-neutral-textSub dark:text-slate-400">Commute safely with colleagues, review fuel-sharing arrangements, and save on daily transit costs.</p>
          </div>
        </div>
      </article>
    </PublicLayout>
  );
};

export default About;
