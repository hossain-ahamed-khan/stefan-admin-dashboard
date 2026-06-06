"use client";
import { useCreateProduct } from "@/apis/hooks/useInternalProducts";
import { useState } from "react";
import Swal from "sweetalert2";

interface AddInternalProductProps {
    onClose: () => void;
}

export default function AddInternalProduct({ onClose }: AddInternalProductProps) {
    const [barcode, setBarcode] = useState("");
    const [brand, setBrand] = useState("");
    const [productName, setProductName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [source, setSource] = useState("manual_admin");
    const [verified, setVerified] = useState(false);

    const { mutate: createProduct, isPending } = useCreateProduct();

    const handleCancel = () => {
        setBarcode(""); setBrand(""); setProductName("");
        setIngredients(""); setSource("manual_admin"); setVerified(false);
        onClose();
    };

    const handleSave = () => {
        if (!barcode.trim() || !brand.trim() || !productName.trim() || !ingredients.trim()) {
            Swal.fire({
                title: "Missing fields",
                text: "Please fill in all required fields.",
                icon: "warning",
                confirmButtonColor: "#2d6a4f",
                customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg text-sm font-medium" },
            });
            return;
        }

        createProduct(
            {
                barcode,
                brand,
                product_name: productName,
                ingredient_list: ingredients.split(",").map((i) => i.trim()).filter(Boolean),
                source,
                is_verified: verified,
                is_active: true,
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "Product Added!",
                        text: "The product has been added to the database.",
                        icon: "success",
                        confirmButtonColor: "#2d6a4f",
                        customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg text-sm font-medium" },
                    });
                    onClose();
                },
                onError: (error: any) => {
                    const backendErrors = error?.response?.data;

                    const message =
                        backendErrors?.barcode?.[0] ||
                        backendErrors?.detail ||
                        "Something went wrong. Please try again.";

                    Swal.fire({
                        title: "Failed!",
                        text: message,
                        icon: "error",
                        confirmButtonColor: "#2d6a4f",
                        customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg text-sm font-medium" },
                    });
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-lg w-[92vw] md:w-[40vw] relative">
                {/* Header */}
                <div className="px-8 pt-8 pb-4">
                    <button
                        onClick={handleCancel}
                        className="cursor-pointer absolute top-5 right-5 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900">Add Internal Product</h2>
                    <p className="text-sm text-gray-500 mt-0.5">Manually add a product to the barcode database</p>
                </div>

                <div className="h-px bg-gray-100" />

                <div className="px-8 py-6 space-y-6">
                    {/* Product Identity */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Product Identity</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-1">Barcode <span className="text-red-500">*</span></label>
                                <input type="text" value={barcode} onChange={(e) => setBarcode(e.target.value)}
                                    placeholder="e.g 3337872412913"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                                <p className="text-xs text-gray-400 mt-1">EAN-13, UPC-A, or EAN-8 format</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Brand <span className="text-red-500">*</span></label>
                                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)}
                                        placeholder="e.g no.7"
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-700 mb-1">Product name <span className="text-red-500">*</span></label>
                                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)}
                                        placeholder="e.g protect and perfect serum"
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Ingredients */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Ingredient List</h3>
                        <label className="block text-sm text-gray-700 mb-1">Ingredients <span className="text-red-500">*</span></label>
                        <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)}
                            placeholder="e.g Water, Sodium C14-16 Olefin Sulfonate, Cocamidopropyl Betaine,"
                            rows={4}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none" />
                        <p className="text-xs text-gray-400 mt-1">Paste the complete ingredient list, comma-separated</p>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Metadata */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Metadata</h3>
                        <div className="flex items-center gap-6">
                            <div className="flex-1">
                                <label className="block text-sm text-gray-700 mb-1">Source</label>
                                <div className="relative">
                                    <select value={source} onChange={(e) => setSource(e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white pr-10">
                                        <option value="manual_admin">Manual Admin</option>
                                        <option value="api">User OCR</option>
                                    </select>
                                    <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-5">
                                <button onClick={() => setVerified(!verified)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${verified ? "bg-[#74C69D]" : "bg-gray-300"}`}>
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${verified ? "translate-x-6" : "translate-x-1"}`} />
                                </button>
                                <span className="text-sm text-gray-700">Mark as verified</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-8 pb-7 flex justify-end gap-3">
                    <button onClick={handleCancel}
                        className="cursor-pointer px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={isPending}
                        className="cursor-pointer flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-teal-800 rounded-lg hover:bg-teal-900 transition-colors disabled:opacity-60">
                        {isPending && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                        {isPending ? "Saving..." : "Save product"}
                    </button>
                </div>
            </div>
        </div>
    );
}