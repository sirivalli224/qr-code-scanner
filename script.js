const result = document.querySelector('#result span');

function onScanSuccess(decodedText) {
  result.innerText = decodedText;
}

// Create scanner
const html5QrCode = new Html5Qrcode("reader");

// Use camera
Html5Qrcode.getCameras().then(devices => {
  if (devices.length) {
    html5QrCode.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 250 },
      onScanSuccess
    );
  } else {
    result.innerText = "No camera found.";
  }
}).catch(err => {
  result.innerText = "Camera access error.";
});

// Handle file upload
document.getElementById("qr-input-file").addEventListener("change", e => {
  if (e.target.files.length === 0) return;
  const file = e.target.files[0];

  html5QrCode.scanFile(file, true)
    .then(decodedText => {
      result.innerText = decodedText;
    })
    .catch(err => {
      result.innerText = "Failed to scan image.";
    });
});