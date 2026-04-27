"use client";
import { useState } from "react";

type SkinType = "Oily" | "Acne-prone" | "Dry" | "Sensitive" | "Normal";
type Slot = "Both" | "AM" | "PM";
type Category = "Cleanser" | "Moisturiser" | "Serum" | "SPF" | "Toner";

interface Product {
    id: number;
    brand: string;
    product: string;
    category: Category;
    slot: Slot;
    skinTypes: SkinType[];
    price: string;
    priority: number;
    verified: boolean;
}

const SAMPLE_DATA: Product[] = [
    { id: 1, brand: "CeraVe", product: "Hydrating Facial Cleanser", category: "Cleanser", slot: "Both", skinTypes: ["Oily", "Acne-prone"], price: "£11", priority: 11, verified: true },
    { id: 2, brand: "CeraVe", product: "Hydrating Facial Cleanser", category: "Cleanser", slot: "Both", skinTypes: ["Oily", "Acne-prone"], price: "£11", priority: 11, verified: true },
    { id: 3, brand: "CeraVe", product: "Hydrating Facial Cleanser", category: "Cleanser", slot: "Both", skinTypes: ["Oily", "Acne-prone"], price: "£11", priority: 11, verified: true },
    { id: 4, brand: "CeraVe", product: "Hydrating Facial Cleanser", category: "Cleanser", slot: "Both", skinTypes: ["Oily", "Acne-prone"], price: "£11", priority: 11, verified: true },
];

const CATEGORY_COLORS: Record<Category, string> = {
    Cleanser: "bg-purple-200 text-purple-700",
    Moisturiser: "bg-blue-200 text-blue-700",
    Serum: "bg-yellow-200 text-yellow-700",
    SPF: "bg-orange-200 text-orange-700",
    Toner: "bg-pink-200 text-pink-700",
};

const SKIN_TYPE_COLORS: Record<SkinType, string> = {
    Oily: "bg-emerald-400 text-white",
    "Acne-prone": "bg-emerald-400 text-white",
    Dry: "bg-sky-400 text-white",
    Sensitive: "bg-rose-400 text-white",
    Normal: "bg-teal-400 text-white",
};

export default function DupeProductsTable() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All categories");
    const [slot, setSlot] = useState("All slots");
    const [page, setPage] = useState(1);

    const filtered = SAMPLE_DATA.filter((p) => {
        const matchesSearch =
            search === "" ||
            p.brand.toLowerCase().includes(search.toLowerCase()) ||
            p.product.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All categories" || p.category === category;
        const matchesSlot = slot === "All slots" || p.slot === slot;
        return matchesSearch && matchesCategory && matchesSlot;
    });

    return (
        <div className="min-h-screen bg-stone-100 p-8 font-sans">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search dupe products...."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 w-56"
                    />
                    {/* Category dropdown */}
                    <div className="relative">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="appearance-none rounded-lg border border-stone-200 bg-white px-4 py-2 pr-8 text-sm text-stone-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 cursor-pointer"
                        >
                            <option>All categories</option>
                            <option>Cleanser</option>
                            <option>Moisturiser</option>
                            <option>Serum</option>
                            <option>SPF</option>
                            <option>Toner</option>
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-stone-400">▾</span>
                    </div>
                    {/* Slot dropdown */}
                    <div className="relative">
                        <select
                            value={slot}
                            onChange={(e) => setSlot(e.target.value)}
                            className="appearance-none rounded-lg border border-stone-200 bg-white px-4 py-2 pr-8 text-sm text-stone-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 cursor-pointer"
                        >
                            <option>All slots</option>
                            <option>Both</option>
                            <option>AM</option>
                            <option>PM</option>
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-stone-400">▾</span>
                    </div>
                </div>

                {/* Add product button */}
                <button className="rounded-lg bg-emerald-700 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-800 transition-colors">
                    + Add product
                </button>
            </div>

            {/* Table */}
            <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
                <table className="w-full text-sm text-stone-700">
                    <thead>
                        <tr className="border-b border-stone-100">
                            <th className="py-4 px-6 text-center font-semibold text-stone-800">Brand</th>
                            <th className="py-4 px-6 text-center font-semibold text-stone-800">Product</th>
                            <th className="py-4 px-6 text-center font-semibold text-stone-800">Category</th>
                            <th className="py-4 px-6 text-center font-semibold text-stone-800">Slot</th>
                            <th className="py-4 px-6 text-center font-semibold text-stone-800">Skin Types</th>
                            <th className="py-4 px-6 text-center font-semibold text-stone-800">Price</th>
                            <th className="py-4 px-6 text-center font-semibold text-stone-800">Priority</th>
                            <th className="py-4 px-6 text-center font-semibold text-stone-800">Verified</th>
                            <th className="py-4 px-6 text-center font-semibold text-stone-800">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="py-12 text-center text-stone-400">
                                    No products found.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((product, idx) => (
                                <tr
                                    key={product.id}
                                    className={`border-b border-stone-50 last:border-0 transition-colors hover:bg-stone-50 ${idx % 2 === 0 ? "" : ""}`}
                                >
                                    <td className="py-4 px-6 text-center">{product.brand}</td>
                                    <td className="py-4 px-6 text-center">{product.product}</td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${CATEGORY_COLORS[product.category]}`}>
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">{product.slot}</td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="flex items-center justify-center gap-1 flex-wrap">
                                            {product.skinTypes.map((st) => (
                                                <span
                                                    key={st}
                                                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${SKIN_TYPE_COLORS[st]}`}
                                                >
                                                    {st}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-center">{product.price}</td>
                                    <td className="py-4 px-6 text-center">{product.priority}</td>
                                    <td className="py-4 px-6 text-center">
                                        {product.verified ? (
                                            <span className="inline-block rounded-full bg-emerald-400 px-4 py-1 text-xs font-medium text-white">
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="inline-block rounded-full bg-stone-200 px-4 py-1 text-xs font-medium text-stone-500">
                                                Unverified
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="text-stone-400 hover:text-stone-600 transition-colors p-1" title="Edit">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                                                </svg>
                                            </button>
                                            <button className="text-stone-400 hover:text-red-500 transition-colors p-1" title="Delete">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-2 mt-5">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="flex items-center justify-center w-8 h-8 rounded-lg border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 transition-colors shadow-sm disabled:opacity-40"
                    disabled={page === 1}
                >
                    ‹
                </button>
                <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-stone-200 bg-white text-stone-700 font-medium shadow-sm text-sm">
                    {page}
                </span>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 transition-colors shadow-sm"
                >
                    ›
                </button>
            </div>
        </div>
    );
}