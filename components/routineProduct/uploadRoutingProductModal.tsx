import { useState } from "react";
import Swal from "sweetalert2";
import { Upload, FileText } from "lucide-react";
import { useUploadRoutingProductFile } from "@/apis/hooks/useRoutingProducts";

export default function UploadRoutingProduct({ onClose, }: { onClose: () => void; }) {
    const [file, setFile] = useState<File | null>(null);

    const { mutate: uploadFile, isPending } = useUploadRoutingProductFile();

    const handleUpload = () => {
        if (!file) {
            Swal.fire({
                icon: "warning",
                title: "No file selected",
                text: "Please select a CSV or Excel file.",
            });
            return;
        }

        uploadFile(file, {
            onSuccess: (response) => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text:
                        response?.message ||
                        "Routing products uploaded successfully.",
                });

                onClose();
            },

            onError: (error: any) => {
                const errorData = error?.response?.data;

                const errorText =
                    errorData?.file?.[0] ||
                    errorData?.message ||
                    JSON.stringify(errorData) ||
                    "Something went wrong.";

                Swal.fire({
                    icon: "error",
                    title: "Upload Failed",
                    text: errorText,
                });
            },
        });
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-8 pt-7 pb-5 border-b border-gray-100">
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 w-7 h-7 flex items-center justify-center rounded-full bg-gray-900 text-white text-sm hover:bg-gray-700"
                    >
                        ✕
                    </button>

                    <h2 className="text-xl font-semibold text-gray-900">
                        Upload Routing Product File
                    </h2>

                    <p className="text-sm text-gray-400 mt-0.5">
                        Supports CSV, XLSX, XLS
                    </p>
                </div>

                {/* Body */}
                <div className="p-8">
                    <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-black transition"
                    >
                        <Upload className="w-10 h-10 text-gray-400 mb-3" />

                        <p className="text-sm font-medium text-gray-700">
                            Click to select a file
                        </p>

                        <p className="text-xs text-gray-400 mt-1">
                            .csv, .xlsx, .xls
                        </p>

                        <input
                            id="file-upload"
                            type="file"
                            accept=".csv,.xlsx,.xls"
                            className="hidden"
                            onChange={(e) => {
                                const selectedFile =
                                    e.target.files?.[0] || null;

                                if (!selectedFile) return;

                                const extension = selectedFile.name
                                    .split(".")
                                    .pop()
                                    ?.toLowerCase();

                                if (
                                    !["csv", "xlsx", "xls"].includes(
                                        extension || ""
                                    )
                                ) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Invalid File",
                                        text: "Only CSV, XLSX, and XLS files are allowed.",
                                    });
                                    return;
                                }

                                setFile(selectedFile);
                            }}
                        />
                    </label>

                    {file && (
                        <div className="mt-4 flex items-center gap-3 border border-gray-200 rounded-lg p-3">
                            <FileText className="w-5 h-5 text-gray-600" />

                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    {file.name}
                                </p>

                                <p className="text-xs text-gray-500">
                                    {(file.size / 1024).toFixed(2)} KB
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="cursor-pointer px-4 py-2 border border-gray-300 rounded-lg"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpload}
                        disabled={!file || isPending}
                        className="cursor-pointer px-5 py-2 bg-black text-white rounded-lg disabled:opacity-50"
                    >
                        {isPending ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </div>
        </div>
    );
}
