import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { useZxing } from 'react-zxing';

// Define the initial empty state structure
const initialDataState = {
  name: '',
  email: '',
  phnNo: '',
};

function LiveQRCodeGeneratorAndScanner() {
  // State for the QR Code GENERATOR (user inputs)
  const [inputData, setInputData] = useState(initialDataState);
  // State for the QR Code DISPLAY value (stringified JSON)
  const [qrCodeValue, setQrCodeValue] = useState('');
  
  // State for the QR Code SCANNER (results)
  const [scannedData, setScannedData] = useState(initialDataState);
  const [scanning, setScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState('Ready to Scan');

  // --- 1. Generator Logic ---
  
  // Handler for all generator input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear the QR code while the user is typing
    if (qrCodeValue) setQrCodeValue(''); 
  };

  // Handler to generate the QR code
  const handleGenerateQRCode = () => {
    // Basic validation
    if (!inputData.name || !inputData.email || !inputData.phnNo) {
        alert('Please fill in all fields to generate the QR code.');
        return;
    }
    
    // Convert the data object to a JSON string for the QR code
    const value = JSON.stringify(inputData);
    setQrCodeValue(value);
  };
  
  // --- 2. Scanner Logic (useZxing Hook) ---
  const { ref } = useZxing({
  paused: !scanning,
  onDecodeResult(result) {
    const scannedText = result.getText();
    try {
      const parsedData = JSON.parse(scannedText);
      if (parsedData.name && parsedData.email && parsedData.phnNo) {
        setScannedData(parsedData);
        setScanning(false);
        setScanStatus("✅ Scan Successful! Data Loaded.");
      } else {
        setScanStatus("⚠️ Scanned QR is not the expected format.");
      }
    } catch (e) {
      setScanStatus("❌ Scanned code is not valid JSON/data.");
    }
  },
  constraints: {
    video: {
      facingMode: "environment", // <-- instead of deviceId
    },
  },
});

  // --- 3. Render ---
  return (
    <div style={styles.container}>
      <h1>Live QR Code Data System</h1>

      <div style={styles.flexContainer}>
        
        {/* === LEFT SIDE: QR CODE GENERATOR === */}
        <div style={styles.section}>
          <h2>1. Data Entry & QR Generator</h2>
          
          <div style={styles.inputGroup}>
            <label>Name:</label>
            <input 
              name="name" 
              value={inputData.name} 
              onChange={handleInputChange} 
              placeholder="Enter name"
              style={styles.input}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label>Email:</label>
            <input 
              name="email" 
              value={inputData.email} 
              onChange={handleInputChange} 
              placeholder="Enter email"
              style={styles.input}
            />
          </div>
          
          <div style={styles.inputGroup}>
            <label>Phone Number:</label>
            <input 
              name="phnNo" // IMPORTANT: Must match the key in your object structure
              value={inputData.phnNo} 
              onChange={handleInputChange} 
              placeholder="Enter phone number"
              style={styles.input}
            />
          </div>

          <button 
            onClick={handleGenerateQRCode}
            style={styles.generateButton}
            disabled={!inputData.name || !inputData.email || !inputData.phnNo}
          >
            Generate QR Code
          </button>
          
          {qrCodeValue && (
            <div style={styles.qrCodeBox}>
              <h3>Generated QR Code</h3>
              <QRCode 
                value={qrCodeValue} 
                size={200} 
                level="H" 
              />
              <p style={styles.tip}>Scan this code on any device!</p>
            </div>
          )}
        </div>

        {/* === RIGHT SIDE: QR CODE SCANNER === */}
        <div style={styles.section}>
          <h2>2. Scan Data (To Input Fields)</h2>
          
          <button 
            onClick={() => {
                setScanning(prev => !prev);
                setScanStatus(scanning ? 'Ready to Scan' : 'Scanning...');
                setScannedData(initialDataState); // Clear previous scan results
            }} 
            style={scanning ? styles.stopButton : styles.scanButton}
          >
            {scanning ? 'Stop Scanner' : 'Start Scanner'}
          </button>

          {/* Scanner Video Feed */}
          {scanning && (
            <div style={styles.scannerBox}>
              <video ref={ref} style={styles.video} />
            </div>
          )}
          
          <p style={styles.scanStatus}>{scanStatus}</p>

          <hr style={{ margin: '30px 0' }} />
          
          <h3>Scanned Results</h3>
          <div style={styles.inputGroup}>
            <label>Name:</label>
            <input value={scannedData.name} readOnly style={styles.readOnlyInput} placeholder="Scanned Name" />
          </div>
          <div style={styles.inputGroup}>
            <label>Email:</label>
            <input value={scannedData.email} readOnly style={styles.readOnlyInput} placeholder="Scanned Email" />
          </div>
          <div style={styles.inputGroup}>
            <label>Phone Number:</label>
            <input value={scannedData.phnNo} readOnly style={styles.readOnlyInput} placeholder="Scanned Phone" />
          </div>
        </div>
        
      </div>
    </div>
  );
}

