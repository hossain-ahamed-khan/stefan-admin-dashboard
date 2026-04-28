"use client";
import { useState } from "react";
import AddRoutineProduct from "@/components/routineProduct/addRoutineProductModal";

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

const SKIN_TYPE_COLORS: Record<SkinType, string> = {
    Oily: "bg-[#74C69D] text-white",
    "Acne-prone": "bg-[#74C69D] text-white",
    Dry: "bg-[#74C69D] text-white",
    Sensitive: "bg-[#74C69D] text-white",
    Normal: "bg-[#74C69D] text-white",
};

const EditIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M15.232 5.232l3.536 3.536M9 13l6.768-6.768a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414A2 2 0 018.586 12.5z"
        />
    </svg>
);

const TrashIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a1 1 0 011-1h6a1 1 0 011 1v2"
        />
    </svg>
);

export default function DupeProductsTable() {
    const [search, setSearch] = useState("");
    const [slot, setSlot] = useState("All slots");
    const [page, setPage] = useState(1);
    const [isAddRoutineProductOpen, setIsAddRoutineProductOpen] = useState(false);

    const filtered = SAMPLE_DATA.filter((p) => {
        const matchesSearch =
            search === "" ||
            p.brand.toLowerCase().includes(search.toLowerCase()) ||
            p.product.toLowerCase().includes(search.toLowerCase());
        const matchesSlot = slot === "All slots" || p.slot === slot;
        return matchesSearch && matchesSlot;
    });

    return (
        <div className="min-h-screen bg-[#faf8f5] p-8 font-sans">
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
                    {/* Category dropdown removed */}

                    {/* Slot dropdown */}
                    <div className="relative">
                        <select
                            value={slot}
                            onChange={(e) => setSlot(e.target.value)}
                            className="appearance-none rounded-lg border border-stone-200 bg-white px-4 py-2 pr-8 text-sm text-stone-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 cursor-pointer"
                        >
                            <option>All slots</option>
                            <option>Both</option>
                            <option>Morning</option>
                            <option>Evening</option>
                        </select>
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-stone-400">▾</span>
                    </div>
                </div>

                {/* Add product button */}
                <button
                    type="button"
                    onClick={() => setIsAddRoutineProductOpen(true)}
                    className="rounded-lg bg-[#2D6A4F] px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-800"
                >
                    + Add product
                </button>
            </div>

            {isAddRoutineProductOpen ? (
                <AddRoutineProduct onClose={() => setIsAddRoutineProductOpen(false)} />
            ) : null}

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
                                        <span
                                            className="inline-block rounded-full px-3 py-1 text-xs font-medium text-purple-900"
                                            style={{ backgroundColor: "#CDBDFF" }}
                                        >
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
                                            <span className="inline-block rounded-full bg-[#74C69D] px-4 py-1 text-xs font-medium text-white">
                                                Verified
                                            </span>
                                        ) : (
                                            <span className="inline-block rounded-full bg-stone-200 px-4 py-1 text-xs font-medium text-stone-500">
                                                Unverified
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-white hover:text-[#667180]">
                                                <EditIcon />
                                            </button>
                                            <button
                                                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-white hover:text-[#677283]"
                                            >
                                                <TrashIcon />
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