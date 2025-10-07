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
                width: .2,
                height: 85,
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
        const qrImg = new Image();
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const svgUrl = URL.createObjectURL(svgBlob);

        const titlePrefix = "MyApp"; // pattern title
        const userName = inputData.name ? inputData.name.replace(/\s+/g, "_") : "User";
        const fileName = `${titlePrefix}_QR_${userName}.png`;

        qrImg.onload = () => {
            const qrWidth = qrImg.width;
            const qrHeight = qrImg.height;
            const padding = 40;
            const titleHeight = 50;
            const descHeight = 80;
            const contentGap = 20;

            // increased height for proper spacing
            const width = qrWidth + padding * 2;
            const height = qrHeight + titleHeight + descHeight + contentGap + 60;

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height;

            // Background
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, width, height);

            // Title
            ctx.fillStyle = "#000";
            ctx.font = "bold 20px Arial";
            ctx.textAlign = "center";
            ctx.fillText(`${titlePrefix} QR Code`, width / 2, 40);

            // Draw QR centered
            const x = (width - qrWidth) / 2;
            const y = 60;
            ctx.drawImage(qrImg, x, y, qrWidth, qrHeight);

            // Description text
            const description = "Description: This QR code contains user details.";
            ctx.font = "16px Arial";
            ctx.fillStyle = "#000";
            ctx.textAlign = "center";

            const maxWidth = width - 40;
            const words = description.split(" ");
            let line = "";
            let lineHeight = 22;
            let textY = y + qrHeight + 50; // add extra space below QR

            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + " ";
                const testWidth = ctx.measureText(testLine).width;
                if (testWidth > maxWidth && n > 0) {
                    ctx.fillText(line, width / 2, textY);
                    line = words[n] + " ";
                    textY += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, width / 2, textY);

            // Download the file
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = fileName;
            link.click();

            URL.revokeObjectURL(svgUrl);
        };

        qrImg.src = svgUrl;
    };

    // ---------- DOWNLOAD BARCODE ----------
    const downloadBarcode = () => {
        const titlePrefix = "MyApp";
        const userName = inputData.name ? inputData.name.replace(/\s+/g, "_") : "User";
        const fileName = `${titlePrefix}_Barcode_${userName}.png`;

        // Fixed barcode dimensions (same as display)
        const barcodeWidth = 200;
        const barcodeHeight = 80;

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = barcodeWidth;
        tempCanvas.height = barcodeHeight;

        JsBarcode(tempCanvas, barcodeValue, {
            format: "CODE128",
            displayValue: false,
            lineColor: "#000",
            background: "#fff",
            width: 1.2,
            height: barcodeHeight,
            margin: 0,
        });

        const barcodeImg = new Image();
        barcodeImg.src = tempCanvas.toDataURL("image/png");

        barcodeImg.onload = () => {
            const padding = 30;
            const titleHeight = 40;
            const descHeight = 60;
            const contentGap = 20;

            // Add extra height for visible description
            const width = barcodeWidth + padding * 2;
            const height = barcodeHeight + titleHeight + descHeight + contentGap + 60;

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = width;
            canvas.height = height;

            // Background
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, width, height);

            // Title
            ctx.fillStyle = "#000";
            ctx.font = "bold 20px Arial";
            ctx.textAlign = "center";
            ctx.fillText(`${titlePrefix} Barcode`, width / 2, 40);

            // Draw barcode (centered)
            const x = (width - barcodeWidth) / 2;
            const y = 70;
            ctx.drawImage(barcodeImg, x, y, barcodeWidth, barcodeHeight);

            // Description text wrapping logic
            const description = "Description: This barcode encodes user details.";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.fillStyle = "#000";

            const maxWidth = width - 40;
            const words = description.split(" ");
            let line = "";
            let lineHeight = 22;
            let textY = y + barcodeHeight + 50; // more gap below barcode

            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + " ";
                const testWidth = ctx.measureText(testLine).width;
                if (testWidth > maxWidth && n > 0) {
                    ctx.fillText(line, width / 2, textY);
                    line = words[n] + " ";
                    textY += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, width / 2, textY);

            // Download
            const pngUrl = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream");
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = fileName;
            link.click();
        };
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
// import { BrowserMultiFormatReader } from "@zxing/browser";
// import { NotFoundException } from "@zxing/library";
// import "../styles/QRBarcodeApp.scss";

// const initialDataState = { name: "", email: "", phnNo: "" };

// export default function QRBarcodeApp() {
//     const [inputData, setInputData] = useState(initialDataState);
//     const [qrValue, setQrValue] = useState("");
//     const [barcodeValue, setBarcodeValue] = useState("");
//     const [scannedData, setScannedData] = useState(initialDataState);
//     const [scanning, setScanning] = useState(false);
//     const [scanStatus, setScanStatus] = useState("Ready to Scan");

