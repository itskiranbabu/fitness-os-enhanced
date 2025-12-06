'use client';

import React, { useState } from 'react';
import {
    Zap,
    Plus,
    Mail,
    MessageSquare,
    Clock,
    Users,
    Filter,
    Play,
    Pause,
    Trash2,
    Settings,
    ChevronRight,
    CheckCircle2
} from 'lucide-react';

interface Automation {
    id: string;
    name: string;
    trigger: string;
    actions: string[];
    status: 'active' | 'paused';
    runs: number;
    lastRun?: string;
}

export default function AutomationsPage() {
    const [automations, setAutomations] = useState<Automation[]>([
        {
            id: '1',
            name: 'Welcome New Clients',
            trigger: 'Client Created',
            actions: ['Send Email', 'Send WhatsApp'],
            status: 'active',
            runs: 24,
            lastRun: '2 hours ago'
        },
        {
            id: '2',
            name: 'Lead Follow-up',
            trigger: 'Lead Captured',
            actions: ['Send Email', 'Add to CRM'],
            status: 'active',
            runs: 156,
            lastRun: '5 minutes ago'
        },
        {
            id: '3',
            name: 'Check-in Reminder',
            trigger: 'Every 7 Days',
            actions: ['Send Email'],
            status: 'paused',
            runs: 89,
            lastRun: '3 days ago'
        }
    ]);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const toggleAutomation = (id: string) => {
        setAutomations(prev => prev.map(auto =>
            auto.id === id
                ? { ...auto, status: auto.status === 'active' ? 'paused' : 'active' }
                : auto
        ));
    };

    const deleteAutomation = (id: string) => {
        if (confirm('Are you sure you want to delete this automation?')) {
            setAutomations(prev => prev.filter(auto => auto.id !== id));
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto w-full min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Zap className="text-indigo-500" size={32} />
                        Automations Engine
                    </h1>
                    <p className="text-slate-400">Automate your workflows and save time.</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20"
                >
                    <Plus size={20} /> Create Automation
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-slate-400 text-sm font-bold">Active Automations</div>
                        <CheckCircle2 className="text-green-500" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-white">
                        {automations.filter(a => a.status === 'active').length}
                    </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-slate-400 text-sm font-bold">Total Runs</div>
                        <Zap className="text-indigo-500" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-white">
                        {automations.reduce((sum, a) => sum + a.runs, 0)}
                    </div>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-slate-400 text-sm font-bold">Time Saved</div>
                        <Clock className="text-amber-500" size={20} />
                    </div>
                    <div className="text-3xl font-bold text-white">~12h</div>
                </div>
            </div>

            {/* Automations List */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">Your Automations</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 text-sm transition-colors">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>

                <div className="divide-y divide-slate-800">
                    {automations.map(automation => (
                        <div key={automation.id} className="p-6 hover:bg-slate-800/50 transition-colors group">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-bold text-white">{automation.name}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${automation.status === 'active'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-slate-700 text-slate-400'
                                            }`}>
                                            {automation.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                                        <div className="flex items-center gap-2">
                                            <Zap size={14} className="text-indigo-500" />
                                            <span>Trigger: {automation.trigger}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={14} />
                                            <span>Last run: {automation.lastRun}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Play size={14} />
                                            <span>{automation.runs} runs</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {automation.actions.map((action, idx) => (
                                            <div key={idx} className="flex items-center gap-1">
                                                {idx > 0 && <ChevronRight size={14} className="text-slate-600" />}
                                                <div className="px-3 py-1 bg-slate-800 rounded-lg text-xs font-medium text-slate-300 flex items-center gap-1">
                                                    {action.includes('Email') && <Mail size={12} />}
                                                    {action.includes('WhatsApp') && <MessageSquare size={12} />}
                                                    {action.includes('CRM') && <Users size={12} />}
                                                    {action}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => toggleAutomation(automation.id)}
                                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                                        title={automation.status === 'active' ? 'Pause' : 'Activate'}
                                    >
                                        {automation.status === 'active' ? <Pause size={18} /> : <Play size={18} />}
                                    </button>
                                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="Settings">
                                        <Settings size={18} />
                                    </button>
                                    <button
                                        onClick={() => deleteAutomation(automation.id)}
                                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Create Automation Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-2xl shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Create New Automation</h2>
                            <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">✕</button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Automation Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g., Welcome New Clients"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Trigger</label>
                                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 cursor-pointer">
                                    <option>Select a trigger...</option>
                                    <option>Client Created</option>
                                    <option>Lead Captured</option>
                                    <option>Payment Received</option>
                                    <option>Every 7 Days</option>
                                    <option>Every 30 Days</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-400 mb-2">Actions</label>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-lg">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <Mail size={16} className="text-indigo-500" />
                                        <span className="text-white">Send Welcome Email</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-lg">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <MessageSquare size={16} className="text-green-500" />
                                        <span className="text-white">Send WhatsApp Message</span>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-slate-950 border border-slate-800 rounded-lg">
                                        <input type="checkbox" className="w-4 h-4" />
                                        <Users size={16} className="text-amber-500" />
                                        <span className="text-white">Add to CRM</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        alert('Automation created! This is a demo - full implementation coming soon.');
                                        setShowCreateModal(false);
                                    }}
                                    className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20"
                                >
                                    Create Automation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
