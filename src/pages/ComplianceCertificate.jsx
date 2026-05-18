import React, { useState } from "react";

export default function ComplianceCertificate() {
  const [activeSubTab, setActiveSubTab] = useState("upload");
  const [file, setFile] = useState(null);
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (!file) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3500);
      return;
    }
    console.log("Uploaded:", file.name);
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <div className="bg-white rounded-lg shadow p-6">

        {/* SUB TABS */}
        <div className="flex gap-6 border-b mb-6 text-sm">
          <span
            className={`cursor-pointer pb-2 ${
              activeSubTab === "certificate"
                ? "border-b-2 border-green-600 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveSubTab("certificate")}
          >
            Certificate
          </span>

          <span
            className={`cursor-pointer pb-2 ${
              activeSubTab === "upload"
                ? "border-b-2 border-green-600 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveSubTab("upload")}
          >
            Upload Certificate
          </span>
        </div>

        {/* UPLOAD SECTION */}
        {activeSubTab === "upload" && (
          <div className="mt-6">

            {/* LABEL */}
            <label className="block text-sm font-medium mb-2">
              Upload File
            </label>

            <div className="flex items-center gap-6">

              {/* FILE INPUT */}
              <div className="border rounded-md px-4 py-3 bg-gray-50 flex items-center gap-3">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="cursor-pointer"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2"
              >
                SUBMIT →
              </button>
            </div>

          </div>
        )}
      </div>

      {/* Error Toast */}
      {showError && (
        <div className="fixed top-20 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] flex items-center gap-2">
          <i className="fa fa-exclamation-circle"></i>
          <span>Please upload file first</span>
        </div>
      )}
    </div>
  );
}