//     const videoRef = useRef(null);
//     const barcodeRef = useRef(null);
//     const qrRef = useRef(null);
//     const codeReaderRef = useRef(null);

//     // ---------- INPUT CHANGE ----------
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setInputData((prev) => ({ ...prev, [name]: value }));
//         setQrValue("");
//         setBarcodeValue("");
//     };

//     // ---------- GENERATE QR ----------
//     const generateQR = () => {
//         if (!inputData.name || !inputData.email || !inputData.phnNo) return;
//         setQrValue(JSON.stringify(inputData));
//     };

//     // ---------- GENERATE BARCODE ----------
//     const generateBarcode = () => {
//         if (!inputData.name || !inputData.email || !inputData.phnNo) return;
//         setBarcodeValue(JSON.stringify(inputData));
//     };

//     // ---------- RENDER BARCODE ----------
//     useEffect(() => {
//         if (barcodeValue && barcodeRef.current) {
//             barcodeRef.current.innerHTML = "";
//             const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//             barcodeRef.current.appendChild(svg);
//             JsBarcode(svg, barcodeValue, {
//                 format: "CODE128",
//                 width: .2,
//                 height: 85,
//                 displayValue: false,
//                 margin: 10,
//                 lineColor: "#000",
//                 background: "#fff",
//             });
//         }
//     }, [barcodeValue]);

//     // ---------- LIVE CAMERA SCANNER ----------
//     useEffect(() => {
//         if (!scanning) {
//             if (codeReaderRef.current) codeReaderRef.current.reset();
//             setScanStatus("Ready to Scan");
//             return;
//         }

//         const codeReader = new BrowserMultiFormatReader();
//         codeReaderRef.current = codeReader;

//         const videoElement = videoRef.current;
//         let lastResult = "";

//         navigator.mediaDevices
//             .getUserMedia({ video: { facingMode: "environment" } })
//             .then((stream) => {
//                 videoElement.srcObject = stream;
//                 videoElement.play();

//                 codeReader.decodeFromVideoDevice(null, videoElement, (result, err) => {
//                     if (result) {
//                         const text = result.getText();
//                         if (text !== lastResult) {
//                             lastResult = text;
//                             try {
//                                 const parsed = JSON.parse(text);
//                                 setScannedData(parsed);
//                             } catch {
//                                 setScannedData({ name: text, email: "", phnNo: "" });
//                             }
//                             setScanStatus("✅ Scan Successful!");
//                         }
//                     } else if (err && !(err instanceof NotFoundException)) {
//                         console.error(err);
//                         setScanStatus("❌ Scanner Error");
//                     }
//                 });
//             })
//             .catch((err) => {
//                 console.error("Camera error:", err);
//                 setScanStatus("❌ Unable to start camera");
//             });

//         return () => {
//             codeReader.reset();
//             const stream = videoElement.srcObject;
//             if (stream) stream.getTracks().forEach((track) => track.stop());
//         };
//     }, [scanning]);

//     // ---------- FILE UPLOAD SCAN ----------
//     const handleFileUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;
//         setScanStatus("⏳ Decoding image...");

//         const fileReader = new FileReader();
//         fileReader.onload = async () => {
//             const img = document.createElement("img");
//             img.src = fileReader.result;
//             img.style.display = "none";
//             document.body.appendChild(img);

//             img.onload = async () => {
//                 try {
//                     const reader = new BrowserMultiFormatReader();
//                     const result = await reader.decodeFromImageElement(img);
//                     const text = result.getText();
//                     try {
//                         const parsed = JSON.parse(text);
//                         setScannedData(parsed);
//                         setScanStatus("✅ File decoded successfully!");
//                     } catch {
//                         setScannedData({ name: text, email: "", phnNo: "" });
//                         setScanStatus("✅ File decoded (non-JSON text)");
//                     }
//                 } catch (err) {
//                     console.error("Decode error:", err);
//                     setScanStatus("❌ Could not decode image");
//                 } finally {
//                     document.body.removeChild(img);
//                 }
//             };
//         };
//         fileReader.readAsDataURL(file);
//     };

//     // // ---------- DOWNLOAD QR ----------
//     // const downloadQR = () => {
//     //     const svg = qrRef.current.querySelector("svg");
//     //     const svgData = new XMLSerializer().serializeToString(svg);
//     //     const canvas = document.createElement("canvas");
//     //     const ctx = canvas.getContext("2d");
//     //     const img = new Image();
//     //     const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
//     //     const url = URL.createObjectURL(blob);

//     //     // pattern-based title for all downloads
//     //     const titlePrefix = "MyApp"; // ← change this pattern name as you wish
//     //     const userName = inputData.name ? inputData.name.replace(/\s+/g, "_") : "User";
//     //     const fileName = `${titlePrefix}_QR_${userName}.png`;

