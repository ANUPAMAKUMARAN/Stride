

import React, { useRef, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import JsBarcode from "jsbarcode";

import { BrowserMultiFormatReader} from "@zxing/browser";

import * as ZXingBrowser from "@zxing/browser";
import "../styles/QRBarcodeApp.scss";

const initialDataState = { name: "", email: "", phnNo: "" };

export default function QRBarcodeApp() {
  const [inputData, setInputData] = useState(initialDataState);
  const [qrValue, setQrValue] = useState("");
  const [barcodeValue, setBarcodeValue] = useState("");
  const [scannedData, setScannedData] = useState(initialDataState);
  const [scanning, setScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState("Ready to Scan");

  const videoRef = useRef(null);
  const barcodeRef = useRef(null);
  const qrRef = useRef(null);
  const codeReaderRef = useRef(null);

  // ---------- INPUT CHANGE ----------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
    setQrValue("");
    setBarcodeValue("");
  };

  // ---------- GENERATE QR ----------
  const generateQR = () => {
    if (!inputData.name || !inputData.email || !inputData.phnNo) return;
    setQrValue(JSON.stringify(inputData));
  };

  // ---------- GENERATE BARCODE ----------
  const generateBarcode = () => {
    if (!inputData.name || !inputData.email || !inputData.phnNo) return;
    setBarcodeValue(JSON.stringify(inputData));
  };

  // ---------- RENDER BARCODE ----------
  useEffect(() => {
    if (barcodeValue && barcodeRef.current) {
      barcodeRef.current.innerHTML = "";
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      barcodeRef.current.appendChild(svg);
      JsBarcode(svg, barcodeValue, {
        format: "CODE128",
        width: 1.2,
        height: 80,
        displayValue: false,
        margin: 10,
        lineColor: "#000",
        background: "#fff",
      });
    }
  }, [barcodeValue]);

  // ---------- LIVE CAMERA SCANNER ----------
  useEffect(() => {
    if (!scanning) {
      setScanStatus("Ready to Scan");
      return;
    }

    const codeReader = new BrowserMultiFormatReader();
    codeReaderRef.current = codeReader;

    let lastResult = "";

    codeReader
      .decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          const text = result.getText();
          if (text !== lastResult) {
            lastResult = text;
            try {
              const parsed = JSON.parse(text);
              setScannedData(parsed);
            } catch (err) {
              setScannedData({ name: text, email: "", phnNo: "" });
            }
            setScanStatus("✅ Scan Successful!");
          }
        } else if (err && !(err instanceof NotFoundException)) {
          console.error(err);
          setScanStatus("❌ Scanner Error");
        }
      })
      .catch((err) => {
        console.error(err);
        setScanStatus("❌ Unable to start camera");
      });

    return () => codeReader.reset();
  }, [scanning]);

  // ---------- FILE UPLOAD SCAN ----------
const handleFileUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setScanStatus("⏳ Decoding image...");

  const fileReader = new FileReader();
  fileReader.onload = async () => {
    const img = document.createElement("img");
    img.src = fileReader.result;
    img.style.display = "none"; // hidden from UI
    document.body.appendChild(img);

    img.onload = async () => {
      try {
        const reader = new ZXingBrowser.BrowserMultiFormatReader();
        const result = await reader.decodeFromImageElement(img);
        const text = result.getText();
        try {
          const parsed = JSON.parse(text);
          setScannedData(parsed);
          setScanStatus("✅ File decoded successfully!");
        } catch {
          setScannedData({ name: text, email: "", phnNo: "" });
          setScanStatus("✅ File decoded (non-JSON text)");
        }
      } catch (err) {
        console.error("Decode error:", err);
        setScanStatus("❌ Could not decode image");
      } finally {
        document.body.removeChild(img); // clean up
      }
    };
  };
  fileReader.readAsDataURL(file);
};


  // ---------- DOWNLOAD QR ----------
  const downloadQR = () => {
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      ctx.scale(2, 2);
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = "QRCode.png";
      link.click();
    };
    img.src = url;
  };

  // ---------- DOWNLOAD BARCODE ----------
  const downloadBarcode = () => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, barcodeValue, { format: "CODE128", displayValue: false });
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "Barcode.png";
    link.click();
  };

  return (
    <div className="container">
      <h1>Live QR / Barcode Generator & Scanner</h1>

      <div className="flexContainer">
        {/* ---------- GENERATOR SECTION ---------- */}
        <div className="section">
          <h2>1️⃣ QR & Barcode Generator</h2>

          <input
            name="name"
            placeholder="Name"
            value={inputData.name}
            onChange={handleInputChange}
            className="input"
          />
          <input
            name="email"
            placeholder="Email"
            value={inputData.email}
            onChange={handleInputChange}
            className="input"
          />
          <input
            name="phnNo"
            placeholder="Phone"
            value={inputData.phnNo}
            onChange={handleInputChange}
            className="input"
          />

          <div className="buttonRow">
            <button onClick={generateQR} className="generateButton">
              Generate QR
            </button>
            <button onClick={generateBarcode} className="generateButtonAlt">
              Generate Barcode
            </button>
          </div>

          <div className="qrAndBarcodeBox">
            {qrValue && (
              <div ref={qrRef} className="qrBox">
                <QRCode value={qrValue} size={150} />
                <button onClick={downloadQR} className="downloadButton">
                  Download QR
                </button>
              </div>
            )}
            {barcodeValue && (
              <div className="barcodeBox">
                <div ref={barcodeRef}></div>
                <button onClick={downloadBarcode} className="downloadButton">
                  Download Barcode
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ---------- SCANNER SECTION ---------- */}
        <div className="section">
          <h2>2️⃣ QR / Barcode Scanner</h2>

          <button
            onClick={() => {
              setScanning((prev) => !prev);
              setScanStatus(scanning ? "Ready to Scan" : "Scanning...");
              setScannedData(initialDataState);
            }}
            className={scanning ? "stopButton" : "scanButton"}
          >
            {scanning ? "Stop Scanner" : "Start Live Scanner"}
          </button>

          <p className="scanStatus">{scanStatus}</p>

          {scanning && (
            <div className="scannerBox">
              <video ref={videoRef} className="video" />
            </div>
          )}

          <p>or Upload QR/Barcode Image:</p>
          <input type="file" accept="image/*" onChange={handleFileUpload} />

          <h3>Scanned Data:</h3>
          <div className="inputGroup">
            <label>Name:</label>
            <input
              value={scannedData.name}
              readOnly
              className="readOnlyInput"
            />
          </div>
          <div className="inputGroup">
            <label>Email:</label>
            <input
              value={scannedData.email}
              readOnly
              className="readOnlyInput"
            />
          </div>
          <div className="inputGroup">
            <label>Phone:</label>
            <input
              value={scannedData.phnNo}
              readOnly
              className="readOnlyInput"
            />
          </div>
        </div>
      </div>
    </div>
  );
}







// import React, { useRef, useState, useEffect } from "react";
// import QRCode from "react-qr-code";
// import JsBarcode from "jsbarcode";
// import { BrowserMultiFormatReader } from "@zxing/library";

// const initialDataState = { name: "", email: "", phnNo: "" };

// export default function QRBarcodeApp() {
//   const [inputData, setInputData] = useState(initialDataState);
//   const [qrValue, setQrValue] = useState("");
//   const [barcodeValue, setBarcodeValue] = useState("");
//   const [scannedData, setScannedData] = useState(initialDataState);
//   const [scanning, setScanning] = useState(false);
//   const [scanStatus, setScanStatus] = useState("Ready to Scan");

//   const videoRef = useRef(null);
//   const barcodeRef = useRef(null);
//   const qrRef = useRef(null);
//   const codeReaderRef = useRef(null);

//   // --- Input handler ---
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputData((prev) => ({ ...prev, [name]: value }));
//     setQrValue("");
//     setBarcodeValue("");
//   };

//   // --- Generate QR ---
//   const generateQR = () => {
//     if (!inputData.name || !inputData.email || !inputData.phnNo) return;
//     setQrValue(JSON.stringify(inputData));
//   };

//   // --- Generate Barcode ---
//   const generateBarcode = () => {
//     if (!inputData.name || !inputData.email || !inputData.phnNo) return;
//     setBarcodeValue(JSON.stringify(inputData));
//   };

//   // --- Render Barcode (Clean + No Text) ---
//   useEffect(() => {
//     if (barcodeValue && barcodeRef.current) {
//       // Clear old barcode
//       barcodeRef.current.innerHTML = "";

