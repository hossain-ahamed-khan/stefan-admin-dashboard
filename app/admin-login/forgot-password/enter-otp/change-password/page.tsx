"use client";

import { useState } from "react";
import Image from "next/image";
import authImage from "@/public/images/auth-image.png";
import Link from "next/link";
import { resetNewPassword } from "@/apis/authApis";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function AdminDashboardResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false)
  const router = useRouter();


  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("resetEmail") : "";


  const passwordsMatch = confirmPassword === "" || password === confirmPassword;
  const isValid = password.length >= 6 && password === confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill all fields",
      });
    }

    if (password.length < 6) {
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 6 characters",
      });
    }

    if (password !== confirmPassword) {
      return Swal.fire({
        icon: "error",
        title: "Mismatch",
        text: "Passwords do not match",
      });
    }

    if (!email) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email missing. Restart process.",
      });
    }

    setLoading(true);

    try {
      await resetNewPassword({
        email,
        password,
        confirm_password: confirmPassword,
      });

      // ✅ success
      await Swal.fire({
        icon: "success",
        title: "Password Reset Successful",
        text: "You can now login with your new password",
        timer: 1500,
        showConfirmButton: false,
      });

      // cleanup
      localStorage.removeItem("resetEmail");

      // redirect to login
      router.push("/admin-login/forget-password/enter-otp/change-password/success");

    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          error?.message ||
          error?.detail ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#171F33] flex flex-col items-center justify-center px-4">
      {/* Logo / Top Image */}
      <div className="flex flex-col items-center">
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
      </div>

      {/* Card */}
      <div className="w-full max-w-md">
        <h2 className="font-inter text-3xl font-semibold text-white text-center mb-2">
          Reset Password
        </h2>
        <p className="text-sm text-slate-400 text-center mb-8">
          Enter your new password below
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div className="space-y-1.5">
            <label className="block text-sm text-slate-300 font-medium">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                className="w-full bg-white text-slate-800 placeholder-slate-400 rounded-lg px-4 py-3 pr-11 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {password.length > 0 && password.length < 6 && (
              <p className="text-xs text-red-400">Password must be at least 6 characters</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="block text-sm text-slate-300 font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••"
                required
                className={`w-full bg-white text-slate-800 placeholder-slate-400 rounded-lg px-4 py-3 pr-11 text-sm outline-none focus:ring-2 transition ${!passwordsMatch ? "focus:ring-red-400 ring-2 ring-red-400" : "focus:ring-blue-500"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 transition"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {!passwordsMatch && (
              <p className="text-xs text-red-400">Passwords do not match</p>
            )}
            {passwordsMatch && confirmPassword.length > 0 && password === confirmPassword && (
              <p className="text-xs text-green-400">✓ Passwords match</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className={`cursor-pointer w-full py-3 rounded-lg text-white font-medium text-sm transition-all duration-200 shadow-lg active:scale-[0.98] ${isValid
              ? "bg-linear-to-r from-[#BAC3FF] to-[#004FD2] hover:from-[#FD0778] hover:to-[#FE5E08] shadow-blue-500/30"
              : "bg-slate-600 opacity-50 cursor-not-allowed shadow-none"
              }`}
          >
            Reset Password
          </button>

          {/* Back to login */}
          <div className="text-center">
            <Link
              href="/admin-login"
              className="text-sm text-slate-400 hover:text-white transition inline-flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}