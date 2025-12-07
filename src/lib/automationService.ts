import { sendWelcomeEmail } from './emailService';

interface AutomationTrigger {
    event: 'client_created' | 'lead_captured' | 'payment_received';
    data: {
        name: string;
        email: string;
        phone?: string;
        vertical: string;
    };
}

export const sendWhatsAppMessage = (name: string, phone: string, vertical: string) => {
    const verticalMessages: Record<string, string> = {
        FITNESS_OS: `Hi ${name}! 💪 Welcome to our fitness family! We're thrilled to have you start your transformation journey with us. Your coach will reach out within 24 hours to schedule your first session. Let's crush those goals together!`,
        AGENCY_OS: `Hi ${name}! 🚀 Welcome aboard! We're excited to partner with you and help scale your business to new heights. Our team will be in touch shortly to kick off your onboarding. Here's to explosive growth!`,
        REAL_ESTATE_OS: `Hi ${name}! 🏡 Welcome to our real estate family! We're committed to helping you find your dream property or sell at the best price. Your dedicated agent will contact you within 24 hours. Let's make it happen!`,
        CREATOR_OS: `Hi ${name}! ✨ Welcome to the creator community! We're excited to help you grow your audience and monetize your passion. Your success manager will reach out soon to get you started. Let's build something amazing!`
    };

    const message = verticalMessages[vertical] || `Hi ${name}! Welcome to our program. We're excited to have you on board and look forward to working with you!`;
    const encodedMessage = encodeURIComponent(message);
    const cleanPhone = phone.replace(/\D/g, '');

    console.log(`📱 Opening WhatsApp for ${name} at ${cleanPhone}`);
    window.open(`https://wa.me/${cleanPhone}?text=${encodedMessage}`, '_blank');
};

export const executeAutomation = async (trigger: AutomationTrigger): Promise<{
    email: boolean;
    whatsapp: boolean;
}> => {
    const { event, data } = trigger;
    const results = { email: false, whatsapp: false };

    console.log(`🤖 Executing automation for event: ${event}`, data);

    // Check which automations should run for this trigger
    const shouldSendEmail = ['client_created', 'lead_captured'].includes(event);
    const shouldSendWhatsApp = ['client_created'].includes(event) && data.phone;

    // Send Email
    if (shouldSendEmail && data.email) {
        try {
            results.email = await sendWelcomeEmail(data.name, data.email, data.vertical);
            if (results.email) {
                console.log(`✅ Automation: Email sent to ${data.email}`);
            } else {
                console.log(`⚠️ Automation: Email failed for ${data.email}`);
            }
        } catch (error) {
            console.error('❌ Automation: Email error:', error);
        }
    }

    // Send WhatsApp
    if (shouldSendWhatsApp && data.phone) {
        try {
            sendWhatsAppMessage(data.name, data.phone, data.vertical);
            results.whatsapp = true;
            console.log(`✅ Automation: WhatsApp sent to ${data.phone}`);
        } catch (error) {
            console.error('❌ Automation: WhatsApp error:', error);
        }
    }

    // Log automation execution
    try {
        await fetch('/api/automations/log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event,
                results,
                timestamp: new Date().toISOString()
            })
        });
    } catch (error) {
        console.error('Failed to log automation:', error);
    }

    return results;
};

// Helper function to trigger automation on client creation
export const triggerClientCreatedAutomation = async (
    name: string,
    email: string,
    phone: string | undefined,
    vertical: string
) => {
    return executeAutomation({
        event: 'client_created',
        data: { name, email, phone, vertical }
    });
};

// Helper function to trigger automation on lead capture
export const triggerLeadCapturedAutomation = async (
    name: string,
    email: string,
    phone: string | undefined,
    vertical: string
) => {
    return executeAutomation({
        event: 'lead_captured',
        data: { name, email, phone, vertical }
    });
};
