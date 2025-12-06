'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Download } from 'lucide-react';

const templates = [
    {
        id: '1',
        title: 'High-Ticket Coach Funnel',
        author: 'Alex Hormozi Style',
        price: 97,
        rating: 4.9,
        sales: 1240,
        image: 'bg-gradient-to-br from-blue-600 to-indigo-600',
        category: 'Funnel'
    },
    {
        id: '2',
        title: 'Agency Client Acquisition',
        author: 'Iman Gadzhi Style',
        price: 197,
        rating: 4.8,
        sales: 850,
        image: 'bg-gradient-to-br from-purple-600 to-pink-600',
        category: 'System'
    },
    {
        id: '3',
        title: 'Real Estate Lead Magnet',
        author: 'Ryan Serhant Style',
        price: 47,
        rating: 4.7,
        sales: 2100,
        image: 'bg-gradient-to-br from-emerald-600 to-teal-600',
        category: 'Automation'
    }
];

export default function MarketplacePage() {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Template Marketplace</h1>
                    <p className="text-slate-400">Discover proven systems to grow your business.</p>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search templates..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>
                    <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <motion.div
                        key={template.id}
                        whileHover={{ y: -5 }}
                        className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all group"
                    >
                        {/* Preview Image */}
                        <div className={`h-48 ${template.image} relative`}>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-xs font-medium text-white">
                                {template.category}
                            </div>
                        </div>

                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-white">{template.title}</h3>
                                <div className="flex items-center gap-1 text-amber-400 text-sm">
                                    <Star className="w-4 h-4 fill-current" />
                                    <span>{template.rating}</span>
                                </div>
                            </div>

                            <p className="text-slate-400 text-sm mb-4">by {template.author}</p>

                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
                                <div className="text-xl font-bold text-white">
                                    ${template.price}
                                </div>
                                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                    <Download className="w-4 h-4" />
                                    Install
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
