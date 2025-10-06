import React, { useRef, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import JsBarcode from "jsbarcode";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { NotFoundException } from "@zxing/library";
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
                width: .3,
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
            if (codeReaderRef.current) codeReaderRef.current.reset();
            setScanStatus("Ready to Scan");
            return;
        }

        const codeReader = new BrowserMultiFormatReader();
        codeReaderRef.current = codeReader;

        const videoElement = videoRef.current;
        let lastResult = "";

        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" } })
            .then((stream) => {
                videoElement.srcObject = stream;
                videoElement.play();

                codeReader.decodeFromVideoDevice(null, videoElement, (result, err) => {
                    if (result) {
                        const text = result.getText();
                        if (text !== lastResult) {
                            lastResult = text;
                            try {
                                const parsed = JSON.parse(text);
                                setScannedData(parsed);
                            } catch {
                                setScannedData({ name: text, email: "", phnNo: "" });
                            }
                            setScanStatus("✅ Scan Successful!");
                        }
                    } else if (err && !(err instanceof NotFoundException)) {
                        console.error(err);
                        setScanStatus("❌ Scanner Error");
                    }
                });
            })
            .catch((err) => {
                console.error("Camera error:", err);
                setScanStatus("❌ Unable to start camera");
            });

        return () => {
            codeReader.reset();
            const stream = videoElement.srcObject;
            if (stream) stream.getTracks().forEach((track) => track.stop());
        };
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
            img.style.display = "none";
            document.body.appendChild(img);

            img.onload = async () => {
                try {
                    const reader = new BrowserMultiFormatReader();
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
                    document.body.removeChild(img);
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
                {/* ---------- GENERATOR ---------- */}
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

                {/* ---------- SCANNER ---------- */}

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

                    {scanning && (
                        <div className="scannerContainer">
                            <div className="scannerBox">
                                <video ref={videoRef} className="video" playsInline autoPlay muted />
                            </div>

                            <div className="uploadBelow">
                                <p className="scanStatus">{scanStatus}</p>
                                <label htmlFor="fileUpload" className="uploadBtn">
                                    Choose File / Image
                                </label>
                                <input
                                    id="fileUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileUpload}
                                    className="hiddenFileInput"
                                />
                            </div>
                        </div>
                    )}

                    {/* {!scanning && (
    <p className="scanHint">Click “Start Live Scanner” to begin scanning</p>
  )} */}

                    <h3>Scanned Data:</h3>
                    <div className="inputGroup">
                        <label>Name:</label>
                        <input value={scannedData.name} readOnly className="readOnlyInput" />
                    </div>
                    <div className="inputGroup">
                        <label>Email:</label>
                        <input value={scannedData.email} readOnly className="readOnlyInput" />
                    </div>
                    <div className="inputGroup">
                        <label>Phone:</label>
                        <input value={scannedData.phnNo} readOnly className="readOnlyInput" />
                    </div>
                </div>

            </div>
        </div>
    );
}





// import React, { useRef, useState, useEffect } from "react";
// import QRCode from "react-qr-code";
// import JsBarcode from "jsbarcode";

// import { BrowserMultiFormatReader} from "@zxing/browser";

// import * as ZXingBrowser from "@zxing/browser";
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

//   // ---------- INPUT CHANGE ----------
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setInputData((prev) => ({ ...prev, [name]: value }));
//     setQrValue("");
//     setBarcodeValue("");
//   };

//   // ---------- GENERATE QR ----------
//   const generateQR = () => {
//     if (!inputData.name || !inputData.email || !inputData.phnNo) return;
//     setQrValue(JSON.stringify(inputData));
//   };

//   // ---------- GENERATE BARCODE ----------
//   const generateBarcode = () => {
//     if (!inputData.name || !inputData.email || !inputData.phnNo) return;
//     setBarcodeValue(JSON.stringify(inputData));
//   };

//   // ---------- RENDER BARCODE ----------
//   useEffect(() => {
//     if (barcodeValue && barcodeRef.current) {
//       barcodeRef.current.innerHTML = "";
//       const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//       barcodeRef.current.appendChild(svg);
//       JsBarcode(svg, barcodeValue, {
//         format: "CODE128",
//         width: 1.2,
//         height: 80,
//         displayValue: false,
//         margin: 10,
//         lineColor: "#000",
//         background: "#fff",
//       });
//     }
//   }, [barcodeValue]);

//   // ---------- LIVE CAMERA SCANNER ----------
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
//             } catch (err) {
//               setScannedData({ name: text, email: "", phnNo: "" });
//             }
//             setScanStatus("✅ Scan Successful!");
//           }
//         } else if (err && !(err instanceof NotFoundException)) {
//           console.error(err);
//           setScanStatus("❌ Scanner Error");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         setScanStatus("❌ Unable to start camera");
//       });

