"use client";

import { useState, KeyboardEvent } from "react";

interface Tag {
    id: number;
    label: string;
}

interface AddExpensiveProductProps {
    onClose: () => void;
}

export default function AddExpensiveProduct({ onClose }: AddExpensiveProductProps) {
    const [brand, setBrand] = useState("");
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");

    const [searchTags, setSearchTags] = useState<Tag[]>([{ id: 1, label: "La mer" }]);
    const [searchInput, setSearchInput] = useState("");

    const [activeTags, setActiveTags] = useState<Tag[]>([{ id: 1, label: "Glycerin" }]);
    const [activeInput, setActiveInput] = useState("");

    const addTag = (
        input: string,
        setInput: (v: string) => void,
        tags: Tag[],
        setTags: (t: Tag[]) => void
    ) => {
        const trimmed = input.trim();
        if (!trimmed) return;
        setTags([...tags, { id: Date.now(), label: trimmed }]);
        setInput("");
    };

    const removeTag = (
        id: number,
        tags: Tag[],
        setTags: (t: Tag[]) => void
    ) => {
        setTags(tags.filter((t) => t.id !== id));
    };

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>,
        input: string,
        setInput: (v: string) => void,
        tags: Tag[],
        setTags: (t: Tag[]) => void
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag(input, setInput, tags, setTags);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
            onClick={handleClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-8 pt-7 pb-5 border-b border-gray-100">
                    <button
                        onClick={handleClose}
                        className="absolute top-5 right-5 w-7 h-7 flex items-center justify-center rounded-full bg-gray-900 text-white text-sm hover:bg-gray-700 transition-colors"
                    >
                        ✕
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900">Add Expensive Product</h2>
                    <p className="text-sm text-gray-400 mt-0.5">Dupe Finder — expensive products table</p>
                </div>

                {/* Body */}
                <div className="px-8 py-6 space-y-7">
                    {/* Product Details */}
                    <section>
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Product Details</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">
                                    Brand <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    placeholder="e.g. La Mer*"
                                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">
                                    Product name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={productName}
                                    onChange={(e) => setProductName(e.target.value)}
                                    placeholder="e.g. Ponds Cream*"
                                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition"
                                />
                            </div>
                        </div>
                        <div className="mt-4 w-1/2 pr-2">
                            <label className="block text-sm text-gray-600 mb-1.5">
                                Price (GBP) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="270.00*"
                                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition"
                            />
                        </div>
                    </section>

                    {/* Search Terms */}
                    <section>
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Search Terms</h3>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1.5">
                                Search terms <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 min-h-[44px] focus-within:ring-2 focus-within:ring-green-700/30 focus-within:border-green-700 transition">
                                {searchTags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm px-2.5 py-1 rounded-full"
                                    >
                                        {tag.label}
                                        <button
                                            onClick={() => removeTag(tag.id, searchTags, setSearchTags)}
                                            className="text-gray-500 hover:text-gray-800 leading-none"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onKeyDown={(e) =>
                                        handleKeyDown(e, searchInput, setSearchInput, searchTags, setSearchTags)
                                    }
                                    placeholder="Type and Press Enter.."
                                    className="flex-1 min-w-[140px] text-sm text-gray-500 placeholder-gray-300 outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Key Active Ingredients */}
                    <section>
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Key Active Ingredients</h3>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1.5">
                                Key actives <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-wrap items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 min-h-[44px] focus-within:ring-2 focus-within:ring-green-700/30 focus-within:border-green-700 transition">
                                {activeTags.map((tag) => (
                                    <span
                                        key={tag.id}
                                        className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm px-2.5 py-1 rounded-full"
                                    >
                                        {tag.label}
                                        <button
                                            onClick={() => removeTag(tag.id, activeTags, setActiveTags)}
                                            className="text-gray-500 hover:text-gray-800 leading-none"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={activeInput}
                                    onChange={(e) => setActiveInput(e.target.value)}
                                    onKeyDown={(e) =>
                                        handleKeyDown(e, activeInput, setActiveInput, activeTags, setActiveTags)
                                    }
                                    placeholder="Any ingredient"
                                    className="flex-1 min-w-[140px] text-sm text-gray-500 placeholder-gray-300 outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        onClick={handleClose}
                        className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="px-6 py-2.5 rounded-lg bg-[#2d5a3d] text-sm text-white font-medium hover:bg-[#234830] transition-colors">
                        Save product
                    </button>
                </div>
            </div>
        </div>
    );
}