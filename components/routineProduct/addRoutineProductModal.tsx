"use client";
import { useState, KeyboardEvent } from "react";

interface Tag {
    id: number;
    label: string;
}

interface AddRoutineProductProps {
    onClose: () => void;
}

const SKIN_TYPES = ["Normal", "Oily", "Dry", "Combination", "Sensitive", "Acne-prone", "Dehydrated", "Mature", "Rosacea"];
const SKIN_CONCERNS = ["Fine lines", "Wrinkles", "Pigmentation", "Dark spots", "Acne", "Redness", "Large pores", "Dryness", "Dullness", "Uneven texture", "Dark circles", "Scarring"];

export default function AddRoutineProduct({ onClose }: AddRoutineProductProps) {
    const [brand, setBrand] = useState("");
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [routineSlot, setRoutineSlot] = useState("");
    const [price, setPrice] = useState("");
    const [priority, setPriority] = useState(5);

    const [skinTypes, setSkinTypes] = useState<string[]>(SKIN_TYPES);
    const [concerns, setConcerns] = useState<string[]>(SKIN_CONCERNS);

    const [whyItSuits, setWhyItSuits] = useState("");
    const [ingredientTags, setIngredientTags] = useState<Tag[]>([{ id: 1, label: "Glycerin" }]);
    const [ingredientInput, setIngredientInput] = useState("");
    const [awinUrl, setAwinUrl] = useState("");

    const toggleItem = (item: string, list: string[], setList: (v: string[]) => void) => {
        setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
    };

    const addTag = () => {
        const trimmed = ingredientInput.trim();
        if (!trimmed) return;
        setIngredientTags([...ingredientTags, { id: Date.now(), label: trimmed }]);
        setIngredientInput("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") { e.preventDefault(); addTag(); }
    };

    const removeTag = (id: number) => setIngredientTags(ingredientTags.filter((t) => t.id !== id));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" onClick={onClose}>
            <div
                className="relative max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-8 pt-7 pb-5 border-b border-gray-100 sticky top-0 bg-white z-10 rounded-t-2xl">
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute top-5 right-5 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-sm text-white transition-colors hover:bg-gray-700"
                    >
                        ✕
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900">Add Routine Product</h2>
                    <p className="text-sm text-gray-400 mt-0.5">routine products table</p>
                </div>

                <div className="px-8 py-6 space-y-7">
                    {/* Product Details */}
                    <section>
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Product Details</h3>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">Brand <span className="text-red-500">*</span></label>
                                <input
                                    type="text" value={brand} onChange={(e) => setBrand(e.target.value)}
                                    placeholder="e.g CereVe"
                                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">Product name <span className="text-red-500">*</span></label>
                                <input
                                    type="text" value={productName} onChange={(e) => setProductName(e.target.value)}
                                    placeholder="e.g moisturizer"
                                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">Category <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select value={category} onChange={(e) => setCategory(e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition bg-white">
                                        <option value="">All categories</option>
                                        <option>Cleanser</option>
                                        <option>Moisturiser</option>
                                        <option>Serum</option>
                                        <option>SPF</option>
                                        <option>Toner</option>
                                    </select>
                                    <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">Routine Slot <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select value={routineSlot} onChange={(e) => setRoutineSlot(e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 appearance-none focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition bg-white">
                                        <option value="">Select slot</option>
                                        <option>Morning</option>
                                        <option>Evening</option>
                                        <option>Both</option>
                                    </select>
                                    <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 items-start">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">Price (GBP) <span className="text-red-500">*</span></label>
                                <input
                                    type="text" value={price} onChange={(e) => setPrice(e.target.value)}
                                    placeholder="270.00*"
                                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">Priority score <span className="text-red-500">*</span></label>
                                <div className="flex items-center gap-1.5 flex-wrap">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                        <button
                                            key={n}
                                            onClick={() => setPriority(n)}
                                            className={`w-7 h-7 rounded-full text-xs font-medium border transition-colors ${priority === n
                                                ? "border-green-700 text-green-700 bg-white"
                                                : "border-gray-300 text-gray-500 bg-white hover:border-green-500"
                                                }`}
                                        >
                                            {n}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-400 mt-1.5">1–10 · Higher = shown first in routine</p>
                            </div>
                        </div>
                    </section>

                    {/* Skin Profile Matching */}
                    <section>
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Skin Profile Matching</h3>

                        <div className="mb-3">
                            <label className="block text-sm text-gray-600 mb-2">Suitable Skin Types <span className="text-red-500">*</span></label>
                            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                                {SKIN_TYPES.map((type) => (
                                    <label key={type} className="flex items-center gap-1.5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={skinTypes.includes(type)}
                                            onChange={() => toggleItem(type, skinTypes, setSkinTypes)}
                                            className="accent-green-700 w-3.5 h-3.5"
                                        />
                                        <span className="text-xs text-gray-600">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-2">Suitable Concerns</label>
                            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                                {SKIN_CONCERNS.map((concern) => (
                                    <label key={concern} className="flex items-center gap-1.5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={concerns.includes(concern)}
                                            onChange={() => toggleItem(concern, concerns, setConcerns)}
                                            className="accent-green-700 w-3.5 h-3.5"
                                        />
                                        <span className="text-xs text-gray-600">{concern}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Display Information */}
                    <section>
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Display Information</h3>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600 mb-1.5">Why it suits this profile <span className="text-red-500">*</span></label>
                            <textarea
                                value={whyItSuits}
                                onChange={(e) => setWhyItSuits(e.target.value)}
                                placeholder="One sentence · personalised to match skin profiles e.g fragrance free"
                                rows={4}
                                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1.5">Key Ingredients (top 3) <span className="text-red-500">*</span></label>
                            <div className="flex flex-wrap items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 min-h-[44px] focus-within:ring-2 focus-within:ring-green-700/30 focus-within:border-green-700 transition">
                                {ingredientTags.map((tag) => (
                                    <span key={tag.id} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm px-2.5 py-1 rounded-full">
                                        {tag.label}
                                        <button onClick={() => removeTag(tag.id)} className="text-gray-500 hover:text-gray-800 leading-none">✕</button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    value={ingredientInput}
                                    onChange={(e) => setIngredientInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Any ingredient"
                                    className="flex-1 min-w-[140px] text-sm text-gray-500 placeholder-gray-300 outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </section>

                    {/* Affiliate Link */}
                    <section>
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Affiliate Link</h3>
                        <div>
                            <label className="block text-sm text-gray-600 mb-1.5">Awin Tracking URL <span className="text-red-500">*</span></label>
                            <textarea
                                value={awinUrl}
                                onChange={(e) => setAwinUrl(e.target.value)}
                                rows={4}
                                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition resize-none"
                            />
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white rounded-b-2xl">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 transition-colors hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button type="button" className="px-6 py-2.5 rounded-lg bg-[#2d5a3d] text-sm font-medium text-white transition-colors hover:bg-[#234830]">
                        Save product
                    </button>
                </div>
            </div>
        </div>
    );
}