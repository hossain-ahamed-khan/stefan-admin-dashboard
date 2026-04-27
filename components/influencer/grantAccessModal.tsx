"use client";
import { useState } from "react";

export default function GrantInfluencerAccessModal({ onClose }: { onClose: () => void }) {
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");

    return (
        <div className="bg-white rounded-2xl shadow-xl w-[50vw] max-w-none overflow-hidden">
            {/* Header */}
            <div className="flex items-start justify-between px-8 pt-7 pb-5 border-b border-gray-100">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Grant Influencer Access</h2>
                    <p className="text-sm text-gray-400 mt-0.5">Bypasses all subscription and usage limits</p>
                </div>
                <button
                    onClick={onClose}
                    className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white hover:bg-gray-700 transition-colors flex-shrink-0 mt-0.5"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            </div>

            {/* Body */}
            <div className="px-8 py-6 space-y-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                        User Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="user@email.com"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition"
                    />
                    <p className="text-xs text-gray-400 mt-1.5">Must match an existing account</p>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">
                        Internal Note
                    </label>
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="e.g 280k TikTok - launch partnership agreed DM 21 Apr"
                        rows={5}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition resize-none"
                    />
                    <p className="text-xs text-gray-400 mt-1.5">Only visible to you in the admin panel</p>
                </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-gray-100">
                <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </button>
                <button className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-green-800 hover:bg-green-700 transition-colors">
                    Grant access
                </button>
            </div>
        </div>
    );
}