// Basic CSS Styles
const styles = {
  container: {
    padding: '40px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    gap: '40px',
    marginTop: '30px',
    flexWrap: 'wrap',              // allow wrapping
  },
  section: {
    border: '1px solid #ddd',
    padding: '30px',
    borderRadius: '8px',
    flex: 1,
    minWidth: '280px',             // prevents squishing too much
    maxWidth: '500px',
    textAlign: 'left',
  },
  inputGroup: { marginBottom: '15px' },
  input: {
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginTop: '5px',
  },
  readOnlyInput: {
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    border: '1px solid #007bff',
    borderRadius: '4px',
    marginTop: '5px',
    backgroundColor: '#e9f7ff',
    fontWeight: 'bold',
  },
  generateButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginTop: '10px',
  },
  qrCodeBox: {
    marginTop: '30px',
    textAlign: 'center',
    border: '1px dashed #ccc',
    padding: '20px',
    borderRadius: '4px',
  },
  tip: { fontSize: '0.8em', color: '#666', marginTop: '10px' },
  scanButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginBottom: '15px',
  },
  stopButton: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginBottom: '15px',
  },
  scannerBox: {
    width: '100%',
    height: '300px',
    overflow: 'hidden',
    margin: '0 auto',
    border: '3px solid #007bff',
  },
  video: { width: '100%', height: '100%', objectFit: 'cover' },
  scanStatus: { marginTop: '10px', fontWeight: 'bold' },
};


export default LiveQRCodeGeneratorAndScanner;


// import React, { useState, useMemo } from 'react';
// import QRCode from 'react-qr-code';
// import { useZxing } from 'react-zxing'; // Modern alternative for scanning

// // --- Data Structure ---
// export const QRCodeData = {
//   slides: [
//     {
//       name: 'Anupama Menon',
//       email: 'anupama.menon@example.com',
//       phnNo: '987-654-3210',
//     },
//      {
//       name: 'Anujjjewjwejk',
//       email: 'anupama.menon@example.com',
//       phnNo: '987-654-3210',
//     },
//     //
//      {
//       name: 'Anuuuuuuuuu',
//       email: 'anupama.menon@example.com',
//       phnNo: '987-654-3210',
//     },
//     //
//      {
//       name: 'Ammuuuu',
//       email: 'anupama.menon@example.com',
//       phnNo: '987-654-3210',
//     },
//     //
//     // You can add more slides/objects here if needed,
//     // but we'll use the first one for the QR code value.
//   ],
// };

// // 1. Prepare the Data to be Encoded
// // We take the first object from the 'slides' array
// const dataToEncode = QRCodeData.slides[0];

// // Convert the structured object to a JSON string
// const qrCodeValue = JSON.stringify(dataToEncode);
// // --- End Data Structure ---


// function QRCodeApp() {
//   const [scannedData, setScannedData] = useState({
//     name: '',
//     email: '',
//     phnNo: '', // Match the key from your data structure
//   });
//   const [scanning, setScanning] = useState(false);
//   const [scanStatus, setScanStatus] = useState('Ready to Scan');

