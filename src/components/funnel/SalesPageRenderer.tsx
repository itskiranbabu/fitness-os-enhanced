'use client';

import React, { useState } from 'react';
import { WebsiteData } from '@/lib/types';
import { Check, Clock, Send, ChevronDown, CheckCircle, Loader2 } from 'lucide-react';

export default function SalesPageRenderer({ data, isPreview = false }: { data: WebsiteData, isPreview?: boolean }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/leads/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectId: 'test-project-1', // In real app this comes from domain/subdomain lookup
                    email: email,
                    name: name || 'Anonymous',
                    phone: phone,
                    source: 'Funnel: Sales Page'
                })
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`bg-white text-slate-900 font-sans ${isPreview ? 'pointer-events-none select-none' : ''}`}>

            {/* Navbar */}
            <header className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-slate-100 z-50 px-6 py-4 flex justify-between items-center">
                <div className="font-bold text-xl tracking-tight">FocusBrand</div>
                <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition-colors">
                    Get Started
                </button>
            </header>

            {/* Hero Section */}
            <section className="relative pt-20 pb-32 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full z-0 pointer-events-none">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl mix-blend-multiply" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl mix-blend-multiply" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    {data.urgencySettings?.enabled && (
                        <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-sm font-bold mb-8 border border-red-100 animate-pulse">
                            <Clock size={14} /> {data.urgencySettings.bannerText}
                        </div>
                    )}

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-[1.1] tracking-tight">
                        {data.heroHeadline}
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {data.heroSubhead}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 hover:scale-105 transition-all">
                            {data.ctaText}
                        </button>
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white" />
                                ))}
                            </div>
                            <span>Joined by 500+ others</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Problem Section */}
            {data.problem && (
                <section className="py-24 px-6 bg-slate-50 border-y border-slate-100">
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase mb-4 block">The Problem</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
                            Does this sound like you?
                        </h2>
                        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 text-left">
                            <p className="text-xl text-slate-700 leading-relaxed italic">
                                "{data.problem}"
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* Solution & Features */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <span className="text-indigo-600 font-bold tracking-wider text-sm uppercase mb-4 block">The Solution</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
                            {data.solution ? "Here's how we fix it." : "Everything you need to succeed."}
                        </h2>
                        <p className="text-lg text-slate-600">
                            {data.solution}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {data.features.map((feature, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                                    <Check size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature}</h3>
                                <p className="text-slate-500">Comprehensive module designed to deliver maximum impact directly to your workflow.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coach/Founder Bio */}
            {data.coachBio && (
                <section className="py-24 px-6 bg-[#0B0F19] text-white">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
                        <div className="w-64 h-64 bg-slate-800 rounded-full shrink-0 flex items-center justify-center text-6xl font-black text-slate-700">
                            {data.coachBio.name.charAt(0)}
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet {data.coachBio.name}</h2>
                            <p className="text-indigo-400 font-bold tracking-wide mb-6 uppercase text-sm">{data.coachBio.headline}</p>
                            <div className="prose prose-invert prose-lg text-slate-300">
                                <p>{data.coachBio.story}</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Pricing */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold text-center text-slate-900 mb-16">Simple Pricing</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {data.pricing.map((plan, i) => (
                            <div key={i} className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-lg relative overflow-hidden group hover:border-indigo-500 transition-colors">
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-5xl font-extrabold text-slate-900">{plan.price}</span>
                                    <span className="text-slate-500">/mo</span>
                                </div>
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-start gap-3 text-slate-600">
                                            <CheckCircle size={20} className="text-indigo-600 shrink-0 mt-0.5" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full py-4 rounded-xl font-bold text-lg bg-slate-900 text-white hover:bg-indigo-600 transition-colors">
                                    Choose Plan
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            {data.faq && data.faq.length > 0 && (
                <section className="py-24 px-6">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {data.faq.map((item, i) => (
                                <details key={i} className="group bg-white border border-slate-200 rounded-xl overflow-hidden">
                                    <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-lg text-slate-900 list-none">
                                        {item.question}
                                        <ChevronDown className="group-open:rotate-180 transition-transform text-slate-400" />
                                    </summary>
                                    <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                                        {item.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Footer Form */}
            <section className="py-24 px-6 bg-indigo-600 text-white text-center">
                <div className="max-w-xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to transform your life?</h2>
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="px-6 py-4 rounded-xl text-slate-900 text-lg outline-none focus:ring-4 ring-white/30 transition-all placeholder:text-slate-400"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-6 py-4 rounded-xl text-slate-900 text-lg outline-none focus:ring-4 ring-white/30 transition-all placeholder:text-slate-400"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="px-6 py-4 rounded-xl text-slate-900 text-lg outline-none focus:ring-4 ring-white/30 transition-all placeholder:text-slate-400"
                            />
                            <button
                                disabled={isLoading}
                                className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-2 disabled:opacity-80 active:scale-95 shadow-xl shadow-indigo-900/20"
                            >
                                {isLoading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
                                {data.ctaText || 'Get Instant Access'}
                            </button>
                        </form>
                    ) : (
                        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/20 animate-fade-in">
                            <CheckCircle size={48} className="mx-auto mb-4 text-white" />
                            <h3 className="text-2xl font-bold">You're on the list!</h3>
                            <p className="opacity-90 mt-2">Check your email for next steps.</p>
                            <button onClick={() => setSubmitted(false)} className="mt-6 text-sm underline opacity-60 hover:opacity-100">
                                Submit another
                            </button>
                        </div>
                    )}
                </div>
            </section>

            <footer className="bg-slate-900 text-slate-500 py-12 text-center text-sm">
                <p>&copy; 2024 FocusBrand. All rights reserved.</p>
            </footer>
        </div>
    );
}
