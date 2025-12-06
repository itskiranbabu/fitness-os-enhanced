'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { VerticalType } from '@/components/onboarding/VerticalSelector';

export interface OSConfig {
    vertical: VerticalType;
    niche: string;
    verticalName: string; // e.g., FitnessOS
}

const defaultOS: OSConfig = {
    vertical: 'FITNESS_OS',
    niche: 'General Fitness',
    verticalName: 'FitnessOS'
};

const BusinessOSContext = createContext<{
    config: OSConfig;
    setConfig: (config: OSConfig) => void;
    isLoaded: boolean;
}>({
    config: defaultOS,
    setConfig: () => { },
    isLoaded: false
});

export const BusinessOSProvider = ({ children }: { children: React.ReactNode }) => {
    const [config, setConfig] = useState<OSConfig>(defaultOS);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('businessos_config');
        if (saved) {
            try {
                setConfig(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse OS config", e);
            }
        }
        setIsLoaded(true);
    }, []);

    const updateConfig = (newConfig: OSConfig) => {
        setConfig(newConfig);
        localStorage.setItem('businessos_config', JSON.stringify(newConfig));
    };

    return (
        <BusinessOSContext.Provider value={{ config, setConfig: updateConfig, isLoaded }}>
            {children}
        </BusinessOSContext.Provider>
    );
};

export const useBusinessOS = () => useContext(BusinessOSContext);
