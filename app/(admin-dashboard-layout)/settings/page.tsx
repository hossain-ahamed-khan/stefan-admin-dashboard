"use client";
import { useState } from "react";

export default function AdminAccount() {
    const [email] = useState("nusrat2111@gmail.com");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    const handleSave = () => {
        setError("");
        if (!newPassword || !confirmPassword) {
            setError("Please fill in both password fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <div className="min-h-screen bg-[#f0ede8] flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-2xl bg-[#f7f5f1] border border-[#e0dbd2] rounded-2xl p-8 shadow-sm">
                {/* Title */}
                <h2 className="text-xl font-semibold text-[#1a1a1a] mb-6 tracking-tight">
                    Admin Account
                </h2>

                <hr className="border-[#e0dbd2] mb-6" />

                {/* Email Field */}
                <div className="mb-6">
                    <label className="block text-sm text-[#3d3d3d] mb-2 font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        readOnly
                        className="w-full px-4 py-3 rounded-xl border border-[#ddd8d0] bg-white text-[#5a5a5a] text-sm outline-none cursor-default focus:ring-2 focus:ring-[#3d6b52]/30 transition"
                    />
                </div>

                {/* Password Fields */}
                <div className="flex gap-4 mb-2">
                    <div className="flex-1">
                        <label className="block text-sm text-[#3d3d3d] mb-2 font-medium">
                            New password
                        </label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-[#ddd8d0] bg-white text-[#1a1a1a] text-sm outline-none placeholder-[#bbb] focus:ring-2 focus:ring-[#3d6b52]/40 focus:border-[#3d6b52] transition"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm text-[#3d3d3d] mb-2 font-medium">
                            Confirm password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-[#ddd8d0] bg-white text-[#1a1a1a] text-sm outline-none placeholder-[#bbb] focus:ring-2 focus:ring-[#3d6b52]/40 focus:border-[#3d6b52] transition"
                        />
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <p className="text-sm text-red-500 mt-1 mb-2">{error}</p>
                )}

                {/* Save Button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleSave}
                        className={`px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 ${saved
                            ? "bg-green-600 scale-95"
                            : "bg-[#3d6b52] hover:bg-[#2f5440] active:scale-95"
                            }`}
                    >
                        {saved ? "Saved ✓" : "Save changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}