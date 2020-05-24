import React from "react";
import QRCode from "qrcode.react";
import QrReader from "react-qr-reader"; // 1
// import QrReader from "react-qr-scanner"; //2

export function genereerQrCode(qrCode) {
  return <QRCode value={qrCode} size={160} />;
}

// 1
//
export function genereerQrCodeLezer(onFout, onScan) {
  return (
    <QrReader
      delay={300}
      onError={onFout}
      onScan={onScan}
      style={{ width: "100%" }}
    />
  );
}

// 2
//
// export function genereerQrCodeLezer (onFout, onScan, onChooseDeviceId) {
//   return (
//     <QrReader
//       delay={300}
//       onError={onFout}
//       onScan={onScan}
//       style={{ width: "100%" }}
//       // facingMode={facingMode}
//       chooseDeviceId={onChooseDeviceId}
//     />
//   );
// };
