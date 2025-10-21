'use client';

import React from 'react';
import { useAvailability } from '@/contexts/AvailabilityContext';

const AvailabilityTooltip = () => {
  const { availability } = useAvailability();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500/10 border-green-500/20';
      case 'partially':
        return 'bg-yellow-500/10 border-yellow-500/20';
      case 'unavailable':
        return 'bg-red-500/10 border-red-500/20';
      default:
        return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusDotColor = (status: string) => {
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

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'available':
        return "Je suis actuellement disponible et à l'écoute de nouvelles opportunités. N'hésitez pas à me contacter pour discuter de vos projets !";
      case 'partially':
        return "Bien qu'actuellement engagé sur des projets, je reste ouvert aux discussions et nouvelles opportunités. Contactez-moi pour échanger sur vos idées !";
      case 'unavailable':
        return "Je suis actuellement très occupé et ne peux pas prendre de nouveaux projets. N'hésitez pas à me recontacter ultérieurement.";
      default:
        return "N'hésitez pas à me contacter pour discuter de vos projets.";
    }
  };

  if (!availability) return null;

  return (
    <div className={`p-3 sm:p-4 rounded-lg border ${getStatusColor(availability.status)} backdrop-blur-sm`}>
      <div className="flex items-start gap-2 sm:gap-3">
        <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mt-1 sm:mt-1.5 flex-shrink-0 ${getStatusDotColor(availability.status)}`} />
        <div>
          <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">
            {availability.status === 'available' && "Disponible pour de nouveaux projets"}
            {availability.status === 'partially' && "Partiellement disponible"}
            {availability.status === 'unavailable' && "Actuellement indisponible"}
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            {getStatusMessage(availability.status)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityTooltip;
