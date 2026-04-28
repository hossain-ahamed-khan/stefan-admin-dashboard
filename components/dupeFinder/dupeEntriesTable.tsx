"use client";

import { useState } from "react";
import AddDupeEntry from "@/components/dupeFinder/addDupeEntryModal";

interface DupeEntry {
    id: number;
    dupeBrand: string;
    dupeProduct: string;
    price: string;
    saving: string;
    retailer: string;
    addedBy: string;
    verified: "Verified" | "Pending";
}

const initialEntries: DupeEntry[] = [
    {
        id: 1,
        dupeBrand: "CeraVe",
        dupeProduct: "Moisturising Cream",
        price: "£12",
        saving: "96% off",
        retailer: "Boots",
        addedBy: "Admin",
        verified: "Verified",
    },
    {
        id: 2,
        dupeBrand: "CeraVe",
        dupeProduct: "Moisturising Cream",
        price: "£12",
        saving: "96% off",
        retailer: "Boots",
        addedBy: "User",
        verified: "Pending",
    },
    {
        id: 3,
        dupeBrand: "CeraVe",
        dupeProduct: "Moisturising Cream",
        price: "£12",
        saving: "96% off",
        retailer: "Boots",
        addedBy: "User",
        verified: "Pending",
    },
];

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
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M4 7h16"
        />
    </svg>
);

export default function DupeEntriesTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [verifiedFilter, setVerifiedFilter] = useState("All verified");
    const [entries, setEntries] = useState<DupeEntry[]>(initialEntries);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddDupeOpen, setIsAddDupeOpen] = useState(false);

    const filteredEntries = entries.filter((e) => {
        const matchesSearch =
            e.dupeBrand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.dupeProduct.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter =
            verifiedFilter === "All verified" || e.verified === verifiedFilter;
        return matchesSearch && matchesFilter;
    });

    const handleDelete = (id: number) => {
        setEntries((prev) => prev.filter((e) => e.id !== id));
    };

    return (
        <div className="min-h-screen bg-[#faf8f5] font-sans">
            {/* Search + Filter */}
            <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                    <input
                        type="text"
                        placeholder="Search dupe products...."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-64 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4a9e5c]"
                    />
                    <div className="relative">
                        <select
                            value={verifiedFilter}
                            onChange={(e) => setVerifiedFilter(e.target.value)}
                            className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#4a9e5c] cursor-pointer"
                        >
                            <option>All verified</option>
                            <option>Verified</option>
                            <option>Pending</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-[1.5fr_2fr_1fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr] px-6 py-4 border-b border-gray-100">
                    {["Dupe Brand", "Dupe Product", "Price", "Saving", "Retailer", "Added by", "Verified", "Actions"].map(
                        (h) => (
                            <span key={h} className="text-sm font-semibold text-gray-700">
                                {h}
                            </span>
                        )
                    )}
                </div>

                {/* Rows */}
                {filteredEntries.length === 0 ? (
                    <div className="px-6 py-10 text-center text-sm text-gray-400">
                        No entries found.
                    </div>
                ) : (
                    filteredEntries.map((entry, idx) => (
                        <div
                            key={entry.id}
                            className={`grid grid-cols-[1.5fr_2fr_1fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr] px-6 py-4 items-center ${idx !== filteredEntries.length - 1 ? "border-b border-gray-100" : ""
                                }`}
                        >
                            {/* Dupe Brand */}
                            <span className="text-sm text-gray-600">{entry.dupeBrand}</span>

                            {/* Dupe Product */}
                            <span className="text-sm text-gray-600">{entry.dupeProduct}</span>

                            {/* Price */}
                            <span className="text-sm text-gray-600">{entry.price}</span>

                            {/* Saving */}
                            <div>
                                <span className="bg-[#CDBDFF] text-[#6b21a8] text-xs px-3 py-1 rounded-full">
                                    {entry.saving}
                                </span>
                            </div>

                            {/* Retailer */}
                            <span className="text-sm text-gray-600">{entry.retailer}</span>

                            {/* Added by */}
                            <span className="text-sm text-gray-600">{entry.addedBy}</span>

                            {/* Verified */}
                            <div>
                                {entry.verified === "Verified" ? (
                                    <span className="bg-[#74C69D] text-white text-xs px-3 py-1 rounded-full font-medium">
                                        Verified
                                    </span>
                                ) : (
                                    <span className="bg-[#F0CE94] text-[#7a6000] text-xs px-3 py-1 rounded-full font-medium">
                                        Pending
                                    </span>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-1">
                                <button className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-white hover:text-[#667180] cursor-pointer">
                                    <EditIcon />
                                </button>
                                <button
                                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-white hover:text-[#677283] cursor-pointer"
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center gap-2 mt-4">
                <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors text-sm"
                >
                    ‹
                </button>
                <span className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700">
                    {currentPage}
                </span>
                <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors text-sm"
                >
                    ›
                </button>
            </div>

            {isAddDupeOpen ? <AddDupeEntry onClose={() => setIsAddDupeOpen(false)} /> : null}
        </div>
    );
}