//     //     img.onload = () => {
//     //         canvas.width = img.width * 2;
//     //         canvas.height = img.height * 2;
//     //         ctx.scale(2, 2);
//     //         ctx.drawImage(img, 0, 0);
//     //         URL.revokeObjectURL(url);
//     //         const pngUrl = canvas
//     //             .toDataURL("image/png")
//     //             .replace("image/png", "image/octet-stream");
//     //         const link = document.createElement("a");
//     //         link.href = pngUrl;
//     //         link.download = fileName;
//     //         link.click();
//     //     };
//     //     img.src = url;
//     // };

//     // // ---------- DOWNLOAD BARCODE ----------
//     // const downloadBarcode = () => {
//     //     const canvas = document.createElement("canvas");
//     //     JsBarcode(canvas, barcodeValue, { format: "CODE128", displayValue: false });

//     //     // same pattern naming for barcode files
//     //     const titlePrefix = "MyApp";
//     //     const userName = inputData.name ? inputData.name.replace(/\s+/g, "_") : "User";
//     //     const fileName = `${titlePrefix}_Barcode_${userName}.png`;

//     //     const pngUrl = canvas
//     //         .toDataURL("image/png")
//     //         .replace("image/png", "image/octet-stream");
//     //     const link = document.createElement("a");
//     //     link.href = pngUrl;
//     //     link.download = fileName;
//     //     link.click();
//     // };

//     // ---------- DOWNLOAD QR ----------
//     const downloadQR = () => {
//         const svg = qrRef.current.querySelector("svg");
//         const svgData = new XMLSerializer().serializeToString(svg);
//         const qrImg = new Image();
//         const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
//         const svgUrl = URL.createObjectURL(svgBlob);

//         const titlePrefix = "MyApp"; // pattern name
//         const userName = inputData.name ? inputData.name.replace(/\s+/g, "_") : "User";
//         const fileName = `${titlePrefix}_QR_${userName}.png`;

//         qrImg.onload = () => {
//             const canvas = document.createElement("canvas");
//             const ctx = canvas.getContext("2d");

//             // Canvas size (extra space for title and description)
//             const width = qrImg.width + 60;
//             const height = qrImg.height + 160;
//             canvas.width = width;
//             canvas.height = height;

//             // Background
//             ctx.fillStyle = "#fff";
//             ctx.fillRect(0, 0, width, height);

//             // Title
//             ctx.fillStyle = "#000";
//             ctx.font = "bold 20px Arial";
//             ctx.textAlign = "center";
//             ctx.fillText(`${titlePrefix} QR Code`, width / 2, 40);

//             // Draw QR
//             ctx.drawImage(qrImg, (width - qrImg.width) / 2, 60);

//             // Description
//             ctx.font = "16px Arial";
//             ctx.fillText("Description: This QR code contains user details.", width / 2, height - 40);

//             // Download
//             const pngUrl = canvas
//                 .toDataURL("image/png")
//                 .replace("image/png", "image/octet-stream");
//             const link = document.createElement("a");
//             link.href = pngUrl;
//             link.download = fileName;
//             link.click();

//             URL.revokeObjectURL(svgUrl);
//         };

//         qrImg.src = svgUrl;
//     };

//     // ---------- DOWNLOAD BARCODE ----------
//     const downloadBarcode = () => {
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");

//         const titlePrefix = "MyApp"; // same pattern
//         const userName = inputData.name ? inputData.name.replace(/\s+/g, "_") : "User";
//         const fileName = `${titlePrefix}_Barcode_${userName}.png`;

//         // Temporary barcode render
//         const tempCanvas = document.createElement("canvas");
//         JsBarcode(tempCanvas, barcodeValue, { format: "CODE128", displayValue: false });
//         const barcodeImg = new Image();
//         barcodeImg.src = tempCanvas.toDataURL("image/png");

//         barcodeImg.onload = () => {
//             const width = barcodeImg.width + 60;
//             const height = barcodeImg.height + 160;
//             canvas.width = width;
//             canvas.height = height;

//             // Background
//             ctx.fillStyle = "#fff";
//             ctx.fillRect(0, 0, width, height);

//             // Title
//             ctx.fillStyle = "#000";
//             ctx.font = "bold 20px Arial";
//             ctx.textAlign = "center";
//             ctx.fillText(`${titlePrefix} Barcode`, width / 2, 40);

//             // Draw Barcode
//             ctx.drawImage(barcodeImg, (width - barcodeImg.width) / 2, 60);

//             // Description
//             ctx.font = "16px Arial";
//             ctx.fillText("Description: This barcode encodes user details.", width / 2, height - 40);

//             // Download
//             const pngUrl = canvas
//                 .toDataURL("image/png")
//                 .replace("image/png", "image/octet-stream");
//             const link = document.createElement("a");
//             link.href = pngUrl;
//             link.download = fileName;
//             link.click();
//         };
//     };