//       // Create fresh SVG for barcode
//       const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//       barcodeRef.current.appendChild(svg);

//       JsBarcode(svg, barcodeValue, {
//         format: "CODE128",
//         width: .2,
//         height: 80,
//         displayValue: false, // ✅ hide text under barcode
//         margin: 10,
//         lineColor: "#000",
//         background: "#fff",
//       });

//       // Extra safety cleanup
//       const texts = svg.querySelectorAll("text");
//       texts.forEach((t) => t.remove());
//     }
//   }, [barcodeValue]);

//   // --- Continuous Scanner ---
//   useEffect(() => {
//     if (!scanning) {
//       setScanStatus("Ready to Scan");
//       return;
//     }

//     const codeReader = new BrowserMultiFormatReader();
//     codeReaderRef.current = codeReader;

//     let lastResult = "";

//     codeReader
//       .decodeFromVideoDevice(null, videoRef.current, (result, err) => {
//         if (result) {
//           const text = result.getText();
//           if (text !== lastResult) {
//             lastResult = text;
//             try {
//               const parsed = JSON.parse(text);
//               setScannedData(parsed);
//             } catch {
//               setScannedData({ name: text, email: "", phnNo: "" });
//             }
//             setScanStatus("✅ Scan Successful!");
//           }
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         setScanStatus("❌ Scanner error");
//       });

//     return () => codeReader.reset();
//   }, [scanning]);

//   // --- Download QR ---
//   const downloadQR = () => {
//     const svg = qrRef.current.querySelector("svg");
//     const svgData = new XMLSerializer().serializeToString(svg);
//     const canvas = document.createElement("canvas");
//     const ctx = canvas.getContext("2d");
//     const img = new Image();
//     const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
//     const url = URL.createObjectURL(blob);
//     img.onload = () => {
//       canvas.width = img.width * 2;
//       canvas.height = img.height * 2;
//       ctx.scale(2, 2);
//       ctx.drawImage(img, 0, 0);
//       URL.revokeObjectURL(url);
//       const pngUrl = canvas
//         .toDataURL("image/png")
//         .replace("image/png", "image/octet-stream");
//       const link = document.createElement("a");
//       link.href = pngUrl;
//       link.download = "QRCode.png";
//       link.click();
//     };
//     img.src = url;
//   };

//   // --- Download Barcode ---
//   const downloadBarcode = () => {
//     const canvas = document.createElement("canvas");
//     JsBarcode(canvas, barcodeValue, {
//       format: "CODE128",
//       displayValue: false,
//     });
//     const pngUrl = canvas
//       .toDataURL("image/png")
//       .replace("image/png", "image/octet-stream");
//     const link = document.createElement("a");
//     link.href = pngUrl;
//     link.download = "Barcode.png";
//     link.click();
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Live QR / Barcode Generator & Scanner</h1>

//       <div style={styles.flexContainer}>
//         {/* Generator Section */}
//         <div style={styles.section}>
//           <h2>1️⃣ QR & Barcode Generator</h2>

//           <input
//             name="name"
//             placeholder="Name"
//             value={inputData.name}
//             onChange={handleInputChange}
//             style={styles.input}
//           />
//           <input
//             name="email"
//             placeholder="Email"
//             value={inputData.email}
//             onChange={handleInputChange}
//             style={styles.input}
//           />
//           <input
//             name="phnNo"
//             placeholder="Phone"
//             value={inputData.phnNo}
//             onChange={handleInputChange}
//             style={styles.input}
//           />

//           <div style={styles.buttonRow}>
//             <button onClick={generateQR} style={styles.generateButton}>
//               Generate QR
//             </button>
//             <button onClick={generateBarcode} style={styles.generateButtonAlt}>
//               Generate Barcode
//             </button>
//           </div>

//           <div style={styles.qrAndBarcodeBox}>
//             {qrValue && (
//               <div ref={qrRef} style={styles.qrBox}>
//                 <QRCode value={qrValue} size={150} />
//                 <button onClick={downloadQR} style={styles.downloadButton}>
//                   Download QR
//                 </button>
//               </div>
//             )}
//             {barcodeValue && (
//               <div style={styles.barcodeBox}>
//                 <div ref={barcodeRef}></div>
//                 <button onClick={downloadBarcode} style={styles.downloadButton}>
//                   Download Barcode
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Scanner Section */}
//         <div style={styles.section}>
//           <h2>2️⃣ Live QR / Barcode Scanner</h2>
//           <button
//             onClick={() => {
//               setScanning((prev) => !prev);
//               setScanStatus(scanning ? "Ready to Scan" : "Scanning...");
//               setScannedData(initialDataState);
//             }}
//             style={scanning ? styles.stopButton : styles.scanButton}
//           >
//             {scanning ? "Stop Scanner" : "Start Scanner"}
//           </button>

