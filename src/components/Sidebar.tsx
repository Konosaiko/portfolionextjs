'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import profilePic from '@/assets/profile.jpg';
import { HomeIcon, UserIcon, FolderIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import frFlag from '@/assets/flags/fr.svg';
import gbFlag from '@/assets/flags/gb.svg';
import { useAvailability } from '@/contexts/AvailabilityContext';

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const { availability } = useAvailability();
  const pathname = usePathname();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'from-green-500 to-green-600';
      case 'partially':
        return 'from-yellow-500 to-yellow-600';
      case 'unavailable':
        return 'from-red-500 to-red-600';
      default:
        return 'from-blue-500 to-blue-700';
    }
  };

  const navItems = [
    { href: '/', icon: HomeIcon, label: 'navigation.home' },
    { href: '/about', icon: UserIcon, label: 'navigation.about' },
    { href: '/projects', icon: FolderIcon, label: 'navigation.projects' },
    { href: '/contact', icon: EnvelopeIcon, label: 'navigation.contact' },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 bg-gray-900 text-white p-4 flex flex-col h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className={`w-32 h-32 rounded-full overflow-hidden p-1 bg-gradient-to-r ${availability ? getStatusColor(availability.status) : 'from-blue-500 to-blue-700'}`}>
          <div className="w-full h-full rounded-full overflow-hidden bg-gray-900 p-0.5">
            <Image 
              src={profilePic} 
              alt="Profile" 
              width={128} 
              height={128}
              className="w-full h-full object-cover rounded-full" 
            />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-300">Développeur FullStack et Moddeur</p>
          {availability && (
            <div className="flex items-center justify-center gap-2 mt-2">
              <div 
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${getStatusColor(availability.status)}`}
              />
              <span className="text-sm text-gray-400">
                {t(`availability.${availability.status}`)}
              </span>
            </div>
          )}
        </div>
      </div>

      <nav className="flex flex-col gap-4 mt-6">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span>{t(label)}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <div className="flex items-center gap-2 px-4 mb-4">
          <button
            onClick={() => i18n.changeLanguage('fr')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-medium transition-colors ${
              i18n.language === 'fr' ? 'bg-gray-700' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Image src={frFlag} alt="FR" width={16} height={16} />
            <span>FR</span>
          </button>
          <button
            onClick={() => i18n.changeLanguage('en')}
            className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-medium transition-colors ${
              i18n.language === 'en' ? 'bg-gray-700' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Image src={gbFlag} alt="EN" width={16} height={16} />
            <span>EN</span>
          </button>
        </div>

        <div className="border-t border-gray-700/50 pt-4">
          <a href="https://github.com/votre-username" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/votre-profil" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
