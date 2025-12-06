'use client';

import React, { useState } from 'react';
import { WebsiteData } from '@/lib/types';
import SalesPageRenderer from './SalesPageRenderer';
import {
    Layout,
    Type,
    Check,
    UserCircle,
    DollarSign,
    HelpCircle,
    Monitor,
    Smartphone,
    Eye,
    Save,
    Rocket,
    ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { useBusinessOS } from '@/providers/BusinessOSProvider';
import { getTemplateByVertical } from '@/lib/os-templates';

export default function FunnelEditor({ initialData }: { initialData: WebsiteData }) {
    const { config } = useBusinessOS();
    const [data, setData] = useState<WebsiteData>(initialData);
    const [activeTab, setActiveTab] = useState<'hero' | 'problem' | 'solution' | 'bio' | 'pricing' | 'faq'>('hero');
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

    // Auto-adapt content to selected OS
    React.useEffect(() => {
        // HACK: Detect if current data is the "Default Fitness" placeholder
        // If so, and we are NOT in Fitness OS, switch to the correct template.
        // This prevents overwriting user's SAVED work if they manually edited the headline.
        const isDefaultFitness = data.heroHeadline.includes("Scale Your Fitness Business");

        if (isDefaultFitness && config.vertical !== 'FITNESS_OS') {
            const newTemplate = getTemplateByVertical(config.vertical);
            setData(newTemplate);
        }
    }, [config.vertical]);

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        // Simulate save
        setTimeout(() => {
            setIsSaving(false);
            alert('Saved successfully!');
        }, 1000);
    };

    const handlePublish = () => {
        const slug = 'demo-v1'; // Logic to get slug
        const url = `${window.location.origin}/funnel/${slug}`;
        window.open(url, '_blank');
    };

    const tabs = [
        { id: 'hero', label: 'Hero', icon: Layout },
        { id: 'problem', label: 'Problem', icon: HelpCircle },
        { id: 'solution', label: 'Solution', icon: Check },
        { id: 'bio', label: 'Bio', icon: UserCircle },
        { id: 'pricing', label: 'Pricing', icon: DollarSign },
        { id: 'faq', label: 'FAQ', icon: HelpCircle },
    ];

    return (
        <div className="h-screen flex flex-col bg-slate-950 overflow-hidden text-slate-200">

            {/* Header */}
            <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6 z-20 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-white font-bold text-lg">Funnel Editor 2.0</h1>
                        <p className="text-xs text-slate-500">High-Converting Sales Page</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-slate-800 p-1 rounded-lg flex items-center">
                        <button
                            onClick={() => setViewMode('desktop')}
                            className={`p-1.5 rounded ${viewMode === 'desktop' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Monitor size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode('mobile')}
                            className={`p-1.5 rounded ${viewMode === 'mobile' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
                        >
                            <Smartphone size={16} />
                        </button>
                    </div>

                    <div className="h-6 w-px bg-slate-800" />

                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors"
                    >
                        <Save size={16} /> Save
                    </button>

                    <button
                        onClick={handlePublish}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
                    >
                        <Rocket size={16} /> Publish
                    </button>
                </div>
            </header>

            {/* Main Workspace */}
            <div className="flex-1 flex overflow-hidden">

                {/* Sidebar Controls */}
                <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col overflow-hidden">
                    {/* Tabs */}
                    <div className="flex overflow-x-auto border-b border-slate-800 bg-slate-950 no-scrollbar">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 flex flex-col items-center justify-center py-3 min-w-[60px] text-[10px] font-medium gap-1 uppercase tracking-wider transition-colors ${activeTab === tab.id
                                    ? 'text-indigo-400 bg-slate-900 border-b-2 border-indigo-500'
                                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Editor Forms */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        {activeTab === 'hero' && (
                            <>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Headline</label>
                                    <textarea
                                        value={data.heroHeadline}
                                        onChange={(e) => setData({ ...data, heroHeadline: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                                        rows={3}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Subheadline</label>
                                    <textarea
                                        value={data.heroSubhead}
                                        onChange={(e) => setData({ ...data, heroSubhead: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                                        rows={4}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-500 uppercase">CTA Text</label>
                                    <input
                                        value={data.ctaText}
                                        onChange={(e) => setData({ ...data, ctaText: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </>
                        )}

                        {activeTab === 'problem' && (
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-500 uppercase">Target Audience Problem</label>
                                <textarea
                                    value={data.problem}
                                    onChange={(e) => setData({ ...data, problem: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                                    rows={8}
                                    placeholder="Describe the pain points..."
                                />
                            </div>
                        )}

                        {activeTab === 'solution' && (
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-500 uppercase">The Solution</label>
                                    <textarea
                                        value={data.solution}
                                        onChange={(e) => setData({ ...data, solution: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                                        rows={6}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Key Features (One per line)</label>
                                    <textarea
                                        value={data.features.join('\n')}
                                        onChange={(e) => setData({ ...data, features: e.target.value.split('\n') })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                                        rows={6}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Add other tabs logic here as needed, simplified for speed */}
                        {activeTab !== 'hero' && activeTab !== 'problem' && activeTab !== 'solution' && (
                            <div className="p-4 text-center text-slate-500 text-sm">
                                Editor controls for {activeTab} coming soon.
                            </div>
                        )}
                    </div>
                </div>

                {/* Preview Canvas */}
                <div className="flex-1 bg-slate-950 relative overflow-hidden flex justify-center pt-8 pb-4">
                    <div
                        className={`bg-white transition-all duration-300 shadow-2xl overflow-y-auto overflow-x-hidden ${viewMode === 'mobile'
                            ? 'w-[375px] h-[667px] rounded-[3rem] border-[8px] border-slate-800'
                            : 'w-full max-w-[1200px] h-full rounded-tl-xl rounded-tr-xl border border-slate-800'
                            }`}
                    >
                        <SalesPageRenderer data={data} isPreview={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}
