'use client';

import React from 'react';
import { Sidebar } from '@/components/builder/Sidebar';
import { FunnelCanvas } from '@/components/builder/FunnelCanvas';
import { ArrowLeft, Save, Eye, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function FunnelEditorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    return (
        <div className="h-screen flex flex-col bg-slate-950 overflow-hidden">
            {/* Header */}
            <header className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6 z-20">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-white font-bold">Funnel Editor</h1>
                        <p className="text-xs text-slate-500">Editing Funnel #{id}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm font-medium">
                        <Eye size={16} />
                        Preview
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm font-medium">
                        <Save size={16} />
                        Save Draft
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors text-sm font-medium shadow-lg shadow-indigo-500/20">
                        <Rocket size={16} />
                        Publish
                    </button>
                </div>
            </header>

            {/* Builder Workspace */}
            <div className="flex-1 flex overflow-hidden">
                <Sidebar />
                <FunnelCanvas />
            </div>
        </div>
    );
}
