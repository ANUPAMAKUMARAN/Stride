// import React, { useRef, useState, useEffect } from "react";
// import { BrowserMultiFormatReader } from "@zxing/browser";
// import Quagga from "@ericblade/quagga2";

// export default function QRBarcodeScanner() {
//   const videoRef = useRef(null);
//   const codeReaderRef = useRef(null);
//   const quaggaRef = useRef(null);

//   const [scanning, setScanning] = useState(false);
//   const [scanStatus, setScanStatus] = useState("Ready to Scan");
//   const [scannedData, setScannedData] = useState({ name: "", email: "", phnNo: "" });

//   // Cleanup camera and scanners
//   const cleanupScanner = () => {
//     if (codeReaderRef.current?.reset) codeReaderRef.current.reset();
//     if (quaggaRef.current) {
//       Quagga.stop();
//       quaggaRef.current = null;
//     }
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//   };

//   // Start live scanning
//   useEffect(() => {
//     if (!scanning) {
//       cleanupScanner();
//       setScanStatus("Ready to Scan");
//       return;
//     }

//     setScanStatus("Scanning...");

//     // ZXing QR + some barcodes
//     const codeReader = new BrowserMultiFormatReader();
//     codeReaderRef.current = codeReader;

//     codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
//       if (result) handleResult(result.getText(), "QR/Barcode");
//     });

//     // Quagga barcode scanner for other types
//     Quagga.init(
//       {
//         inputStream: {
//           type: "LiveStream",
//           target: videoRef.current,
//           constraints: { facingMode: "environment" },
//         },
//         locator: { halfSample: true, patchSize: "medium" },
//         decoder: { readers: ["code_128_reader", "ean_reader", "upc_reader"] },
//         locate: true,
//       },
//       (err) => {
//         if (err) console.error("Quagga init error:", err);
//         else {
//           Quagga.start();
//           quaggaRef.current = true;
//           Quagga.onDetected((data) => {
//             if (data?.codeResult) handleResult(data.codeResult.code, "Barcode");
//           });
//         }
//       }
//     );

//     return () => cleanupScanner();
//   }, [scanning]);

//   // Handle scanned data
//   const handleResult = (text, type) => {
//     try {
//       const parsed = JSON.parse(text);
//       setScannedData(parsed);
//     } catch {
//       setScannedData({ name: text, email: "", phnNo: "" });
//     }
//     setScanStatus(`✅ ${type} scanned!`);
//   };

//   // File/image upload scanning
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setScanStatus("⏳ Decoding image...");

//     const reader = new FileReader();
//     reader.onload = () => {
//       const img = document.createElement("img");
//       img.src = reader.result;
//       img.style.display = "none";
//       document.body.appendChild(img);

//       img.onload = async () => {
//         try {
//           const zxingReader = new BrowserMultiFormatReader();
//           const result = await zxingReader.decodeFromImageElement(img);
//           handleResult(result.getText(), "File QR/Barcode");
//         } catch {
//           Quagga.decodeSingle(
//             {
//               src: img.src,
//               numOfWorkers: 0,
//               inputStream: { size: 800 },
//               decoder: { readers: ["code_128_reader", "ean_reader"] },
//             },
//             (data) => {
//               if (data?.codeResult) handleResult(data.codeResult.code, "File Barcode");
//               else setScanStatus("❌ Could not decode image");
//             }
//           );
//         } finally {
//           document.body.removeChild(img);
//         }
//       };
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ textAlign: "center" }}>Live QR & Barcode Scanner</h2>

//       <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 10 }}>
//         <button
//           onClick={() => setScanning(!scanning)}
//           style={{ padding: 10, borderRadius: 5, backgroundColor: scanning ? "#e74c3c" : "#3498db", color: "#fff", border: "none" }}
//         >
//           {scanning ? "Stop Scanner" : "Start Live Scanner"}
//         </button>
//       </div>

//       {scanning && (
//         <div style={{ border: "1px solid #ccc", borderRadius: 8, overflow: "hidden", marginBottom: 10 }}>
//           <video ref={videoRef} style={{ width: "100%", height: 300, objectFit: "cover" }} muted playsInline autoPlay />
//         </div>
//       )}

