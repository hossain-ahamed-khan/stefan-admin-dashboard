"use client";

import { useState } from "react";

import UpdateDupeEntry from "./updateDupeModal";

interface DupeFoundsModalProps {
    onClose: () => void;
    productName?: string;
    dupeNames?: string[];
}

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

export default function DupeFoundsModal({
    onClose,
    productName = "Product",
    dupeNames = [
        "Neutrogena Deep Clean Facial Cleanser",
        "PanOxyl Acne Foaming Wash",
    ],
}: DupeFoundsModalProps) {
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4" onClick={onClose}>
            <div
                className="w-full max-w-2xl rounded-3xl bg-[#faf8f5] shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative px-8 pt-7 pb-5">
                    <button
                        onClick={onClose}
                        className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#2b2b2b] text-white transition-colors hover:bg-[#1f1f1f]"
                        aria-label="Close"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <h2 className="text-xl font-semibold text-[#2b2b2b]">Dupe founds</h2>
                    <p className="mt-1 text-sm text-[#9aa0a6]">{productName}</p>
                </div>

                <div className="h-px bg-[#ebe7e1]" />

                <div className="px-8 py-6 space-y-6">
                    {dupeNames.map((name) => (
                        <div key={name} className="space-y-3">
                            <label className="text-sm font-semibold text-[#2b2b2b]">Product name</label>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 rounded-2xl border border-[#e6e1da] bg-white px-4 py-3 text-sm font-medium text-[#6b7280]">
                                    {name}
                                </div>
                                <button
                                    onClick={() => setIsUpdateOpen(true)}
                                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-white hover:text-[#667180] cursor-pointer"
                                    aria-label="Edit dupe"
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-white hover:text-[#677283] cursor-pointer"
                                >
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="px-8 pb-7 flex items-center justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="min-w-[130px] rounded-xl border border-[#e6e1da] bg-white px-6 py-2.5 text-sm font-semibold text-[#6b7280] shadow-sm transition-colors hover:bg-[#f7f5f1]"
                    >
                        Cancel
                    </button>
                    <button className="min-w-[150px] rounded-xl bg-[#2d6a4f] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#24553f]">
                        Save
                    </button>
                </div>
            </div>

            {isUpdateOpen && (
                <UpdateDupeEntry onClose={() => setIsUpdateOpen(false)} />
            )}
        </div>
    );
}
