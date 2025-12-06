'use client';

import React, { useEffect, useState } from 'react';
import { Search, Plus, Phone, MessageSquare, PenSquare, Trash2, Mail, MoreHorizontal } from 'lucide-react';

interface Client {
    id: string;
    name: string;
    email: string;
    status: string;
    program: string;
    progress: number;
    last_check_in?: string;
    phone?: string;
}

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    // Form State
    const [newClient, setNewClient] = useState({ name: '', email: '', phone: '', program: 'Interest', status: 'Lead' });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/clients');
            const data = await res.json();
            if (data.clients) setClients(data.clients);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddClient = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/clients', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newClient)
            });
            if (res.ok) {
                const data = await res.json();
                setShowAddModal(false);
                setNewClient({ name: '', email: '', phone: '', program: 'Interest', status: 'Lead' });
                fetchClients(); // Refresh

                // Send notifications
                if (data.client && newClient.phone) {
                    sendWhatsAppNotification(newClient.name, newClient.phone);
                }
                if (data.client && newClient.email) {
                    sendEmailNotification(newClient.name, newClient.email);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const sendWhatsAppNotification = (name: string, phone: string) => {
        const message = encodeURIComponent(`Hi ${name}! Welcome to our program. We're excited to have you on board! 🎉`);
        window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${message}`, '_blank');
    };

    const sendEmailNotification = async (name: string, email: string) => {
        // In production, this would call an API route that uses Resend/SendGrid
        console.log(`📧 Email notification sent to ${name} (${email})`);
        // TODO: Implement actual email sending via /api/send-email
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this client?')) return;

        try {
            const res = await fetch(`/api/clients/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setClients(prev => prev.filter(c => c.id !== id));
            } else {
                alert('Failed to delete');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">CRM</h1>
                    <p className="text-slate-400">Manage your athletes, payments, and progress.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20"
                >
                    <Plus size={20} /> Add Client
                </button>
            </div>

            {/* Search & Filter Bar */}
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                    <input
                        type="text"
                        placeholder="Search clients..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-12 pr-4 py-3 text-white outline-none focus:border-indigo-500 transition-colors"
                    />
                </div>
                <select className="bg-slate-950 border border-slate-800 rounded-lg px-6 text-slate-300 outline-none focus:border-indigo-500 cursor-pointer">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Lead</option>
                    <option>Churned</option>
                </select>
            </div>

            {/* Clients Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-950/50 border-b border-slate-800 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <th className="p-6">Name / Contact</th>
                            <th className="p-6">Status</th>
                            <th className="p-6">Program</th>
                            <th className="p-6">Progress</th>
                            <th className="p-6">Last Check-In</th>
                            <th className="p-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {isLoading ? (
                            <tr><td colSpan={6} className="p-8 text-center text-slate-500">Loading...</td></tr>
                        ) : clients.length === 0 ? (
                            <tr><td colSpan={6} className="p-8 text-center text-slate-500">No clients found. Add one to get started.</td></tr>
                        ) : clients.map(client => (
                            <tr key={client.id} className="hover:bg-slate-800/50 transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 uppercase">
                                            {client.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{client.name}</div>
                                            <div className="text-sm text-slate-500">{client.email}</div>
                                            {client.phone && <div className="text-xs text-slate-600">{client.phone}</div>}
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${client.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                        client.status === 'Lead' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                            'bg-slate-800 text-slate-400 border-slate-700'
                                        }`}>
                                        {client.status}
                                    </span>
                                </td>
                                <td className="p-6 text-slate-300 font-medium">{client.program}</td>
                                <td className="p-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden w-24">
                                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${client.progress}%` }}></div>
                                        </div>
                                        <span className="text-xs font-bold text-slate-500">{client.progress}%</span>
                                    </div>
                                </td>
                                <td className="p-6 text-slate-400 text-sm">
                                    {client.last_check_in ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                            {client.last_check_in}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                                            N/A
                                        </div>
                                    )}
                                </td>
                                <td className="p-6">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => client.phone && sendWhatsAppNotification(client.name, client.phone)}
                                            disabled={!client.phone}
                                            className="p-2 hover:bg-slate-700 rounded-lg text-green-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                            title={client.phone ? "WhatsApp" : "No phone number"}
                                        >
                                            <MessageSquare size={18} />
                                        </button>
                                        <button
                                            onClick={() => client.phone && window.open(`tel:${client.phone}`)}
                                            disabled={!client.phone}
                                            className="p-2 hover:bg-slate-700 rounded-lg text-blue-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                            title={client.phone ? "Call" : "No phone number"}
                                        >
                                            <Phone size={18} />
                                        </button>
                                        <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors" title="Edit">
                                            <PenSquare size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(client.id)} className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400 transition-colors" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table >
            </div >

            {/* Add Client Modal */}
            {
                showAddModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-white">Add New Client</h2>
                                <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
                            </div>
                            <form onSubmit={handleAddClient} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={newClient.name}
                                        onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                                        placeholder="e.g. John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={newClient.phone}
                                        onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                                        placeholder="+1 234 567 8900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-400 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={newClient.email}
                                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-400 mb-2">Status</label>
                                        <select
                                            value={newClient.status}
                                            onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 cursor-pointer"
                                        >
                                            <option>Lead</option>
                                            <option>Active</option>
                                            <option>Churned</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-400 mb-2">Program</label>
                                        <select
                                            value={newClient.program}
                                            onChange={(e) => setNewClient({ ...newClient, program: e.target.value })}
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500 cursor-pointer"
                                        >
                                            <option>Interest</option>
                                            <option>Hypertrophy</option>
                                            <option>Fat Loss</option>
                                            <option>Marathon Prep</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddModal(false)}
                                        className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-600/20"
                                    >
                                        Create Client
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
}