//       <div style={{ textAlign: "center", marginBottom: 10 }}>
//         <label style={{ padding: 10, backgroundColor: "#2ecc71", color: "#fff", borderRadius: 5, cursor: "pointer" }}>
//           Upload File / Image
//           <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: "none" }} />
//         </label>
//       </div>

//       <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 10, backgroundColor: "#f9f9f9" }}>
//         <p style={{ textAlign: "center", margin: 5, fontWeight: "bold" }}>{scanStatus}</p>
//         <h3>Scanned Data</h3>
//         <div style={{ marginBottom: 5 }}>
//           <label>Name:</label>
//           <input value={scannedData.name} readOnly style={{ width: "100%", padding: 5, marginTop: 2 }} />
//         </div>
//         <div style={{ marginBottom: 5 }}>
//           <label>Email:</label>
//           <input value={scannedData.email} readOnly style={{ width: "100%", padding: 5, marginTop: 2 }} />
//         </div>
//         <div style={{ marginBottom: 5 }}>
//           <label>Phone:</label>
//           <input value={scannedData.phnNo} readOnly style={{ width: "100%", padding: 5, marginTop: 2 }} />
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useRef, useState } from "react";
// import { BrowserMultiFormatReader } from "@zxing/browser";

// export default function QRBarcodeScanner() {
//   const videoRef = useRef(null);
//   const codeReaderRef = useRef(null);

//   const [scanStatus, setScanStatus] = useState("Ready to Scan");
//   const [scannedData, setScannedData] = useState({ text: "" });
//   const lastScannedRef = useRef(null); // Prevent duplicate reads

//   const stopScanner = () => {
//     if (codeReaderRef.current) {
//       try {
//         codeReaderRef.current.reset();
//       } catch {}
//       codeReaderRef.current = null;
//     }
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
//       videoRef.current.srcObject = null;
//     }
//   };

//  const startScanner = async () => {
//   // Clear previous scan
//   setScannedData({ text: "" });
//   lastScannedRef.current = null;

//   stopScanner();
//   setScanStatus("Scanning...");

//   setTimeout(async () => {
//     const codeReader = new BrowserMultiFormatReader();
//     codeReaderRef.current = codeReader;

//     try {
//       await codeReader.decodeFromVideoDevice(
//         null,
//         videoRef.current,
//         (result) => {
//           if (result) handleResult(result.getText());
//         }
//       );
//     } catch (err) {
//       console.error("Scanner error:", err);
//       setScanStatus("❌ Camera not accessible");
//     }
//   }, 200);
// };


//   const handleResult = (text) => {
//     // Ignore consecutive duplicates
//     if (text === lastScannedRef.current) return;

//     lastScannedRef.current = text;

//     setScannedData({ text });
//     setScanStatus("✅ Scan Successful!");

//     // Stop camera after successful scan
//     stopScanner();

//     // Reset lastScannedRef after a short delay so next scan is allowed
//     setTimeout(() => {
//       lastScannedRef.current = null;
//       setScanStatus("Ready to Scan");
//     }, 500);
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ textAlign: "center" }}>QR / Barcode Scanner</h2>

//       <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
//         <button
//           onClick={startScanner}
//           style={{
//             padding: 10,
//             borderRadius: 5,
//             backgroundColor: "#3498db",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Start Scanner
//         </button>
//       </div>

//       <div style={{ border: "1px solid #ccc", borderRadius: 8, overflow: "hidden", marginBottom: 10 }}>
//         <video
//           ref={videoRef}
//           style={{ width: "100%", height: 300, objectFit: "cover" }}
//           muted
//           playsInline
//           autoPlay
//         />
//       </div>

//       <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 10, backgroundColor: "#f9f9f9" }}>
//         <p style={{ textAlign: "center", fontWeight: "bold" }}>{scanStatus}</p>
//         <h3>Scanned Data</h3>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 5,
//             padding: 5,
//             border: "1px solid #ccc",
//             borderRadius: 5,
//             backgroundColor: "#fff",
//             minHeight: 50,
//           }}
//         >
//           {scannedData.text ? (
//             <div style={{ wordBreak: "break-word" }}>{scannedData.text}</div>
//           ) : (
//             <p style={{ textAlign: "center", color: "#888" }}>No scan yet</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useRef, useState } from "react";
// import { BrowserMultiFormatReader } from "@zxing/browser";

