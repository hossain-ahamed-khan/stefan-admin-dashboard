"use client";
import { getUserProfile, userProfileResetNewPassword } from "@/apis/authApis";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";

export const useResetPassword = () => {
    return useMutation({
        mutationFn: (resetPassword: {
            old_password: string;
            new_password: string;
            confirm_new_password: string;
        }) => userProfileResetNewPassword(resetPassword),
    });
};

export default function AdminAccount() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { userProfileData } = getUserProfile();
    const { mutate: resetPassword, isPending } = useResetPassword();

    const handleSave = () => {
        setError("");

        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("Please fill in all password fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        resetPassword(
            {
                old_password: oldPassword,
                new_password: newPassword,
                confirm_new_password: confirmPassword,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Password Changed",
                        text: "Your password has been updated successfully.",
                    });
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                },
                onError: (error: any) => {
                    const errorData = error?.response?.data || error;
                    const errorText =
                        errorData?.old_password?.[0] ||
                        errorData?.new_password?.[0] ||
                        errorData?.confirm_new_password?.[0] ||
                        errorData?.message ||
                        errorData?.detail ||
                        "Something went wrong.";

                    Swal.fire({
                        icon: "error",
                        title: "Failed",
                        text: errorText,
                    });
                },
            }
        );
    };

    return (
        <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-2xl bg-[#f7f5f1] border border-[#e0dbd2] rounded-2xl p-8 shadow-sm">
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
                        value={userProfileData?.email || ""}
                        readOnly
                        className="w-full px-4 py-3 rounded-xl border border-[#ddd8d0] bg-white text-[#5a5a5a] text-sm outline-none cursor-default focus:ring-2 focus:ring-[#3d6b52]/30 transition"
                    />
                </div>

                {/* Password Fields */}
                <div className="flex gap-4 mb-2">
                    <div className="flex-1">
                        <label className="block text-sm text-[#3d3d3d] mb-2 font-medium">
                            Old password
                        </label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl border border-[#ddd8d0] bg-white text-[#1a1a1a] text-sm outline-none placeholder-[#bbb] focus:ring-2 focus:ring-[#3d6b52]/40 focus:border-[#3d6b52] transition"
                        />
                    </div>
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

                {error && (
                    <p className="text-sm text-red-500 mt-1 mb-2">{error}</p>
                )}

                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleSave}
                        disabled={isPending}
                        className="px-6 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 bg-[#3d6b52] hover:bg-[#2f5440] active:scale-95 disabled:opacity-50"
                    >
                        {isPending ? "Saving..." : "Save changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}