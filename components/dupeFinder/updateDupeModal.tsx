"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { useUpdateDupeProduct } from "@/apis/hooks/useDupeProducts";
import { DupeProduct } from "@/apis/dupeProductApis";

interface Props {
    entry: DupeProduct;
    onClose: () => void;
}

export default function UpdateDupeEntry({ entry, onClose }: Props) {
    const [brand, setBrand] = useState(entry.brand);
    const [productName, setProductName] = useState(entry.product_name);
    const [price, setPrice] = useState(entry.price);
    const [retailer, setRetailer] = useState(entry.retailer);
    const [verified, setVerified] = useState(entry.make_verified);
    const [whyItWorks, setWhyItWorks] = useState(entry.why_it_works);
    const [awinUrl, setAwinUrl] = useState(entry.awin_tracking_URL);

    const { mutate: updateEntry, isPending } = useUpdateDupeProduct();

    const handleSave = () => {
        const isValidUrl = (url: string) => {
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        };

        if (!brand.trim() || !productName.trim() || !price.trim() || !whyItWorks.trim()) {
            Swal.fire({
                title: "Missing fields",
                text: "Please fill in all required fields.",
                icon: "warning",
                confirmButtonColor: "#2d5a3d",
                customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg text-sm font-medium" },
            });
            return;
        }

        // ✅ same URL check
        if (awinUrl && !isValidUrl(awinUrl)) {
            Swal.fire({
                title: "Invalid URL",
                text: "Please enter a valid Awin tracking URL (e.g. https://www.awin1.com/...)",
                icon: "warning",
                confirmButtonColor: "#2d5a3d",
                customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg text-sm font-medium" },
            });
            return;
        }

        updateEntry(
            {
                id: entry.id,
                body: {
                    brand,
                    product_name: productName,
                    price,
                    retailer,
                    make_verified: verified,
                    why_it_works: whyItWorks,
                    awin_tracking_URL: awinUrl,
                },
            },
            {
                onSuccess: () => {
                    Swal.fire({
                        title: "Updated!",
                        text: "Dupe entry has been updated.",
                        icon: "success",
                        confirmButtonColor: "#2d5a3d",
                        customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg text-sm font-medium" },
                    });
                    onClose();
                },
                onError: (error: any) => {
                    console.log("update error:", error?.response?.data);
                    Swal.fire({
                        title: "Failed!",
                        text: "Something went wrong. Please try again.",
                        icon: "error",
                        confirmButtonColor: "#2d5a3d",
                        customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg text-sm font-medium" },
                    });
                },
            }
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30" onClick={onClose}>
            <div className="relative mx-4 w-full max-w-2xl rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="px-8 pt-7 pb-5 border-b border-gray-100">
                    <button onClick={onClose}
                        className="absolute top-5 right-5 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-sm text-white transition-colors hover:bg-gray-700">
                        ✕
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900">Update Dupe Entry</h2>
                    <p className="text-sm text-gray-400 mt-0.5">
                        Linked to: {entry.expensive_product?.product_name ?? "—"}
                    </p>
                </div>

                {/* Body */}
                <div className="px-8 py-6 space-y-6">
                    <section>
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Dupe Product Details</h3>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">Brand <span className="text-red-500">*</span></label>
                                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">Product name <span className="text-red-500">*</span></label>
                                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">Price (GBP) <span className="text-red-500">*</span></label>
                                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}
                                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">Saving %</label>
                                <input type="text" disabled value={`${entry.saving_percent}%`}
                                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 bg-gray-50 cursor-not-allowed" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4 items-end">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1.5">Retailer <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select value={retailer} onChange={(e) => setRetailer(e.target.value)}
                                        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition bg-white">
                                        <option>Boots</option>
                                        <option>Superdrug</option>
                                        <option>Amazon</option>
                                        <option>ASOS</option>
                                        <option>Lookfantastic</option>
                                    </select>
                                    <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">▼</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 pb-2.5">
                                <button onClick={() => setVerified(!verified)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${verified ? "bg-[#74C69D]" : "bg-gray-300"}`}>
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${verified ? "translate-x-6" : "translate-x-1"}`} />
                                </button>
                                <span className="text-sm text-gray-600">Mark as verified</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1.5">Why it works <span className="text-red-500">*</span></label>
                            <textarea value={whyItWorks} onChange={(e) => setWhyItWorks(e.target.value)} rows={4}
                                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition resize-none" />
                            <p className="text-xs text-gray-400 mt-1.5">This is shown to users — write in plain English</p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-semibold text-gray-800 mb-4">Affiliate Link</h3>
                        <label className="block text-sm text-gray-600 mb-1.5">Awin Tracking URL <span className="text-red-500">*</span></label>
                        <textarea value={awinUrl} onChange={(e) => setAwinUrl(e.target.value)} rows={4}
                            className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition resize-none" />
                    </section>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-gray-100 flex justify-end gap-3">
                    <button onClick={onClose}
                        className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 transition-colors hover:bg-gray-50">
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={isPending}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#2d5a3d] text-sm text-white font-medium hover:bg-[#234830] transition-colors disabled:opacity-60">
                        {isPending && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                        {isPending ? "Updating..." : "Save dupe entry"}
                    </button>
                </div>
            </div>
        </div>
    );
}