//   // 2. QR Code Scanning Logic (using useZxing hook)
//   const { ref } = useZxing({
//     // Only run the scanner if 'scanning' state is true
//     paused: !scanning, 
//     // This function is called when a QR code is successfully read
//     onDecodeResult(result) {
//       const scannedText = result.getText();
//       try {
//         const parsedData = JSON.parse(scannedText);
        
//         // Ensure the parsed data has the expected keys
//         if (parsedData.name && parsedData.email && parsedData.phnNo) {
//           setScannedData(parsedData);
//           setScanning(false); // Stop scanning on successful read
//           setScanStatus('✅ Scan Successful! Data Loaded.');
//         } else {
//           setScanStatus('⚠️ Scanned data is not the expected format.');
//         }
//       } catch (e) {
//         setScanStatus('❌ Scanned code is not valid JSON data.');
//         console.error('JSON Parse Error:', e);
//       }
//     },
//     // Use the back camera (better for mobile scanning)
//     deviceId: 'environment', 
//   });


//   // 3. Input Fields Component (Memoized for performance)
//   const InputFields = useMemo(() => (
//     <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
//       <label>Name:</label>
//       <input
//         type="text"
//         value={scannedData.name}
//         placeholder="Name"
//         readOnly
//         style={{ padding: '8px', border: '1px solid #ccc' }}
//       />
//       <label>Email:</label>
//       <input
//         type="email"
//         value={scannedData.email}
//         placeholder="Email"
//         readOnly
//         style={{ padding: '8px', border: '1px solid #ccc' }}
//       />
//       <label>Phone Number:</label>
//       <input
//         type="tel"
//         value={scannedData.phnNo}
//         placeholder="Phone Number"
//         readOnly
//         style={{ padding: '8px', border: '1px solid #ccc' }}
//       />
//     </div>
//   ), [scannedData]);


//   return (
//     <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
//       <h1>QR Data Encoding & Decoding</h1>

//       <div style={{ display: 'flex', justifyContent: 'space-around', margin: '30px 0' }}>

//         {/* --- QR Code Generator Section --- */}
//         <div style={sectionStyle}>
//           <h2>1. Generate QR Code</h2>
//           <p style={{marginBottom: '20px', fontSize: '0.9em'}}>
//             Encoded data (JSON string): 
//             <br />
//             <code style={{fontSize: '0.8em', background: '#eee', padding: '2px 4px', borderRadius: '3px'}}>
//                 {qrCodeValue.substring(0, 35)}...
//             </code>
//           </p>
//           <div style={{ padding: '10px', background: 'white', display: 'inline-block' }}>
//             <QRCode value={qrCodeValue} size={256} level="H" />
//           </div>
//         </div>
        
//         {/* --- QR Code Scanner and Input Section --- */}
//         <div style={sectionStyle}>
//           <h2>2. Scan and Populate Data</h2>
          
//           <button 
//             onClick={() => {
//                 setScanning(prev => !prev);
//                 setScanStatus(scanning ? 'Ready to Scan' : 'Scanning...');
//             }} 
//             style={buttonStyle}
//           >
//             {scanning ? 'Stop Scanning' : 'Start QR Scanner'}
//           </button>
          
//           {/* Scanner Video Feed */}
//           {scanning && (
//             <div style={{ width: '300px', height: '200px', margin: '15px auto 10px', overflow: 'hidden', border: '2px solid #007bff' }}>
//               <video ref={ref} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//             </div>
//           )}
          
//           <p style={{ color: scanning ? 'blue' : scannedData.name ? 'green' : 'black' }}>
//             {scanStatus}
//           </p>

//           <hr style={{ margin: '30px 0' }} />
          
//           <h3>Scanned Data Inputs</h3>
//           {InputFields}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Basic Inline Styles
// const sectionStyle = {
//     border: '1px solid #ddd', 
//     padding: '30px', 
//     borderRadius: '8px', 
//     maxWidth: '45%',
//     boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
// };

// const buttonStyle = {
//     padding: '10px 20px', 
//     fontSize: '16px', 
//     cursor: 'pointer', 
//     backgroundColor: '#007bff', 
//     color: 'white', 
//     border: 'none', 
//     borderRadius: '5px'
// };

// export default QRCodeApp;