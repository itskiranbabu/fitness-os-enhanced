'use client';

import React, { useState } from 'react';
import { useFunnelStore, BlockType } from '@/lib/store/funnelStore';
import { Plus, Settings, Type, Image as ImageIcon, Layout, DollarSign, X } from 'lucide-react';

export const Sidebar = () => {
    const [activeTab, setActiveTab] = useState<'ADD' | 'EDIT'>('ADD');
    const { addBlock, selectedBlockId, blocks, updateBlock, selectBlock } = useFunnelStore();

    const selectedBlock = blocks.find(b => b.id === selectedBlockId);

    // Auto-switch to edit when a block is selected
    React.useEffect(() => {
        if (selectedBlockId) setActiveTab('EDIT');
    }, [selectedBlockId]);

    return (
        <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
            {/* Tabs */}
            <div className="flex border-b border-slate-800">
                <button
                    onClick={() => setActiveTab('ADD')}
                    className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'ADD' ? 'text-white border-b-2 border-indigo-500' : 'text-slate-500 hover:text-slate-300'
                        }`}
                >
                    Add Blocks
                </button>
                <button
                    onClick={() => setActiveTab('EDIT')}
                    disabled={!selectedBlock}
                    className={`flex-1 py-4 text-sm font-medium transition-colors ${activeTab === 'EDIT' ? 'text-white border-b-2 border-indigo-500' : 'text-slate-500 hover:text-slate-300 disabled:opacity-50'
                        }`}
                >
                    Edit Block
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'ADD' ? (
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Components</h3>

                        <BlockButton
                            icon={Layout}
                            label="Hero Section"
                            onClick={() => addBlock('HERO')}
                        />
                        <BlockButton
                            icon={Type}
                            label="Features Grid"
                            onClick={() => addBlock('FEATURES')}
                        />
                        <BlockButton
                            icon={DollarSign}
                            label="Pricing Table"
                            onClick={() => addBlock('PRICING')}
                        />
                        {/* Add more blocks as needed */}
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold text-white">Edit {selectedBlock?.type}</h3>
                            <button onClick={() => selectBlock(null)} className="text-slate-500 hover:text-white">
                                <X size={16} />
                            </button>
                        </div>

                        {selectedBlock && (
                            <EditForm
                                block={selectedBlock}
                                onChange={(content) => updateBlock(selectedBlock.id, content)}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

const BlockButton = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center gap-3 p-4 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all group text-left"
    >
        <div className="p-2 bg-slate-900 rounded-md text-indigo-400 group-hover:text-white transition-colors">
            <Icon size={20} />
        </div>
        <span className="text-slate-300 font-medium group-hover:text-white">{label}</span>
        <Plus size={16} className="ml-auto text-slate-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
);

const EditForm = ({ block, onChange }: { block: any, onChange: (c: any) => void }) => {
    const { type, content } = block;

    if (type === 'HERO') {
        return (
            <div className="space-y-4">
                <Input label="Headline" value={content.headline} onChange={(v) => onChange({ headline: v })} />
                <Input label="Subheadline" value={content.subheadline} onChange={(v) => onChange({ subheadline: v })} textarea />
                <Input label="CTA Text" value={content.ctaText} onChange={(v) => onChange({ ctaText: v })} />
                <Input label="Image URL" value={content.image} onChange={(v) => onChange({ image: v })} />
            </div>
        );
    }

    if (type === 'FEATURES') {
        return (
            <div className="space-y-4">
                <Input label="Section Title" value={content.title} onChange={(v) => onChange({ title: v })} />
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-400">Features</label>
                    {content.features.map((f: any, i: number) => (
                        <div key={i} className="p-3 bg-slate-800 rounded border border-slate-700 space-y-2">
                            <input
                                className="w-full bg-transparent text-sm text-white border-b border-slate-700 focus:border-indigo-500 outline-none pb-1"
                                value={f.title}
                                onChange={(e) => {
                                    const newFeatures = [...content.features];
                                    newFeatures[i].title = e.target.value;
                                    onChange({ features: newFeatures });
                                }}
                            />
                            <textarea
                                className="w-full bg-transparent text-xs text-slate-400 outline-none resize-none"
                                value={f.desc}
                                onChange={(e) => {
                                    const newFeatures = [...content.features];
                                    newFeatures[i].desc = e.target.value;
                                    onChange({ features: newFeatures });
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return <div className="text-slate-500 text-sm">No editor available for this block type.</div>;
};

const Input = ({ label, value, onChange, textarea }: any) => (
    <div>
        <label className="block text-xs font-medium text-slate-400 mb-1">{label}</label>
        {textarea ? (
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none h-24 resize-none"
            />
        ) : (
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white focus:ring-1 focus:ring-indigo-500 outline-none"
            />
        )}
    </div>
);