// export default function QRBarcodeScanner() {
//   const videoRef = useRef(null);
//   const codeReaderRef = useRef(null);

//   const [scanStatus, setScanStatus] = useState("Ready to Scan");
//   const [scannedData, setScannedData] = useState({ text: "" });
//   const lastScannedRef = useRef(null);

//   // Stop live camera
//   const stopScanner = () => {
//     if (codeReaderRef.current) {
//       try {
//         codeReaderRef.current.reset();
//       } catch {}
//       codeReaderRef.current = null;
//     }
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
//       videoRef.current.srcObject = null;
//     }
//   };

//   // Start live camera scanner
//   const startScanner = async () => {
//     setScannedData({ text: "" });
//     lastScannedRef.current = null;

//     stopScanner();
//     setScanStatus("Scanning...");

//     setTimeout(async () => {
//       const codeReader = new BrowserMultiFormatReader();
//       codeReaderRef.current = codeReader;

//       try {
//         await codeReader.decodeFromVideoDevice(null, videoRef.current, (result) => {
//           if (result) handleResult(result.getText());
//         });
//       } catch (err) {
//         console.error("Scanner error:", err);
//         setScanStatus("❌ Camera not accessible");
//       }
//     }, 200);
//   };

//   // Handle scan result
//   const handleResult = (text) => {
//     if (text === lastScannedRef.current) return;
//     lastScannedRef.current = text;

//     setScannedData({ text });
//     setScanStatus("✅ Scan Successful!");
//     stopScanner();

//     setTimeout(() => {
//       lastScannedRef.current = null;
//       setScanStatus("Ready to Scan");
//     }, 800);
//   };

//   // Handle image upload for scanning QR/barcode
//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     stopScanner();
//     setScanStatus("🔍 Scanning uploaded image...");

//     try {
//       const codeReader = new BrowserMultiFormatReader();
//       const imageUrl = URL.createObjectURL(file);
//       const result = await codeReader.decodeFromImageUrl(imageUrl);

//       if (result) {
//         handleResult(result.getText());
//       } else {
//         setScanStatus("❌ No code found in image");
//       }
//     } catch (err) {
//       console.error("Image scan error:", err);
//       setScanStatus("❌ Could not read from image");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ textAlign: "center" }}>📷 QR / Barcode Scanner</h2>

//       {/* Scanner Controls */}
//       <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 10 }}>
//         <button
//           onClick={startScanner}
//           style={{
//             padding: 10,
//             borderRadius: 5,
//             backgroundColor: "#3498db",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Start Live Scanner
//         </button>

//         <label
//           htmlFor="fileUpload"
//           style={{
//             padding: "10px 15px",
//             borderRadius: 5,
//             backgroundColor: "#2ecc71",
//             color: "#fff",
//             cursor: "pointer",
//           }}
//         >
//           Upload Image
//         </label>
//         <input
//           id="fileUpload"
//           type="file"
//           accept="image/*"
//           onChange={handleFileUpload}
//           style={{ display: "none" }}
//         />
//       </div>

//       {/* Video Preview */}
//       <div
//         style={{
//           border: "1px solid #ccc",
//           borderRadius: 8,
//           overflow: "hidden",
//           marginBottom: 10,
//           backgroundColor: "#000",
//         }}
//       >
//         <video
//           ref={videoRef}
//           style={{ width: "100%", height: 300, objectFit: "cover" }}
//           muted
//           playsInline
//           autoPlay
//         />
//       </div>

//       {/* Scan Results */}
//       <div
//         style={{
//           border: "1px solid #ddd",
//           borderRadius: 8,
//           padding: 10,
//           backgroundColor: "#f9f9f9",
//         }}
//       >
//         <p style={{ textAlign: "center", fontWeight: "bold" }}>{scanStatus}</p>
//         <h3>Scanned Data</h3>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 5,
//             padding: 5,
//             border: "1px solid #ccc",
//             borderRadius: 5,
//             backgroundColor: "#fff",
//             minHeight: 50,
//           }}
//         >
//           {scannedData.text ? (
//             <div style={{ wordBreak: "break-word" }}>{scannedData.text}</div>
//           ) : (
//             <p style={{ textAlign: "center", color: "#888" }}>No scan yet</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useRef, useState } from "react";
// import {
//   BrowserMultiFormatReader,
//   BarcodeFormat,
//   DecodeHintType,
//   NotFoundException,
// } from "@zxing/library";

