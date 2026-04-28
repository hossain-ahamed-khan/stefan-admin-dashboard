"use client";
import { useState } from "react";
import AddInternalProduct from "../../../components/internalProducts/addProductModal";

type VerifiedStatus = "Verified" | "Pending";
type Source = "User OCR" | "Manual" | "API";

interface Product {
    id: number;
    barcode: string;
    productName: string;
    brand: string;
    source: Source;
    scans: number;
    verified: VerifiedStatus;
    added: string;
}

const initialProducts: Product[] = [
    {
        id: 1,
        barcode: "3337872412913",
        productName: "Micellar Cleansing Water",
        brand: "Bioderma",
        source: "User OCR",
        scans: 17,
        verified: "Verified",
        added: "18 Apr",
    },
    {
        id: 2,
        barcode: "3337872412913",
        productName: "Micellar Cleansing Water",
        brand: "Bioderma",
        source: "User OCR",
        scans: 17,
        verified: "Pending",
        added: "18 Apr",
    },
    {
        id: 3,
        barcode: "3337872412913",
        productName: "Micellar Cleansing Water",
        brand: "Bioderma",
        source: "User OCR",
        scans: 17,
        verified: "Verified",
        added: "18 Apr",
    },
];

const SourceBadge = ({ source }: { source: Source }) => (
    <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#CDBDFF] text-[#8A63FF]">
        {source}
    </span>
);

const VerifiedBadge = ({ status }: { status: VerifiedStatus }) => {
    const styles =
        status === "Verified"
            ? "bg-[#74C69D] text-white"
            : "bg-[#F0CE94] text-white";
    return (
        <span
            className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${styles}`}
        >
            {status}
        </span>
    );
};

const EditIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M15.232 5.232l3.536 3.536M9 13l6.768-6.768a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H8v-2.414A2 2 0 018.586 12.5z"
        />
    </svg>
);

const TrashIcon = () => (
    <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a1 1 0 011-1h6a1 1 0 011 1v2"
        />
    </svg>
);

export default function ProductTable() {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [search, setSearch] = useState("");
    const [sourceFilter, setSourceFilter] = useState("All sources");
    const [verifiedFilter, setVerifiedFilter] = useState("All verified");
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

    const handleDelete = (id: number) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const filtered = products.filter((p) => {
        const matchesSearch =
            p.barcode.includes(search) ||
            p.productName.toLowerCase().includes(search.toLowerCase());
        const matchesSource =
            sourceFilter === "All sources" || p.source === sourceFilter;
        const matchesVerified =
            verifiedFilter === "All verified" || p.verified === verifiedFilter;
        return matchesSearch && matchesSource && matchesVerified;
    });

    return (
        <div className="min-h-screen bg-[#faf8f5] p-8 font-sans">
            {/* Top Controls */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search barcode or product name..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm text-gray-600 placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-300 w-64"
                    />

                    {/* Source Filter */}
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
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                            ▼
                        </span>
                    </div>

                    {/* Verified Filter */}
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
                        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
                            ▼
                        </span>
                    </div>
                </div>

                {/* Add Products Button */}
                <button
                    onClick={() => setIsAddProductModalOpen(true)}
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
                            {["Barcode", "Product Name", "Brand", "Source", "Scans", "Verified", "Added", "Actions"].map(
                                (col) => (
                                    <th
                                        key={col}
                                        className="px-6 py-4 text-left text-sm font-semibold text-gray-800"
                                    >
                                        {col}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="px-6 py-12 text-center text-sm text-gray-400"
                                >
                                    No products found.
                                </td>
                            </tr>
                        ) : (
                            filtered.map((product, idx) => (
                                <tr
                                    key={product.id}
                                    className={`border-b border-gray-100 last:border-0 ${idx % 2 === 0 ? "bg-white" : "bg-white"
                                        } hover:bg-gray-50 transition-colors`}
                                >
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {product.barcode}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {product.productName}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {product.brand}
                                    </td>
                                    <td className="px-6 py-4">
                                        <SourceBadge source={product.source} />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {product.scans}
                                    </td>
                                    <td className="px-6 py-4">
                                        <VerifiedBadge status={product.verified} />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {product.added}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <button className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-white hover:text-[#667180]">
                                                <EditIcon />
                                            </button>
                                            <button
                                                className="flex h-8 w-8 items-center justify-center rounded-md border border-[#e2dfd8] bg-[#f9f9f7] text-[#7e8794] transition-colors hover:bg-white hover:text-[#677283]"
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
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors text-sm"
                >
                    ‹
                </button>
                <div className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-sm text-gray-700 font-medium">
                    {currentPage}
                </div>
                <button
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors text-sm"
                >
                    ›
                </button>
            </div>

            {isAddProductModalOpen && (
                <AddInternalProduct
                    onClose={() => setIsAddProductModalOpen(false)}
                />
            )}
        </div>
    );
}