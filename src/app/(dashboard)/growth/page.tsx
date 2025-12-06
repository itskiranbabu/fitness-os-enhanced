'use client';

import React, { useState } from 'react';
import { aiService, SocialPost } from '@/lib/ai/ai-service';
import { Sparkles, Calendar, Copy, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GrowthEnginePage() {
    const [niche, setNiche] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [posts, setPosts] = useState<SocialPost[]>([]);

    const handleGenerate = async () => {
        if (!niche) return;
        setIsGenerating(true);
        try {
            // In a real app, this would be a server action or API route to keep keys secure
            // For this demo, we assume the service handles it or we mock it client-side if keys missing
            const plan = await aiService.generateContentPlan(niche, 7);
            setPosts(plan);
        } catch (error) {
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Growth Engine 2.0</h1>
                <p className="text-slate-400">AI-powered content strategy and generation.</p>
            </div>

            {/* Input Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-slate-400 mb-2">
                            What's your niche or topic?
                        </label>
                        <input
                            type="text"
                            value={niche}
                            onChange={(e) => setNiche(e.target.value)}
                            placeholder="e.g. High-ticket sales for fitness coaches"
                            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !niche}
                        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all min-w-[160px] justify-center"
                    >
                        {isGenerating ? (
                            <>
                                <RefreshCw className="animate-spin w-5 h-5" />
                                Thinking...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-5 h-5" />
                                Generate Plan
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Results Grid */}
            {posts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors group"
                        >
                            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
                                <div className="flex items-center gap-2 text-sm text-slate-400">
                                    <Calendar className="w-4 h-4" />
                                    <span>Day {post.day}</span>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${post.type === 'Video' ? 'bg-blue-500/10 text-blue-400' :
                                        post.type === 'Carousel' ? 'bg-purple-500/10 text-purple-400' :
                                            'bg-emerald-500/10 text-emerald-400'
                                    }`}>
                                    {post.type}
                                </span>
                            </div>

                            <div className="p-5 space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hook</label>
                                    <p className="text-white font-medium mt-1">{post.hook}</p>
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Content</label>
                                    <p className="text-slate-300 text-sm mt-1 line-clamp-4 group-hover:line-clamp-none transition-all">
                                        {post.body}
                                    </p>
                                </div>

                                {post.imagePrompt && (
                                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                                            <ImageIcon className="w-3 h-3" />
                                            <span>AI Image Prompt</span>
                                        </div>
                                        <p className="text-xs text-slate-500 italic">{post.imagePrompt}</p>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
                                    <div className="flex gap-2">
                                        {post.hashtags?.slice(0, 2).map(tag => (
                                            <span key={tag} className="text-xs text-indigo-400">{tag}</span>
                                        ))}
                                    </div>
                                    <button
                                        className="text-slate-400 hover:text-white transition-colors"
                                        title="Copy to clipboard"
                                        onClick={() => navigator.clipboard.writeText(`${post.hook}\n\n${post.body}`)}
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
