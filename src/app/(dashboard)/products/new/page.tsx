'use client';

import React, { useState } from 'react';
import { ArrowLeft, DollarSign, Package, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <div className="mb-8">
                <Link href="/dashboard" className="text-slate-400 hover:text-white flex items-center gap-2 mb-4 text-sm">
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-white mb-2">Create New Product</h1>
                <p className="text-slate-400">Set up a new digital product or service.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Product Details */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                            <Package size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Product Details</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Product Name</label>
                            <input
                                type="text"
                                placeholder="e.g. 12-Week Transformation Program"
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-2">Description</label>
                            <textarea
                                placeholder="Describe what's included..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none h-32 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Price ($)</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="number"
                                        placeholder="97.00"
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Billing Type</label>
                                <select className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none appearance-none">
                                    <option>One-time Payment</option>
                                    <option>Monthly Subscription</option>
                                    <option>Yearly Subscription</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Gateway */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                            <CreditCard size={20} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Payment Processing</h2>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-[#635BFF] rounded-lg flex items-center justify-center text-white font-bold text-xl">S</div>
                            <div>
                                <h3 className="text-white font-bold">Stripe Connect</h3>
                                <p className="text-sm text-slate-400">Accept payments securely</p>
                            </div>
                        </div>
                        <button type="button" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors">
                            Connect Account
                        </button>
                    </div>
                </div>

                <div className="flex justify-end gap-4">
                    <button type="button" className="px-6 py-3 text-slate-400 hover:text-white font-medium">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}