//           <p style={styles.scanStatus}>{scanStatus}</p>

//           {scanning && (
//             <div style={styles.scannerBox}>
//               <video ref={videoRef} style={styles.video} />
//             </div>
//           )}

//           <h3>Scanned Data:</h3>
//           <div style={styles.inputGroup}>
//             <label>Name:</label>
//             <input
//               value={scannedData.name}
//               readOnly
//               style={styles.readOnlyInput}
//             />
//           </div>
//           <div style={styles.inputGroup}>
//             <label>Email:</label>
//             <input
//               value={scannedData.email}
//               readOnly
//               style={styles.readOnlyInput}
//             />
//           </div>
//           <div style={styles.inputGroup}>
//             <label>Phone:</label>
//             <input
//               value={scannedData.phnNo}
//               readOnly
//               style={styles.readOnlyInput}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Styles ---
// const styles = {
//   container: { padding: 40, fontFamily: "Arial", textAlign: "center" },
//   flexContainer: {
//     display: "flex",
//     justifyContent: "space-around",
//     gap: 40,
//     marginTop: 30,
//     flexWrap: "wrap",
//   },
//   section: {
//     border: "1px solid #ddd",
//     padding: 30,
//     borderRadius: 8,
//     flex: 1,
//     minWidth: 280,
//     maxWidth: 500,
//     textAlign: "left",
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     border: "1px solid #ccc",
//     borderRadius: 4,
//     marginTop: 5,
//     marginBottom: 10,
//   },
//   readOnlyInput: {
//     width: "100%",
//     padding: 10,
//     border: "1px solid #007bff",
//     borderRadius: 4,
//     backgroundColor: "#e9f7ff",
//     fontWeight: "bold",
//     marginTop: 5,
//     marginBottom: 10,
//   },
//   buttonRow: { display: "flex", gap: 10, marginTop: 10 },
//   generateButton: {
//     flex: 1,
//     padding: 10,
//     fontSize: 16,
//     backgroundColor: "#28a745",
//     color: "white",
//     border: "none",
//     borderRadius: 5,
//     cursor: "pointer",
//   },
//   generateButtonAlt: {
//     flex: 1,
//     padding: 10,
//     fontSize: 16,
//     backgroundColor: "#ff9800",
//     color: "white",
//     border: "none",
//     borderRadius: 5,
//     cursor: "pointer",
//   },
//   qrAndBarcodeBox: {
//     marginTop: 30,
//     display: "flex",
//     justifyContent: "space-around",
//     alignItems: "center",
//     flexWrap: "wrap",
//     gap: 20,
//     textAlign: "center",
//   },
//   qrBox: {
//     border: "1px dashed #ccc",
//     padding: 15,
//     borderRadius: 6,
//   },
//   barcodeBox: {
//     border: "1px dashed #ccc",
//     padding: 15,
//     borderRadius: 6,
//     textAlign: "center",
//   },
//   downloadButton: {
//     marginTop: 10,
//     padding: "8px 16px",
//     fontSize: 14,
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     borderRadius: 4,
//     cursor: "pointer",
//   },
//   scanButton: {
//     padding: "10px 20px",
//     fontSize: 16,
//     cursor: "pointer",
//     backgroundColor: "#007bff",
//     color: "white",
//     border: "none",
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   stopButton: {
//     padding: "10px 20px",
//     fontSize: 16,
//     cursor: "pointer",
//     backgroundColor: "#dc3545",
//     color: "white",
//     border: "none",
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   scannerBox: {
//     width: "100%",
//     height: 300,
//     overflow: "hidden",
//     border: "3px solid #007bff",
//   },
//   video: { width: "100%", height: "100%", objectFit: "cover" },
//   scanStatus: { marginTop: 10, fontWeight: "bold" },
//   inputGroup: { marginBottom: 15 },
// };