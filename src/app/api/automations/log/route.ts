import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const getSupabase = () => {
    if (!supabaseUrl || !supabaseKey) return null;
    return createClient(supabaseUrl, supabaseKey);
};

export async function POST(request: Request) {
    const supabase = getSupabase();
    const { event, results, timestamp } = await request.json();

    console.log('📊 Logging automation execution:', { event, results, timestamp });

    if (!supabase) {
        // Just log to console if no database
        console.log('✅ Automation logged (demo mode)');
        return NextResponse.json({ success: true, isDemo: true });
    }

    try {
        const { error } = await supabase
            .from('automation_logs')
            .insert({
                event,
                email_sent: results.email,
                whatsapp_sent: results.whatsapp,
                executed_at: timestamp
            });

        if (error) throw error;

        console.log('✅ Automation logged to database');
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('❌ Failed to log automation:', error);
        return NextResponse.json({ error: 'Failed to log automation' }, { status: 500 });
    }
}
