import React from 'react';
import { PublicLayout, SEO, Input, Textarea, Button } from '../components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '../hooks/useToast';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Contact form submitted:', data);
    toast('success', 'Message sent successfully! We will get back to you soon.');
    reset();
  };

  return (
    <PublicLayout>
      <SEO
        title="Contact Us"
        description="Get in touch with the Commute Connect support team. We are here to help with any questions, feedback, or issues."
      />
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-h1 font-bold text-neutral-textMain dark:text-slate-100 mb-2">Contact Us</h1>
          <p className="text-neutral-textSub dark:text-slate-400">
            Have questions, reports, or feedback? Fill out the form below and our support team will respond within 24 hours.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Jane Doe"
            error={errors.name?.message}
            disabled={isSubmitting}
            {...register('name')}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="jane@example.com"
            error={errors.email?.message}
            disabled={isSubmitting}
            {...register('email')}
          />
          <Textarea
            label="Message"
            placeholder="Tell us how we can help..."
            rows={5}
            error={errors.message?.message}
            disabled={isSubmitting}
            {...register('message')}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full font-semibold"
            loading={isSubmitting}
          >
            Send Message
          </Button>
        </form>
      </div>
    </PublicLayout>
  );
};

export default Contact;
