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
import { CheckCircle2, HeartHandshake, AlertCircle } from 'lucide-react';

export default function DonatePage() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    document.title = `${t('donate.title')} | ${t(lang === 'bn' ? 'site.name.bn' : 'site.name.en')}`;
  }, [lang, t]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState<'general' | 'monthly' | 'zakat' | 'sadaqah'>('general');
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [method, setMethod] = useState<'bkash' | 'nagad' | 'bank'>('bkash');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const presetAmounts = [500, 1000, 2000, 5000];

  const handlePresetSelect = (value: number) => {
    setAmount(value);
    setCustomAmount('');
    if (errors.amount) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.amount;
        return next;
      });
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
      if (errors.amount) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next.amount;
          return next;
        });
      }
    } else {
      setAmount(0);
    }
  };

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

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = t('validation.email');
    }

    const currentAmount = customAmount ? parseFloat(customAmount) : amount;
    if (isNaN(currentAmount) || currentAmount <= 0) {
      newErrors.amount = t('validation.amount');
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
    setType('general');
    setAmount(1000);
    setCustomAmount('');
    setMethod('bkash');
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
                <HeartHandshake className="w-8 h-8" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {t('donate.title')}
              </h1>
              <p className="mt-2 text-foreground/75">
                {t('donate.subtitle')}
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
                  {t('donate.success')}
                </div>
                <p className="text-foreground/80 leading-relaxed mb-8 max-w-lg mx-auto">
                  {t('donate.successDesc')}
                </p>
                <Button onClick={resetForm} variant="primary">
                  {t('btn.donateNow')}
                </Button>
              </Card>
            ) : (
              <Card className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Donation Type */}
                  <FormField
                    label={t('donate.type')}
                    name="donationType"
                    type="select"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    options={[
                      { value: 'general', label: t('donate.type.general') },
                      { value: 'monthly', label: t('donate.type.monthly') },
                      { value: 'zakat', label: t('donate.type.zakat') },
                      { value: 'sadaqah', label: t('donate.type.sadaqah') },
                    ]}
                  />

                  {/* Amount Selection */}
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">
                      {t('donate.amount')}
                      <span className="text-red-500 ml-1" aria-hidden="true">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                      {presetAmounts.map((preset) => {
                        const isSelected = !customAmount && amount === preset;
                        return (
                          <button
                            type="button"
                            key={preset}
                            onClick={() => handlePresetSelect(preset)}
                            className={`py-2.5 px-4 rounded-lg font-semibold text-center border transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-accent text-white border-accent'
                                : 'bg-surface text-foreground border-border hover:bg-surface-muted'
                            }`}
                          >
                            ৳ {preset}
                          </button>
                        );
                      })}
                    </div>
                    <FormField
                      label={t('donate.customAmount')}
                      name="customAmount"
                      type="text"
                      placeholder="e.g. 3000"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      error={errors.amount}
                    />
                  </div>

                  {/* Name */}
                  <FormField
                    label={t('donate.name')}
                    name="name"
                    type="text"
                    required
                    placeholder={t('donate.name')}
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
                    label={t('donate.phone')}
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
                    label={t('donate.email')}
                    name="email"
                    type="email"
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

                  {/* Payment Method */}
                  <FormField
                    label={t('donate.method')}
                    name="method"
                    type="select"
                    required
                    value={method}
                    onChange={(e) => setMethod(e.target.value as any)}
                    options={[
                      { value: 'bkash', label: t('donate.method.bkash') },
                      { value: 'nagad', label: t('donate.method.nagad') },
                      { value: 'bank', label: t('donate.method.bank') },
                    ]}
                  />

                  {/* Demo Notice */}
                  <div className="flex items-start gap-2 p-3 bg-surface-muted rounded-lg border border-border text-xs text-foreground/75">
                    <AlertCircle className="w-4 h-4 shrink-0 text-accent mt-0.5" />
                    <span>{t('site.demo')} — {t('donate.success')}</span>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full text-base py-3"
                  >
                    {t('btn.donateNow')}
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
