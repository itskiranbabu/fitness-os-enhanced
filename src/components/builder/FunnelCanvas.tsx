'use client';

import React from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { useFunnelStore, FunnelBlock } from '@/lib/store/funnelStore';
import { BlockRenderer } from './BlockRenderer';
import { GripVertical, Trash2 } from 'lucide-react';

export const FunnelCanvas = () => {
    const { blocks, setBlocks, selectedBlockId, selectBlock, removeBlock } = useFunnelStore();

    return (
        <div className="flex-1 bg-slate-950 overflow-y-auto h-full p-8">
            <div className="max-w-5xl mx-auto min-h-[500px] bg-black/20 rounded-xl border-2 border-dashed border-slate-800 p-4">
                {blocks.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-slate-500">
                        <p>Drag blocks here or click to add from sidebar</p>
                    </div>
                ) : (
                    <Reorder.Group axis="y" values={blocks} onReorder={setBlocks} className="space-y-4">
                        {blocks.map((block) => (
                            <DraggableBlockWrapper
                                key={block.id}
                                block={block}
                                isSelected={selectedBlockId === block.id}
                                onSelect={() => selectBlock(block.id)}
                                onRemove={() => removeBlock(block.id)}
                            />
                        ))}
                    </Reorder.Group>
                )}
            </div>
        </div>
    );
};

const DraggableBlockWrapper = ({
    block,
    isSelected,
    onSelect,
    onRemove
}: {
    block: FunnelBlock;
    isSelected: boolean;
    onSelect: () => void;
    onRemove: (e: React.MouseEvent) => void;
}) => {
    const controls = useDragControls();

    return (
        <Reorder.Item
            value={block}
            dragListener={false}
            dragControls={controls}
            className="relative group"
        >
            {/* Hover Controls */}
            <div className={`absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity ${isSelected ? 'opacity-100' : ''}`}>
                <div
                    onPointerDown={(e) => controls.start(e)}
                    className="p-2 bg-slate-800 rounded-lg cursor-grab active:cursor-grabbing hover:bg-slate-700 text-slate-400 hover:text-white"
                >
                    <GripVertical size={20} />
                </div>
                <button
                    onClick={onRemove}
                    className="p-2 bg-red-500/10 rounded-lg hover:bg-red-500 text-red-500 hover:text-white transition-colors"
                >
                    <Trash2 size={20} />
                </button>
            </div>

            {/* Block Content */}
            <div onClick={onSelect} className="cursor-pointer">
                <BlockRenderer block={block} isSelected={isSelected} />
            </div>
        </Reorder.Item>
    );
};
