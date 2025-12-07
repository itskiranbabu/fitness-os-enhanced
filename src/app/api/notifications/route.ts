import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { name, email, phone, vertical, type } = await request.json();

        console.log('📬 Notification request:', { name, email, phone, vertical, type });

        const results = {
            email: false,
            whatsapp: false
        };

        // Send Email via EmailJS (client-side will handle this)
        // This endpoint is for logging and tracking
        if (email && type !== 'whatsapp-only') {
            results.email = true;
            console.log(`✅ Email notification queued for ${email}`);
        }

        // WhatsApp notification (opens WhatsApp Web)
        if (phone && type !== 'email-only') {
            results.whatsapp = true;
            console.log(`✅ WhatsApp notification queued for ${phone}`);
        }

        return NextResponse.json({
            success: true,
            results,
            message: 'Notifications processed'
        });

    } catch (error) {
        console.error('❌ Notification error:', error);
        return NextResponse.json(
            { error: 'Failed to process notifications' },
            { status: 500 }
        );
    }
}