// export default function QRBarcodeScanner() {
//   const videoRef = useRef(null);
//   const codeReaderRef = useRef(null);

//   const [scanStatus, setScanStatus] = useState("Ready to Scan");
//   const [scannedData, setScannedData] = useState({ text: "" });
//   const lastScannedRef = useRef(null);

//   // ✅ Define formats explicitly (QR + Barcodes)
//   const hints = new Map();
//   hints.set(DecodeHintType.POSSIBLE_FORMATS, [
//     BarcodeFormat.QR_CODE,
//     BarcodeFormat.CODE_128,
//     BarcodeFormat.CODE_39,
//     BarcodeFormat.EAN_13,
//     BarcodeFormat.EAN_8,
//     BarcodeFormat.UPC_A,
//     BarcodeFormat.UPC_E,
//     BarcodeFormat.ITF,
//     BarcodeFormat.PDF_417,
//     BarcodeFormat.DATA_MATRIX,
//   ]);

//   const stopScanner = () => {
//     if (codeReaderRef.current) {
//       try {
//         codeReaderRef.current.reset();
//       } catch {}
//       codeReaderRef.current = null;
//     }
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
//       videoRef.current.srcObject = null;
//     }
//   };

//   const startScanner = async () => {
//     setScannedData({ text: "" });
//     lastScannedRef.current = null;
//     stopScanner();
//     setScanStatus("📸 Scanning...");

//     try {
//       const codeReader = new BrowserMultiFormatReader(hints);
//       codeReaderRef.current = codeReader;

//       await codeReader.decodeFromVideoDevice(
//         null,
//         videoRef.current,
//         (result, err) => {
//           if (result) {
//             handleResult(result.getText());
//           }
//           if (err && !(err instanceof NotFoundException)) {
//             console.error(err);
//           }
//         }
//       );
//     } catch (err) {
//       console.error("Scanner error:", err);
//       setScanStatus("❌ Camera not accessible");
//     }
//   };

//   const handleResult = (text) => {
//     if (text === lastScannedRef.current) return;
//     lastScannedRef.current = text;

//     setScannedData({ text });
//     setScanStatus("✅ Scan Successful!");
//     stopScanner();

//     setTimeout(() => {
//       lastScannedRef.current = null;
//       setScanStatus("Ready to Scan");
//     }, 1000);
//   };

//  const handleFileUpload = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   setScanStatus("⏳ Decoding image...");
//   setScannedData({ name: "", email: "", phnNo: "" });

//   const reader = new FileReader();
//   reader.onload = () => {
//     const img = new Image();
//     img.src = reader.result;
//     img.style.display = "none";
//     document.body.appendChild(img);

//     img.onload = () => {
//       // 1️⃣ Try ZXing for QR codes
//       const zxingReader = new BrowserMultiFormatReader();
//       zxingReader
//         .decodeFromImageElement(img)
//         .then((result) => {
//           handleResult(result.getText(), "File QR");
//           document.body.removeChild(img);
//         })
//         .catch(() => {
//           // 2️⃣ Fallback to Quagga for 1D barcodes
//           Quagga.decodeSingle(
//             {
//               src: img.src,
//               numOfWorkers: 0,
//               inputStream: { size: 800 },
//               decoder: {
//                 readers: [
//                   "code_128_reader",
//                   "ean_reader",
//                   "ean_8_reader",
//                   "upc_reader",
//                   "upc_e_reader",
//                 ],
//               },
//               locate: true,
//             },
//             (data) => {
//               if (data && data.codeResult) {
//                 handleResult(data.codeResult.code, "File Barcode");
//               } else {
//                 setScanStatus("❌ Could not decode image");
//               }
//               document.body.removeChild(img);
//             }
//           );
//         });
//     };
//   };

