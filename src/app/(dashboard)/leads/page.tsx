'use client';

import React, { useState } from 'react';
import { useLeads } from '@/hooks/useLeads';
import {
    Users,
    Search,
    Filter,
    MoreHorizontal,
    Phone,
    Mail,
    MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';

export default function LeadsPage() {
    const { leads, loading, error } = useLeads('test-project-1'); // Using test project ID for now
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto w-full min-h-screen">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">CRM Pipeline</h1>
                    <p className="text-slate-400">Manage and track your leads in real-time.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 text-center min-w-[120px]">
                        <div className="text-2xl font-bold text-white">{leads.length}</div>
                        <div className="text-xs text-slate-500 uppercase font-bold">Total Leads</div>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search leads..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-white focus:ring-1 focus:ring-indigo-500 outline-none"
                    />
                </div>
                <button className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white flex items-center gap-2">
                    <Filter size={16} />
                    Filter
                </button>
            </div>

            {/* Leads Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                {loading ? (
                    <div className="p-12 text-center text-slate-500">Loading leads...</div>
                ) : error ? (
                    <div className="p-12 text-center text-red-500">Error loading leads: {error}</div>
                ) : filteredLeads.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        <Users size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No leads found.</p>
                    </div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-slate-950/50 text-xs font-bold text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4">Source</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-slate-800/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-white">{lead.name}</div>
                                        <div className="text-xs text-slate-500">ID: {lead.id.slice(0, 8)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${lead.status === 'NEW' ? 'bg-blue-500/10 text-blue-400' :
                                                lead.status === 'CONTACTED' ? 'bg-amber-500/10 text-amber-400' :
                                                    'bg-emerald-500/10 text-emerald-400'
                                            }`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <a href={`mailto:${lead.email}`} className="p-1.5 bg-slate-800 rounded hover:bg-indigo-600 hover:text-white text-slate-400 transition-colors" title={lead.email}>
                                                <Mail size={14} />
                                            </a>
                                            {lead.phone && (
                                                <a href={`tel:${lead.phone}`} className="p-1.5 bg-slate-800 rounded hover:bg-green-600 hover:text-white text-slate-400 transition-colors">
                                                    <Phone size={14} />
                                                </a>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">
                                        {lead.source}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">
                                        {lead.created_at ? format(new Date(lead.created_at), 'MMM d, yyyy') : '-'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-500 hover:text-white p-2">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
