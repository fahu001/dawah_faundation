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
import { MapPin, Phone, Mail, CheckCircle2, Send, Info } from 'lucide-react';

export default function ContactPage() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = `${t('contact.title')} | ${t(lang === 'bn' ? 'site.name.bn' : 'site.name.en')}`;
  }, [lang, t]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

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

    if (!subject.trim()) {
      newErrors.subject = t('validation.required');
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
    setSubject('');
    setMessage('');
    setErrors({});
    setSubmitted(false);
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-background py-12 sm:py-16">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              {t('contact.title')}
            </h1>
            <div className="h-1 w-16 bg-accent rounded-full mx-auto my-4" aria-hidden="true" />
            <p className="text-foreground/75 text-base sm:text-lg max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-lg text-foreground">
                        {t('contact.address')}
                      </h2>
                    </div>
                    <p className="text-foreground/80 mt-1">
                      {t('contact.addressValue')}
                    </p>
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-surface-muted text-foreground/60 border border-border">
                      {t('sample.data')}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg text-foreground">
                      {t('contact.phone')}
                    </h2>
                    <p className="text-foreground/80 mt-1">
                      {t('site.phone')}
                    </p>
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-surface-muted text-foreground/60 border border-border">
                      {t('sample.data')}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-lg text-foreground">
                      {t('contact.email')}
                    </h2>
                    <p className="text-foreground/80 mt-1">
                      {t('site.email')}
                    </p>
                    <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded bg-surface-muted text-foreground/60 border border-border">
                      {t('sample.data')}
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7">
              {submitted ? (
                <Card className="p-8 sm:p-12 text-center bg-surface">
                  <div className="flex justify-center mb-5">
                    <CheckCircle2 className="w-16 h-16 text-green-600 animate-bounce" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                    {t('donate.successTitle')}
                  </h2>
                  <div className="my-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-sm font-medium">
                    {t('contact.success')}
                  </div>
                  <Button onClick={resetForm} variant="primary" className="mt-4">
                    <Send className="w-4 h-4 mr-2" />
                    {t('btn.submit')}
                  </Button>
                </Card>
              ) : (
                <Card className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {/* Name */}
                    <FormField
                      label={t('contact.name')}
                      name="name"
                      type="text"
                      required
                      placeholder={t('contact.name')}
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Phone */}
                      <FormField
                        label={t('contact.phone')}
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
                        label={t('contact.email')}
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
                    </div>

                    {/* Subject */}
                    <FormField
                      label={t('contact.subject')}
                      name="subject"
                      type="text"
                      required
                      placeholder={t('contact.subject')}
                      value={subject}
                      onChange={(e) => {
                        setSubject(e.target.value);
                        if (errors.subject) {
                          setErrors((prev) => {
                            const next = { ...prev };
                            delete next.subject;
                            return next;
                          });
                        }
                      }}
                      error={errors.subject}
                    />

                    {/* Message (optional) */}
                    <FormField
                      label={t('contact.message')}
                      name="message"
                      type="textarea"
                      rows={5}
                      placeholder={t('contact.message')}
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
                      <Send className="w-4 h-4 mr-2" />
                      {t('btn.submit')}
                    </Button>
                  </form>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
      <HelpButton />
    </>
  );
}
