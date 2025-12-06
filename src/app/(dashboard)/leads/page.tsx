'use client';

import React, { useState } from 'react';
import { useLeads } from '@/hooks/useLeads';
import { useBusinessOS } from '@/providers/BusinessOSProvider';
import { sendWelcomeEmail } from '@/lib/emailService';
import {
    Users,
    Search,
    Filter,
    Phone,
    Mail,
    MessageSquare,
    UserPlus,
    CheckCircle,
    Loader2
} from 'lucide-react';
import { format } from 'date-fns';

export default function LeadsPage() {
    const { leads, loading, error } = useLeads('test-project-1');
    const { config } = useBusinessOS();
    const [searchTerm, setSearchTerm] = useState('');
    const [convertingLead, setConvertingLead] = useState<string | null>(null);

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sendWhatsAppMessage = (name: string, phone: string) => {
        const verticalMessages: Record<string, string> = {
            FITNESS_OS: `Hi ${name}! 💪 Welcome to our fitness family! We're thrilled to have you start your transformation journey with us. Your coach will reach out within 24 hours to schedule your first session. Let's crush those goals together!`,
            AGENCY_OS: `Hi ${name}! 🚀 Welcome aboard! We're excited to partner with you and help scale your business to new heights. Our team will be in touch shortly to kick off your onboarding. Here's to explosive growth!`,
            REAL_ESTATE_OS: `Hi ${name}! 🏡 Welcome to our real estate family! We're committed to helping you find your dream property or sell at the best price. Your dedicated agent will contact you within 24 hours. Let's make it happen!`,
            CREATOR_OS: `Hi ${name}! ✨ Welcome to the creator community! We're excited to help you grow your audience and monetize your passion. Your success manager will reach out soon to get you started. Let's build something amazing!`
        };

        const message = verticalMessages[config.vertical] || `Hi ${name}! Welcome to our program. We're excited to have you on board and look forward to working with you!`;
        const encodedMessage = encodeURIComponent(message);
        const cleanPhone = phone.replace(/\D/g, '');
        window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, '_blank');
    };

    const convertToClient = async (lead: any) => {
        setConvertingLead(lead.id);

        try {
            const res = await fetch('/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: lead.name,
                    email: lead.email,
                    phone: lead.phone || '',
                    status: 'Active',
                    program: 'Onboarding'
                })
            });

            if (res.ok) {
                // Send WhatsApp welcome message if phone exists
                if (lead.phone) {
                    sendWhatsAppMessage(lead.name, lead.phone);
                }

                // Send welcome email
                const emailSent = await sendWelcomeEmail(lead.name, lead.email, config.vertical);

                if (emailSent) {
                    console.log('✅ Welcome email sent to', lead.email);
                }

                // Show success message
                alert(`✅ ${lead.name} has been converted to a client! Welcome messages sent.`);

                // Refresh the page to update the list
                window.location.reload();
            } else {
                alert('Failed to convert lead. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        } finally {
            setConvertingLead(null);
        }
    };

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
                    <div className="p-12 text-center text-slate-500">
                        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                        Loading leads...
                    </div>
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
                                <th className="px-6 py-4 text-right">Actions</th>
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
                                            <a
                                                href={`mailto:${lead.email}`}
                                                className="p-1.5 bg-slate-800 rounded hover:bg-indigo-600 hover:text-white text-slate-400 transition-colors"
                                                title={lead.email}
                                            >
                                                <Mail size={14} />
                                            </a>
                                            {lead.phone && (
                                                <>
                                                    <a
                                                        href={`tel:${lead.phone}`}
                                                        className="p-1.5 bg-slate-800 rounded hover:bg-blue-600 hover:text-white text-slate-400 transition-colors"
                                                        title="Call"
                                                    >
                                                        <Phone size={14} />
                                                    </a>
                                                    <button
                                                        onClick={() => sendWhatsAppMessage(lead.name, lead.phone!)}
                                                        className="p-1.5 bg-slate-800 rounded hover:bg-green-600 hover:text-white text-slate-400 transition-colors"
                                                        title="Send WhatsApp"
                                                    >
                                                        <MessageSquare size={14} />
                                                    </button>
                                                </>
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
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => convertToClient(lead)}
                                                disabled={convertingLead === lead.id}
                                                className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                title="Convert to Client"
                                            >
                                                {convertingLead === lead.id ? (
                                                    <>
                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                        Converting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <UserPlus size={14} />
                                                        Convert
                                                    </>
                                                )}
                                            </button>
                                        </div>
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
