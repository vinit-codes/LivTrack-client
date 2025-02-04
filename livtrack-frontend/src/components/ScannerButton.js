// ScannerButton.js
import React, { useState } from "react";

const ScannerButton = () => {
  const [showOptions, setShowOptions] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("Selected File:", file);
      // Process the file here (upload, preview, etc.)
    }
  };

  const handleCameraCapture = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment"; // Opens back camera on mobile
    input.onchange = (event) => handleFileSelect(event);
    input.click();
  };

  return (
    <div>
      <button className="scanner-button" onClick={() => setShowOptions(true)}>
        📷
      </button>
      {showOptions && (
        <div className="modal">
          <div className="modal-content">
            <h3>Select an Option</h3>
            <button
              onClick={() => document.getElementById("fileInput").click()}
            >
              📁 Choose from Files
            </button>
            <button onClick={handleCameraCapture}>📷 Take a Photo</button>
            <button onClick={() => setShowOptions(false)}>❌ Cancel</button>
          </div>
        </div>
      )}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
    </div>
  );
};

export default ScannerButton;
