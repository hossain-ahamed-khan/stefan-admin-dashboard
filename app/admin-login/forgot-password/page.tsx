"use client";

import { useState } from "react";
import Image from "next/image";
import authImage from "@/public/images/auth-image.png";
import Link from "next/link";
import Swal from "sweetalert2";
import { ForgotPasswordRequest } from "@/apis/authApis";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


export default function ForgetPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!email) {
            Swal.fire({
                title: "Error!",
                text: "Email is required",
                icon: "error",
                confirmButtonColor: "#dc2626",
            });
            return;
        }

        try {
            setLoading(true);

            const response = await ForgotPasswordRequest({ email })
            localStorage.setItem("resetEmail", email);

            if (response.status === 200 || response.status === 201) {
                localStorage.setItem("reset_email", email);
                Swal.fire({
                    title: "Success!",
                    text: "Verification code sent to your email.",
                    icon: "success",
                    confirmButtonColor: "#0030A8",
                }).then(() => {
                    router.push("/admin-login/forget-password/enter-otp");
                });
            }
        } catch (error: any) {
            const errorMessage =
                error.response?.data?.email?.[0] ||
                error.response?.data?.detail ||
                "Something went wrong. Please try again.";

            Swal.fire({
                title: "Error!",
                text: errorMessage,
                icon: "error",
                confirmButtonColor: "#dc2626",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#171F33] flex flex-col items-center justify-center px-4">
            {/* Logo / Top Image */}
            <div className="relative w-63 h-38 rounded-2xl overflow-hidden -mt-40">
                <Image
                    src={authImage}
                    alt="Shrine Logo"
                    fill
                    sizes="(max-width: 640px) 200px, 250px"
                    className="object-cover"
                    priority
                />
            </div>

            {/* Card */}
            <div className="w-full max-w-md mt-5">
                <h2 className="font-inter text-3xl font-semibold text-white text-center mb-2">
                    Forget Password
                </h2>

                <p className="text-sm text-slate-400 text-center mb-8">
                    Please enter your email to get verification code
                </p>

                {/* Email */}
                <div className="space-y-2 mb-5">
                    <label className="block text-sm text-slate-300 font-medium">
                        Email address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="esteban_schiller@gmail.com"
                        required
                        className="w-full bg-white text-slate-800 placeholder-slate-400 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {/* Submit */}
                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="cursor-pointer w-full py-5.5 rounded-lg bg-linear-to-r from-[#BAC3FF] to-[#004FD2] hover:from-[#FD0778] hover:to-[#FE5E08] text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-500/30 active:scale-[0.98]">
                    {loading ? "Sending..." : "Continue"}
                </Button>
            </div>


        </div>
    );
}
