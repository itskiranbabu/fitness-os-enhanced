'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Briefcase, Home, Video, Wrench, Sparkles } from 'lucide-react';

export type VerticalType = 'FITNESS_OS' | 'AGENCY_OS' | 'REAL_ESTATE_OS' | 'CREATOR_OS' | 'SERVICE_OS' | 'CUSTOM_OS';

interface VerticalSelectorProps {
    onSelect: (vertical: VerticalType) => void;
}

const verticals = [
    {
        id: 'FITNESS_OS',
        label: 'FitnessOS',
        description: 'For Gyms, Trainers & Studios',
        icon: Dumbbell,
        color: 'from-blue-500 to-cyan-400'
    },
    {
        id: 'AGENCY_OS',
        label: 'AgencyOS',
        description: 'For Agencies & Freelancers',
        icon: Briefcase,
        color: 'from-purple-500 to-indigo-400'
    },
    {
        id: 'REAL_ESTATE_OS',
        label: 'RealEstateOS',
        description: 'For Realtors & Brokers',
        icon: Home,
        color: 'from-emerald-500 to-teal-400'
    },
    {
        id: 'CREATOR_OS',
        label: 'CreatorOS',
        description: 'For Influencers & Educators',
        icon: Video,
        color: 'from-pink-500 to-rose-400'
    },
    {
        id: 'SERVICE_OS',
        label: 'ServiceOS',
        description: 'For Local Service Business',
        icon: Wrench,
        color: 'from-orange-500 to-amber-400'
    },
    {
        id: 'CUSTOM_OS',
        label: 'CustomOS',
        description: 'Build from Scratch',
        icon: Sparkles,
        color: 'from-slate-500 to-gray-400'
    },
] as const;

export const VerticalSelector: React.FC<VerticalSelectorProps> = ({ onSelect }) => {
    return (
        <div className="w-full max-w-5xl mx-auto p-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Choose Your Operating System
                </h2>
                <p className="text-slate-400 text-lg">
                    Select your industry to generate a custom AI business blueprint.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {verticals.map((v) => (
                    <motion.button
                        key={v.id}
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onSelect(v.id)}
                        className="relative group overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-6 text-left transition-all hover:border-slate-600 hover:shadow-2xl"
                    >
                        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${v.color} transition-opacity duration-500`} />

                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-6 shadow-lg`}>
                            <v.icon className="w-7 h-7 text-white" />
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2">{v.label}</h3>
                        <p className="text-slate-400 text-sm">{v.description}</p>

                        <div className="mt-6 flex items-center text-sm font-medium text-slate-500 group-hover:text-white transition-colors">
                            Select OS <span className="ml-2">→</span>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
