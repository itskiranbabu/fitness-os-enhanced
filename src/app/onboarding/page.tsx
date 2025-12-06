'use client';

import React, { useState } from 'react';
import { VerticalSelector, VerticalType } from '@/components/onboarding/VerticalSelector';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState<'SELECT' | 'NICHE' | 'GENERATING'>('SELECT');
    const [selectedVertical, setSelectedVertical] = useState<VerticalType | null>(null);
    const [niche, setNiche] = useState('');

    const handleVerticalSelect = (vertical: VerticalType) => {
        setSelectedVertical(vertical);
        setStep('NICHE');
    };

    const handleGenerate = async () => {
        if (!niche.trim() || !selectedVertical) return;

        setStep('GENERATING');

        // Simulate API call for now (Real implementation would call /api/ai/generate-blueprint)
        setTimeout(() => {
            router.push('/dashboard');
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
            <AnimatePresence mode="wait">

                {/* STEP 1: SELECT VERTICAL */}
                {step === 'SELECT' && (
                    <motion.div
                        key="select"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full"
                    >
                        <VerticalSelector onSelect={handleVerticalSelect} />
                    </motion.div>
                )}

                {/* STEP 2: DEFINE NICHE */}
                {step === 'NICHE' && (
                    <motion.div
                        key="niche"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl"
                    >
                        <h2 className="text-2xl font-bold text-white mb-2">Define Your Niche</h2>
                        <p className="text-slate-400 mb-6">
                            Be specific. Who do you help and what result do you get them?
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">
                                    I help...
                                </label>
                                <input
                                    type="text"
                                    value={niche}
                                    onChange={(e) => setNiche(e.target.value)}
                                    placeholder="e.g. busy dads lose 20lbs in 90 days"
                                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    autoFocus
                                />
                            </div>

                            <button
                                onClick={handleGenerate}
                                disabled={!niche.trim()}
                                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2 mt-4"
                            >
                                <SparklesIcon className="w-5 h-5" />
                                Generate Business Blueprint
                            </button>

                            <button
                                onClick={() => setStep('SELECT')}
                                className="w-full text-slate-500 hover:text-slate-300 text-sm py-2"
                            >
                                Back to Selection
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: GENERATING */}
                {step === 'GENERATING' && (
                    <motion.div
                        key="generating"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <div className="relative w-24 h-24 mx-auto mb-8">
                            <div className="absolute inset-0 border-4 border-indigo-500/30 rounded-full animate-pulse" />
                            <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <SparklesIcon className="w-8 h-8 text-indigo-400" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2">
                            Building {selectedVertical?.replace('_OS', '')} OS...
                        </h2>
                        <p className="text-slate-400 animate-pulse">
                            Analyzing market trends... Generating offer... Designing funnel...
                        </p>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}

function SparklesIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
    );
}
