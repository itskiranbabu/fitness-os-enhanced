'use client';

import React, { useState } from 'react';
import { Plus, Zap, Mail, MessageSquare, ArrowRight, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AutomationStep {
    id: string;
    type: 'TRIGGER' | 'ACTION';
    actionType?: 'EMAIL' | 'SMS' | 'WAIT';
    config: any;
}

export default function AutomationsPage() {
    const [workflows, setWorkflows] = useState([
        {
            id: '1',
            name: 'New Lead Welcome Sequence',
            active: true,
            steps: [
                { id: 't1', type: 'TRIGGER', config: { event: 'Lead Created' } },
                { id: 'a1', type: 'ACTION', actionType: 'EMAIL', config: { subject: 'Welcome!', template: 'welcome-email' } },
                { id: 'a2', type: 'ACTION', actionType: 'WAIT', config: { duration: '24h' } },
                { id: 'a3', type: 'ACTION', actionType: 'SMS', config: { message: 'Hey, did you see my email?' } },
            ]
        }
    ]);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Automations</h1>
                    <p className="text-slate-400">Build workflows to nurture your leads on autopilot.</p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                    <Plus size={18} />
                    New Workflow
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {workflows.map((workflow) => (
                    <div key={workflow.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${workflow.active ? 'bg-green-500/10 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
                                    <Zap size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">{workflow.name}</h3>
                                    <p className="text-xs text-slate-500">{workflow.steps.length} steps • {workflow.active ? 'Active' : 'Paused'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={workflow.active} className="sr-only peer" readOnly />
                                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                </label>
                            </div>
                        </div>

                        {/* Visual Workflow Builder Preview */}
                        <div className="flex items-center gap-4 overflow-x-auto pb-4">
                            {workflow.steps.map((step: any, index) => (
                                <React.Fragment key={step.id}>
                                    {index > 0 && <ArrowRight className="text-slate-600 min-w-[20px]" />}

                                    <div className={`relative min-w-[200px] p-4 rounded-lg border ${step.type === 'TRIGGER'
                                            ? 'bg-indigo-500/10 border-indigo-500/50'
                                            : 'bg-slate-800 border-slate-700'
                                        }`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            {step.type === 'TRIGGER' && <Zap size={16} className="text-indigo-400" />}
                                            {step.actionType === 'EMAIL' && <Mail size={16} className="text-blue-400" />}
                                            {step.actionType === 'SMS' && <MessageSquare size={16} className="text-green-400" />}
                                            {step.actionType === 'WAIT' && <span className="text-xs font-bold text-amber-400">⏳</span>}

                                            <span className="text-sm font-bold text-white">
                                                {step.type === 'TRIGGER' ? 'When...' : step.actionType}
                                            </span>
                                        </div>

                                        <p className="text-xs text-slate-400">
                                            {step.type === 'TRIGGER' ? step.config.event :
                                                step.actionType === 'EMAIL' ? `Send "${step.config.subject}"` :
                                                    step.actionType === 'SMS' ? 'Send SMS' :
                                                        `Wait ${step.config.duration}`}
                                        </p>
                                    </div>
                                </React.Fragment>
                            ))}

                            <ArrowRight className="text-slate-600 min-w-[20px]" />

                            <button className="min-w-[40px] h-[40px] rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-500 transition-colors">
                                <Plus size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
