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

  const experiences = t('about.experiences.items', { returnObjects: true }) as Experience[];
  const education = t('about.education.items', { returnObjects: true }) as Education[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* En-tête avec un dégradé plus vibrant */}
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-400">
            {t('about.subtitle')}
          </p>
        </motion.div>

        {/* Description avec un fond subtilement coloré */}
        <motion.div 
          variants={itemVariants}
          className="mb-16 bg-gradient-to-br from-gray-800/50 via-purple-900/10 to-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-700/50 hover:border-purple-500/30 transition-colors"
        >
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {t('about.description.content')}
            </p>
          </div>
        </motion.div>

        {/* Expériences avec des accents de couleur */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            {t('about.experiences.title')}
          </h2>
          <p className="text-xl text-gray-400 text-center mb-8">
            {t('about.experiences.subtitle')}
          </p>
          <div className="space-y-6">
            {experiences.map((exp: Experience, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-gray-800/50 via-blue-900/10 to-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white">{exp.title}</h3>
                  <span className="text-blue-400">{exp.period}</span>
                </div>
                <p className="text-purple-400 mb-2">{exp.company}</p>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                
                {/* Technologies utilisées */}
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex flex-wrap gap-3">
                    {exp.technologies.map((tech: Technology, techIndex: number) => (
                      <div
                        key={techIndex}
                        className="flex items-center bg-gray-800/50 rounded-full px-3 py-1"
                      >
                        <Image
                          src={tech.logo}
                          alt={tech.name}
                          width={16}
                          height={16}
                          className="w-4 h-4 mr-2 invert"
                        />
                        <span className="text-sm text-gray-300">{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Éducation avec un style similaire */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            {t('about.education.title')}
          </h2>
          <p className="text-xl text-gray-400 text-center mb-8">
            {t('about.education.subtitle')}
          </p>
          <div className="space-y-6">
            {education.map((edu: Education, index: number) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-gray-800/50 via-green-900/10 to-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white">{edu.degree}</h3>
                  <span className="text-green-400">{edu.year}</span>
                </div>
                <p className="text-blue-400 mb-2">{edu.school}</p>
                <p className="text-gray-300">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Centres d'intérêt avec des icônes colorées */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {t('about.interests.title')}
          </h2>
          <p className="text-xl text-gray-400 text-center mb-8">
            {t('about.interests.subtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interests.map((interest) => {
              const Icon = interest.icon;
              return (
                <motion.div
                  key={interest.id}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-gray-800/50 via-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${interest.color} rounded-lg p-2 mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {t(`about.interests.items.${interest.id}.title`)}
                  </h3>
                  <p className="text-gray-300">
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
