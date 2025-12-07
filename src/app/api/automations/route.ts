import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const getSupabase = () => {
    if (!supabaseUrl || !supabaseKey) return null;
    return createClient(supabaseUrl, supabaseKey);
};

// GET - Fetch all automations
export async function GET() {
    const supabase = getSupabase();

    if (!supabase) {
        // Return demo data if Supabase not configured
        return NextResponse.json({
            automations: [
                {
                    id: 'demo-1',
                    name: 'Welcome New Clients',
                    trigger: 'client_created',
                    actions: ['send_email', 'send_whatsapp'],
                    status: 'active',
                    runs: 24,
                    last_run: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                    created_at: new Date().toISOString()
                },
                {
                    id: 'demo-2',
                    name: 'Lead Follow-up',
                    trigger: 'lead_captured',
                    actions: ['send_email'],
                    status: 'active',
                    runs: 156,
                    last_run: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
                    created_at: new Date().toISOString()
                }
            ],
            isDemo: true
        });
    }

    try {
        const { data, error } = await supabase
            .from('automations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json({ automations: data || [] });
    } catch (error) {
        console.error('Error fetching automations:', error);
        return NextResponse.json({ error: 'Failed to fetch automations' }, { status: 500 });
    }
}

// POST - Create new automation
export async function POST(request: Request) {
    const supabase = getSupabase();
    const body = await request.json();

    if (!supabase) {
        // Demo mode
        return NextResponse.json({
            success: true,
            automation: {
                id: 'demo-' + Date.now(),
                ...body,
                runs: 0,
                created_at: new Date().toISOString()
            },
            isDemo: true
        });
    }

    try {
        const { data, error } = await supabase
            .from('automations')
            .insert({
                name: body.name,
                trigger: body.trigger,
                actions: body.actions,
                status: 'active',
                runs: 0
            })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, automation: data });
    } catch (error) {
        console.error('Error creating automation:', error);
        return NextResponse.json({ error: 'Failed to create automation' }, { status: 500 });
    }
}

// PATCH - Update automation
export async function PATCH(request: Request) {
    const supabase = getSupabase();
    const { id, ...updates } = await request.json();

    if (!supabase) {
        return NextResponse.json({
            success: true,
            isDemo: true
        });
    }

    try {
        const { data, error } = await supabase
            .from('automations')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, automation: data });
    } catch (error) {
        console.error('Error updating automation:', error);
        return NextResponse.json({ error: 'Failed to update automation' }, { status: 500 });
    }
}

// DELETE - Delete automation
export async function DELETE(request: Request) {
    const supabase = getSupabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }

    if (!supabase) {
        return NextResponse.json({
            success: true,
            isDemo: true
        });
    }

    try {
        const { error } = await supabase
            .from('automations')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting automation:', error);
        return NextResponse.json({ error: 'Failed to delete automation' }, { status: 500 });
    }
}
