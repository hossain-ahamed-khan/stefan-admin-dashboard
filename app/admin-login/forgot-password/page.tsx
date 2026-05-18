"use client";

import { useState } from "react";
import Image from "next/image";
import authImage from "@/public/images/auth-image.png";
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
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center px-4">
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
                <h2 className="font-inter text-3xl font-semibold text-[#1A1A18] text-center mb-2">
                    Forget Password
                </h2>

                 <p className="text-sm font-normal text-[#1A1A18] text-center mb-8">
                    Please enter your email to get verification code
                </p>

                {/* Email */}
                <div className="space-y-2 mb-5">
                     <label className="block text-[16px] text-[#1A1A18] font-medium">
                        Email address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                         className="font-sans w-full border border-[#a5a59d] bg-[#FBFBFB] text-[#1A1A18] placeholder-[#5a5a55] rounded-lg px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                </div>

                {/* Submit */}
                <Button
                    onClick={handleSubmit}
                    disabled={loading}
                     className="cursor-pointer w-full py-5.5 rounded-lg bg-[#2D6A4F] text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-500/30 active:scale-[0.98] disabled:opacity-50">
                    {loading ? "Sending..." : "Continue"}
                </Button>
            </div>
        </div>
    );
}