//     return () => codeReader.reset();
//   }, [scanning]);

//   // ---------- FILE UPLOAD SCAN ----------
// const handleFileUpload = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;
//   setScanStatus("⏳ Decoding image...");

//   const fileReader = new FileReader();
//   fileReader.onload = async () => {
//     const img = document.createElement("img");
//     img.src = fileReader.result;
//     img.style.display = "none"; // hidden from UI
//     document.body.appendChild(img);

//     img.onload = async () => {
//       try {
//         const reader = new ZXingBrowser.BrowserMultiFormatReader();
//         const result = await reader.decodeFromImageElement(img);
//         const text = result.getText();
//         try {
//           const parsed = JSON.parse(text);
//           setScannedData(parsed);
//           setScanStatus("✅ File decoded successfully!");
//         } catch {
//           setScannedData({ name: text, email: "", phnNo: "" });
//           setScanStatus("✅ File decoded (non-JSON text)");
//         }
//       } catch (err) {
//         console.error("Decode error:", err);
//         setScanStatus("❌ Could not decode image");
//       } finally {
//         document.body.removeChild(img); // clean up
//       }
//     };
//   };
//   fileReader.readAsDataURL(file);
// };


//   // ---------- DOWNLOAD QR ----------
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

//   // ---------- DOWNLOAD BARCODE ----------
//   const downloadBarcode = () => {
//     const canvas = document.createElement("canvas");
//     JsBarcode(canvas, barcodeValue, { format: "CODE128", displayValue: false });
//     const pngUrl = canvas
//       .toDataURL("image/png")
//       .replace("image/png", "image/octet-stream");
//     const link = document.createElement("a");
//     link.href = pngUrl;
//     link.download = "Barcode.png";
//     link.click();
//   };

//   return (
//     <div className="container">
//       <h1>Live QR / Barcode Generator & Scanner</h1>

//       <div className="flexContainer">
//         {/* ---------- GENERATOR SECTION ---------- */}
//         <div className="section">
//           <h2>1️⃣ QR & Barcode Generator</h2>

//           <input
//             name="name"
//             placeholder="Name"
//             value={inputData.name}
//             onChange={handleInputChange}
//             className="input"
//           />
//           <input
//             name="email"
//             placeholder="Email"
//             value={inputData.email}
//             onChange={handleInputChange}
//             className="input"
//           />
//           <input
//             name="phnNo"
//             placeholder="Phone"
//             value={inputData.phnNo}
//             onChange={handleInputChange}
//             className="input"
//           />

//           <div className="buttonRow">
//             <button onClick={generateQR} className="generateButton">
//               Generate QR
//             </button>
//             <button onClick={generateBarcode} className="generateButtonAlt">
//               Generate Barcode
//             </button>
//           </div>

//           <div className="qrAndBarcodeBox">
//             {qrValue && (
//               <div ref={qrRef} className="qrBox">
//                 <QRCode value={qrValue} size={150} />
//                 <button onClick={downloadQR} className="downloadButton">
//                   Download QR
//                 </button>
//               </div>
//             )}
//             {barcodeValue && (
//               <div className="barcodeBox">
//                 <div ref={barcodeRef}></div>
//                 <button onClick={downloadBarcode} className="downloadButton">
//                   Download Barcode
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ---------- SCANNER SECTION ---------- */}
//         <div className="section">
//           <h2>2️⃣ QR / Barcode Scanner</h2>

//           <button
//             onClick={() => {
//               setScanning((prev) => !prev);
//               setScanStatus(scanning ? "Ready to Scan" : "Scanning...");
//               setScannedData(initialDataState);
//             }}
//             className={scanning ? "stopButton" : "scanButton"}
//           >
//             {scanning ? "Stop Scanner" : "Start Live Scanner"}
//           </button>

//           <p className="scanStatus">{scanStatus}</p>

//           {scanning && (
//             <div className="scannerBox">
//               <video ref={videoRef} className="video" />
//             </div>
//           )}

//           <p>or Upload QR/Barcode Image:</p>
//           <input type="file" accept="image/*" onChange={handleFileUpload} />

//           <h3>Scanned Data:</h3>
//           <div className="inputGroup">
//             <label>Name:</label>
//             <input
//               value={scannedData.name}
//               readOnly
//               className="readOnlyInput"
//             />
//           </div>
//           <div className="inputGroup">
//             <label>Email:</label>
//             <input
//               value={scannedData.email}
//               readOnly
//               className="readOnlyInput"
//             />
//           </div>
//           <div className="inputGroup">
//             <label>Phone:</label>
//             <input
//               value={scannedData.phnNo}
//               readOnly
//               className="readOnlyInput"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }