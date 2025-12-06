import React from 'react';
import { FunnelBlock } from '@/lib/store/funnelStore';

interface BlockRendererProps {
    block: FunnelBlock;
    isSelected?: boolean;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block, isSelected }) => {
    const { type, content } = block;

    const baseClasses = `w-full transition-all duration-200 ${isSelected ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-slate-900' : 'hover:ring-1 hover:ring-slate-700'
        }`;

    switch (type) {
        case 'HERO':
            return (
                <div className={`${baseClasses} relative bg-slate-900 overflow-hidden py-20 px-6 text-center`}>
                    <div className="absolute inset-0 opacity-20">
                        <img src={content.image} alt="Hero" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{content.headline}</h1>
                        <p className="text-xl text-slate-300 mb-8">{content.subheadline}</p>
                        <button className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-500 transition-colors">
                            {content.ctaText}
                        </button>
                    </div>
                </div>
            );

        case 'FEATURES':
            return (
                <div className={`${baseClasses} bg-slate-950 py-20 px-6`}>
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-white text-center mb-12">{content.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {content.features?.map((f: any, i: number) => (
                                <div key={i} className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                                    <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                                    <p className="text-slate-400">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

        case 'PRICING':
            return (
                <div className={`${baseClasses} bg-slate-900 py-20 px-6`}>
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl font-bold text-white text-center mb-12">{content.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {content.plans?.map((p: any, i: number) => (
                                <div key={i} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 flex flex-col">
                                    <h3 className="text-2xl font-bold text-white mb-2">{p.name}</h3>
                                    <div className="text-4xl font-bold text-indigo-400 mb-6">{p.price}</div>
                                    <ul className="space-y-3 mb-8 flex-1">
                                        {p.features?.map((f: string, j: number) => (
                                            <li key={j} className="text-slate-300 flex items-center gap-2">
                                                <span className="text-green-400">✓</span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                    <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-semibold transition-colors">
                                        Choose Plan
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            );

        default:
            return <div className="p-4 bg-red-500/10 text-red-500">Unknown Block Type</div>;
    }
};