//   reader.readAsDataURL(file);
// };


//   return (
//     <div
//       style={{
//         maxWidth: 500,
//         margin: "20px auto",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       <h2 style={{ textAlign: "center" }}>📷 QR / Barcode Scanner</h2>

//       {/* Controls */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: 10,
//           marginBottom: 10,
//         }}
//       >
//         <button
//           onClick={startScanner}
//           style={{
//             padding: 10,
//             borderRadius: 5,
//             backgroundColor: "#3498db",
//             color: "#fff",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Start Live Scanner
//         </button>

//         <label
//           htmlFor="fileUpload"
//           style={{
//             padding: "10px 15px",
//             borderRadius: 5,
//             backgroundColor: "#2ecc71",
//             color: "#fff",
//             cursor: "pointer",
//           }}
//         >
//           Upload Image
//         </label>
//         <input
//           id="fileUpload"
//           type="file"
//           accept="image/*"
//           onChange={handleFileUpload}
//           style={{ display: "none" }}
//         />
//       </div>

//       {/* Video Preview */}
//       <div
//         style={{
//           border: "1px solid #ccc",
//           borderRadius: 8,
//           overflow: "hidden",
//           marginBottom: 10,
//           backgroundColor: "#000",
//         }}
//       >
//         <video
//           ref={videoRef}
//           style={{ width: "100%", height: 300, objectFit: "cover" }}
//           muted
//           playsInline
//           autoPlay
//         />
//       </div>

//       {/* Scanned Data */}
//       <div
//         style={{
//           border: "1px solid #ddd",
//           borderRadius: 8,
//           padding: 10,
//           backgroundColor: "#f9f9f9",
//         }}
//       >
//         <p style={{ textAlign: "center", fontWeight: "bold" }}>{scanStatus}</p>
//         <h3>Scanned Data</h3>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: 5,
//             padding: 5,
//             border: "1px solid #ccc",
//             borderRadius: 5,
//             backgroundColor: "#fff",
//             minHeight: 50,
//           }}
//         >
//           {scannedData.text ? (
//             <div style={{ wordBreak: "break-word" }}>{scannedData.text}</div>
//           ) : (
//             <p style={{ textAlign: "center", color: "#888" }}>No scan yet</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// import React, { useRef, useState } from "react";
// import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType, NotFoundException } from "@zxing/library";
// import Quagga from "@ericblade/quagga2"; // ESM-compatible fork for Vite

// export default function QRBarcodeScanner() {
//   const videoRef = useRef(null);
//   const codeReaderRef = useRef(null);
//   const lastScannedRef = useRef(null);

//   const [scanStatus, setScanStatus] = useState("Ready to Scan");
//   const [scannedData, setScannedData] = useState({ text: "" });

//   // ZXing hints for QR + 1D barcodes
//   const hints = new Map();
//   hints.set(DecodeHintType.POSSIBLE_FORMATS, [
//     BarcodeFormat.QR_CODE,
//     BarcodeFormat.CODE_128,
//     BarcodeFormat.CODE_39,
//     BarcodeFormat.EAN_13,
//     BarcodeFormat.EAN_8,
//     BarcodeFormat.UPC_A,
//     BarcodeFormat.UPC_E,
//     BarcodeFormat.ITF,
//     BarcodeFormat.PDF_417,
//     BarcodeFormat.DATA_MATRIX,
//   ]);

//   // Stop camera scanner
//   const stopScanner = () => {
//     if (codeReaderRef.current) {
//       try { codeReaderRef.current.reset(); } catch {}
//       codeReaderRef.current = null;
//     }
//     if (videoRef.current?.srcObject) {
//       videoRef.current.srcObject.getTracks().forEach(track => track.stop());
//       videoRef.current.srcObject = null;
//     }
//   };

//   // Start live camera scanner
//   const startScanner = async () => {
//     setScannedData({ text: "" });
//     lastScannedRef.current = null;
//     stopScanner();
//     setScanStatus("📸 Scanning...");

//     try {
//       const codeReader = new BrowserMultiFormatReader(hints);
//       codeReaderRef.current = codeReader;

