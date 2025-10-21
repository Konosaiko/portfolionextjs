'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  AcademicCapIcon,
  PuzzlePieceIcon,
  FilmIcon,
  TrophyIcon,
  HeartIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface Technology {
  name: string;
  logo: string;
}

interface Experience {
  period: string;
  title: string;
  company: string;
  description: string;
  technologies: Technology[];
}

interface Education {
  year: string;
  degree: string;
  school: string;
  description: string;
}

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

const interests = [
  {
    id: 'gaming',
    icon: TrophyIcon,
    color: "bg-purple-500"
  },
  {
    id: 'tech',
    icon: SparklesIcon,
    color: "bg-blue-500"
  },
  {
    id: 'learning',
    icon: AcademicCapIcon,
    color: "bg-green-500"
  },
  {
    id: 'gamedev',
    icon: PuzzlePieceIcon,
    color: "bg-red-500"
  },
  {
    id: 'sports',
    icon: HeartIcon,
    color: "bg-yellow-500"
  },
  {
    id: 'cinema',
    icon: FilmIcon,
    color: "bg-indigo-500"
  }
];

const AboutPage = () => {
  const { t } = useTranslation();

  const experiencesData = t('about.experiences.items', { returnObjects: true });
  const educationData = t('about.education.items', { returnObjects: true });
  
  const experiences = Array.isArray(experiencesData) ? experiencesData as Experience[] : [];
  const education = Array.isArray(educationData) ? educationData as Education[] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 sm:p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* En-tête avec un dégradé plus vibrant */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12 md:mb-16 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            {t('about.title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Description avec un fond subtilement coloré */}
        <motion.div 
          variants={itemVariants}
          className="mb-8 sm:mb-12 md:mb-16 bg-gradient-to-br from-gray-800/50 via-purple-900/10 to-gray-800/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-gray-700/50 hover:border-purple-500/30 transition-colors"
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {t('about.description.content')}
            </p>
          </div>
        </motion.div>

        {/* Expériences avec des accents de couleur */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {t('about.experiences.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 text-center mb-6 sm:mb-8">
            {t('about.experiences.subtitle')}
          </p>
          <div className="space-y-4 sm:space-y-6">
            {experiences.map((exp: Experience, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-gray-800/50 via-blue-900/10 to-gray-800/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">{exp.title}</h3>
                  <span className="text-blue-400 text-sm sm:text-base">{exp.period}</span>
                </div>
                <p className="text-purple-400 mb-2 text-sm sm:text-base">{exp.company}</p>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">{exp.description}</p>
                
                {/* Technologies utilisées */}
                <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-700/50">
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {exp.technologies.map((tech: Technology, techIndex: number) => (
                      <div
                        key={techIndex}
                        className="flex items-center bg-gray-800/50 rounded-full px-2 sm:px-3 py-1"
                      >
                        <Image
                          src={tech.logo}
                          alt={tech.name}
                          width={16}
                          height={16}
                          className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 invert"
                        />
                        <span className="text-xs sm:text-sm text-gray-300">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Éducation avec un style similaire */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            {t('about.education.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 text-center mb-6 sm:mb-8">
            {t('about.education.subtitle')}
          </p>
          <div className="space-y-4 sm:space-y-6">
            {education.map((edu: Education, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-gray-800/50 via-green-900/10 to-gray-800/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">{edu.degree}</h3>
                  <span className="text-green-400 text-sm sm:text-base">{edu.year}</span>
                </div>
                <p className="text-blue-400 mb-2 text-sm sm:text-base">{edu.school}</p>
                <p className="text-gray-300 text-sm sm:text-base">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Centres d'intérêt avec des icônes colorées */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {t('about.interests.title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 text-center mb-6 sm:mb-8">
            {t('about.interests.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {interests.map((interest) => {
              const Icon = interest.icon;
              return (
                <motion.div
                  key={interest.id}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${interest.color} rounded-lg p-2 mb-3 sm:mb-4`}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2">
                    {t(`about.interests.items.${interest.id}.title`)}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    {t(`about.interests.items.${interest.id}.description`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutPage;
