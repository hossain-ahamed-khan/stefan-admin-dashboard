"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import AddInternalProduct from "../../../components/internalProducts/addProductModal";
import UpdateInternalProduct from "@/components/internalProducts/updateProductModal";
import { useDeleteProduct, useGetProducts } from "@/apis/hooks/useInternalProducts";
import { Products } from "@/apis/internalProductApis";


const PAGE_SIZE = 8;

const SourceBadge = ({ source }: { source: string }) => (
  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#CDBDFF] text-[#8A63FF]">
    {source}
  </span>
);

const VerifiedBadge = ({ status }: { status: boolean }) => (
  <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${status ? "bg-[#74C69D] text-white" : "bg-[#F0CE94] text-white"}`}>
    {status ? "Verified" : "Pending"}
  </span>
);

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

export default function ProductTable() {
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All sources");
  const [verifiedFilter, setVerifiedFilter] = useState("All verified");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);


  const { data, isLoading } = useGetProducts({
    page: currentPage,
    page_size: PAGE_SIZE,
    search: search || undefined,
  });

  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 1;

  // Client-side filter for source & verified (if backend doesn't support them)
  const filtered = (data?.results ?? []).filter((p) => {
    const matchSource = sourceFilter === "All sources" || p.source === sourceFilter;
    const matchVerified =
      verifiedFilter === "All verified" ||
      (verifiedFilter === "Verified" ? p.is_verified : !p.is_verified);
    return matchSource && matchVerified;
  });

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Delete Product?",
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
      deleteProduct(id, {
        onSuccess: () => {
          Swal.fire({
            title: "Deleted!",
            text: "Product has been removed.",
            icon: "success",
            confirmButtonColor: "#2d6a4f",
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
            confirmButtonColor: "#2d6a4f",
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
      {/* Top Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search barcode or product name..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-300 w-64"
          />

          <div className="relative">
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
            >
              <option>All sources</option>
              <option>User OCR</option>
              <option>Manual Admin</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
          </div>

          <div className="relative">
            <select
              value={verifiedFilter}
              onChange={(e) => setVerifiedFilter(e.target.value)}
              className="appearance-none px-4 py-2 pr-8 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 outline-none focus:ring-2 focus:ring-green-300 cursor-pointer"
            >
              <option>All verified</option>
              <option>Verified</option>
              <option>Pending</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2 bg-[#2d6a4f] hover:bg-[#245c43] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
        >
          <span className="text-lg leading-none">+</span>
          Add product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {["Barcode", "Product Name", "Brand", "Source", "Verified", "Added", "Actions"].map((col) => (
                <th key={col} className="px-6 py-4 text-left text-sm font-semibold text-gray-800">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                    <div className="w-5 h-5 border-2 border-[#2d6a4f] border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-400">No products found.</td>
              </tr>
            ) : (
              filtered.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">{product.barcode}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.product_name}</td>
                  
                  <td className="px-6 py-4 text-sm text-gray-600">{product.brand}</td>
                  <td className="px-6 py-4"><SourceBadge source={product.source} /></td>
                  <td className="px-6 py-4"><VerifiedBadge status={product.is_verified} /></td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(product.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-white hover:text-[#667180]"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        disabled={isDeleting}
                        className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-red-50 hover:text-red-400 hover:border-red-200 disabled:opacity-40"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2 mt-5">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors text-sm"
        >‹</button>
        <div className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-sm text-gray-700 font-medium">
          {currentPage}
        </div>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors text-sm"
        >›</button>
        <span className="text-sm text-gray-600 ml-2"> Total {data?.count ?? 0} products</span>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddInternalProduct onClose={() => setIsAddModalOpen(false)} />
      )}
      {selectedProduct && (
        <UpdateInternalProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}