//       await codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
//         if (result) handleResult(result.getText());
//         if (err && !(err instanceof NotFoundException)) console.error(err);
//       });
//     } catch (err) {
//       console.error("Scanner error:", err);
//       setScanStatus("❌ Camera not accessible");
//     }
//   };

//   // Handle scanned result
//   const handleResult = (text) => {
//     if (text === lastScannedRef.current) return;
//     lastScannedRef.current = text;

//     setScannedData({ text });
//     setScanStatus("✅ Scan Successful!");
//     stopScanner();

//     setTimeout(() => {
//       lastScannedRef.current = null;
//       setScanStatus("Ready to Scan");
//     }, 1500);
//   };

//   // Handle file upload scanning
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     setScanStatus("⏳ Decoding image...");
//     setScannedData({ text: "" });

//     const reader = new FileReader();
//     reader.onload = () => {
//       const img = new Image();
//       img.src = reader.result;
//       img.style.display = "none";
//       document.body.appendChild(img);

//       img.onload = () => {
//         // 1️⃣ Try ZXing first (QR codes)
//         const zxingReader = new BrowserMultiFormatReader(hints);
//         zxingReader.decodeFromImageElement(img)
//           .then(result => {
//             handleResult(result.getText());
//             document.body.removeChild(img);
//           })
//           .catch(() => {
//             // 2️⃣ Fallback to Quagga2 for 1D barcodes
//             Quagga.decodeSingle({
//               src: img.src,
//               numOfWorkers: 0,
//               inputStream: { size: 800 },
//               decoder: {
//                 readers: [
//                   "code_128_reader",
//                   "ean_reader",
//                   "ean_8_reader",
//                   "upc_reader",
//                   "upc_e_reader",
//                   "code_39_reader",
//                   "itf_reader",
//                 ],
//               },
//               locate: true,
//             }, (data) => {
//               if (data && data.codeResult) {
//                 handleResult(data.codeResult.code);
//               } else {
//                 setScanStatus("❌ Could not decode image");
//               }
//               document.body.removeChild(img);
//             });
//           });
//       };
//     };
//     reader.readAsDataURL(file);
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ textAlign: "center" }}>📷 QR / Barcode Scanner</h2>

//       {/* Controls */}
//       <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 10 }}>
//         <button
//           onClick={startScanner}
//           style={{ padding: 10, borderRadius: 5, backgroundColor: "#3498db", color: "#fff", border: "none", cursor: "pointer" }}
//         >
//           Start Live Scanner
//         </button>

//         <label
//           htmlFor="fileUpload"
//           style={{ padding: "10px 15px", borderRadius: 5, backgroundColor: "#2ecc71", color: "#fff", cursor: "pointer" }}
//         >
//           Upload Image
//         </label>
//         <input
//           id="fileUpload"
//           type="file"
//           accept="image/*"
//           onChange={handleFileUpload}
//           style={{ display: "none" }}
//         />
//       </div>

//       {/* Video Preview */}
//       <div style={{ border: "1px solid #ccc", borderRadius: 8, overflow: "hidden", marginBottom: 10, backgroundColor: "#000" }}>
//         <video ref={videoRef} style={{ width: "100%", height: 300, objectFit: "cover" }} muted playsInline autoPlay />
//       </div>

//       {/* Scanned Data */}
//       <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 10, backgroundColor: "#f9f9f9" }}>
//         <p style={{ textAlign: "center", fontWeight: "bold" }}>{scanStatus}</p>
//         <h3>Scanned Data</h3>
//         <div style={{ display: "flex", flexDirection: "column", gap: 5, padding: 5, border: "1px solid #ccc", borderRadius: 5, backgroundColor: "#fff", minHeight: 50 }}>
//           {scannedData.text ? (
//             <div style={{ wordBreak: "break-word" }}>{scannedData.text}</div>
//           ) : (
//             <p style={{ textAlign: "center", color: "#888" }}>No scan yet</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useRef, useState } from "react";
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType, NotFoundException } from "@zxing/library";
import Quagga from "@ericblade/quagga2"; // ESM-compatible fork for Vite

