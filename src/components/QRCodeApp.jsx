
// import React, { useRef, useState, useEffect } from "react";
// import QRCode from "react-qr-code";
// import JsBarcode from "jsbarcode";
// import { BrowserMultiFormatReader } from "@zxing/browser";
// import Quagga from "@ericblade/quagga2"; // ✅ Add this
// import "../styles/QRBarcodeApp.scss";

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
//   const quaggaRef = useRef(null);

//   // ---------- INPUT CHANGE ----------
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputData((prev) => ({ ...prev, [name]: value }));
//     setQrValue("");
//     setBarcodeValue("");
//   };

//   const generateQR = () => {
//     if (!inputData.name || !inputData.email || !inputData.phnNo) return;
//     setQrValue(JSON.stringify(inputData));
//   };

//   const generateBarcode = () => {
//     if (!inputData.name || !inputData.email || !inputData.phnNo) return;
//     setBarcodeValue(JSON.stringify(inputData));
//   };

// // ---------- RENDER BARCODE ----------
// useEffect(() => {
//   if (barcodeValue && barcodeRef.current) {
//     barcodeRef.current.innerHTML = "";
//     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     barcodeRef.current.appendChild(svg);

//     JsBarcode(svg, barcodeValue, {
//       format: "CODE128",
//       width: 2,       // ✅ thinner, looks balanced with QR
//       height: 880,     // shorter height
//       displayValue: false,
//       margin: 10,
//       lineColor: "#000",
//       background: "#fff",
//     });
//   }
// }, [barcodeValue]);


//   // ---------- CLEANUP ----------
//   const cleanupScanner = () => {
//     if (codeReaderRef.current && typeof codeReaderRef.current.reset === "function") {
//       codeReaderRef.current.reset();
//     }
//     if (quaggaRef.current) {
//       Quagga.stop();
//       quaggaRef.current = null;
//     }
//     const videoElement = videoRef.current;
//     if (videoElement && videoElement.srcObject) {
//       videoElement.srcObject.getTracks().forEach((track) => track.stop());
//       videoElement.srcObject = null;
//     }
//   };

//   // ---------- LIVE SCANNER ----------
//   useEffect(() => {
//     if (!scanning) {
//       cleanupScanner();
//       setScanStatus("Ready to Scan");
//       return;
//     }

//     setScanStatus("Scanning...");

//     // ✅ Start ZXing for QR detection
//     const codeReader = new BrowserMultiFormatReader();
//     codeReaderRef.current = codeReader;
//     codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
//       if (result) {
//         handleResult(result.getText(), "QR");
//       }
//     });

//     // ✅ Start Quagga for Barcode detection
//     Quagga.init(
//       {
//         inputStream: {
//           type: "LiveStream",
//           target: videoRef.current,
//           constraints: { facingMode: "environment" },
//         },
//         locator: {
//           halfSample: true,
//           patchSize: "medium",
//         },
//         decoder: {
//           readers: ["code_128_reader", "ean_reader", "upc_reader"],
//         },
//         locate: true,
//       },
//       (err) => {
//         if (err) {
//           console.error("Quagga init error:", err);
//           return;
//         }
//         Quagga.start();
//         quaggaRef.current = true;

//         Quagga.onDetected((data) => {
//           if (data && data.codeResult) {
//             handleResult(data.codeResult.code, "Barcode");
//           }
//         });
//       }
//     );

//     return () => cleanupScanner();
//   }, [scanning]);

//   // ---------- HANDLE RESULT ----------
//   const handleResult = (text, type) => {
//     try {
//       const parsed = JSON.parse(text);
//       setScannedData(parsed);
//     } catch {
//       setScannedData({ name: text, email: "", phnNo: "" });
//     }
//     setScanStatus(`✅ ${type} Scan Successful!`);
//     setTimeout(() => {
//       setScanning(false);
//       setScanStatus("Ready to Scan");
//     }, 800);
//   };

//   // ---------- FILE UPLOAD SCAN ----------
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setScanStatus("⏳ Decoding image...");

//     const fileReader = new FileReader();
//     fileReader.onload = async () => {
//       const img = document.createElement("img");
//       img.src = fileReader.result;
//       img.style.display = "none";
//       document.body.appendChild(img);

