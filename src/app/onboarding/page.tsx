'use client';

import React, { useState } from 'react';
import { VerticalSelector, VerticalType } from '@/components/onboarding/VerticalSelector';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Wand2, Sparkles, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useBusinessOS } from '@/providers/BusinessOSProvider';

export default function OnboardingPage() {
    const router = useRouter();
    const { setConfig } = useBusinessOS();
    const [step, setStep] = useState<'SELECT' | 'NICHE' | 'GENERATING'>('SELECT');
    const [selectedVertical, setSelectedVertical] = useState<VerticalType | null>(null);
    const [niche, setNiche] = useState('');
    const [isEnhancing, setIsEnhancing] = useState(false);

    const handleVerticalSelect = (vertical: VerticalType) => {
        setSelectedVertical(vertical);
        setStep('NICHE');
    };

    const enhancePrompt = () => {
        setIsEnhancing(true);
        // Simulate AI enhancement
        setTimeout(() => {
            if (niche.trim()) {
                setNiche((prev) => `High-Ticket ${prev} for Executive Clients seeking rapid transformation`);
            } else {
                setNiche("Premium Service for High-Net-Worth Individuals");
            }
            setIsEnhancing(false);
        }, 1500);
    };

    const handleGenerate = async () => {
        if (!niche.trim() || !selectedVertical) return;

        setStep('GENERATING');

        // Save OS Context
        const verticals = {
            'FITNESS_OS': 'FitnessOS',
            'AGENCY_OS': 'AgencyOS',
            'REAL_ESTATE_OS': 'RealEstateOS',
            'CREATOR_OS': 'CreatorOS',
            'SERVICE_OS': 'ServiceOS',
            'CUSTOM_OS': 'CustomOS'
        };

        setConfig({
            vertical: selectedVertical,
            niche: niche,
            verticalName: verticals[selectedVertical]
        });

        // Simulate API call for now (Real implementation would call /api/ai/generate-blueprint)
        setTimeout(() => {
            router.push('/dashboard');
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]" />

            <AnimatePresence mode="wait">

                {/* STEP 1: SELECT VERTICAL */}
                {step === 'SELECT' && (
                    <motion.div
                        key="select"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full relative z-10"
                    >
                        <VerticalSelector onSelect={handleVerticalSelect} />
                    </motion.div>
                )}

                {/* STEP 2: DEFINE NICHE (Enhanced UI) */}
                {step === 'NICHE' && (
                    <motion.div
                        key="niche"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-2xl"
                    >
                        <div className="bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-1 shadow-2xl ring-1 ring-white/10">
                            <div className="bg-[#020617] rounded-[1.4rem] p-8 md:p-10 border border-slate-800/50">

                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-wider text-xs uppercase">
                                        <Sparkles size={14} />
                                        System Input
                                    </div>
                                    <button
                                        onClick={enhancePrompt}
                                        disabled={isEnhancing}
                                        className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs rounded-lg border border-indigo-500/20 transition-all"
                                    >
                                        <Wand2 size={12} className={isEnhancing ? "animate-spin" : ""} />
                                        {isEnhancing ? 'Enhancing...' : 'AI Enhance Prompt'}
                                    </button>
                                </div>

                                <div className="relative mb-8">
                                    <textarea
                                        value={niche}
                                        onChange={(e) => setNiche(e.target.value)}
                                        placeholder="Describe your expertise, niche, or who you want to help..."
                                        className="w-full h-32 bg-slate-900/50 border border-slate-800 rounded-xl p-5 text-lg text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none resize-none transition-all"
                                        autoFocus
                                    />
                                </div>

                                <div className="mb-8">
                                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mr-3">Try:</span>
                                    <div className="inline-flex flex-wrap gap-2">
                                        {[
                                            "High-Ticket Weight Loss for Corporate Dads ⚡",
                                            "Post-Natal Yoga & Recovery for Executives ⚡",
                                            "Strength & Conditioning for Amateur Golfers ⚡",
                                            "Marathon Prep for Busy Professionals ⚡"
                                        ].map((text, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setNiche(text.replace(' ⚡', ''))}
                                                className="px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/30 rounded-full text-xs transition-all"
                                            >
                                                {text}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={!niche.trim()}
                                    className="w-full bg-white hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01]"
                                >
                                    Initialize Blueprint
                                    <ArrowRight className="w-5 h-5" />
                                </button>

                                <button
                                    onClick={() => setStep('SELECT')}
                                    className="w-full text-slate-500 hover:text-slate-400 text-sm mt-4"
                                >
                                    Back to Selection
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: GENERATING */}
                {step === 'GENERATING' && (
                    <motion.div
                        key="generating"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center relative z-10"
                    >
                        <div className="relative w-32 h-32 mx-auto mb-8">
                            <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full" />
                            <div className="absolute inset-0 border-t-4 border-indigo-500 rounded-full animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles className="w-10 h-10 text-indigo-400 animate-pulse" />
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-white mb-4">
                            Building {selectedVertical?.replace('_OS', '')} OS...
                        </h2>
                        <div className="flex flex-col gap-2 items-center text-slate-400">
                            <p className="animate-pulse">Analyzing market trends...</p>
                        </div>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
    );
}
