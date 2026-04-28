"use client";
import { useState } from "react";

interface User {
    id: number;
    email: string;
    skinTypes: string[];
    analyses: number;
    plan: string;
    influencer: boolean;
    joined: string;
}

const initialUsers: User[] = [
    { id: 1, email: "jessica.martinez@gmail.com", skinTypes: ["Oily", "Acne-prone"], analyses: 12, plan: "Premium", influencer: false, joined: "14 Apr 2026" },
    { id: 2, email: "jessica.martinez@gmail.com", skinTypes: ["Oily", "Acne-prone"], analyses: 12, plan: "Premium", influencer: false, joined: "14 Apr 2026" },
    { id: 3, email: "jessica.martinez@gmail.com", skinTypes: ["Oily", "Acne-prone"], analyses: 12, plan: "Premium", influencer: false, joined: "14 Apr 2026" },
    { id: 4, email: "jessica.martinez@gmail.com", skinTypes: ["Oily", "Acne-prone"], analyses: 12, plan: "Premium", influencer: false, joined: "14 Apr 2026" },
    { id: 5, email: "jessica.martinez@gmail.com", skinTypes: ["Oily", "Acne-prone"], analyses: 12, plan: "Premium", influencer: false, joined: "14 Apr 2026" },
    { id: 6, email: "jessica.martinez@gmail.com", skinTypes: ["Oily", "Acne-prone"], analyses: 12, plan: "Premium", influencer: false, joined: "14 Apr 2026" },
];

const PLAN_OPTIONS: string[] = ["All plans", "Free", "Premium"];
const INFLUENCER_OPTIONS: string[] = ["No influencer", "Influencer"];

const ChevronDown: React.FC = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const EyeIcon: React.FC = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const ChevronLeft: React.FC = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const ChevronRight: React.FC = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const TABLE_HEADERS: string[] = ["Email", "Skin Types", "Analyses / Month", "Plan", "Influencer", "Joined", "Actions"];

const TrashIcon = () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M4 7h16"
        />
    </svg>
);

export default function UserTable(): React.ReactElement {
    const [search, setSearch] = useState<string>("");
    const [plan, setPlan] = useState<string>("All plans");
    const [influencer, setInfluencer] = useState<string>("No influencer");
    const [page, setPage] = useState<number>(1);
    const [planOpen, setPlanOpen] = useState<boolean>(false);
    const [influencerOpen, setInfluencerOpen] = useState<boolean>(false);

    const filtered: User[] = initialUsers.filter((u: User) => {
        const matchEmail = u.email.toLowerCase().includes(search.toLowerCase());
        const matchPlan = plan === "All plans" || u.plan === plan;
        const matchInfluencer =
            influencer === "No influencer" ? !u.influencer : u.influencer;
        return matchEmail && matchPlan && matchInfluencer;
    });

    return (
        <div className="min-h-screen p-8 bg-[#faf8f5]">
            {/* Filters */}
            <div className="flex items-center gap-3 mb-5">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search by email address"
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 bg-white"
                    style={{
                        borderColor: "#e2ddd5",
                        color: "#555",
                        width: "220px",
                    }}
                />

                {/* Plan Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => { setPlanOpen(!planOpen); setInfluencerOpen(false); }}
                        className="flex items-center gap-2 border rounded-lg px-4 py-2 text-sm bg-white"
                        style={{ borderColor: "#e2ddd5", color: "#555" }}
                    >
                        {plan}
                        <ChevronDown />
                    </button>
                    {planOpen && (
                        <div className="absolute top-full mt-1 left-0 bg-white border rounded-lg shadow-md z-10 w-36" style={{ borderColor: "#e2ddd5" }}>
                            {PLAN_OPTIONS.map((opt: string) => (
                                <button
                                    key={opt}
                                    onClick={() => { setPlan(opt); setPlanOpen(false); }}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                                    style={{ color: "#555" }}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Influencer Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => { setInfluencerOpen(!influencerOpen); setPlanOpen(false); }}
                        className="flex items-center gap-2 border rounded-lg px-4 py-2 text-sm bg-white"
                        style={{ borderColor: "#e2ddd5", color: "#555" }}
                    >
                        {influencer}
                        <ChevronDown />
                    </button>
                    {influencerOpen && (
                        <div className="absolute top-full mt-1 left-0 bg-white border rounded-lg shadow-md z-10 w-40" style={{ borderColor: "#e2ddd5" }}>
                            {INFLUENCER_OPTIONS.map((opt: string) => (
                                <button
                                    key={opt}
                                    onClick={() => { setInfluencer(opt); setInfluencerOpen(false); }}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                                    style={{ color: "#555" }}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#e2ddd5" }}>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b" style={{ borderColor: "#e2ddd5" }}>
                            {TABLE_HEADERS.map((h: string) => (
                                <th
                                    key={h}
                                    className="text-left px-6 py-4 font-semibold"
                                    style={{ color: "#333", fontSize: "13px" }}
                                >
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-10 text-gray-400">No users found.</td>
                            </tr>
                        ) : (
                            filtered.map((user: User) => (
                                <tr
                                    key={user.id}
                                    className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                                    style={{ borderColor: "#f0ece5" }}
                                >
                                    {/* Email */}
                                    <td className="px-6 py-4" style={{ color: "#444" }}>{user.email}</td>

                                    {/* Skin Types */}
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 flex-wrap">
                                            {user.skinTypes.map((type: string) => (
                                                <span
                                                    key={type}
                                                    className="px-3 py-1 rounded-full text-white text-xs font-medium"
                                                    style={{ backgroundColor: "#5bc4a0" }}
                                                >
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </td>

                                    {/* Analyses */}
                                    <td className="px-6 py-4" style={{ color: "#444" }}>
                                        {user.analyses} / ∞
                                    </td>

                                    {/* Plan */}
                                    <td className="px-6 py-4">
                                        <span
                                            className="px-3 py-1 rounded-full text-white text-xs font-medium"
                                            style={{ backgroundColor: "#4dc8d8" }}
                                        >
                                            {user.plan}
                                        </span>
                                    </td>

                                    {/* Influencer */}
                                    <td className="px-6 py-4" style={{ color: "#444" }}>
                                        {user.influencer ? "Yes" : "No"}
                                    </td>

                                    {/* Joined */}
                                    <td className="px-6 py-4" style={{ color: "#444" }}>{user.joined}</td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <button
                                            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-white hover:text-[#677283]"
                                        >
                                            <TrashIcon />
                                        </button>
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
                    onClick={() => setPage((p: number) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-8 h-8 flex items-center justify-center border rounded-lg bg-white disabled:opacity-40"
                    style={{ borderColor: "#e2ddd5", color: "#555" }}
                >
                    <ChevronLeft />
                </button>

                <button
                    className="w-8 h-8 flex items-center justify-center border rounded-lg text-sm font-medium text-white"
                    style={{ backgroundColor: "#5bc4a0", borderColor: "#5bc4a0" }}
                >
                    {page}
                </button>

                <button
                    onClick={() => setPage((p: number) => p + 1)}
                    className="w-8 h-8 flex items-center justify-center border rounded-lg bg-white"
                    style={{ borderColor: "#e2ddd5", color: "#555" }}
                >
                    <ChevronRight />
                </button>
            </div>
        </div>
    );
}