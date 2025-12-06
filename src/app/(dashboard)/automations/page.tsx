'use client';

import React from 'react';
import { Zap, Construction } from 'lucide-react';

export default function AutomationsPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto w-full flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6">
                <Zap size={40} className="text-yellow-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Automations Engine</h1>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
                Connect your tools and automate your workflow. This feature is coming in the next update.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-full text-indigo-400 text-sm font-medium">
                <Construction size={16} /> Under Construction
            </div>
        </div>
    );
}
