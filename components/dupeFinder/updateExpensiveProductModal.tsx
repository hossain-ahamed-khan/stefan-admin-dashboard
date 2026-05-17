"use client";
import { useState, KeyboardEvent } from "react";
import Swal from "sweetalert2";
import { useUpdateExpensiveProduct } from "@/apis/hooks/useExpensiveProducts";
import { ExpensiveProduct } from "@/apis/expensiveProductApis";

interface Tag { id: number; label: string; }

interface Props {
  product: ExpensiveProduct;
  onClose: () => void;
}

const toTags = (str: string): Tag[] =>
  str ? str.split(",").map((label, i) => ({ id: i, label: label.trim() })) : [];

export default function UpdateExpensiveProduct({ product, onClose }: Props) {
  const [brand, setBrand] = useState(product.brand);
  const [productName, setProductName] = useState(product.product_name);
  const [price, setPrice] = useState(product.price);
  const [searchTags, setSearchTags] = useState<Tag[]>(toTags(product.search_terms));
  const [searchInput, setSearchInput] = useState("");
  const [activeTags, setActiveTags] = useState<Tag[]>(toTags(product.key_active_ingredients));
  const [activeInput, setActiveInput] = useState("");

  const { mutate: updateProduct, isPending } = useUpdateExpensiveProduct();

  const addTag = (input: string, setInput: (v: string) => void, tags: Tag[], setTags: (t: Tag[]) => void) => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTags([...tags, { id: Date.now(), label: trimmed }]);
    setInput("");
  };

  const removeTag = (id: number, tags: Tag[], setTags: (t: Tag[]) => void) => {
    setTags(tags.filter((t) => t.id !== id));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, input: string, setInput: (v: string) => void, tags: Tag[], setTags: (t: Tag[]) => void) => {
    if (e.key === "Enter") { e.preventDefault(); addTag(input, setInput, tags, setTags); }
  };

  const handleSave = () => {
    
    const finalSearchTerms = searchTags.length > 0
            ? searchTags.map((t) => t.label).join(", ")
            : searchInput.trim();

    const finalKeyActives = activeTags.length > 0
            ? activeTags.map((t) => t.label).join(", ")
            : activeInput.trim();

    if (!brand.trim() || !productName.trim() || !price.trim()) {
      Swal.fire({
        title: "Missing fields",
        text: "Please fill in all required fields.",
        icon: "warning",
        confirmButtonColor: "#2d5a3d",
        customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg text-sm font-medium" },
      });
      return;
    }

    updateProduct(
      {
        id: product.id,
        body: {
          brand,
          product_name: productName,
          price,
          search_terms: finalSearchTerms,
        //   search_terms: searchTags.map((t) => t.label).join(", "),
          key_active_ingredients: finalKeyActives,
        },
      },
      {
        onSuccess: (data) => {
            //  console.log("onSuccess update data:", data);
          Swal.fire({
            title: "Updated!",
            text: "Product has been updated successfully.",
            icon: "success",
            confirmButtonColor: "#2d5a3d",
            customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg text-sm font-medium" },
          });
          onClose();
        },
        onError: () => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 relative" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div className="px-8 pt-7 pb-5 border-b border-gray-100">
          <button onClick={onClose}
            className="absolute top-5 right-5 w-7 h-7 flex items-center justify-center rounded-full bg-gray-900 text-white text-sm hover:bg-gray-700 transition-colors">
            ✕
          </button>
          <h2 className="text-xl font-semibold text-gray-900">Update Expensive Product</h2>
          <p className="text-sm text-gray-400 mt-0.5">Dupe Finder — expensive products table</p>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-7">
          {/* Product Details */}
          <section>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Product Details</h3>
            <div className="grid grid-cols-2 gap-4">
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
            <div className="mt-4 w-1/2 pr-2">
              <label className="block text-sm text-gray-600 mb-1.5">Price (GBP) <span className="text-red-500">*</span></label>
              <input type="text" value={price} onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700/30 focus:border-green-700 transition" />
            </div>
          </section>

          {/* Search Terms */}
          <section>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Search Terms</h3>
            <label className="block text-sm text-gray-600 mb-1.5">Search terms <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 min-h-11 focus-within:ring-2 focus-within:ring-green-700/30 focus-within:border-green-700 transition">
              {searchTags.map((tag) => (
                <span key={tag.id} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm px-2.5 py-1 rounded-full">
                  {tag.label}
                  <button onClick={() => removeTag(tag.id, searchTags, setSearchTags)} className="text-gray-500 hover:text-gray-800 leading-none">✕</button>
                </span>
              ))}
              <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, searchInput, setSearchInput, searchTags, setSearchTags)}
                placeholder="Type and press Enter..."
                className="flex-1 min-w-35 text-sm text-gray-500 placeholder-gray-300 outline-none bg-transparent" />
            </div>
          </section>

          {/* Key Active Ingredients */}
          <section>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Key Active Ingredients</h3>
            <label className="block text-sm text-gray-600 mb-1.5">Key actives <span className="text-red-500">*</span></label>
            <div className="flex flex-wrap items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 min-h-11 focus-within:ring-2 focus-within:ring-green-700/30 focus-within:border-green-700 transition">
              {activeTags.map((tag) => (
                <span key={tag.id} className="flex items-center gap-1.5 bg-gray-100 text-gray-700 text-sm px-2.5 py-1 rounded-full">
                  {tag.label}
                  <button onClick={() => removeTag(tag.id, activeTags, setActiveTags)} className="text-gray-500 hover:text-gray-800 leading-none">✕</button>
                </span>
              ))}
              <input type="text" value={activeInput} onChange={(e) => setActiveInput(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, activeInput, setActiveInput, activeTags, setActiveTags)}
                placeholder="Any ingredient"
                className="flex-1 min-w-35 text-sm text-gray-500 placeholder-gray-300 outline-none bg-transparent" />
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose}
            className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} disabled={isPending}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#2d5a3d] text-sm text-white font-medium hover:bg-[#234830] transition-colors disabled:opacity-60">
            {isPending && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {isPending ? "Updating..." : "Update product"}
          </button>
        </div>
      </div>
    </div>
  );
}