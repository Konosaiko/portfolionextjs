'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  UserCircleIcon, 
  BriefcaseIcon, 
  CodeBracketIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ClockIcon,
  TrophyIcon,
  StarIcon,
  UserGroupIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { useAvailability } from '@/contexts/AvailabilityContext';

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

const HomePage = () => {
  const { t, i18n } = useTranslation();
  const { availability } = useAvailability();
  const [latestProject, setLatestProject] = useState<Project | null>(null);
  const currentLanguage = i18n.language;

  useEffect(() => {
    fetchLatestProject();
  }, []);

  const fetchLatestProject = async () => {
    try {
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error(t('projects.error'));
      }
      const data = await response.json();
      const projects = data.member || [];
      if (projects.length > 0) {
        setLatestProject(projects[0]);
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'partially':
        return 'bg-yellow-500';
      case 'unavailable':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    return t(`availability.${status}`);
  };

  const stats = [
    {
      title: t('home.stats.experience'),
      value: "4+",
      icon: <ClockIcon className="w-6 h-6" />,
      color: "blue"
    },
    {
      title: t('home.stats.projects'),
      value: "10+",
      icon: <TrophyIcon className="w-6 h-6" />,
      color: "green"
    },
    {
      title: t('home.stats.clients'),
      value: "2",
      icon: <UserGroupIcon className="w-6 h-6" />,
      color: "purple"
    },
    {
      title: t('home.stats.commits'),
      value: "1000+",
      icon: <CodeBracketIcon className="w-6 h-6" />,
      color: "yellow"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-12"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t('home.title')}
          </h1>
          <p className="text-gray-400 text-lg">
            {t('home.subtitle')}
          </p>
        </motion.div>

        {/* Main Grid Layout - 2x2 */}
        <div className="grid grid-cols-2 gap-6">
          {/* Social Proof Section */}
          <div className="grid grid-cols-2 gap-4 h-full">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
              >
                <div className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-${stat.color}-500/50 flex flex-col items-center justify-center text-center h-full`}>
                  <div className={`text-${stat.color}-500 mb-3`}>
                    <div className="w-8 h-8 flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-300">
                    {stat.title}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* About Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-500">
                  <UserCircleIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {t('home.about.title')}
                </h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed flex-grow">
                {t('home.about.description')}
              </p>
              <Link 
                href="/about"
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mt-4"
              >
                {t('home.about.cta')}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Projects Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="p-6 border-b border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500">
                    <CodeBracketIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {t('home.projects.title')}
                  </h3>
                </div>
                <Link 
                  href="/projects"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {t('home.projects.cta')}
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-gray-400">
                {t('home.projects.description')}
              </p>
            </div>

            {latestProject && (
              <div
                className="relative aspect-video w-full overflow-hidden"
              >
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400">Image du projet</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {latestProject.title[currentLanguage as keyof typeof latestProject.title] || latestProject.title.en}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {latestProject.technologies.map((tech, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 text-sm bg-gray-700/80 text-gray-200 rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Contact Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700/50 hover:border-green-500/50 transition-all duration-300"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
                    <EnvelopeIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {t('home.contact.title')}
                  </h3>
                </div>
                {availability && (
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-3 h-3 rounded-full ${getStatusColor(availability.status)}`}
                      title={getStatusText(availability.status)}
                    />
                    <span className="text-sm text-gray-400">
                      {t(`availability.${availability.status}`)}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-4 flex-grow">
                <p className="text-gray-300 text-lg leading-relaxed">
                  {t('home.contact.description')}
                </p>
                <p className="text-gray-400">
                  {t('home.contact.subtitle')}
                </p>
              </div>
              <Link 
                href="/contact"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mt-4"
              >
                {t('home.contact.cta')}
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
