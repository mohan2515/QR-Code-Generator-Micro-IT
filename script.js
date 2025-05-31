let qr;

function generateQR() {
  const text = document.getElementById("text").value.trim();
  const size = parseInt(document.getElementById("size").value);
  const darkColor = document.getElementById("darkColor").value;
  const lightColor = document.getElementById("lightColor").value;
  const logoFile = document.getElementById("logoInput").files[0];

  if (!text) {
    alert("Please enter text or URL.");
    return;
  }

  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = "";

  let qrOptions = {
    width: size,
    height: size,
    data: text,
    dotsOptions: {
      color: darkColor,
      type: "rounded"
    },
    backgroundOptions: {
      color: lightColor
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5
    }
  };

  qr = new QRCodeStyling(qrOptions);

  if (logoFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      qr.update({
        image: e.target.result
      });
      qr.append(qrContainer);
    };
    reader.readAsDataURL(logoFile);
  } else {
    qr.append(qrContainer);
  }
}

function downloadQR() {
  if (!qr) {
    alert("Generate a QR code first!");
    return;
  }
  qr.download({ name: "custom-qr", extension: "png" });
}
