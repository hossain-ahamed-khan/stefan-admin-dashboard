"use client";
import { useState } from "react";
import AddDupeEntry from "@/components/dupeFinder/addDupeEntryModal";
import AddExpensiveProduct from "@/components/dupeFinder/addExpensiveProductModal";
import DupeEntriesTable from "@/components/dupeFinder/dupeEntriesTable";

interface Product {
    id: number;
    brand: string;
    product: string;
    price: string;
    keyActives: string[];
    dupeCount: number;
}

const initialProducts: Product[] = [
    {
        id: 1,
        brand: "La Mer",
        product: "Crème de la Mer Moisturising Cream",
        price: "£270",
        keyActives: ["Seaweed extract", "Glycerin"],
        dupeCount: 2,
    },
    {
        id: 2,
        brand: "La Mer",
        product: "Crème de la Mer Moisturising Cream",
        price: "£270",
        keyActives: ["Seaweed extract", "Glycerin"],
        dupeCount: 2,
    },
    {
        id: 3,
        brand: "La Mer",
        product: "Crème de la Mer Moisturising Cream",
        price: "£270",
        keyActives: ["Seaweed extract", "Glycerin"],
        dupeCount: 2,
    },
];

export default function ExpensiveProductsTable() {
    const [activeTab, setActiveTab] = useState<"expensive" | "dupe">("expensive");
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [isAddDupeOpen, setIsAddDupeOpen] = useState(false);

    const filteredProducts = products.filter(
        (p) =>
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.product.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: number) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <div className="min-h-screen bg-[#faf8f5] p-8 font-sans">
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                <button
                    onClick={() => setActiveTab("expensive")}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "expensive"
                        ? "bg-[#D8F3DC] text-[#3D7A6E]"
                        : "bg-white text-gray-500 border border-gray-200"
                        }`}
                >
                    Expensive products
                </button>
                <button
                    onClick={() => setActiveTab("dupe")}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeTab === "dupe"
                        ? "bg-[#D8F3DC] text-[#3D7A6E]"
                        : "bg-white text-gray-500 border border-gray-200"
                        }`}
                >
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                            {["Brand", "Product", "Price", "Key Actives", "Dupes", "Actions"].map(
                                (h) => (
                                    <span key={h} className="text-sm font-semibold text-gray-700">
                                        {h}
                                    </span>
                                )
                            )}
                        </div>

                        {/* Rows */}
                        {filteredProducts.length === 0 ? (
                            <div className="px-6 py-10 text-center text-sm text-gray-400">
                                No products found.
                            </div>
                        ) : (
                            filteredProducts.map((product, idx) => (
                                <div
                                    key={product.id}
                                    className={`grid grid-cols-[1.5fr_2.5fr_1fr_2fr_1.5fr_1.5fr] px-6 py-4 items-center ${idx !== filteredProducts.length - 1
                                        ? "border-b border-gray-100"
                                        : ""
                                        }`}
                                >
                                    {/* Brand */}
                                    <span className="text-sm text-gray-600">{product.brand}</span>

                                    {/* Product */}
                                    <span className="text-sm text-gray-600">{product.product}</span>

                                    {/* Price */}
                                    <span className="text-sm text-gray-600">{product.price}</span>

                                    {/* Key Actives */}
                                    <div className="flex flex-wrap gap-2">
                                        {product.keyActives.map((active) => (
                                            <span
                                                key={active}
                                                className="bg-[#74C69D] text-white text-xs px-3 py-1 rounded-full"
                                            >
                                                {active}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Dupes */}
                                    <div className="flex items-center gap-2">
                                        <span className="bg-[#F0CE94] text-[#7A6000] text-xs px-3 py-1 rounded-full font-medium">
                                            {product.dupeCount} dupes
                                        </span>
                                        <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1">
                                        <button
                                            onClick={() => setIsAddDupeOpen(true)}
                                            className="h-9 min-w-[84px] rounded-lg border border-[#d8d6d1] bg-[#faf9f7] px-2.5 text-sm font-semibold leading-none text-[#6f7786] transition-colors hover:bg-[#f3f1ed] cursor-pointer"
                                        >
                                            +Dupe
                                        </button>
                                        <button className="h-9 w-9 rounded-lg border border-[#d8d6d1] bg-[#faf9f7] text-[#6f7786] transition-colors hover:bg-[#f3f1ed] cursor-pointer">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="mx-auto h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2.414a2 2 0 01.586-1.414z"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="h-9 w-9 rounded-lg border border-[#d8d6d1] bg-[#faf9f7] text-[#6f7786] transition-colors hover:bg-[#f3f1ed] cursor-pointer"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="mx-auto h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={1.8}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4h6v3M4 7h16"
                                                />
                                            </svg>
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
                            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors text-sm"
                        >
                            ‹
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-700">
                            {currentPage}
                        </span>
                        <button
                            onClick={() => setCurrentPage((p) => p + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors text-sm"
                        >
                            ›
                        </button>
                    </div>
                </>
            ) : (
                <DupeEntriesTable />
            )}

            {isAddProductOpen ? <AddExpensiveProduct onClose={() => setIsAddProductOpen(false)} /> : null}
            {isAddDupeOpen ? <AddDupeEntry onClose={() => setIsAddDupeOpen(false)} /> : null}
        </div>
    );
}