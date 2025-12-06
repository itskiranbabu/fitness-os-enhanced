'use client';

import React from 'react';
import { ShoppingBag, Star, Download } from 'lucide-react';

export default function MarketplacePage() {
    const items = [
        { id: 1, title: 'Gym Launch Funnel', category: 'Funnel', rating: 4.8, price: 'Free' },
        { id: 2, title: 'Real Estate Scripts', category: 'Script', rating: 4.9, price: '$29' },
        { id: 3, title: 'Agency SOPs', category: 'System', rating: 5.0, price: '$97' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-bold text-white mb-2">Marketplace</h1>
            <p className="text-slate-400 mb-8">Discover templates and tools to grow your business.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <ShoppingBag className="text-white" size={20} />
                            </div>
                            <span className="px-2 py-1 bg-slate-800 text-slate-300 text-xs font-bold rounded uppercase">
                                {item.price}
                            </span>
                        </div>
                        <h3 className="font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-500 uppercase font-bold mb-4">{item.category}</p>

                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-1 text-yellow-400 text-sm">
                                <Star size={14} fill="currentColor" /> {item.rating}
                            </div>
                            <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1">
                                <Download size={14} /> Get
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
