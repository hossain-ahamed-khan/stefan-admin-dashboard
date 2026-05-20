"use client";
import { useState } from "react";
import { useGetUsers, useDeleteUser } from "@/apis/userApis";
import Swal from "sweetalert2";

const PAGE_SIZE = 10;
const PLAN_OPTIONS = ["All plans", "Free", "Basic", "Premium"];
const INFLUENCER_OPTIONS = ["All", "Influencer", "No influencer"];
const TABLE_HEADERS = ["Email", "Skin Type", "Analyses / Month", "Plan", "Influencer", "Joined", "Actions"];

// ─── Icons ───────────────────────────────────────────────────────────────────

const ChevronDown = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

const ChevronLeft = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
    </svg>
);

const ChevronRight = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const TrashIcon = () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M4 7h16" />
    </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────

export default function UserTable() {
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState("");
    const [plan, setPlan] = useState("All plans");
    const [influencer, setInfluencer] = useState("All");
    const [page, setPage] = useState(1);
    const [planOpen, setPlanOpen] = useState(false);
    const [influencerOpen, setInfluencerOpen] = useState(false);
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const toggleRow = (id: number) => {
        setExpandedRows((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };


    // API — search & page sent to backend directly
    const { data, isLoading } = useGetUsers({
        page,
        page_size: PAGE_SIZE,
        search: search || undefined,
        ordering: order,
    });

    const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

    const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 1;

    // Client-side filter for plan & influencer (backend doesn't support them)
    const filtered = (data?.results ?? []).filter((u) => {
        const matchPlan = plan === "All plans" || u.subscription_plan === plan;
        const matchInfluencer =
            influencer === "All" ||
            (influencer === "Influencer" ? u.Influencer === "Yes" : u.Influencer === "No");
        return matchPlan && matchInfluencer;
    });

    // Reset to page 1 when search changes
    const handleSearch = (val: string) => {
        setSearch(val);
        setOrder(val);
        setPage(1);
    };

    return (
        <div className="min-h-screen p-8 bg-[#faf8f5]">
            {/* Filters */}
            <div className="flex items-center gap-3 mb-5">
                <input
                    type="text"
                    placeholder="Search by email address"
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="border rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 bg-white"
                    style={{ borderColor: "#e2ddd5", color: "#555", width: "220px" }}
                />

                {/* Plan Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => { setPlanOpen(!planOpen); setInfluencerOpen(false); }}
                        className="flex items-center gap-2 border rounded-lg px-4 py-2 text-sm bg-white"
                        style={{ borderColor: "#e2ddd5", color: "#555" }}
                    >
                        {plan} <ChevronDown />
                    </button>
                    {planOpen && (
                        <div className="absolute top-full mt-1 left-0 bg-white border rounded-lg shadow-md z-10 w-36" style={{ borderColor: "#e2ddd5" }}>
                            {PLAN_OPTIONS.map((opt) => (
                                <button key={opt} onClick={() => { setPlan(opt); setPlanOpen(false); }}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50" style={{ color: "#555" }}>
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
                        {influencer} <ChevronDown />
                    </button>
                    {influencerOpen && (
                        <div className="absolute top-full mt-1 left-0 bg-white border rounded-lg shadow-md z-10 w-40" style={{ borderColor: "#e2ddd5" }}>
                            {INFLUENCER_OPTIONS.map((opt) => (
                                <button key={opt} onClick={() => { setInfluencer(opt); setInfluencerOpen(false); }}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50" style={{ color: "#555" }}>
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: "#e2ddd5" }}>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b" style={{ borderColor: "#e2ddd5" }}>
                            {TABLE_HEADERS.map((h) => (
                                <th key={h} className="text-left px-6 py-4 font-semibold" style={{ color: "#333", fontSize: "13px" }}>
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={7} className="text-center py-10">
                                    <div className="flex items-center justify-center gap-2 text-gray-400">
                                        <div className="w-5 h-5 border-2 border-[#5bc4a0] border-t-transparent rounded-full animate-spin" />
                                        Loading...
                                    </div>
                                </td>
                            </tr>
                        ) : filtered.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="text-center py-10 text-gray-400">No users found.</td>
                            </tr>
                        ) : (
                            filtered.map((user) => (
                                <tr key={user.id} className="font-medium border-b last:border-b-0 hover:bg-gray-50 transition-colors" style={{ borderColor: "#f0ece5" }}>
                                    <td className="px-6 py-4" style={{ color: "#444" }}>{user.email}</td>

                                    {/* Inside your JSX table row: */}
                                    <td className="px-6 py-4">
                                        {Array.isArray(user.skin_type) && user.skin_type.length > 0 ? (
                                            <div className="flex flex-wrap gap-2 items-start" style={{ maxWidth: "220px" }}>
                                                {(expandedRows.has(user.id) ? user.skin_type : user.skin_type.slice(0, 2)).map((active) => (
                                                    <span key={active} className="bg-[#74C69D] text-white text-xs px-3 py-1 rounded-full">
                                                        {active}
                                                    </span>
                                                ))}

                                                {user.skin_type.length > 2 && (
                                                    <button
                                                        onClick={() => toggleRow(user.id)}
                                                        className="text-gray-500 text-xs font-bold hover:text-gray-700 focus:outline-none cursor-pointer"
                                                    >
                                                        {expandedRows.has(user.id) ? 'Show less' : 'More...'}
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400 text-xs">—</span>
                                        )}
                                    </td>


                                    <td className="px-6 py-4" style={{ color: "#444" }}>{user.analysis_monthly}</td>

                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-white text-xs font-medium" style={{ backgroundColor: "#4dc8d8" }}>
                                            {user.subscription_plan}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4" style={{ color: "#444" }}>{user.Influencer}</td>

                                    <td className="px-6 py-4" style={{ color: "#444" }}>
                                        {new Date(user.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                                    </td>

                                    <td className="px-6 py-4">
                                        {/* <button
                                            onClick={() => deleteUser(user.id)}
                                            disabled={isDeleting}
                                            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-red-50 hover:text-red-400 hover:border-red-200 disabled:opacity-40"
                                        >
                                            <TrashIcon />
                                        </button> */}
                                        <button
                                            onClick={async () => {
                                                const result = await Swal.fire({
                                                    title: "Delete User?",
                                                    text: "This action cannot be undone.",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonText: "Yes, delete",
                                                    cancelButtonText: "Cancel",
                                                    confirmButtonColor: "#ef4444",
                                                    cancelButtonColor: "#e2ddd5",
                                                    customClass: {
                                                        popup: "rounded-2xl",
                                                        confirmButton: "rounded-lg text-sm font-medium",
                                                        cancelButton: "rounded-lg text-sm font-medium !text-gray-600",
                                                    },
                                                });

                                                if (result.isConfirmed) {
                                                    deleteUser(user.id, {
                                                        onSuccess: () => {
                                                            Swal.fire({
                                                                title: "Deleted!",
                                                                text: "User has been removed.",
                                                                icon: "success",
                                                                confirmButtonColor: "#5bc4a0",
                                                                customClass: {
                                                                    popup: "rounded-2xl",
                                                                    confirmButton: "rounded-lg text-sm font-medium",
                                                                },
                                                            });
                                                        },
                                                        onError: () => {
                                                            Swal.fire({
                                                                title: "Failed!",
                                                                text: "Something went wrong. Please try again.",
                                                                icon: "error",
                                                                confirmButtonColor: "#5bc4a0",
                                                                customClass: {
                                                                    popup: "rounded-2xl",
                                                                    confirmButton: "rounded-lg text-sm font-medium",
                                                                },
                                                            });
                                                        },
                                                    });
                                                }
                                            }}
                                            disabled={isDeleting}
                                            className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-red-50 hover:text-red-400 hover:border-red-200 disabled:opacity-40"
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
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="cursor-pointer w-10 h-10 flex items-center justify-center border rounded-lg bg-white disabled:opacity-40"
                    style={{ borderColor: "#e2ddd5", color: "#555" }}
                >
                    <ChevronLeft />
                </button>

                <button className="cursor-pointer w-10 h-10 flex items-center justify-center border rounded-lg text-sm font-medium text-white"
                    style={{ backgroundColor: "#5bc4a0", borderColor: "#5bc4a0" }}>
                    {page}
                </button>

                <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="cursor-pointer w-10 h-10 flex items-center justify-center border rounded-lg bg-white disabled:opacity-40"
                    style={{ borderColor: "#e2ddd5", color: "#555" }}
                >
                    <ChevronRight />
                </button>

                <span className="text-sm text-gray-400 ml-2">
                    {data?.count ?? 0} total users
                </span>
            </div>
        </div>
    );
}