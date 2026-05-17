"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import AddRoutineProduct from "@/components/routineProduct/addRoutineProductModal";
import { useGetRoutingProducts, useDeleteRoutingProduct } from "@/apis/hooks/useRoutingProducts";
import { SkincareProduct } from "@/apis/routingProductsApis";
import UpdateRoutineProduct from "@/components/routineProduct/updateRoutingProduct";

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

export default function RoutineProductsTable() {
  const [search, setSearch] = useState("");
  const [slot, setSlot] = useState("");
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SkincareProduct | null>(null);

  const { data, isLoading } = useGetRoutingProducts({
    page,
    search: search || undefined,
    routine_slot: slot || undefined,
  });

  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteRoutingProduct();

  const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 1;

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleSlotChange = (val: string) => {
    setSlot(val === "All slots" ? "" : val);
    setPage(1);
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
    <div className="min-h-screen bg-[#faf8f5] p-8 font-sans">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search routine products..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600 placeholder-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 w-56"
          />
          <div className="relative">
            <select
              onChange={(e) => handleSlotChange(e.target.value)}
              className="appearance-none rounded-lg border border-stone-200 bg-white px-4 py-2 pr-8 text-sm text-stone-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300 cursor-pointer"
            >
              <option>All slots</option>
              <option value="both">Both</option>
              <option value="morning">Morning</option>
              <option value="night">Night</option>
            </select>
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-stone-400">▾</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="rounded-lg bg-[#2D6A4F] px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-800"
        >
          + Add product
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm text-stone-700">
          <thead>
            <tr className="border-b border-stone-100">
              {["Brand", "Product", "Category", "Slot", "Skin Types", "Price", "Priority", "Verified", "Actions"].map((col) => (
                <th key={col} className="py-4 px-6 text-center font-semibold text-stone-800">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={9} className="py-12 text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
                    <div className="w-5 h-5 border-2 border-[#2D6A4F] border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </div>
                </td>
              </tr>
            ) : data?.results.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-stone-400">No products found.</td>
              </tr>
            ) : (
              data?.results.map((product) => (
                <tr key={product.product_id} className="border-b border-stone-50 last:border-0 transition-colors hover:bg-stone-50">
                  <td className="py-4 px-6 text-center">{product.brand}</td>
                  <td className="py-4 px-6 text-center">{product.product_name}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="inline-block rounded-full px-3 py-1 text-xs font-medium text-purple-900" style={{ backgroundColor: "#CDBDFF" }}>
                      {product.category_name ?? product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center capitalize">{product.routine_slot}</td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1 flex-wrap">
                      {product.suitable_skin_types.split(",").map((st) => (
                        <span key={st} className="inline-block rounded-full px-3 py-1 text-xs font-medium bg-[#74C69D] text-white">
                          {st.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">{product.price}</td>
                  <td className="py-4 px-6 text-center">{product.priority_score}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-block rounded-full px-4 py-1 text-xs font-medium ${product.is_active ? "bg-[#74C69D] text-white" : "bg-stone-200 text-stone-500"}`}>
                      {product.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="cursor-pointer flex w-9 h-9 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-white hover:text-[#667180]"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => handleDelete(product.product_id!)}
                        disabled={isDeleting}
                        className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-red-50 hover:text-red-400 hover:border-red-200 disabled:opacity-40"
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
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 transition-colors shadow-sm disabled:opacity-40"
        >‹</button>
        <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-stone-200 bg-white text-stone-700 font-medium shadow-sm text-sm">
          {page}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-stone-200 bg-white text-stone-500 hover:bg-stone-50 transition-colors shadow-sm disabled:opacity-40"
        >›</button>
        <span className="text-xs text-gray-400 ml-2">{data?.count ?? 0} total products</span>
      </div>

      {/* Modals */}
      {isAddModalOpen && (
        <AddRoutineProduct onClose={() => setIsAddModalOpen(false)} />
      )}
      {selectedProduct && (
        <UpdateRoutineProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}