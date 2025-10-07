'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AvailabilityStatus {
  id: number;
  status: 'available' | 'partially' | 'unavailable';
}

interface AvailabilityContextType {
  availability: AvailabilityStatus | null;
  setAvailability: React.Dispatch<React.SetStateAction<AvailabilityStatus | null>>;
  refreshAvailability: () => Promise<void>;
}

const AvailabilityContext = createContext<AvailabilityContextType | undefined>(undefined);

export const AvailabilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [availability, setAvailability] = useState<AvailabilityStatus | null>(null);

  const fetchAvailability = async () => {
    try {
      const response = await fetch('/api/availability');
      if (response.ok) {
        const data = await response.json();
        setAvailability(data);
      }
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  return (
    <AvailabilityContext.Provider 
      value={{ 
        availability, 
        setAvailability,
        refreshAvailability: fetchAvailability
      }}
    >
      {children}
    </AvailabilityContext.Provider>
  );
};

export const useAvailability = () => {
  const context = useContext(AvailabilityContext);
  if (context === undefined) {
    throw new Error('useAvailability must be used within an AvailabilityProvider');
  }
  return context;
};
