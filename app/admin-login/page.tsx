"use client";

import { useState } from "react";
import Image from "next/image";
import authImage from "@/public/images/auth-image.png";
import Link from "next/link";
import { login } from "@/apis/authApis";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function AdminDashboardLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberPassword, setRememberPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await login({ email, password })
            const userRole = response?.user_details?.is_admin;

            // console.log("Login user:", response);
            // console.log("Login userRole:", userRole);

            if (userRole !== true) {
                await Swal.fire({
                    icon: "error",
                    title: "Access Denied",
                    text: "You are not authorized by admin",
                });
                return;
            }

            localStorage.setItem("authToken", response?.access);

            await Swal.fire({
                icon: "success",
                title: "Login Successful",
                text: "Welcome back!",
                timer: 1500,
                showConfirmButton: false,
            });

            router.push("/");
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text:
                    error?.message ||
                    error?.detail ||
                    "Invalid email or password",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center px-4">
            {/* Logo / Top Image */}
            <div className="relative w-63 h-38 rounded-2xl -mt-40">
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
            <div className="w-full max-w-md mt-4">
                <h2 className="font-inter text-3xl font-semibold text-[#1A1A18] text-center mb-2">
                    Login to Account
                </h2>
                <p className="text-sm font-normal text-[#1A1A18] text-center mb-8">
                    Please enter your email and password to continue
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="block text-[16px] text-[#1A1A18] font-medium">
                            Email address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Please Enter your email"
                            required
                            className="font-sans w-full border border-[#a5a59d] bg-[#FBFBFB] text-[#1A1A18] placeholder-[#5a5a55] rounded-lg px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="block text-[16px] text-[#1A1A18] font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••"
                                required
                                className="w-full border border-[#a5a59d] bg-[#FBFBFB] text-[#1A1A18] placeholder-[#1A1A18] rounded-lg px-4 py-3 pr-11 text-lg outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    // Eye-off icon
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    // Eye icon
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Remember & Forget */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                                type="checkbox"
                                checked={rememberPassword}
                                onChange={(e) => setRememberPassword(e.target.checked)}
                                className="w-4 h-4 accent-[#1A1A18] rounded"
                            />
                            <span className="text-lg text-[#1A1A18]">Remember Password</span>
                        </label>

                        <Link href="/admin-login/forgot-password/">
                            <button
                                type="button"
                                className="font-inter cursor-pointer text-lg text-[#1A1A18] hover:text-black transition"
                            >
                                Forget Password?
                            </button>
                        </Link>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="cursor-pointer w-full py-3 rounded-lg bg-[#2D6A4F] text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-500/30 active:scale-[0.98] disabled:opacity-50"
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
}