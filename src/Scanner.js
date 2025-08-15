import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState("");
  const html5QrCodeRef = useRef(null);
  const navigate = useNavigate();

  const startScanning = async () => {
    try {
      setError("");
      setIsScanning(true);

      const html5QrCode = new Html5Qrcode("scanner");
      html5QrCodeRef.current = html5QrCode;

      const onScanSuccess = (decodedText) => {
        console.log("Scanned code:", decodedText);
        stopScanning();
        // Redirect to item page with scanned code as ISBN
        navigate(`/item/${decodedText}`);
      };

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        formatsToSupport: [
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
        ],
      };

      // Use back camera
      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        onScanSuccess
      );
    } catch (err) {
      setError(`Camera access failed: ${err.message}`);
      setIsScanning(false);
    }
  };

  const stopScanning = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current.clear();
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setIsScanning(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (html5QrCodeRef.current && isScanning) {
        stopScanning();
      }
    };
  }, []);

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-bold text-center mb-4">Scan Barcode</h2>

      <div
        id="scanner"
        className="w-full h-64 border-2 border-gray-300 rounded-lg mb-4"
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <button
        onClick={isScanning ? stopScanning : startScanning}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white ${
          isScanning
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {isScanning ? "Stop Scanner" : "Start Scanner"}
      </button>
    </div>
  );
};

export default Scanner;