//       img.onload = async () => {
//         try {
//           // Try ZXing first (QR + some barcodes)
//           const reader = new BrowserMultiFormatReader();
//           const result = await reader.decodeFromImageElement(img);
//           handleResult(result.getText(), "File");
//         } catch {
//           // If ZXing fails, fallback to Quagga decode
//           Quagga.decodeSingle(
//             {
//               src: img.src,
//               numOfWorkers: 0,
//               inputStream: { size: 800 },
//               decoder: { readers: ["code_128_reader", "ean_reader"] },
//             },
//             (data) => {
//               if (data && data.codeResult) {
//                 handleResult(data.codeResult.code, "File Barcode");
//               } else {
//                 setScanStatus("❌ Could not decode image");
//               }
//             }
//           );
//         } finally {
//           document.body.removeChild(img);
//         }
//       };
//     };
//     fileReader.readAsDataURL(file);
//   };

//   // ---------- DOWNLOAD QR ----------
//   const downloadQR = () => {
//     const svg = qrRef.current.querySelector("svg");
//     if (!svg) return;
//     const svgData = new XMLSerializer().serializeToString(svg);
//     const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
//     const url = URL.createObjectURL(svgBlob);
//     const img = new Image();
//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0);
//       const pngUrl = canvas.toDataURL("image/png");
//       const link = document.createElement("a");
//       link.href = pngUrl;
//       link.download = "QRCode.png";
//       link.click();
//       URL.revokeObjectURL(url);
//     };
//     img.src = url;
//   };


// // ---------- DOWNLOAD BARCODE ----------
// const downloadBarcode = () => {
//   if (!barcodeRef.current) return;
//   const svg = barcodeRef.current.querySelector("svg");
//   if (!svg) return;

//   const svgData = new XMLSerializer().serializeToString(svg);
//   const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
//   const url = URL.createObjectURL(svgBlob);

//   const img = new Image();
//   img.onload = () => {
//     // ✅ Export with higher resolution so scanner can read it
//     const scale = 3; // increase if needed (3x sharper PNG)
//     const canvas = document.createElement("canvas");
//     canvas.width = img.width * scale;
//     canvas.height = img.height * scale;
//     const ctx = canvas.getContext("2d");
//     ctx.scale(scale, scale);
//     ctx.drawImage(img, 0, 0);

//     const pngUrl = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.href = pngUrl;
//     link.download = "Barcode.png";
//     link.click();

//     URL.revokeObjectURL(url);
//   };
//   img.src = url;
// };
//   // ---------- JSX ----------
//   return (
//     <div className="container">
//       <h1>Live QR / Barcode Generator & Scanner</h1>

//       <div className="flexContainer">
//         {/* ---------- GENERATOR ---------- */}
//         <div className="section">
//           <h2>1️⃣ QR & Barcode Generator</h2>

//           <input name="name" placeholder="Name" value={inputData.name} onChange={handleInputChange} className="input" />
//           <input name="email" placeholder="Email" value={inputData.email} onChange={handleInputChange} className="input" />
//           <input name="phnNo" placeholder="Phone" value={inputData.phnNo} onChange={handleInputChange} className="input" />

//           <div className="buttonRow">
//             <button onClick={generateQR} className="generateButton">Generate QR</button>
//             <button onClick={generateBarcode} className="generateButtonAlt">Generate Barcode</button>
//           </div>

//           <div className="qrAndBarcodeBox">
//             {qrValue && (
//               <div ref={qrRef} className="qrBox">
//                 <QRCode value={qrValue} size={150} />
//                 <button onClick={downloadQR} className="downloadButton">Download QR</button>
//               </div>
//             )}
//             {barcodeValue && (
//               <div className="barcodeBox">
//                 <div ref={barcodeRef}></div>
//                 <button onClick={downloadBarcode} className="downloadButton">Download Barcode</button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ---------- SCANNER ---------- */}
//         <div className="section">
//           <h2>2️⃣ QR / Barcode Scanner</h2>

//           <button
//             onClick={() => {
//               if (scanning) {
//                 setScanning(false);
//               } else {
//                 setScannedData(initialDataState);
//                 setScanning(true);
//               }
//             }}
//             className="scanButton"
//           >
//             {scanning ? "Scanning..." : "Start Live Scanner"}
//           </button>

//           {scanning && (
//             <div className="scannerContainer">
//               <div className="scannerBox">
//                 <video ref={videoRef} className="video" playsInline autoPlay muted />
//               </div>
//               <div className="uploadBelow">
//                 <p className="scanStatus">{scanStatus}</p>
//                 <label htmlFor="fileUpload" className="uploadBtn">Choose File / Image</label>
//                 <input id="fileUpload" type="file" accept="image/*" onChange={handleFileUpload} className="hiddenFileInput" />
//               </div>
//             </div>
//           )}

//           <h3>Scanned Data:</h3>
//           <div className="inputGroup">
//             <label>Name:</label>
//             <input value={scannedData.name} readOnly className="readOnlyInput" />
//           </div>
//           <div className="inputGroup">
//             <label>Email:</label>
//             <input value={scannedData.email} readOnly className="readOnlyInput" />
//           </div>
//           <div className="inputGroup">
//             <label>Phone:</label>
//             <input value={scannedData.phnNo} readOnly className="readOnlyInput" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useRef, useState } from "react";
import QRCode from "react-qr-code";
import JsBarcode from "jsbarcode";
// import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType, NotFoundException } from "@zxing/browser";
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType, NotFoundException } from "@zxing/browser";


import Quagga from "@ericblade/quagga2"; 
import "../styles/QRBarcodeApp.scss";

const initialDataState = { name: "", email: "", phnNo: "" };

export default function QRBarcodeApp() {
  const [inputData, setInputData] = useState(initialDataState);
  const [qrValue, setQrValue] = useState("");
  const [barcodeValue, setBarcodeValue] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState("Ready to Scan");
  const [scannedData, setScannedData] = useState(initialDataState);

  const videoRef = useRef(null);
  const qrRef = useRef(null);
  const barcodeRef = useRef(null);
  const codeReaderRef = useRef(null);
  const lastScannedRef = useRef(null);

  // ---------------- INPUT HANDLERS ----------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
    setQrValue("");
    setBarcodeValue("");
  };

  const generateQR = () => {
    if (!inputData.name || !inputData.email || !inputData.phnNo) return;
    setQrValue(JSON.stringify(inputData));
  };

  const generateBarcode = () => {
    if (!inputData.name || !inputData.email || !inputData.phnNo) return;
    setBarcodeValue(JSON.stringify(inputData));
  };

  // ---------------- BARCODE RENDER ----------------
  React.useEffect(() => {
    if (barcodeValue && barcodeRef.current) {
      barcodeRef.current.innerHTML = "";
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      barcodeRef.current.appendChild(svg);

      JsBarcode(svg, barcodeValue, {
        format: "CODE128",
        width: 1.2,      // ✅ thinner bars
        height: 380,     // standard height
        displayValue: false,
        margin: 10,
        lineColor: "#000",
        background: "#fff",
      });
    }
  }, [barcodeValue]);

  // ---------------- SCANNER CONFIG ----------------
 const zxingHints = new Map();
