"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import Image from "next/image";
import authImage from "@/public/images/auth-image.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { resetForgotPasswordOtp, verifyForgotPasswordOtp } from "@/apis/authApis";
import Swal from "sweetalert2";

const OTP_LENGTH = 6;

export default function EnterOtpPage() {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const email = typeof window !== "undefined" ? localStorage.getItem("resetEmail") : "";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // keep last digit
    setOtp(newOtp);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextEmpty = pasted.length < OTP_LENGTH ? pasted.length : OTP_LENGTH - 1;
    inputRefs.current[nextEmpty]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const code = otp.join("");

    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email not found. Please try again.",
      });
      return;
    }

    setIsVerifying(true);

    try {
      await verifyForgotPasswordOtp({
        email,
        code,
      });

      await Swal.fire({
        icon: "success",
        title: "OTP Verified",
        text: "Now you can reset your password",
        timer: 1500,
        showConfirmButton: false,
      });

      // ✅ go to reset password page
      router.push("/admin-login/forget-password/enter-otp/change-password");

    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Invalid OTP",
        text: error?.message || error?.detail || "Please try again",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center px-4">
      {/* Logo */}
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
        {/* Lock icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        <h2 className="font-inter text-3xl font-semibold text-[#1A1A18] text-center mb-2">
          Verify Your Account
        </h2>
         <p className="text-sm font-normal text-[#1A1A18] text-center mb-8">
          We sent a 6-digit code to your email.{" "}
          <br />
          Please enter it below to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Inputs */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`
                  w-12 h-14 text-center text-xl font-semibold rounded-lg
                  bg-white text-slate-800 outline-none
                  border-2 transition-all duration-150
                  ${digit ? "border-blue-500 shadow-[0_0_12px_rgba(99,102,241,0.4)]" : "border-transparent"}
                  focus:border-blue-500 focus:shadow-[0_0_12px_rgba(99,102,241,0.4)]
                  caret-blue-500
                `}
              />
            ))}
          </div>

          {/* Resend */}
          <p className="text-center text-sm text-[#1A1A18]">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={async () => {
                if (isResending) return;

                if (!email) {
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Email missing. Go back and try again.",
                  });
                  return;
                }

                setIsResending(true);

                try {
                  await resetForgotPasswordOtp({ email });

                  setOtp(Array(OTP_LENGTH).fill(""));
                  inputRefs.current[0]?.focus();

                  Swal.fire({
                    icon: "success",
                    title: "OTP Sent",
                    text: "Check your email for new code",
                    timer: 1500,
                    showConfirmButton: false,
                  });

                } catch (error: any) {
                  Swal.fire({
                    icon: "error",
                    title: "Failed",
                    text: error?.message || "Could not resend OTP",
                  });
                } finally {
                  setIsResending(false);
                }
              }}
              className="cursor-pointer font-medium transition"
            >
              Resend
            </button>
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isComplete || isVerifying}
            //  className="cursor-pointer w-full py-3 rounded-lg bg-[#2D6A4F] text-white font-medium text-sm transition-all duration-200  shadow-blue-500/30 active:scale-[0.98] disabled:opacity-50"
            className={`cursor-pointer w-full py-3 rounded-lg bg-[#2D6A4F] text-white font-medium text-sm transition-all duration-200 shadow-lg ${isComplete
              ? "bg-[#2D6A4F] text-white" : "bg-[#2D6A4F] text-slate-400"}
                ${isVerifying ? "opacity-50 cursor-not-allowed" : ""}`}>
            {isVerifying ? "Verifying..." : "Verify Code"}
          </button>

          {/* Back to login */}
          <div className="text-center">
            <Link href="/admin-login">
              <button
                type="button"
                className="cursor-pointer text-sm text-[#1A1A18] hover:text-black transition inline-flex items-center gap-1"
                onClick={() => console.log("Back to login")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Login
              </button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}