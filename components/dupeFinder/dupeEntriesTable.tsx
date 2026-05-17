"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import UpdateDupeEntry from "./updateDupeModal";
import { useGetDupeProducts, useDeleteDupeProduct } from "@/apis/hooks/useDupeProducts";
import { DupeProduct } from "@/apis/dupeProductApis";

const PAGE_SIZE = 10;

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

export default function DupeEntriesTable() {
  const [search, setSearch] = useState("");
  const [verifiedFilter, setVerifiedFilter] = useState("All verified");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEntry, setSelectedEntry] = useState<DupeProduct | null>(null);

  const { data, isLoading } = useGetDupeProducts({
    page: currentPage,
    page_size: PAGE_SIZE,
    search: search || undefined,
  });

  const { mutate: deleteEntry, isPending: isDeleting } = useDeleteDupeProduct();

  const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 1;

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  // Client-side verified filter
  const filtered = (data?.results ?? []).filter((e) => {
    if (verifiedFilter === "All verified") return true;
    if (verifiedFilter === "Verified") return e.make_verified === true;
    if (verifiedFilter === "Pending") return e.make_verified === false;
    return true;
  });

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Dupe Entry?",
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
            text: "Dupe entry has been removed.",
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
    <div className="min-h-screen bg-[#faf8f5] font-sans">
      {/* Search + Filter */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search dupe products..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-64 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4a9e5c]"
          />
          <div className="relative">
            <select value={verifiedFilter} onChange={(e) => setVerifiedFilter(e.target.value)}
              className="appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2 pr-8 text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-[#4a9e5c] cursor-pointer">
              <option>All verified</option>
              <option>Verified</option>
              <option>Pending</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1.5fr_2fr_1fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr] px-6 py-4 border-b border-gray-100">
          {["Dupe Brand", "Dupe Product", "Price", "Saving", "Retailer", "Added by", "Verified", "Actions"].map((h) => (
            <span key={h} className="text-sm font-semibold text-gray-700">{h}</span>
          ))}
        </div>

        {/* Rows */}
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-10 text-gray-400 text-sm">
            <div className="w-5 h-5 border-2 border-[#2D6A4F] border-t-transparent rounded-full animate-spin" />
            Loading...
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-gray-400">No entries found.</div>
        ) : (
          filtered.map((entry, idx) => (
            <div
              key={entry.id}
              className={`grid grid-cols-[1.5fr_2fr_1fr_1.5fr_1.5fr_1.5fr_1.5fr_1fr] px-6 py-4 items-center ${idx !== filtered.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <span className="text-sm text-gray-600">{entry.brand}</span>
              <span className="text-sm text-gray-600">{entry.product_name}</span>
              <span className="text-sm text-gray-600">{entry.price}</span>
              <div>
                <span className="bg-[#CDBDFF] text-[#6b21a8] text-xs px-3 py-1 rounded-full">
                  {entry.saving_percent}% off
                </span>
              </div>
              <span className="text-sm text-gray-600">{entry.retailer}</span>
              <span className="text-sm text-gray-600">{entry.created_by}</span>
              <div>
                {entry.make_verified ? (
                  <span className="bg-[#74C69D] text-white text-xs px-3 py-1 rounded-full font-medium">Verified</span>
                ) : (
                  <span className="bg-[#F0CE94] text-[#7a6000] text-xs px-3 py-1 rounded-full font-medium">Pending</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSelectedEntry(entry)}
                  className="flex cursor-pointer w-10 h-10 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-white hover:text-[#667180]">
                  <EditIcon />
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  disabled={isDeleting}
                  className="flex cursor-pointer w-10 h-10 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-red-50 hover:text-red-400 hover:border-red-200 disabled:opacity-40">
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2 mt-4">
        <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
          className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors text-sm disabled:opacity-40">
          ‹
        </button>
        <span className="w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700">
          {currentPage}
        </span>
        <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
          className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors text-sm disabled:opacity-40">
          ›
        </button>
        <span className="text-xs text-gray-400 ml-2">{data?.count ?? 0} total entries</span>
      </div>

      {selectedEntry && (
        <UpdateDupeEntry entry={selectedEntry} onClose={() => setSelectedEntry(null)} />
      )}
    </div>
  );
}