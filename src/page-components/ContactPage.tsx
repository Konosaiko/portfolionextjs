'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import AvailabilityTooltip from '@/components/AvailabilityTooltip';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100
    }
  }
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  attachment: File | null;
}

const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    attachment: null
  });
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Vérification de la taille du fichier (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setStatus({
          type: 'error',
          message: t('contact.errors.fileTooLarge')
        });
        return;
      }
      setFormData(prev => ({ ...prev, attachment: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: '' });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      if (formData.attachment) {
        formDataToSend.append('attachment', formData.attachment);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du message');
      }

      setStatus({
        type: 'success',
        message: t('contact.success')
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        attachment: null
      });
    } catch {
      setStatus({
        type: 'error',
        message: t('contact.errors.submission')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto"
      >
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {t('contact.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">
            {t('contact.subtitle')}
          </p>
          <motion.div variants={itemVariants} className="mt-3 sm:mt-4">
            <AvailabilityTooltip />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-gray-700/50">
          {status.type && (
            <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg ${
              status.type === 'success' ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'
            }`}>
              <p className="text-center text-sm sm:text-base">{status.message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                {t('contact.form.name')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 sm:px-4 text-sm sm:text-base bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                {t('contact.form.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 sm:px-4 text-sm sm:text-base bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                {t('contact.form.subject')}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 sm:px-4 text-sm sm:text-base bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                {t('contact.form.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-3 py-2 sm:px-4 text-sm sm:text-base bg-gray-700/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
              />
            </div>

            <div>
              <label htmlFor="attachment" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
                {t('contact.form.attachment')}
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="attachment"
                  className="flex items-center gap-2 px-3 py-2 sm:px-4 text-sm sm:text-base bg-gray-700/50 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700/70 transition-colors w-full sm:w-auto"
                >
                  <PaperClipIcon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">{formData.attachment ? formData.attachment.name : t('contact.form.chooseFile')}</span>
                </label>
                {formData.attachment && (
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, attachment: null }))}
                    className="text-red-400 hover:text-red-300 text-sm sm:text-base"
                  >
                    {t('contact.form.removeFile')}
                  </button>
                )}
              </div>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-400">
                {t('contact.form.fileSize')}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 sm:py-3 px-4 text-sm sm:text-base bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
