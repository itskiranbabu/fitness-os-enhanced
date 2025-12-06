import { create } from 'zustand';


export type BlockType = 'HERO' | 'FEATURES' | 'PRICING' | 'CTA' | 'TESTIMONIALS' | 'FAQ';

export interface FunnelBlock {
    id: string;
    type: BlockType;
    content: any; // Flexible content structure
}

interface FunnelState {
    blocks: FunnelBlock[];
    selectedBlockId: string | null;
    addBlock: (type: BlockType) => void;
    removeBlock: (id: string) => void;
    updateBlock: (id: string, content: any) => void;
    reorderBlocks: (startIndex: number, endIndex: number) => void;
    selectBlock: (id: string | null) => void;
    setBlocks: (blocks: FunnelBlock[]) => void;
}

export const useFunnelStore = create<FunnelState>((set) => ({
    blocks: [],
    selectedBlockId: null,

    addBlock: (type) => set((state) => {
        const newBlock: FunnelBlock = {
            id: crypto.randomUUID(),
            type,
            content: getDefaultContent(type),
        };
        return { blocks: [...state.blocks, newBlock] };
    }),

    removeBlock: (id) => set((state) => ({
        blocks: state.blocks.filter((b) => b.id !== id),
        selectedBlockId: state.selectedBlockId === id ? null : state.selectedBlockId,
    })),

    updateBlock: (id, content) => set((state) => ({
        blocks: state.blocks.map((b) =>
            b.id === id ? { ...b, content: { ...b.content, ...content } } : b
        ),
    })),

    reorderBlocks: (startIndex, endIndex) => set((state) => {
        const result = Array.from(state.blocks);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return { blocks: result };
    }),

    selectBlock: (id) => set({ selectedBlockId: id }),

    setBlocks: (blocks) => set({ blocks }),
}));

function getDefaultContent(type: BlockType) {
    switch (type) {
        case 'HERO':
            return {
                headline: 'Transform Your Life Today',
                subheadline: 'The ultimate solution for your problems.',
                ctaText: 'Get Started',
                image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1600&q=80',
            };
        case 'FEATURES':
            return {
                title: 'Why Choose Us',
                features: [
                    { title: 'Feature 1', desc: 'Description here' },
                    { title: 'Feature 2', desc: 'Description here' },
                    { title: 'Feature 3', desc: 'Description here' },
                ],
            };
        case 'PRICING':
            return {
                title: 'Simple Pricing',
                plans: [
                    { name: 'Basic', price: '$29', features: ['Feature A', 'Feature B'] },
                    { name: 'Pro', price: '$99', features: ['Everything in Basic', 'Feature C'] },
                ],
            };
        default:
            return {};
    }
}
