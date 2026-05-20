"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { useCreateCategory } from "@/apis/hooks/useCategories";

export default function AddCategory() {
    const { mutate: categoryItem, isPending } = useCreateCategory();

    const [category, setCategory] = useState("");

    const handleAddCategory = () => {
        if (!category.trim()) {
            Swal.fire({
                icon: "warning",
                title: "Category Required",
                text: "Please enter a category name.",
                confirmButtonColor: "#15803d",
            });
            return;
        }

        categoryItem(
            { name: category },
            {
                onSuccess: () => {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Category added successfully!",
                        confirmButtonColor: "#15803d",
                    });

                    setCategory("");
                },

                onError: (error: any) => {
                    Swal.fire({
                        icon: "error",
                        title: "Failed",
                        text:
                            error?.response?.data?.message ||
                            "Something went wrong!",
                        confirmButtonColor: "#dc2626",
                    });
                },
            }
        );
    };

    return (
        <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1.5">
                Add Category <span className="text-red-500">(Optional)</span>
            </label>

            <div className="flex items-center gap-3">
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Enter category name..."
                    className="flex-1 h-11 border border-gray-200 rounded-lg px-3.5 text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition"
                />

                <button
                    type="button"
                    onClick={handleAddCategory}
                    disabled={isPending || !category.trim()}
                    className="h-11 whitespace-nowrap bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium px-5 rounded-lg transition"
                >
                    {isPending ? "Adding..." : "Add Category"}
                </button>
            </div>
        </div>
    );
}