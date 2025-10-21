'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  UserCircleIcon, 
  CodeBracketIcon,
  EnvelopeIcon,
  ClockIcon,
  TrophyIcon,
  UserGroupIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { Variants } from 'framer-motion';
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

  useEffect(() => {
    fetchLatestProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
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
        stiffness: 100,
        damping: 20
      }
    }
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
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 md:p-8"
    >
      <motion.div 
        className="max-w-7xl mx-auto"
        variants={containerVariants}
      >
        <motion.div 
          className="mb-8 md:mb-12"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-4"
            variants={itemVariants}
          >
            {t('home.title')}
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-base sm:text-lg"
            variants={itemVariants}
          >
            {t('home.subtitle')}
          </motion.p>
        </motion.div>

        {/* Main Grid Layout - Responsive */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
          variants={containerVariants}
        >
          {/* Social Proof Section */}
          <motion.div 
            className="grid grid-cols-2 gap-3 sm:gap-4 h-full"
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className={`bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-700/50 hover:border-${stat.color}-500/50 flex flex-col items-center justify-center text-center h-full`}>
                  <div className={`text-${stat.color}-500 mb-2 sm:mb-3`}>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300">
                    {stat.title}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* About Box */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="p-4 sm:p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 rounded-lg bg-purple-500/10 text-purple-500">
                  <UserCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {t('home.about.title')}
                </h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed flex-grow">
                {t('home.about.description')}
              </p>
              <Link 
                href="/about"
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mt-3 sm:mt-4 text-sm sm:text-base"
              >
                {t('home.about.cta')}
                <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Projects Box */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
              <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-lg bg-blue-500/10 text-blue-500">
                    <CodeBracketIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {t('home.projects.title')}
                  </h3>
                </div>
                <Link 
                  href="/projects"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm sm:text-base"
                >
                  {t('home.projects.cta')}
                  <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                </Link>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                {t('home.projects.description')}
              </p>
            </div>

            {latestProject && (
              <motion.div 
                variants={itemVariants}
                className="relative aspect-video w-full overflow-hidden"
              >
                <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 text-sm sm:text-base">Image du projet</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
                    {latestProject.title[currentLanguage as keyof typeof latestProject.title] || latestProject.title.en}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {latestProject.technologies.map((tech, index) => (
                      <motion.span 
                        key={index}
                        variants={itemVariants}
                        className="px-2 py-0.5 sm:py-1 text-xs sm:text-sm bg-gray-700/80 text-gray-200 rounded-md"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Contact Box */}
          <motion.div 
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700/50 hover:border-green-500/50 transition-all duration-300"
          >
            <div className="p-4 sm:p-6 h-full flex flex-col">
              <div className="flex items-center justify-between mb-3 sm:mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 rounded-lg bg-green-500/10 text-green-500">
                    <EnvelopeIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {t('home.contact.title')}
                  </h3>
                </div>
                {availability && (
                  <div className="flex items-center gap-2">
                    <div 
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getStatusColor(availability.status)}`}
                      title={getStatusText(availability.status)}
                    />
                    <span className="text-xs sm:text-sm text-gray-400">
                      {t(`availability.${availability.status}`)}
                    </span>
                  </div>
                )}
              </div>
              <div className="space-y-3 sm:space-y-4 flex-grow">
                <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                  {t('home.contact.description')}
                </p>
                <p className="text-gray-400 text-sm sm:text-base">
                  {t('home.contact.subtitle')}
                </p>
              </div>
              <Link 
                href="/contact"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mt-3 sm:mt-4 text-sm sm:text-base"
              >
                {t('home.contact.cta')}
                <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
