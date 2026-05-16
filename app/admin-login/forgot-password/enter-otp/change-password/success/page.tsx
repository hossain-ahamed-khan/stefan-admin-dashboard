import { Button } from "@/components/ui/button";
import authImage from "@/public/images/auth-image.png";
import Image from "next/image";
import Link from "next/link";

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-[#171F33] flex flex-col items-center justify-center px-4">
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

            <div className="w-full max-w-md">
                <h2 className="font-inter text-3xl font-semibold text-white text-center mb-2">
                    Password Updated Successfully!
                </h2>

                <p className="text-sm text-slate-400 text-center mb-8">
                    Your new password has been saved. You can now continue securely.
                </p>

                {/* Submit */}
                <Link href="/admin-login">
                    <Button
                        className="cursor-pointer w-full py-5.5 rounded-lg bg-linear-to-r from-[#BAC3FF] to-[#004FD2] hover:from-[#FD0778] hover:to-[#FE5E08] text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-500/30 active:scale-[0.98]">
                        Sign in
                    </Button>
                </Link>
            </div>

        </div>
    )
}
