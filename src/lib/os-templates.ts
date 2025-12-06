import { WebsiteData } from '@/lib/types';
import { VerticalType } from '@/components/onboarding/VerticalSelector';

export const getTemplateByVertical = (vertical: VerticalType): WebsiteData => {
    switch (vertical) {
        case 'AGENCY_OS':
            return {
                heroHeadline: "Scale Your Agency to $50k/mo",
                heroSubhead: "The exact blueprint used by 500+ agency owners to automate client acquisition.",
                ctaText: "Get The Blueprint",
                problem: "You're stuck in the 'feast or famine' cycle. You're great at delivery, but you don't have a predictable way to get new clients.",
                solution: "We provide a plug-and-play agency operating system that automates your lead gen, hiring, and onboarding.",
                features: [
                    "Automated Outreach System",
                    "High-Ticket Sales Script",
                    "Client Fulfillment SOPs"
                ],
                coachBio: {
                    name: "Agency Expert",
                    headline: "Founder of ScaleMyAgency",
                    story: "I went from a struggling freelancer to running a 7-figure agency. Now I teach others how to do the same."
                },
                pricing: [
                    {
                        name: "Starter",
                        price: "$997",
                        features: ["Core Curriculum", "Community Access", "Weekly Q&A"]
                    },
                    {
                        name: "Growth",
                        price: "$2,997",
                        features: ["Everything in Starter", "1-on-1 Mentorship", "Done-For-You Outreach"]
                    }
                ],
                testimonials: [],
                faq: [
                    {
                        question: "Does this work for new agencies?",
                        answer: "Yes, we help you pick a niche and get your first client in 30 days."
                    },
                    {
                        question: "How is this different?",
                        answer: "We focus on systems, not just tactics."
                    }
                ],
                urgencySettings: {
                    enabled: true,
                    bannerText: "Doors Close in 48 Hours",
                    spotsLeft: 5
                }
            };
        case 'REAL_ESTATE_OS':
            return {
                heroHeadline: "Sell Your Home for Top Dollar",
                heroSubhead: "The modern strategy to get maximum value for your property in minimum time.",
                ctaText: "Schedule Valuation",
                problem: "Selling a home is stressful. Complexity, paperwork, and uncertainty about the final price.",
                solution: "Our 'Smart Sale' system uses data and digital marketing to create a bidding war for your home.",
                features: [
                    "Professional Staging",
                    "3D Virtual Tours",
                    "Targeted Social Ads"
                ],
                coachBio: {
                    name: "Top Realtor",
                    headline: "Luxury Estate Specialist",
                    story: "With over $100M in sold inventory, I know exactly what triggers buyers to make an offer."
                },
                pricing: [
                    {
                        name: "Standard",
                        price: "1.5%",
                        features: ["MLS Listing", "Open House"]
                    },
                    {
                        name: "Premium",
                        price: "2.5%",
                        features: ["Virtual Staging", "Drone Video", "Social Ads"]
                    }
                ],
                testimonials: [],
                faq: [
                    {
                        question: "How fast can you sell?",
                        answer: "Our average time to offer is 14 days."
                    }
                ],
                urgencySettings: {
                    enabled: false,
                    bannerText: "",
                    spotsLeft: 0
                }
            };
        case 'CREATOR_OS':
            return {
                heroHeadline: "Turn Your Audience Into Income",
                heroSubhead: "Stop relying on ad revenue. Build a sustainable business around your personal brand.",
                ctaText: "Join The Academy",
                problem: "You have followers, but you're burnout from the content treadmill and not making enough money.",
                solution: "Launch your own high-ticket community and digital products.",
                features: [
                    "Community Building",
                    "Digital Product Launch",
                    "Brand Deal Negotiation"
                ],
                coachBio: {
                    name: "Top Creator",
                    headline: "YouTuber with 1M+ Subs",
                    story: "I replaced my ad revenue with digital products and now I make 10x more while posting less."
                },
                pricing: [
                    {
                        name: "Creator",
                        price: "$497",
                        features: ["Course Access", "Templates"]
                    },
                    {
                        name: "Influencer",
                        price: "$1,497",
                        features: ["Group Coaching", "Brand Deal Scripts"]
                    }
                ],
                testimonials: [],
                faq: [
                    {
                        question: "Do I need a huge following?",
                        answer: "No, you can start monetizing with just 1,000 true fans."
                    }
                ],
                urgencySettings: {
                    enabled: true,
                    bannerText: "Cohort Starts Soon",
                    spotsLeft: 10
                }
            };
        default:
            // Fitness Default (already covered by initialData fallback usually)
            return {
                heroHeadline: "Scale Your Fitness Business to $50k/mo",
                heroSubhead: "The exact blueprint used by 500+ coaches to automate client acquisition and delivery.",
                ctaText: "Get The Blueprint",
                problem: "You're stuck trading time for money. You love coaching, but you hate the hustle of finding new clients every single month.",
                solution: "We provide a plug-and-play operating system that automates your lead gen, sales, and client onboarding.",
                features: ["Automated Lead Pipeline", "High-Ticket Sales Script", "Client Success Dashboard"],
                coachBio: {
                    name: "Alex Hormozi",
                    headline: "Founder of Gym Launch",
                    story: "I started with nothing and built a $100M empire. Now I'm sharing the exact tools I used to get there."
                },
                pricing: [
                    { name: "Starter", price: "$997", features: ["Core Curriculum", "Weekly Q&A"] },
                    { name: "Inner Circle", price: "$2,997", features: ["1-on-1 Mentorship", "Done-For-You Tech"] }
                ],
                testimonials: [],
                faq: [
                    { question: "Is this for beginners?", answer: "Yes." }
                ],
                urgencySettings: { enabled: true, bannerText: "Doors Close in 48 Hours", spotsLeft: 3 }
            };
    }
};
