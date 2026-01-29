import { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { Section, Card, CardBody, Button, Input, Textarea } from '../components/ui';
import { PERSONAL_INFO } from '../constants';
import type { ContactForm } from '../types';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

const socialIcons: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export function Contact() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            to_email: PERSONAL_INFO.email,
          },
          EMAILJS_PUBLIC_KEY
        );
      } else {
        // Fallback: ouvrir le client email
        const mailtoLink = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`De: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
        window.open(mailtoLink, '_blank');
      }
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Section
      title={t('contact.title')}
      subtitle={t('contact.subtitle')}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card variant="bordered">
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Input
                    label={t('contact.form.name')}
                    placeholder={t('contact.form.namePlaceholder')}
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                  />
                  <Input
                    label={t('contact.form.email')}
                    type="email"
                    placeholder={t('contact.form.emailPlaceholder')}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                  />
                </div>
                
                <Input
                  label={t('contact.form.subject')}
                  placeholder={t('contact.form.subjectPlaceholder')}
                  value={formData.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  required
                />
                
                <Textarea
                  label={t('contact.form.message')}
                  placeholder={t('contact.form.messagePlaceholder')}
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  rows={6}
                  required
                />
                
                <div className="flex items-center justify-between">
                  <div>
                    {submitStatus === 'success' && (
                      <p className="text-sm text-primary-600 dark:text-primary-400">
                        {t('contact.success')}
                      </p>
                    )}
                    {submitStatus === 'error' && (
                      <p className="text-sm text-accent-600 dark:text-accent-400">
                        {t('contact.error')}
                      </p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                  >
                    {t('common.send')}
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-6">
          <Card variant="bordered">
            <CardBody>
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                {t('contact.info.title')}
              </h3>
              
              <div className="space-y-4">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-3 text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">{t('about.contact.email')}</p>
                    <p className="font-medium">{PERSONAL_INFO.email}</p>
                  </div>
                </a>
                
                {PERSONAL_INFO.phone && (
                  <a
                    href={`tel:${PERSONAL_INFO.phone}`}
                    className="flex items-center gap-3 text-surface-600 dark:text-surface-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-secondary-600 dark:text-secondary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">{t('about.contact.phone')}</p>
                      <p className="font-medium">{PERSONAL_INFO.phone}</p>
                    </div>
                  </a>
                )}
                
                {PERSONAL_INFO.phone && (
                  <a
                    href={`https://wa.me/${PERSONAL_INFO.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-surface-600 dark:text-surface-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-surface-500 dark:text-surface-400">WhatsApp</p>
                      <p className="font-medium">{t('contact.whatsapp')}</p>
                    </div>
                  </a>
                )}
                
                <div className="flex items-center gap-3 text-surface-600 dark:text-surface-400">
                  <div className="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-900 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                  </div>
                  <div>
                    <p className="text-sm text-surface-500 dark:text-surface-400">{t('about.contact.location')}</p>
                    <p className="font-medium">{PERSONAL_INFO.location}</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card variant="bordered">
            <CardBody>
              <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                {t('contact.social.title')}
              </h3>
              
              <div className="flex gap-3">
                {PERSONAL_INFO.socialLinks.map((link) => {
                  const Icon = socialIcons[link.icon] || Github;
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-surface-100 dark:bg-surface-800 flex items-center justify-center text-surface-600 dark:text-surface-400 hover:bg-primary-100 hover:text-primary-600 dark:hover:bg-primary-900 dark:hover:text-primary-400 transition-colors"
                      aria-label={link.platform}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </Section>
  );
}