export default function QRBarcodeScanner() {
  const videoRef = useRef(null);
  const codeReaderRef = useRef(null);
  const lastScannedRef = useRef(null);

  const [scanStatus, setScanStatus] = useState("Ready to Scan");
  const [scannedData, setScannedData] = useState({ text: "" });

  // ZXing hints for QR + 1D barcodes
  const hints = new Map();
  hints.set(DecodeHintType.POSSIBLE_FORMATS, [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.ITF,
    BarcodeFormat.PDF_417,
    BarcodeFormat.DATA_MATRIX,
  ]);

  // Stop camera scanner
  const stopScanner = () => {
    if (codeReaderRef.current) {
      try { codeReaderRef.current.reset(); } catch {}
      codeReaderRef.current = null;
    }
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Start live camera scanner
  const startScanner = async () => {
    setScannedData({ text: "" });
    lastScannedRef.current = null;
    stopScanner();
    setScanStatus("📸 Scanning...");

    try {
      const codeReader = new BrowserMultiFormatReader(hints);
      codeReaderRef.current = codeReader;

      await codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) handleResult(result.getText());
        if (err && !(err instanceof NotFoundException)) console.error(err);
      });
    } catch (err) {
      console.error("Scanner error:", err);
      setScanStatus("❌ Camera not accessible");
    }
  };

  // Handle scanned result
  const handleResult = (text) => {
    if (text === lastScannedRef.current) return;
    lastScannedRef.current = text;

    setScannedData({ text });
    setScanStatus("✅ Scan Successful!");
    stopScanner();

    setTimeout(() => {
      lastScannedRef.current = null;
      setScanStatus("Ready to Scan");
    }, 1500);
  };

 const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setScanStatus("⏳ Decoding image...");
  setScannedData({ text: "" });

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    img.style.display = "none";
    document.body.appendChild(img);

    img.onload = () => {
      // Draw to a canvas for stable pixel data
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // ZXing: try decode from the HTMLImageElement
      const zxingReader = new BrowserMultiFormatReader(hints);
      zxingReader.decodeFromImageElement(img)
        .then(result => {
          handleResult(result.getText());
          document.body.removeChild(img);
        })
        .catch(() => {
          // Fallback: Quagga2 decodeSingle using canvas image data
          Quagga.decodeSingle({
            src: canvas.toDataURL(),
            inputStream: { size: 800 },
            decoder: {
              readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "upc_reader",
                "upc_e_reader",
                "code_39_reader",
                "itf_reader"
              ],
            },
            locate: true,
          }, (data) => {
            if (data && data.codeResult) {
              handleResult(data.codeResult.code);
            } else {
              setScanStatus("❌ Could not decode image");
            }
            document.body.removeChild(img);
          });
        });
    };
  };
  reader.readAsDataURL(file);
};


  return (
    <div style={{ maxWidth: 500, margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>📷 QR / Barcode Scanner</h2>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 10 }}>
        <button
          onClick={startScanner}
          style={{ padding: 10, borderRadius: 5, backgroundColor: "#3498db", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Start Live Scanner
        </button>

        <label
          htmlFor="fileUpload"
          style={{ padding: "10px 15px", borderRadius: 5, backgroundColor: "#2ecc71", color: "#fff", cursor: "pointer" }}
        >
          Upload Image
        </label>
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </div>

      {/* Video Preview */}
      <div style={{ border: "1px solid #ccc", borderRadius: 8, overflow: "hidden", marginBottom: 10, backgroundColor: "#000" }}>
        <video ref={videoRef} style={{ width: "100%", height: 300, objectFit: "cover" }} muted playsInline autoPlay />
      </div>

      {/* Scanned Data */}
      <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: 10, backgroundColor: "#f9f9f9" }}>
        <p style={{ textAlign: "center", fontWeight: "bold" }}>{scanStatus}</p>
        <h3>Scanned Data</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, padding: 5, border: "1px solid #ccc", borderRadius: 5, backgroundColor: "#fff", minHeight: 50 }}>
          {scannedData.text ? (
            <div style={{ wordBreak: "break-word" }}>{scannedData.text}</div>
          ) : (
            <p style={{ textAlign: "center", color: "#888" }}>No scan yet</p>
          )}
        </div>
      </div>
    </div>
  );
}