zxingHints.set(ZXing.DecodeHintType.POSSIBLE_FORMATS, [
  ZXing.BarcodeFormat.QR_CODE,
  ZXing.BarcodeFormat.CODE_128,
  ZXing.BarcodeFormat.CODE_39,
  ZXing.BarcodeFormat.EAN_13,
  ZXing.BarcodeFormat.EAN_8,
  ZXing.BarcodeFormat.UPC_A,
  ZXing.BarcodeFormat.UPC_E,
  ZXing.BarcodeFormat.ITF,
  ZXing.BarcodeFormat.PDF_417,
  ZXing.BarcodeFormat.DATA_MATRIX,
]);
zxingHints.set(ZXing.DecodeHintType.TRY_HARDER, true);


  const stopScanner = () => {
    if (codeReaderRef.current) {
      try { codeReaderRef.current.reset(); } catch (e) {}
      codeReaderRef.current = null;
    }
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    Quagga.stop();
  };

  const handleResult = (text) => {
    if (text === lastScannedRef.current) return; // skip duplicate
    lastScannedRef.current = text;

    try {
      const parsed = JSON.parse(text);
      setScannedData(parsed);
    } catch {
      setScannedData({ name: text, email: "", phnNo: "" });
    }

    setScanStatus("✅ Scan Successful!");
    stopScanner();

    setTimeout(() => {
      lastScannedRef.current = null;
      setScanStatus("Ready to Scan");
    }, 1500);
  };

  const startScanner = async () => {
    setScannedData(initialDataState);
    lastScannedRef.current = null;
    stopScanner();
    setScanStatus("📸 Scanning...");

    try {
      const codeReader = new BrowserMultiFormatReader(zxingHints);
      codeReaderRef.current = codeReader;

      await codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) handleResult(result.getText());
        // if (err && !(err instanceof NotFoundException)) {}
        if (err && !(err instanceof ZXing.NotFoundException)) { }

      });
    } catch (err) {
      console.error("Scanner error:", err);
      setScanStatus("❌ Camera not accessible");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    stopScanner();
    setScanStatus("⏳ Decoding image...");
    setScannedData(initialDataState);

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.style.display = "none";
      document.body.appendChild(img);

      img.onload = () => {
        const zxingReader = new BrowserMultiFormatReader(zxingHints);
        zxingReader.decodeFromImageElement(img)
          .then(result => {
            handleResult(result.getText());
            document.body.removeChild(img);
          })
          .catch(() => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext("2d").drawImage(img, 0, 0);

            Quagga.decodeSingle({
              src: canvas.toDataURL(),
              inputStream: { size: 800 },
              decoder: { readers: ["code_128_reader", "ean_reader", "code_39_reader"] },
              locate: true,
            }, (data) => {
              if (data && data.codeResult) handleResult(data.codeResult.code);
              else setScanStatus("❌ Could not decode image");
              document.body.removeChild(img);
            });
          });
      };
    };
    reader.readAsDataURL(file);
  };

  // ---------------- DOWNLOAD FUNCTIONS ----------------
  const downloadQR = () => {
    const svg = qrRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const url = URL.createObjectURL(new Blob([svgData], { type: "image/svg+xml;charset=utf-8" }));

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext("2d").drawImage(img, 0, 0);

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "QRCode.png";
      link.click();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const downloadBarcode = () => {
    if (!barcodeRef.current) return;
    const svg = barcodeRef.current.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const url = URL.createObjectURL(new Blob([svgData], { type: "image/svg+xml;charset=utf-8" }));

    const img = new Image();
    img.onload = () => {
      const scale = 2;
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "Barcode.png";
      link.click();
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  // ---------------- JSX ----------------
  return (
    <div className="container">
      <h1>Live QR / Barcode Generator & Scanner</h1>

      <div className="flexContainer">
        {/* GENERATOR */}
        <div className="section">
          <h2>1️⃣ QR & Barcode Generator</h2>
          <input name="name" placeholder="Name" value={inputData.name} onChange={handleInputChange} className="input" />
          <input name="email" placeholder="Email" value={inputData.email} onChange={handleInputChange} className="input" />
          <input name="phnNo" placeholder="Phone" value={inputData.phnNo} onChange={handleInputChange} className="input" />

          <div className="buttonRow">
            <button onClick={generateQR} className="generateButton">Generate QR</button>
            <button onClick={generateBarcode} className="generateButtonAlt">Generate Barcode</button>
          </div>

          <div className="qrAndBarcodeBox">
            {qrValue && (
              <div ref={qrRef} className="qrBox">
                <QRCode value={qrValue} size={150} />
                <button onClick={downloadQR} className="downloadButton">Download QR</button>
              </div>
            )}
            {barcodeValue && (
              <div className="barcodeBox">
                <div ref={barcodeRef}></div>
                <button onClick={downloadBarcode} className="downloadButton">Download Barcode</button>
              </div>
            )}
          </div>
        </div>

        {/* SCANNER */}
        <div className="section">
          <h2>2️⃣ QR / Barcode Scanner</h2>

          <button
            onClick={() => {
              if (scanning) setScanning(false);
              else {
                setScanning(true);
                startScanner();
              }
            }}
            className="scanButton"
          >
            {scanning ? "Scanning..." : "Start Live Scanner"}
          </button>

          {scanning && (
            <div className="scannerContainer">
              <div className="scannerBox">
                <video ref={videoRef} className="video" playsInline autoPlay muted />
              </div>
              <div className="uploadBelow">
                <p className="scanStatus">{scanStatus}</p>
                <label htmlFor="fileUpload" className="uploadBtn">Choose File / Image</label>
                <input id="fileUpload" type="file" accept="image/*" onChange={handleFileUpload} className="hiddenFileInput" />
              </div>
            </div>
          )}

          <h3>Scanned Data:</h3>
          <div className="inputGroup">
            <label>Name:</label>
            <input value={scannedData.name || scannedData.text} readOnly className="readOnlyInput" />
          </div>
          <div className="inputGroup">
            <label>Email:</label>
            <input value={scannedData.email || ""} readOnly className="readOnlyInput" />
          </div>
          <div className="inputGroup">
            <label>Phone:</label>
            <input value={scannedData.phnNo || ""} readOnly className="readOnlyInput" />
          </div>
        </div>
      </div>
    </div>
  );
}
