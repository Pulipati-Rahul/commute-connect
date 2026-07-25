import React from 'react';
import { PublicLayout, SEO } from '../components';

export const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "Who can join Commute Connect?",
      a: "Commute Connect is open to students, faculty, and corporate employees affiliated with verified institutions. You must sign up using your official university or company email address to gain access."
    },
    {
      q: "How are fuel costs shared?",
      a: "Commute Connect calculates suggested fuel-sharing amounts based on route distance and local average fuel prices. Payments are settled directly between matched riders using their preferred payment methods."
    },
    {
      q: "Is it safe to carpool with users I don't know?",
      a: "Yes. All members are verified using corporate or college credentials. You can view user reviews, ratings, vehicle details, and organizational associations before booking a seat."
    },
    {
      q: "What happens if a ride is cancelled?",
      a: "If a ride is cancelled by a driver or a booking is cancelled by a passenger, automated in-app notifications are sent immediately to all matched members to help coordinate alternative travel plans."
    }
  ];

  return (
    <PublicLayout>
      <SEO
        title="Frequently Asked Questions (FAQ)"
        description="Find answers to common questions about Commute Connect carpooling, user verification, safety, and fuel cost sharing."
      />
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-h1 font-bold text-neutral-textMain dark:text-slate-100 mb-2">Frequently Asked Questions</h1>
          <p className="text-neutral-textSub dark:text-slate-400">
            Got questions? We've got answers. If you can't find what you're looking for, feel free to contact us.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="p-6 rounded-radius-lg border border-neutral-borderLine dark:border-slate-800 bg-white dark:bg-slate-900 shadow-shadow-small space-y-2">
              <h3 className="font-semibold text-neutral-textMain dark:text-slate-200 text-base">
                {faq.q}
              </h3>
              <p className="text-small text-neutral-textSub dark:text-slate-400 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
};

export default FAQ;
