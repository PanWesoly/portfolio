import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import { CONFIG } from '../config';
import { socialsData } from '../data/socials';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

function SocialIcon({ name, className = "w-4 h-4" }) {
  if (name.toLowerCase().includes('github')) {
    return <FaGithub className={`${className} text-slate-200`} />;
  }
  if (name.toLowerCase().includes('linkedin')) {
    return <FaLinkedin className={`${className} text-sky-400`} />;
  }
  return <Mail className={`${className} text-sky-400`} />;
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Wpisz swoje imię.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Imię musi zawierać co najmniej 2 znaki.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Wpisz swój adres e-mail.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Wpisz poprawny adres e-mail.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Wpisz treść wiadomości.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Wiadomość musi mieć co najmniej 10 znaków.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on active typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Symulacja wysyłki
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }, 600);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#090a0f] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeader
          badge="Kontakt"
          title="Skontaktuj się ze mną"
          subtitle="Masz pytanie, propozycję projektu lub chcesz nawiązać współpracę? Wyślij wiadomość."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Contact Details & Social Links */}
          <div className="lg:col-span-5 space-y-6 card-base p-6 sm:p-7 rounded-2xl">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">Dane Kontaktowe</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Odpowiadam na wiadomości zazwyczaj w ciągu 24 godzin.
              </p>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400">E-mail</p>
                  <a
                    href={`mailto:${CONFIG.DEVELOPER.email}`}
                    className="text-xs sm:text-sm font-semibold text-slate-200 hover:text-sky-300 transition-colors"
                  >
                    {CONFIG.DEVELOPER.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-slate-400">Lokalizacja</p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">
                    {CONFIG.DEVELOPER.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links Cards */}
            <div className="pt-5 border-t border-slate-800">
              <p className="text-xs font-semibold text-slate-400 mb-3">
                Profile Online
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {socialsData.map(social => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel}
                    className="p-2.5 rounded-lg bg-slate-900/80 border border-white/[0.06] hover:border-slate-700 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center flex-shrink-0">
                        <SocialIcon name={social.name} className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
                          {social.name}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate max-w-[100px]">
                          {social.handle}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 card-base p-6 sm:p-7 rounded-2xl">
            <h3 className="text-base sm:text-lg font-bold text-white mb-1">Napisz wiadomość</h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-5">
              Wypełnij krótki formularz, a skontaktuję się z Tobą.
            </p>

            {submitted && (
              <div className="mb-5 p-3.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold">Dziękuję za wiadomość!</p>
                  <p className="text-emerald-300/90 text-xs mt-0.5">
                    Wiadomość została przesłana. Odpowiem najszybciej jak to możliwe.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              
              {/* Name Field */}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium text-slate-300 mb-1">
                  Imię i nazwisko <span className="text-rose-400">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jan Kowalski"
                  className={`w-full px-3.5 py-2 rounded-lg border text-sm text-white placeholder-slate-500 transition-colors ${
                    errors.name
                      ? 'border-rose-500/80 bg-rose-950/20 focus:border-rose-400'
                      : 'border-slate-700 bg-slate-900 focus:bg-slate-900 focus:border-sky-500'
                  }`}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium text-slate-300 mb-1">
                  Adres e-mail <span className="text-rose-400">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jan@example.com"
                  className={`w-full px-3.5 py-2 rounded-lg border text-sm text-white placeholder-slate-500 transition-colors ${
                    errors.email
                      ? 'border-rose-500/80 bg-rose-950/20 focus:border-rose-400'
                      : 'border-slate-700 bg-slate-900 focus:bg-slate-900 focus:border-sky-500'
                  }`}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-slate-300 mb-1">
                  Wiadomość <span className="text-rose-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Opis projektu lub zakres zapytania..."
                  className={`w-full px-3.5 py-2 rounded-lg border text-sm text-white placeholder-slate-500 transition-colors resize-y ${
                    errors.message
                      ? 'border-rose-500/80 bg-rose-950/20 focus:border-rose-400'
                      : 'border-slate-700 bg-slate-900 focus:bg-slate-900 focus:border-sky-500'
                  }`}
                  aria-invalid={errors.message ? "true" : "false"}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-70 transition-colors focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                {isSubmitting ? (
                  <span>Wysyłanie...</span>
                ) : (
                  <>
                    <span>Wyślij Wiadomość</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
