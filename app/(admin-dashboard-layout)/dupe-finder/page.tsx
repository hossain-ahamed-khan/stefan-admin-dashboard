"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import AddExpensiveProduct from "@/components/dupeFinder/addExpensiveProductModal";
import UpdateExpensiveProduct from "@/components/dupeFinder/updateExpensiveProductModal";
import DupeEntriesTable from "@/components/dupeFinder/dupeEntriesTable";
import DupeFoundsModal from "@/components/dupeFinder/dupeFoundsModal";
import { useGetExpensiveProducts, useDeleteExpensiveProduct } from "@/apis/hooks/useExpensiveProducts";
import { ExpensiveProduct } from "@/apis/expensiveProductApis";
import AddDupeEntry from "@/components/dupeFinder/addDupeEntryModal";

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

export default function ExpensiveProductsTable() {
    const [activeTab, setActiveTab] = useState<"expensive" | "dupe">("expensive");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ExpensiveProduct | null>(null);
    const [isDupeFoundsOpen, setIsDupeFoundsOpen] = useState(false);
    const [isAddDupeOpen,  setIsAddDupeOpen] = useState(false);
    const [selectedProductName, setSelectedProductName] = useState<string | null>(null);
    const [dupeFoundsList, setDupeFoundsList] = useState<string[]>([]);

    const { data, isLoading } = useGetExpensiveProducts({
        page: currentPage,
        page_size: PAGE_SIZE,
        search: search || undefined,
    });

    const { mutate: deleteProduct, isPending: isDeleting } = useDeleteExpensiveProduct();

    const totalPages = data ? Math.ceil(data.count / PAGE_SIZE) : 1;

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
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                <button onClick={() => setActiveTab("expensive")}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeTab === "expensive" ? "bg-[#D8F3DC] text-[#3D7A6E]" : "bg-white text-gray-500 border border-gray-200"}`}>
                    Expensive products
                </button>
                <button onClick={() => setActiveTab("dupe")}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${activeTab === "dupe" ? "bg-[#D8F3DC] text-[#3D7A6E]" : "bg-white text-gray-500 border border-gray-200"}`}>
                    Dupe entries
                </button>
            </div>

            {activeTab === "expensive" ? (
                <>
                    {/* Search + Add */}
                    <div className="flex justify-between items-center mb-5">
                        <input
                            type="text"
                            placeholder="Search product"
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600 placeholder-gray-400 w-64 focus:outline-none focus:ring-1 focus:ring-[#4a9e5c]"
                        />
                        <button
                            onClick={() => setIsAddProductOpen(true)}
                            className="bg-[#2D6A4F] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#234820] transition-colors cursor-pointer"
                        >
                            + Add expensive product
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                        {/* Header */}
                        <div className="grid grid-cols-[1.5fr_2.5fr_1fr_2fr_1.5fr_1.5fr] px-6 py-4 border-b border-gray-100">
                            {["Brand", "Product", "Price", "Key Actives", "Dupes", "Actions"].map((h) => (
                                <span key={h} className="text-sm font-semibold text-gray-700">{h}</span>
                            ))}
                        </div>

                        {/* Rows */}
                        {isLoading ? (
                            <div className="flex items-center justify-center gap-2 py-10 text-gray-400 text-sm">
                                <div className="w-5 h-5 border-2 border-[#2D6A4F] border-t-transparent rounded-full animate-spin" />
                                Loading...
                            </div>
                        ) : data?.results.length === 0 ? (
                            <div className="px-6 py-10 text-center text-sm text-gray-400">No products found.</div>
                        ) : (
                            data?.results.map((product, idx) => (
                                <div
                                    key={product.id}
                                    className={`grid grid-cols-[1.5fr_2.5fr_1fr_2fr_1.5fr_1.5fr] px-6 py-4 items-center ${idx !== (data.results.length - 1) ? "border-b border-gray-100" : ""}`}
                                >
                                    <span className="text-sm text-gray-600">{product.brand}</span>
                                    <span className="text-sm text-gray-600">{product.product_name}</span>
                                    <span className="text-sm text-gray-600">{product.price}</span>

                                    {/* Key Actives */}
                                    <div className="flex flex-wrap gap-2">
                                        {product.key_active_ingredients.split(",").map((active) => (
                                            <span key={active} className="bg-[#74C69D] text-white text-xs px-3 py-1 rounded-full">
                                                {active.trim()}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Dupes */}
                                    <div className="flex items-center gap-2">
                                        <span className="bg-[#F0CE94] text-[#7A6000] text-xs px-3 py-1 rounded-full font-medium">
                                            {product.dupe_products} dupes
                                        </span>
                                        <button
                                            onClick={() => {
                                                setSelectedProductName(product.product_name);
                                                setDupeFoundsList(product.search_terms.split(",").map((s) => s.trim()));
                                                setIsDupeFoundsOpen(true);
                                            }}
                                            className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => setIsAddDupeOpen(true)}
                                            className="h-9 min-w-21 rounded-lg border border-[#d8d6d1] bg-[#faf9f7] px-2.5 text-sm font-semibold leading-none text-[#6f7786] transition-colors hover:bg-[#f3f1ed] cursor-pointer"
                                        >
                                            +Dupe
                                        </button>
                                        <button
                                            onClick={() => setSelectedProduct(product)}
                                            className="flex cursor-pointer h-10 w-10 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-white hover:text-[#667180]"
                                        >
                                            <EditIcon />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            disabled={isDeleting}
                                            className="flex cursor-pointer h-10 w-10 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-red-50 hover:text-red-400 hover:border-red-200 disabled:opacity-40"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center gap-2 mt-4">
                        <button
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors text-sm disabled:opacity-40"
                        >‹</button>
                        <span className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700">
                            {currentPage}
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="cursor-pointer w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors text-sm disabled:opacity-40"
                        >›</button>
                        <span className="text-xs text-gray-400 ml-2">{data?.count ?? 0} total products</span>
                    </div>
                </>
            ) : (
                <DupeEntriesTable />
            )}

            {/* Modals */}
            {isAddProductOpen && (
                <AddExpensiveProduct onClose={() => setIsAddProductOpen(false)} />
            )}
            {selectedProduct && (
                <UpdateExpensiveProduct
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                />
            )}
            {isDupeFoundsOpen && (
                <DupeFoundsModal
                    onClose={() => setIsDupeFoundsOpen(false)}
                    productName={selectedProductName ?? "Product"}
                    dupeNames={dupeFoundsList}
                />
            )}
         
            {isAddDupeOpen ? <AddDupeEntry onClose={() => setIsAddDupeOpen(false)} /> : null}
        </div>
    );
}