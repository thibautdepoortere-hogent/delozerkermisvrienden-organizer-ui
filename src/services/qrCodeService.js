import React from "react";
import QRCode from "qrcode.react";
import QrReader from "react-qr-reader"; // 1
// import QrReader from "react-qr-scanner"; //3

const genereerQrCode = (qrCode) => {
  return <QRCode value={qrCode} size={160} />;
};

// 1
//
const genereerQrCodeLezer = (onFout, onScan) => {
  return (
    <QrReader
      delay={300}
      onError={onFout}
      onScan={onScan}
      style={{ width: "100%" }}
    />
  );
};

// 3
//
// const genereerQrCodeLezer = (onFout, onScan, onChooseDeviceId) => {
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

export { genereerQrCode, genereerQrCodeLezer };
