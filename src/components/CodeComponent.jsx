
import React, { useRef, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import JsBarcode from "jsbarcode";
import { Html5Qrcode } from "html5-qrcode";
import Quagga from "@ericblade/quagga2";

const CodeComponent = () => {
  const [tab, setTab] = useState("generate");
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [generated, setGenerated] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const barcodeRef = useRef(null);
  // const encodedData = JSON.stringify(form);
  // Compact encoding for barcode
  const encodedData = `${form.name}|${form.email}|${form.phone}`;



  // ✅ Run JsBarcode whenever "generated" becomes true
  useEffect(() => {
    if (generated && barcodeRef.current) {
      try {
        const encodedData = `${form.name}|${form.email}|${form.phone}`;
        console.log("Encoded barcode data:", encodedData); // 👀 check console

        JsBarcode(barcodeRef.current, encodedData, {
          format: "CODE128",
          lineColor: "#000000",
          width: 2,
          height: 60,
          displayValue: false,
        });
      } catch (err) {
        console.error("Barcode generation error:", err);
      }
    }
  }, [generated, form]);



  const handleGenerate = () => {
    if (!form.phone) {
      alert("Please enter a phone number first!");
      return;
    }
    setGenerated(true);
  };

  const downloadQRCode = () => {
    const svg = document.getElementById("qrcode");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const padding = 30;
      const titleHeight = 40;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2 + titleHeight;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText("QR Code", canvas.width / 2, 25);

      ctx.drawImage(img, padding, titleHeight, img.width, img.height);

      const pngFile = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = pngFile;
      link.download = "qrcode.png";
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };


const downloadBarcode = () => {
  if (!form.phone) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Temporary canvas for JsBarcode
  const tempCanvas = document.createElement("canvas");

  // Encode full data for barcode (but we will not draw decoded values)
  const encodedData = `${form.name}|${form.email}|${form.phone}`;
  JsBarcode(tempCanvas, encodedData, { format: "CODE128", displayValue: false });

  const padding = 30;
  const titleHeight = 40; // optional title above barcode

  canvas.width = tempCanvas.width + padding * 2;
  canvas.height = tempCanvas.height + padding * 2 + titleHeight;

  // White background
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Optional title
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Barcode (Code128)", canvas.width / 2, 25); // title only, no scanned data

  // Draw the barcode
  ctx.drawImage(tempCanvas, padding, titleHeight);

  // Download the image
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "barcode.png";
  link.click();
};


  const startQRScanner = async () => {
    setScanResult("");
    const html5QrCode = new Html5Qrcode("reader");
    try {
      await html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          setScanResult("QR Code: " + decodedText);
          html5QrCode.stop();
          document.getElementById("reader").innerHTML = "";
        },
        (err) => console.warn("QR scanning error:", err)
      );
    } catch (err) {
      setScanResult("QR Scan Error: " + err.message);
    }
  };

  const startBarcodeScanner = () => {
    setScanResult("");
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: document.querySelector("#reader"),
          constraints: { facingMode: "environment" },
        },
        decoder: { readers: ["code_128_reader"] },
      },
      (err) => {
        if (err) {
          console.error("Quagga init error:", err);
          return;
        }
        Quagga.start();
      }
    );

  Quagga.onDetected((data) => {
  if (data && data.codeResult && data.codeResult.code) {
    const code = data.codeResult.code.trim();
    console.log("Decoded barcode text:", code); // ✅ confirms full data

    const parts = code.split("|");

    if (parts.length === 3) {
      const [name, email, phone] = parts.map((v) => v.trim());
      const decodedText = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`;
      console.log("Setting scanResult:", decodedText); // ✅ check this
      setScanResult(decodedText);
    } else {
      setScanResult(`Barcode Raw: ${code}`);
    }

    Quagga.stop();
    Quagga.offDetected();
  }
});



  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("reader");
    try {
      const result = await html5QrCode.scanFile(file, true);
      console.log("QR file decoded:", result);
      setScanResult( result);

    } catch (err) {
      setScanResult("File Scan failed: " + err);
    }
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-6">
          Code Utility: Generator & Scanner
        </h1>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            className={`flex-1 p-3 rounded-l-lg font-semibold ${tab === "generate"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700"
              }`}
            onClick={() => setTab("generate")}
          >
            Generate Codes
          </button>
          <button
            className={`flex-1 p-3 rounded-r-lg font-semibold ${tab === "scan"
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700"
              }`}
            onClick={() => setTab("scan")}
          >
            Scan Codes
          </button>
        </div>

        {/* Generate Section */}
        {tab === "generate" && (
          <div>
            <input
              className="w-full p-2 mb-3 border rounded"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="w-full p-2 mb-3 border rounded"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              className="w-full p-2 mb-3 border rounded"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <button
              onClick={handleGenerate}
              className="bg-purple-600 text-white w-full py-2 rounded-lg font-semibold hover:bg-purple-700"
            >
              Generate Codes
            </button>

            {generated && (
              <div className="mt-6 p-4 border rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Generated Codes</h2>
                <div className="flex justify-around items-center">
                  {/* QR Code */}
                  <div className="text-center">
                    <p className="text-purple-600 font-medium mb-2">QR Code</p>
                    {/* <QRCode id="qrcode" value={JSON.stringify(form)} size={128} /> */}
                    <QRCode id="qrcode" value={encodedData} size={128} />
                    <button
                      onClick={downloadQRCode}
                      className="mt-2 text-sm text-blue-600 underline"
                    >
                      Download
                    </button>
                  </div>

                  {/* Barcode */}
                  <div className="text-center">
                    <p className="text-purple-600 font-medium mb-2">
                      Barcode (Code128)
                    </p>
                    <svg ref={barcodeRef}></svg>
                    <button
                      onClick={downloadBarcode}
                      className="mt-2 text-sm text-blue-600 underline"
                    >
                      Download
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Scanner Section */}
        {tab === "scan" && (
          <div className="text-center">
            <div className="flex justify-center gap-4 mb-4">
              <button
                onClick={startQRScanner}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg"
              >
                Start QR Scanner
              </button>
              <button
                onClick={startBarcodeScanner}
                className="bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Start Barcode Scanner
              </button>
            </div>

            <div id="reader" className="mt-4"></div>

            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="mt-2"
              />
            </div>

            {scanResult && (
              <div className="mt-4 p-2 border rounded bg-gray-100 whitespace-pre-line">
                <p className="font-semibold mb-1">Scanned Result:</p>
                {(() => {
                  try {
                    const parts = scanResult.split("|");
                    if (parts.length === 3) {
                      const [name, email, phone] = parts;
                      return (
                        <ul className="list-disc pl-6">
                          <li><strong>Name:</strong> {name}</li>
                          <li><strong>Email:</strong> {email}</li>
                          <li><strong>Phone:</strong> {phone}</li>
                        </ul>
                      );
                    }
                    return <p>{scanResult}</p>;
                  } catch {
                    return <p>{scanResult}</p>;
                  }

                })()}
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default CodeComponent;


