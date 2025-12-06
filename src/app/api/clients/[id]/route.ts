import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const getSupabase = () => {
    if (!supabaseUrl || !supabaseServiceKey) return null;
    return createClient(supabaseUrl, supabaseServiceKey);
};

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const supabase = getSupabase();

    if (!supabase) {
        // DEMO MODE
        return NextResponse.json({ success: true, message: "Deleted in Demo Mode" });
    }

    const { error } = await supabase.from('clients').delete().eq('id', id);

    if (error) {
        console.error('Delete Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const body = await request.json();
    const supabase = getSupabase();

    if (!supabase) {
        // DEMO MODE
        return NextResponse.json({ success: true, client: { ...body, id }, isDemo: true });
    }

    const { data, error } = await supabase.from('clients').update(body).eq('id', id).select().single();

    if (error) {
        console.error('Update Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, client: data });
}
