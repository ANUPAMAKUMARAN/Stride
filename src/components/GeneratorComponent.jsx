
import React, { useState, useRef, useEffect, useCallback } from "react";
import QRCode from "react-qr-code";
import JsBarcode from "jsbarcode";

const GeneratorComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);
  const [showBarcode, setShowBarcode] = useState(false);

  const qrCodeRef = useRef(null);
  const barcodeSvgRef = useRef(null);

  const CODE_SIZE = 200;
//   const BARCODE_HEIGHT = 100;

  const userData = `Name: ${name}, Email: ${email}, Phone: ${phone}`;

  const generateBarcode = useCallback((data) => {
    if (!barcodeSvgRef.current || !data) return;
    JsBarcode(barcodeSvgRef.current, data, {
      format: "CODE128",
      displayValue: false,
      lineColor: "#000000",
      background: "#ffffff",
      width: 4,
        height: 760, 
    //   height: BARCODE_HEIGHT,
      margin: 0,
    });


  // Force full-box stretch
  barcodeSvgRef.current.removeAttribute("width");
  barcodeSvgRef.current.removeAttribute("height");
  barcodeSvgRef.current.setAttribute("preserveAspectRatio", "none");
  barcodeSvgRef.current.style.width = "100%";
  barcodeSvgRef.current.style.height = "100%";


  }, []);

  useEffect(() => {
    if (showBarcode && userData) {
      generateBarcode(userData);
    }
  }, [showBarcode, userData, generateBarcode]);

  const handleGenerateQR = () => {
    if (!name && !email && !phone)
      return alert("Please enter data before generating the code.");
    setShowQrCode(true);
    setShowBarcode(false);
  };

  const handleGenerateBarcode = () => {
    if (!name && !email && !phone)
      return alert("Please enter data before generating the code.");
    setShowBarcode(true);
    setShowQrCode(false);
    generateBarcode(userData);
  };

  // ✅ Unified canvas exporter for consistent layout
  const exportWithLayout = async (type) => {
    const canvas = document.createElement("canvas");
    const width = 400;
    const height = 400;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Title
    ctx.fillStyle = "#000000";
    ctx.font = "bold 22px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      type === "qr" ? "MyApp QR Code" : "MyApp Barcode",
      width / 2,
      40
    );

    // Code image
    const codeImg = new Image();
    if (type === "qr") {
      const svg = qrCodeRef.current?.querySelector("svg");
      if (!svg) return alert("QR not found");
      const svgData = new XMLSerializer().serializeToString(svg);
      const url = URL.createObjectURL(
        new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
      );
      codeImg.src = url;
    } else {
      const svg = barcodeSvgRef.current;
      if (!svg) return alert("Barcode not found");
      if (!svg.getAttribute("xmlns")) {
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      }
      const svgData = new XMLSerializer().serializeToString(svg);
      const url = URL.createObjectURL(
        new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
      );
      codeImg.src = url;
    }

    codeImg.onload = () => {
      const codeX = width / 2 - CODE_SIZE / 2;
      const codeY = 80;
      ctx.drawImage(codeImg, codeX, codeY, CODE_SIZE, CODE_SIZE);

      // Description
      ctx.font = "16px Arial";
      ctx.fillStyle = "#333";
      ctx.fillText(
        type === "qr"
          ? "Description: This QR code contains user details."
          : "Description: This barcode encodes user details.",
        width / 2,
        330
      );

      // Download
      const pngFile = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngFile;
      a.download = type === "qr" ? "QRCode.png" : "Barcode.png";
      a.click();
    };
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      maxWidth: "550px",
      margin: "20px auto",
      backgroundColor: "#f4f4f9",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    inputSection: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      marginBottom: "30px",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      backgroundColor: "#fff",
    },
    inputGroup: { display: "flex", flexDirection: "column" },
    label: { marginBottom: "5px", fontWeight: "bold", color: "#333" },
    input: {
      padding: "10px",
      fontSize: "16px",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    buttonContainer: {
      display: "flex",
      gap: "20px",
      marginBottom: "30px",
      justifyContent: "center",
    },
    generateButton: {
      flex: 1,
      maxWidth: "200px",
      padding: "12px 20px",
      fontSize: "16px",
      fontWeight: "bold",
      color: "#fff",
      backgroundColor: "#3498db",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    codeDisplayBox: {
      width: CODE_SIZE + 80,
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      textAlign: "center",
      border: "1px solid #eee",
    },
    codeWrapper: {
      width: CODE_SIZE,
      height: CODE_SIZE,
      margin: "0 auto 15px",
      border: "1px solid #ddd",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    downloadButton: {
      padding: "10px 20px",
      fontSize: "16px",
      fontWeight: "bold",
      color: "#fff",
      backgroundColor: "#28a745",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: "center", color: "#333" }}>Code Generator</h1>
      <p style={{ textAlign: "center", color: "#666" }}>
        Enter your details to generate your QR Code and Barcode.
      </p>

      <div style={styles.inputSection}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Name</label>
          <input
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Phone</label>
          <input
            style={styles.input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <button style={styles.generateButton} onClick={handleGenerateQR}>
          Generate QR Code
        </button>
        <button style={styles.generateButton} onClick={handleGenerateBarcode}>
          Generate Barcode
        </button>
      </div>

      {showQrCode && (
        <div style={styles.codeDisplayBox}>
          <div ref={qrCodeRef} style={styles.codeWrapper}>
            <QRCode value={userData || "No Data"} size={CODE_SIZE} />
          </div>
          <button
            style={styles.downloadButton}
            onClick={() => exportWithLayout("qr")}
          >
            Download QR Code 
          </button>
        </div>
      )}

      {showBarcode && (
        <div style={styles.codeDisplayBox}>
          <div style={styles.codeWrapper}>
            <svg
              ref={barcodeSvgRef}
              style={{ width: "100%", height: "100%", display: "block", objectFit: "fill",}}
            />
          </div>
          <button
            style={styles.downloadButton}
            onClick={() => exportWithLayout("barcode")}
          >
            Download Barcode
          </button>
        </div>
      )}
    </div>
  );
};

export default GeneratorComponent;
