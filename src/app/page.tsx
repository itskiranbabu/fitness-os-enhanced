import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-colitems-center justify-center p-8 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 mt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md text-sm text-slate-300 mb-4">
          <Sparkles size={16} className="text-amber-400" />
          <span>BusinessOS.ai is live</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
          The Operating System <br /> for Modern Business
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          AI-powered pipelines, drag-and-drop funnels, and automated growth engines. All in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link
            href="/onboarding"
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/25"
          >
            Start Onboarding
            <ArrowRight size={20} />
          </Link>
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-slate-900 border border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl font-bold text-lg transition-all"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

      <div className="mt-20">
        <img
          src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
          alt="Dashboard Preview"
          className="rounded-xl border border-slate-800 shadow-2xl opacity-50 hover:opacity-100 transition-opacity duration-700"
        />
      </div>
    </div>
  );
}
