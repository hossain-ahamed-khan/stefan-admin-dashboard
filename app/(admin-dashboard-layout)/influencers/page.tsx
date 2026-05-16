"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import GrantInfluencerAccessModal from "@/components/influencer/grantAccessModal";
import { useGetInfluencers, useRevokeInfluencerAccess } from "@/apis/hooks/useInfluencers";


export default function InfluencerAccessTable() {
  const [search, setSearch] = useState("");
  const [isGrantAccessOpen, setIsGrantAccessOpen] = useState(false);

  const { data: influencers, isLoading } = useGetInfluencers(search);
  const { mutate: revokeAccess, isPending: isRevoking } = useRevokeInfluencerAccess();

  const handleRevoke = async (id: number) => {
    const result = await Swal.fire({
      title: "Revoke Access?",
      text: "This influencer will lose all special privileges.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, revoke",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#e2ddd5",
      customClass: {
        popup: "rounded-2xl",
        confirmButton: "rounded-lg text-sm font-medium",
        cancelButton: "rounded-lg text-sm font-medium !text-gray-600",
      },
    });

    if (result.isConfirmed) {
      revokeAccess(id, {
        onSuccess: () => {
          Swal.fire({
            title: "Revoked!",
            text: "Influencer access has been removed.",
            icon: "success",
            confirmButtonColor: "#2D6A4F",
            customClass: {
              popup: "rounded-2xl",
              confirmButton: "rounded-lg text-sm font-medium",
            },
          });
        },
        onError: () => {
          Swal.fire({
            title: "Failed!",
            text: "Something went wrong. Please try again.",
            icon: "error",
            confirmButtonColor: "#2D6A4F",
            customClass: {
              popup: "rounded-2xl",
              confirmButton: "rounded-lg text-sm font-medium",
            },
          });
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] p-8 font-sans">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Search influencers"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30"
        />
        <button
          onClick={() => setIsGrantAccessOpen(true)}
          className="flex items-center gap-2 bg-[#2D6A4F] hover:bg-[#2f4a34] text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
        >
          <span className="text-lg leading-none">+</span>
          Grant access
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 px-6 py-4 border-b border-gray-100">
          <span className="text-sm font-semibold text-gray-800">ID</span>
          <span className="text-sm font-semibold text-gray-800">Email</span>
          <span className="text-sm font-semibold text-gray-800">Note</span>
          <span className="text-sm font-semibold text-gray-800">Granted</span>
          <span className="text-sm font-semibold text-gray-800 text-right">Actions</span>
        </div>

        {/* Rows */}
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-gray-400 text-sm">
            <div className="w-5 h-5 border-2 border-[#2D6A4F] border-t-transparent rounded-full animate-spin" />
            Loading...
          </div>
        ) : influencers?.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-gray-400">
            No influencers found.
          </div>
        ) : (
          influencers?.map((item, index) => (
            <div
              key={item.id}
              className={`grid grid-cols-5 px-6 py-4 items-center ${
                index !== (influencers.length - 1) ? "border-b border-gray-100" : ""
              }`}
            >
              <span className="font-sans text-sm font-medium text-gray-600">{item.id}</span>
              <span className="font-sans text-sm font-medium text-gray-600">{item.email}</span>
              <span className="font-sans text-sm font-medium text-gray-600">{item.note}</span>
              <span className="font-sans text-sm font-medium text-gray-600">
                {new Date(item.created_at).toLocaleDateString("en-GB", {
                  day: "2-digit", month: "short", year: "numeric",
                })}
              </span>
              <div className="flex justify-end">
                <button
                  onClick={() => handleRevoke(item.id)}
                  disabled={isRevoking}
                  className="text-sm text-red-400 border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-1.5 rounded-lg transition-colors disabled:opacity-40"
                >
                  Revoke
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isGrantAccessOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 p-4 flex items-center justify-center"
          onClick={() => setIsGrantAccessOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <GrantInfluencerAccessModal onClose={() => setIsGrantAccessOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}