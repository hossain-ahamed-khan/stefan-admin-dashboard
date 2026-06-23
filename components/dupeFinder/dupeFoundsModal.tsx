"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import UpdateDupeEntry from "./updateDupeModal";
import { DupeProduct } from "@/apis/dupeProductApis";
import { useGetDupeProducts, useDeleteDupeProduct } from "@/apis/hooks/useDupeProducts";

interface DupeFoundsModalProps {
  onClose: () => void;
  productName?: string;
  expensiveProductId: number; // ✅ pass the id to fetch real dupes
}

const EditIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.232 5.232l3.536 3.536M9 13l6.768-6.768a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414A2 2 0 018.586 12.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M4 7h16" />
  </svg>
);

export default function DupeFoundsModal({ onClose, productName, expensiveProductId }: DupeFoundsModalProps) {
  const [selectedEntry, setSelectedEntry] = useState<DupeProduct | null>(null);

  const { data, isLoading } = useGetDupeProducts({
    page: 1,
    page_size: 100,
    expensive_product: expensiveProductId,
  });

  const { mutate: deleteEntry, isPending: isDeleting } = useDeleteDupeProduct();

  const dupes = data?.results ?? [];
  // add this temporarily in dupeFoundsModal
  // console.log("raw data:", data?.results);
  // console.log("expensiveProductId:", expensiveProductId);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Dupe?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
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
      deleteEntry(id, {
        onSuccess: () => {
          Swal.fire({
            title: "Deleted!",
            text: "Dupe has been removed.",
            icon: "success",
            confirmButtonColor: "#2D6A4F",
            customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg text-sm font-medium" },
          });
        },
        onError: () => {
          Swal.fire({
            title: "Failed!",
            text: "Something went wrong. Please try again.",
            icon: "error",
            confirmButtonColor: "#2D6A4F",
            customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg text-sm font-medium" },
          });
        },
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4" onClick={onClose}>
      <div className="w-full max-w-xl rounded-3xl bg-[#faf8f5] shadow-2xl" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="relative px-8 pt-7 pb-5">
          <button onClick={onClose}
            className="cursor-pointer absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-[#2b2b2b] text-white transition-colors hover:bg-[#1f1f1f]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <h2 className="text-xl font-semibold text-[#2b2b2b]">Dupe founds</h2>
          <p className="mt-1 text-sm text-[#9aa0a6]">{productName}</p>
        </div>

        <div className="h-px bg-[#ebe7e1]" />

        {/* Body */}
        <div className="px-8 py-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-6 text-gray-400 text-sm">
              <div className="w-5 h-5 border-2 border-[#2D6A4F] border-t-transparent rounded-full animate-spin" />
              Loading...
            </div>
          ) : dupes.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-6">No dupes found for this product.</p>
          ) : (
            dupes.map((dupe) => (
              <div key={dupe.id} className="space-y-1">
                {/* <label className="text-sm font-semibold text-[#2b2b2b]">
                  {dupe.brand}
                </label> */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 rounded-2xl border border-[#e6e1da] bg-white px-4 py-3 text-sm text-[#6b7280]">
                    <span className="font-medium">{dupe?.product_name}</span>
                    <span className="mx-2 text-gray-300">·</span>
                    <span className="font-medium">{dupe.price}</span>
                    <span className="mx-2 text-gray-300">·</span>
                    <span>{dupe.retailer}</span>
                    <span className="mx-2 text-gray-300">·</span>
                    {/* <span className={dupe.make_verified ? "text-green-600" : "text-yellow-600"}>
                      {dupe.make_verified ? "Verified" : "Pending"}
                    </span> */}
                  </div>
                  <button
                    onClick={() => setSelectedEntry(dupe)}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-white hover:text-[#667180] cursor-pointer"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(dupe.id)}
                    disabled={isDeleting}
                    className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-red-50 hover:text-red-400 hover:border-red-200 disabled:opacity-40 cursor-pointer"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-8 pb-7 flex items-center justify-end gap-4">
          <button onClick={onClose}
            className="cursor-pointer min-w-33 rounded-xl border border-[#e6e1da] bg-white px-6 py-2.5 text-sm font-semibold text-[#6b7280] shadow-sm transition-colors hover:bg-[#f7f5f1]">
            Close
          </button>
        </div>
      </div>

      {/* ✅ passes real entry object */}
      {selectedEntry && (
        <UpdateDupeEntry
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
        />
      )}
    </div>
  );
}