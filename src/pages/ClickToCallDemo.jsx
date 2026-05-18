import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function ClickToCallDemo() {
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState("");

  // 🔹 Mobile click
  const handleMobileClick = () => {
    setShowModal(true);
    setShowError(true);

    setTimeout(() => {
      setShowError(false);
    }, 3000);
  };

  // 🔹 Submit
  const handleSubmit = () => {
    if (!selectedDealer) {
      alert("Please select dealer");
      return;
    }

    console.log("Selected Dealer:", selectedDealer);

    setShowModal(false);
  };

  return (
    <div className="p-10">

      {/* 🔹 MOBILE ICON */}
      <i
        className="fas fa-mobile-alt text-2xl cursor-pointer"
        onClick={handleMobileClick}
      ></i>

      {/* 🔹 ERROR TOAST */}
      {showError && (
        <div className="fixed top-4 left-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <p className="font-semibold">Error</p>
          <p className="text-sm">Data not found !!!</p>
        </div>
      )}

      {/* 🔹 MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-40">

          <div className="bg-white w-[500px] rounded-xl p-6 relative shadow-xl">

            {/* CLOSE */}
            <button
              className="absolute top-3 right-4 text-xl"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            {/* TITLE */}
            <h2 className="text-xl font-semibold mb-6">
              Dealer Code List
            </h2>

            {/* DROPDOWN + BUTTON */}
            <div className="flex items-center gap-4">

              {/* DROPDOWN */}
              <div className="relative w-64">
                <select
                  value={selectedDealer}
                  onChange={(e) => setSelectedDealer(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 appearance-none bg-white text-gray-600"
                >
                  <option value="">Select Dealer</option>
                  <option value="dealer1">Dealer 1</option>
                  <option value="dealer2">Dealer 2</option>
                </select>

                {/* ARROW */}
                <ChevronDown
                  size={18}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
                />
              </div>

              {/* BUTTON */}
              <button
                onClick={handleSubmit}
                disabled={!selectedDealer}
                className={`px-6 py-2 rounded-md text-white ${
                  selectedDealer
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Submit
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
