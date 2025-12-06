import emailjs from '@emailjs/browser';

interface EmailParams {
    to_name: string;
    to_email: string;
    from_name?: string;
    message?: string;
    subject?: string;
}

export const sendEmail = async (params: EmailParams): Promise<boolean> => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || process.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS credentials not configured');
        return false;
    }

    try {
        const response = await emailjs.send(
            serviceId,
            templateId,
            {
                to_name: params.to_name,
                to_email: params.to_email,
                from_name: params.from_name || 'BusinessOS',
                message: params.message || 'Welcome to our program!',
                subject: params.subject || 'Welcome!'
            },
            publicKey
        );

        console.log('✅ Email sent successfully:', response);
        return response.status === 200;
    } catch (error) {
        console.error('❌ Email sending failed:', error);
        return false;
    }
};

export const sendWelcomeEmail = async (name: string, email: string, vertical: string): Promise<boolean> => {
    const verticalMessages: Record<string, { subject: string; message: string }> = {
        FITNESS_OS: {
            subject: '💪 Welcome to Your Fitness Journey!',
            message: `Hi ${name}! Welcome to our fitness family! We're thrilled to have you start your transformation journey with us. Your coach will reach out within 24 hours to schedule your first session. Let's crush those goals together!`
        },
        AGENCY_OS: {
            subject: '🚀 Welcome to Growth Partnership!',
            message: `Hi ${name}! Welcome aboard! We're excited to partner with you and help scale your business to new heights. Our team will be in touch shortly to kick off your onboarding. Here's to explosive growth!`
        },
        REAL_ESTATE_OS: {
            subject: '🏡 Welcome to Your Real Estate Journey!',
            message: `Hi ${name}! Welcome to our real estate family! We're committed to helping you find your dream property or sell at the best price. Your dedicated agent will contact you within 24 hours. Let's make it happen!`
        },
        CREATOR_OS: {
            subject: '✨ Welcome to the Creator Community!',
            message: `Hi ${name}! Welcome to the creator community! We're excited to help you grow your audience and monetize your passion. Your success manager will reach out soon to get you started. Let's build something amazing!`
        }
    };

    const template = verticalMessages[vertical] || {
        subject: 'Welcome!',
        message: `Hi ${name}! Welcome to our program. We're excited to have you on board and look forward to working with you!`
    };

    return sendEmail({
        to_name: name,
        to_email: email,
        subject: template.subject,
        message: template.message
    });
};
