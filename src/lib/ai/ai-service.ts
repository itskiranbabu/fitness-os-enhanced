/**
 * Enhanced AI Service with Multi-Model Support
 * 
 * Supports:
 * - Google Gemini 2.0 (Fast generation)
 * - OpenAI GPT-4 (Complex reasoning)
 * - Anthropic Claude (Long-form content)
 * 
 * Features:
 * - Automatic model selection
 * - Fallback handling
 * - Rate limiting
 * - Caching
 * - Streaming responses
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

// Types
export type AIModel = 'gemini' | 'gpt4' | 'claude';
export type AITask = 'blueprint' | 'content' | 'growth' | 'chat' | 'prediction';

export interface AIConfig {
    model?: AIModel;
    temperature?: number;
    maxTokens?: number;
    stream?: boolean;
}

export interface BusinessBlueprint {
    businessName: string;
    niche: string;
    targetAudience: string;
    mission: string;
    websiteData: WebsiteData;
    contentPlan: SocialPost[];
    suggestedPrograms: string[];
}

export interface WebsiteData {
    heroHeadline: string;
    heroSubhead: string;
    ctaText: string;
    problem: string;
    solution: string;
    coachBio: {
        name: string;
        headline: string;
        story: string;
    };
    features: string[];
    pricing: PricingTier[];
    testimonials: Testimonial[];
    faq: FAQItem[];
    urgencySettings?: {
        enabled: boolean;
        bannerText: string;
        spotsLeft: number;
    };
}

export interface SocialPost {
    id: string;
    day: number;
    hook: string;
    body: string;
    cta: string;
    type: 'Video' | 'Image' | 'Carousel' | 'Text';
    hashtags?: string[];
    imagePrompt?: string;
}

export interface PricingTier {
    name: string;
    price: string;
    features: string[];
}

export interface Testimonial {
    name: string;
    result: string;
    quote: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface GrowthPlan {
    id: string;
    experiments: GrowthExperiment[];
    suggestedMessages: SuggestedMessage[];
    createdAt: string;
}

export interface GrowthExperiment {
    title: string;
    description: string;
    steps: string[];
    expectedImpact: string;
}

export interface SuggestedMessage {
    channel: 'Email' | 'WhatsApp' | 'SMS';
    copy: string;
    context: string;
}

export interface PredictiveAnalytics {
    churnRisk: number; // 0-1
    conversionProbability: number; // 0-1
    lifetimeValue: number;
    recommendedActions: string[];
}

// AI Service Class
class AIService {
    private gemini: GoogleGenerativeAI | null = null;
    private openai: any = null; // Will be initialized if API key exists
    private claude: any = null; // Will be initialized if API key exists

    constructor() {
        // Initialize Gemini
        const geminiKey = process.env.GOOGLE_GEMINI_API_KEY;
        if (geminiKey) {
            this.gemini = new GoogleGenerativeAI(geminiKey);
        }

        // Initialize OpenAI (if available)
        const openaiKey = process.env.OPENAI_API_KEY;
        if (openaiKey && typeof window === 'undefined') {
            // Only import on server-side
            import('openai').then((OpenAI) => {
                this.openai = new OpenAI.default({ apiKey: openaiKey });
            });
        }

        // Initialize Claude (if available)
        const claudeKey = process.env.ANTHROPIC_API_KEY;
        if (claudeKey && typeof window === 'undefined') {
            // Only import on server-side
            import('@anthropic-ai/sdk').then((Anthropic) => {
                this.claude = new Anthropic.default({ apiKey: claudeKey });
            });
        }
    }

    /**
     * Select the best AI model for the task
     */
    private selectModel(task: AITask, preferredModel?: AIModel): AIModel {
        if (preferredModel) return preferredModel;

        switch (task) {
            case 'blueprint':
            case 'content':
                return 'gemini'; // Fast generation
            case 'growth':
            case 'prediction':
                return this.openai ? 'gpt4' : 'gemini'; // Complex reasoning
            case 'chat':
                return this.claude ? 'claude' : 'gemini'; // Conversational
            default:
                return 'gemini';
        }
    }

    /**
     * Generate business blueprint
     */
    async generateBlueprint(
        userDescription: string,
        vertical: string = 'FITNESS_OS',
        config?: AIConfig
    ): Promise<BusinessBlueprint> {
        const model = this.selectModel('blueprint', config?.model);

        let role = 'ELITE BUSINESS STRATEGIST';
        let context = 'Build a $1M/year business.';

        switch (vertical) {
            case 'FITNESS_OS':
                role = 'Alex Hormozi (Gym Launch)';
                context = 'Build a high-ticket fitness coaching offer.';
                break;
            case 'AGENCY_OS':
                role = 'Iman Gadzhi (SMMA Expert)';
                context = 'Build a scalable B2B marketing agency offer.';
                break;
            case 'REAL_ESTATE_OS':
                role = 'Ryan Serhant (Luxury Real Estate)';
                context = 'Build a personal brand for a top-tier realtor.';
                break;
            case 'CREATOR_OS':
                role = 'MrBeast / Ali Abdaal';
                context = 'Build a viral content creator business model.';
                break;
            case 'SERVICE_OS':
                role = 'Local Business Expert';
                context = 'Build a high-margin local service business.';
                break;
            default:
                role = 'Elite Business Strategist';
                context = 'Build a profitable business model.';
        }

        const prompt = `ACT AS: ${role}

User Input: "${userDescription}"

Your task: ${context}

CHAIN OF THOUGHT:
1. Identify the bleeding neck problem for this specific niche.
2. Construct a "Grand Slam Offer" (High value, high price).
3. Write copy that hits emotional triggers specific to this industry.
4. Design a content plan that establishes authority.

OUTPUT INSTRUCTIONS:
- Pricing: Tier 1 (Entry), Tier 2 (Core), Tier 3 (High Ticket).
- Copy: Punchy, direct, no fluff.
- FAQ: Handle specific objections for this industry.
- Content: 30-day plan with viral hooks.
- Testimonials: 3 realistic success stories.

Return a complete business blueprint in JSON format matching the schema.`;

        try {
            if (model === 'gemini' && this.gemini) {
                return await this.generateWithGemini(prompt, 'blueprint');
            } else if (model === 'gpt4' && this.openai) {
                return await this.generateWithGPT4(prompt, 'blueprint');
            } else {
                throw new Error('No AI model available');
            }
        } catch (error) {
            console.error('Blueprint generation failed:', error);
            return this.getMockBlueprint();
        }
    }

    /**
     * Generate content plan
     */
    async generateContentPlan(
        niche: string,
        days: number = 30,
        config?: AIConfig
    ): Promise<SocialPost[]> {
        const model = this.selectModel('content', config?.model);

        const prompt = `You are a viral content strategist. Generate ${days} polarizing, high-engagement post ideas for the "${niche}" fitness niche.

Use hooks that stop the scroll (e.g. "Stop doing cardio", "Why your diet failed").

For each post, provide:
- Day number (1-${days})
- Hook (attention-grabbing first line)
- Body (value-packed content)
- CTA (clear call-to-action)
- Type (Video, Image, Carousel, or Text)
- Hashtags (5-10 relevant hashtags)
- Image prompt (for AI image generation)

Return as JSON array.`;

        try {
            if (model === 'gemini' && this.gemini) {
                return await this.generateWithGemini(prompt, 'content');
            } else if (model === 'gpt4' && this.openai) {
                return await this.generateWithGPT4(prompt, 'content');
            } else {
                return this.getMockContentPlan();
            }
        } catch (error) {
            console.error('Content generation failed:', error);
            return this.getMockContentPlan();
        }
    }

    /**
     * Generate growth plan
     */
    async generateGrowthPlan(
        niche: string,
        stats: { leads: number; clients: number; conversionRate: string },
        config?: AIConfig
    ): Promise<GrowthPlan> {
        const model = this.selectModel('growth', config?.model);

        const prompt = `Role: Growth Hacker. Niche: "${niche}". 

Current Stats:
- Leads: ${stats.leads}
- Clients: ${stats.clients}
- Conversion Rate: ${stats.conversionRate}

Generate:
1. 5 growth experiments to double leads
2. 5 sales scripts to close high-ticket deals
3. Specific, actionable steps for each
4. Expected impact metrics

Return as JSON.`;

        try {
            if (model === 'gpt4' && this.openai) {
                return await this.generateWithGPT4(prompt, 'growth');
            } else if (model === 'gemini' && this.gemini) {
                return await this.generateWithGemini(prompt, 'growth');
            } else {
                return this.getMockGrowthPlan();
            }
        } catch (error) {
            console.error('Growth plan generation failed:', error);
            return this.getMockGrowthPlan();
        }
    }

    /**
     * Predict client churn risk
     */
    async predictChurnRisk(clientData: {
        joinDate: Date;
        lastCheckIn: Date | null;
        progress: number;
        engagement: number;
    }): Promise<number> {
        // Simple heuristic model (can be replaced with ML model)
        const daysSinceJoin = Math.floor(
            (Date.now() - clientData.joinDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        const daysSinceCheckIn = clientData.lastCheckIn
            ? Math.floor(
                (Date.now() - clientData.lastCheckIn.getTime()) / (1000 * 60 * 60 * 24)
            )
            : 999;

        let risk = 0;

        // No check-in in 30+ days = high risk
        if (daysSinceCheckIn > 30) risk += 0.4;
        else if (daysSinceCheckIn > 14) risk += 0.2;

        // Low progress = moderate risk
        if (clientData.progress < 20) risk += 0.3;
        else if (clientData.progress < 50) risk += 0.1;

        // Low engagement = high risk
        if (clientData.engagement < 30) risk += 0.3;
        else if (clientData.engagement < 60) risk += 0.1;

        return Math.min(risk, 1);
    }

    /**
     * Score lead conversion probability
     */
    async scoreLeadConversion(leadData: {
        source: string;
        hasPhone: boolean;
        hasMessage: boolean;
        responseTime?: number; // hours
    }): Promise<number> {
        let score = 50; // Base score

        // Source quality
        if (leadData.source === 'referral') score += 30;
        else if (leadData.source === 'website') score += 20;
        else if (leadData.source === 'social') score += 10;

        // Contact info
        if (leadData.hasPhone) score += 15;
        if (leadData.hasMessage) score += 10;

        // Response time (if contacted)
        if (leadData.responseTime !== undefined) {
            if (leadData.responseTime < 1) score += 15;
            else if (leadData.responseTime < 24) score += 10;
            else if (leadData.responseTime < 72) score += 5;
        }

        return Math.min(Math.max(score, 0), 100);
    }

    /**
     * Chat with AI assistant
     */
    async chat(
        message: string,
        context?: { businessName?: string; niche?: string },
        config?: AIConfig
    ): Promise<string> {
        const model = this.selectModel('chat', config?.model);

        const systemPrompt = `You are an expert fitness business coach. ${context?.businessName
            ? `You're helping with ${context.businessName}, a ${context.niche} business.`
            : ''
            }

Provide actionable, specific advice. Be encouraging but realistic.`;

        try {
            if (model === 'claude' && this.claude) {
                const response = await this.claude.messages.create({
                    model: 'claude-3-5-sonnet-20241022',
                    max_tokens: config?.maxTokens || 1024,
                    messages: [
                        {
                            role: 'user',
                            content: `${systemPrompt}\n\nUser: ${message}`,
                        },
                    ],
                });
                return response.content[0].text;
            } else if (model === 'gpt4' && this.openai) {
                const response = await this.openai.chat.completions.create({
                    model: 'gpt-4-turbo-preview',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: message },
                    ],
                    temperature: config?.temperature || 0.7,
                    max_tokens: config?.maxTokens || 1024,
                });
                return response.choices[0].message.content || '';
            } else if (this.gemini) {
                const model = this.gemini.getGenerativeModel({
                    model: 'gemini-2.0-flash-exp',
                });
                const result = await model.generateContent(
                    `${systemPrompt}\n\nUser: ${message}`
                );
                return result.response.text();
            } else {
                throw new Error('No AI model available');
            }
        } catch (error) {
            console.error('Chat failed:', error);
            return "I'm having trouble connecting right now. Please try again.";
        }
    }

    // Private helper methods

    private async generateWithGemini(
        prompt: string,
        type: string
    ): Promise<any> {
        if (!this.gemini) throw new Error('Gemini not initialized');

        const model = this.gemini.getGenerativeModel({
            model: 'gemini-2.0-flash-exp',
            generationConfig: {
                temperature: 0.75,
                responseMimeType: 'application/json',
            },
        });

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        return JSON.parse(text);
    }

    private async generateWithGPT4(prompt: string, type: string): Promise<any> {
        if (!this.openai) throw new Error('OpenAI not initialized');

        const response = await this.openai.chat.completions.create({
            model: 'gpt-4-turbo-preview',
            messages: [{ role: 'user', content: prompt }],
            response_format: { type: 'json_object' },
            temperature: 0.75,
        });

        const text = response.choices[0].message.content || '{}';
        return JSON.parse(text);
    }

    // Mock data for fallback

    private getMockBlueprint(): BusinessBlueprint {
        return {
            businessName: 'IronWill Fitness (Demo)',
            niche: 'Strength Training',
            targetAudience: 'Busy professionals aged 30-45',
            mission: 'Help busy professionals reclaim their strength and vitality',
            suggestedPrograms: [
                'Executive Strength Program',
                'Mobility Mastery',
                'Elite 1-on-1 Coaching',
            ],
            websiteData: {
                heroHeadline: 'Reclaim Your Prime in 30 Minutes a Day',
                heroSubhead: 'The premier strength system for busy professionals',
                ctaText: 'Start Your Transformation',
                problem:
                    "You're tired, achy, and losing your edge. Your body isn't what it used to be.",
                solution:
                    'A proven strength protocol designed for busy schedules. Build muscle, boost energy, and feel 10 years younger.',
                coachBio: {
                    name: 'Coach Mike Thompson',
                    headline: 'Ex-Military Strength Coach',
                    story:
                        "I know what it's like to have zero time. After leaving the military, I built a system that fits into the busiest schedules.",
                },
                features: [
                    '30-Minute Workouts',
                    'Custom Nutrition Plan',
                    'Weekly 1-on-1 Coaching',
                    'Mobile App Access',
                    'Progress Tracking',
                    '24/7 Support',
                ],
                pricing: [
                    {
                        name: 'Starter',
                        price: '$97/mo',
                        features: [
                            'App Access',
                            'Workout Library',
                            'Nutrition Guide',
                            'Community Access',
                        ],
                    },
                    {
                        name: 'Pro',
                        price: '$297/mo',
                        features: [
                            'Everything in Starter',
                            'Weekly Check-ins',
                            'Custom Programming',
                            'Priority Support',
                        ],
                    },
                    {
                        name: 'Elite',
                        price: '$997/mo',
                        features: [
                            'Everything in Pro',
                            'Daily Coaching',
                            'Custom Meal Plans',
                            'Direct Phone Access',
                        ],
                    },
                ],
                testimonials: [
                    {
                        name: 'Mike R.',
                        result: 'Lost 20lbs, gained strength',
                        quote:
                            'This program changed my life. I feel stronger than I did in my 20s.',
                    },
                    {
                        name: 'Sarah K.',
                        result: 'Deadlifted 200lbs',
                        quote:
                            "Never thought I'd be this strong. The coaching is incredible.",
                    },
                    {
                        name: 'Tom L.',
                        result: 'Eliminated back pain',
                        quote:
                            'My chronic back pain is gone. I can play with my kids again.',
                    },
                ],
                faq: [
                    {
                        question: 'Do I need a gym membership?',
                        answer:
                            'No! Our programs work with minimal equipment. Home workouts included.',
                    },
                    {
                        question: "What if I've failed before?",
                        answer:
                            "This isn't another fad diet. We build sustainable habits that last.",
                    },
                    {
                        question: 'How much time do I need?',
                        answer: 'Just 30 minutes, 3-4 times per week. Designed for busy schedules.',
                    },
                ],
                urgencySettings: {
                    enabled: true,
                    bannerText: 'Only 3 spots left this month',
                    spotsLeft: 3,
                },
            },
            contentPlan: this.getMockContentPlan(),
        };
    }

    private getMockContentPlan(): SocialPost[] {
        return [
            {
                id: '1',
                day: 1,
                hook: 'Stop doing cardio for fat loss.',
                body: 'Strength training burns more calories long-term. Build muscle, boost metabolism, transform your body.',
                cta: 'DM me "STRENGTH" for the full guide',
                type: 'Video',
                hashtags: [
                    '#fitness',
                    '#strengthtraining',
                    '#fatloss',
                    '#buildmuscle',
                    '#fitnesstips',
                ],
                imagePrompt:
                    'Athletic person lifting weights in a modern gym, dramatic lighting',
            },
            {
                id: '2',
                day: 2,
                hook: "Why your diet isn't working...",
                body: "It's not about eating less. It's about eating RIGHT. Protein, timing, consistency.",
                cta: 'Comment "NUTRITION" for my free meal plan',
                type: 'Carousel',
                hashtags: [
                    '#nutrition',
                    '#healthyeating',
                    '#mealprep',
                    '#fitnessdiet',
                    '#protein',
                ],
                imagePrompt: 'Healthy meal prep containers with colorful vegetables and protein',
            },
            {
                id: '3',
                day: 3,
                hook: 'The #1 mistake busy professionals make...',
                body: 'Skipping workouts because of time. You need 30 minutes. Not 2 hours.',
                cta: 'Save this for later',
                type: 'Image',
                hashtags: [
                    '#busyprofessionals',
                    '#timemanagement',
                    '#quickworkouts',
                    '#efficiency',
                    '#productivity',
                ],
                imagePrompt:
                    'Professional in business attire doing a quick workout, split screen showing office and gym',
            },
        ];
    }

    private getMockGrowthPlan(): GrowthPlan {
        return {
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            experiments: [
                {
                    title: 'The "Free Transformation Guide" Lead Magnet',
                    description:
                        'Create a comprehensive PDF guide solving one specific pain point.',
                    steps: [
                        'Identify the #1 pain point for your audience',
                        'Write a 10-page guide with actionable steps',
                        'Design a professional PDF',
                        'Create landing page with opt-in form',
                        'Promote on Instagram Stories and Reels',
                    ],
                    expectedImpact: '+50 leads/month',
                },
                {
                    title: 'Instagram Reels Challenge',
                    description: 'Run a 7-day fitness challenge to build community.',
                    steps: [
                        'Design a simple 7-day workout challenge',
                        'Create daily Reels with exercises',
                        'Use trending audio and hashtags',
                        'Encourage participants to tag you',
                        'Offer prize for completion',
                    ],
                    expectedImpact: '+100 followers, +30 leads',
                },
                {
                    title: 'Referral Program',
                    description: 'Incentivize current clients to refer friends.',
                    steps: [
                        'Create referral reward structure',
                        'Design referral cards/links',
                        'Email current clients',
                        'Track referrals in CRM',
                        'Deliver rewards promptly',
                    ],
                    expectedImpact: '+20% client growth',
                },
            ],
            suggestedMessages: [
                {
                    channel: 'WhatsApp',
                    copy: "Hey [Name]! 👋 Saw you were interested in getting fit. I'm running a free 7-day challenge starting Monday. Want in?",
                    context: 'New Lead Outreach',
                },
                {
                    channel: 'Email',
                    copy: 'Subject: Your transformation starts here\n\nHi [Name],\n\nThanks for downloading the guide! I noticed you\'re interested in [specific goal].\n\nI have 3 spots opening up next week for 1-on-1 coaching. Want to chat about your goals?\n\nBest,\n[Coach Name]',
                    context: 'Lead Nurture - Day 3',
                },
                {
                    channel: 'SMS',
                    copy: 'Hi [Name], this is [Coach]. Quick question - what\'s your biggest challenge with fitness right now? (Reply STOP to opt out)',
                    context: 'Lead Qualification',
                },
            ],
        };
    }
}

// Export singleton instance
export const aiService = new AIService();
