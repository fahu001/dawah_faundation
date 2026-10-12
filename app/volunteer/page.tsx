'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HelpButton from '@/components/layout/HelpButton';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import FormField from '@/components/ui/FormField';
import { CheckCircle2, UserPlus, Info } from 'lucide-react';

export default function VolunteerPage() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = `${t('volunteer.title')} | ${t(lang === 'bn' ? 'site.name.bn' : 'site.name.en')}`;
  }, [lang, t]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('education');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const interestOptions = [
    { value: 'education', label: t('nav.programs.education') },
    { value: 'health', label: t('nav.programs.health') },
    { value: 'relief', label: t('nav.programs.relief') },
    { value: 'dawah', label: t('nav.programs.dawah') },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = t('validation.required');
    }

    if (!phone.trim()) {
      newErrors.phone = t('validation.required');
    } else if (!/^01[3-9]\d{8}$/.test(phone.trim())) {
      newErrors.phone = t('validation.phone');
    }

    if (!email.trim()) {
      newErrors.email = t('validation.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = t('validation.email');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setInterest('education');
    setMessage('');
    setErrors({});
    setSubmitted(false);
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-background py-12 sm:py-16">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <UserPlus className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {t('volunteer.title')}
              </h1>
              <p className="mt-2 text-foreground/75">
                {t('volunteer.subtitle')}
              </p>
            </div>

            {submitted ? (
              <Card className="p-8 sm:p-12 text-center bg-surface border-border">
                <div className="flex justify-center mb-5">
                  <CheckCircle2 className="w-16 h-16 text-green-600 animate-bounce" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  {t('donate.successTitle')}
                </h2>
                <div className="my-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm font-medium">
                  {t('volunteer.success')}
                </div>
                <Button onClick={resetForm} variant="primary" className="mt-4">
                  {t('btn.submit')}
                </Button>
              </Card>
            ) : (
              <Card className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Name */}
                  <FormField
                    label={t('volunteer.name')}
                    name="name"
                    type="text"
                    required
                    placeholder={t('volunteer.name')}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.name;
                          return next;
                        });
                      }
                    }}
                    error={errors.name}
                  />

                  {/* Phone */}
                  <FormField
                    label={t('volunteer.phone')}
                    name="phone"
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.phone;
                          return next;
                        });
                      }
                    }}
                    error={errors.phone}
                  />

                  {/* Email */}
                  <FormField
                    label={t('volunteer.email')}
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) {
                        setErrors((prev) => {
                          const next = { ...prev };
                          delete next.email;
                          return next;
                        });
                      }
                    }}
                    error={errors.email}
                  />

                  {/* Area of Interest */}
                  <FormField
                    label={t('volunteer.interest')}
                    name="interest"
                    type="select"
                    required
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    options={interestOptions}
                  />

                  {/* Message */}
                  <FormField
                    label={t('volunteer.message')}
                    name="message"
                    type="textarea"
                    rows={4}
                    placeholder={t('volunteer.message')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />

                  {/* Demo Notice */}
                  <div className="flex items-start gap-2 p-3 bg-surface-muted rounded-lg border border-border text-xs text-foreground/75">
                    <Info className="w-4 h-4 shrink-0 text-accent mt-0.5" />
                    <span>{t('site.demo')}</span>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full text-base py-3"
                  >
                    {t('btn.submit')}
                  </Button>
                </form>
              </Card>
            )}
          </div>
        </Container>
      </main>
      <Footer />
      <HelpButton />
    </>
  );
}
