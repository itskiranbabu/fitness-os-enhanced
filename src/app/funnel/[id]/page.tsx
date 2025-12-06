import SalesPageRenderer from '@/components/funnel/SalesPageRenderer';
import { WebsiteData } from '@/lib/types';

// Mock Data Load
async function getFunnelData(id: string): Promise<WebsiteData> {
    // In real app: await db.funnels.findUnique({ where: { id } })
    return {
        heroHeadline: "Scale Your Fitness Business to $50k/mo",
        heroSubhead: "The exact blueprint used by 500+ coaches to automate client acquisition and delivery.",
        ctaText: "Get The Blueprint",
        problem: "You're stuck trading time for money. You love coaching, but you hate the hustle of finding new clients every single month.",
        solution: "We provide a plug-and-play operating system that automates your lead gen, sales, and client onboarding.",
        features: [
            "Automated Lead Pipeline",
            "High-Ticket Sales Script",
            "Client Success Dashboard"
        ],
        coachBio: {
            name: "Alex Hormozi",
            headline: "Founder of Gym Launch",
            story: "I started with nothing and built a $100M empire. Now I'm sharing the exact tools I used to get there."
        },
        pricing: [
            {
                name: "Starter",
                price: "$997",
                features: ["Core Curriculum", "Community Access", "Weekly Q&A"]
            },
            {
                name: "Inner Circle",
                price: "$2,997",
                features: ["Everything in Starter", "1-on-1 Mentorship", "Done-For-You Tech Setup"]
            }
        ],
        testimonials: [],
        faq: [
            {
                question: "Is this for beginners?",
                answer: "Yes, we have a track specifically for those just starting out."
            },
            {
                question: "How much time does it take?",
                answer: "We recommend 5-10 hours per week to implement the systems."
            }
        ],
        urgencySettings: {
            enabled: true,
            bannerText: "Doors Close in 48 Hours"
        }
    };
}

export default async function PublicFunnelPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getFunnelData(id);

    return (
        <SalesPageRenderer data={data} />
    );
}
