// دریافت آدرس تب فعال
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const url = tabs[0].url;
  const urlDisplay = url.length > 50 ? url.substring(0, 50) + '...' : url;

  document.getElementById('url').textContent = urlDisplay;

  // تولید QR Code
  new QRCode(document.getElementById("qrcode"), {
    text: url,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  // دکمه ذخیره تصویر
  document.getElementById('downloadBtn').addEventListener('click', () => {
    const canvas = document.querySelector('#qrcode canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'amid-qr-code.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
});