export interface WebsiteData {
    heroHeadline: string;
    heroSubhead: string;
    ctaText: string;
    problem?: string;
    solution?: string;
    coachBio?: {
        name: string;
        headline: string;
        story: string;
    };
    features: string[];
    pricing: {
        name: string;
        price: string;
        features: string[];
    }[];
    testimonials: {
        name: string;
        result: string;
        quote: string;
    }[];
    faq?: {
        question: string;
        answer: string;
    }[];
    urgencySettings?: {
        enabled: boolean;
        bannerText: string;
        spotsLeft?: number;
    };
    publishedUrl?: string;
}

export interface BusinessBlueprint {
    id: string;
    businessName: string;
    websiteData: WebsiteData;
    // ... other fields
}
