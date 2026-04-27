"use client";
import { useState } from "react";
import GrantInfluencerAccessModal from "@/components/influencer/grantAccessModal";

interface Influencer {
    id: number;
    email: string;
    note: string;
    granted: string;
    usage: string;
}

const initialData: Influencer[] = [
    {
        id: 1,
        email: "jessica.martinez@gmail.com",
        note: "280k TikTok — partnership",
        granted: "2 Mar 2026",
        usage: "47 analyses",
    },
    {
        id: 2,
        email: "jessica.martinez@gmail.com",
        note: "280k TikTok — partnership",
        granted: "2 Mar 2026",
        usage: "47 analyses",
    },
    {
        id: 3,
        email: "jessica.martinez@gmail.com",
        note: "280k TikTok — partnership",
        granted: "2 Mar 2026",
        usage: "47 analyses",
    },
];

export default function InfluencerAccessTable() {
    const [search, setSearch] = useState("");
    const [data, setData] = useState<Influencer[]>(initialData);
    const [isGrantAccessOpen, setIsGrantAccessOpen] = useState(false);

    const filtered = data.filter(
        (item) =>
            item.email.toLowerCase().includes(search.toLowerCase()) ||
            item.note.toLowerCase().includes(search.toLowerCase())
    );

    const handleRevoke = (id: number) => {
        setData((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="min-h-screen bg-[#faf8f5] p-8 font-sans">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-6">
                <input
                    type="text"
                    placeholder="Search influencers"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-64 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30"
                />
                <button
                    onClick={() => setIsGrantAccessOpen(true)}
                    className="flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#2f4a34] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                >
                    <span className="text-lg leading-none">+</span>
                    Grant access
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr] px-6 py-4 border-b border-gray-100">
                    <span className="text-sm font-semibold text-gray-800">Email</span>
                    <span className="text-sm font-semibold text-gray-800">Note</span>
                    <span className="text-sm font-semibold text-gray-800">Granted</span>
                    <span className="text-sm font-semibold text-gray-800">Usage</span>
                    <span className="text-sm font-semibold text-gray-800 text-right">Actions</span>
                </div>

                {/* Rows */}
                {filtered.length === 0 ? (
                    <div className="px-6 py-10 text-center text-sm text-gray-400">
                        No influencers found.
                    </div>
                ) : (
                    filtered.map((item, index) => (
                        <div
                            key={item.id}
                            className={`grid grid-cols-[2fr_2fr_1.5fr_1.5fr_1fr] px-6 py-4 items-center ${index !== filtered.length - 1 ? "border-b border-gray-100" : ""
                                }`}
                        >
                            <span className="text-sm text-gray-600">{item.email}</span>
                            <span className="text-sm text-gray-600">{item.note}</span>
                            <span className="text-sm text-gray-600">{item.granted}</span>
                            <span className="text-sm text-gray-600">{item.usage}</span>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => handleRevoke(item.id)}
                                    className="text-sm text-red-400 border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-1.5 rounded-lg transition-colors"
                                >
                                    Revoke
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isGrantAccessOpen ? (
                <div
                    className="fixed inset-0 z-50 bg-black/40 p-4 flex items-center justify-center"
                    onClick={() => setIsGrantAccessOpen(false)}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        <GrantInfluencerAccessModal onClose={() => setIsGrantAccessOpen(false)} />
                    </div>
                </div>
            ) : null}
        </div>
    );
}