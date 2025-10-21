'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { XMarkIcon, LinkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  id: number;
  title: {
    fr: string;
    en: string;
  };
  description: {
    fr: string;
    en: string;
  };
  image: string;
  technologies: string[];
  categories: string[];
  link?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language as 'fr' | 'en';

  // Fermer la modale avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Empêcher le scroll du body
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700 relative"
            onClick={(e) => e.stopPropagation()}
          >
              {/* Header avec bouton fermer */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {project.title[currentLanguage] || project.title.en}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-400 hover:text-white"
                  aria-label="Fermer"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Contenu scrollable */}
              <div className="overflow-y-auto max-h-[calc(90vh-100px)] sm:max-h-[calc(90vh-120px)]">
                {/* Image */}
                {project.image && (
                  <div className="relative w-full aspect-video bg-gray-900 flex items-center justify-center">
                    <Image
                      src={project.image}
                      alt={project.title[currentLanguage] || project.title.en}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                )}

                {/* Contenu */}
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 pb-8">
                  {/* Catégories */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      {t('projects.categories.title') || 'Catégories'}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.categories.map((category, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30"
                        >
                          {t(`projects.categories.${category}`)}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Description
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                      {project.description[currentLanguage] || project.description.en}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-gray-700/50 text-gray-200 text-sm rounded-lg border border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Lien du projet */}
                  {project.link && (
                    <div className="pt-4 border-t border-gray-700">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl"
                      >
                        <LinkIcon className="w-5 h-5" />
                        <span>{t('projects.viewProject') || 'Voir le projet'}</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;

