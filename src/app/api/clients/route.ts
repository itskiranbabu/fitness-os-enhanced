import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const getSupabase = () => {
    if (!supabaseUrl || !supabaseServiceKey) return null;
    return createClient(supabaseUrl, supabaseServiceKey);
};

export async function GET() {
    const supabase = getSupabase();

    if (!supabase) {
        // DEMO DATA matching the screenshot
        return NextResponse.json({
            clients: [
                { id: '1', name: 'Example Lead', email: 'lead@example.com', status: 'Lead', program: 'Interest', progress: 0, last_check_in: null },
                { id: '2', name: 'Alice Smith', email: 'alice@gym.com', status: 'Active', program: 'Hypertrophy', progress: 45, last_check_in: '2025-12-04' },
                { id: '3', name: 'Bob Jones', email: 'bob@run.com', status: 'Churned', program: 'Marathon Prep', progress: 100, last_check_in: '2025-11-20' }
            ],
            isDemo: true
        });
    }

    const { data, error } = await supabase.from('clients').select('*').order('created_at', { ascending: false });

    if (error) {
        console.error('Supabase Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ clients: data });
}

export async function POST(request: Request) {
    const body = await request.json();
    const supabase = getSupabase();

    if (!supabase) {
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return NextResponse.json({
            success: true,
            client: {
                id: 'demo-' + Date.now(),
                ...body,
                created_at: new Date().toISOString(),
                progress: 0
            },
            isDemo: true
        });
    }

    const { data, error } = await supabase.from('clients').insert({
        ...body,
        created_at: new Date().toISOString(),
        progress: 0 // Default
    }).select().single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, client: data });
}
