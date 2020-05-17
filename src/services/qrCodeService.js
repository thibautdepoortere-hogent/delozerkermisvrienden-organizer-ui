import React from "react";
import QRCode from "qrcode.react";
import QrReader from "react-qr-reader";

const genereerQrCode = (qrCode) => {
  return <QRCode value={qrCode} size={160} />;
};

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

export { genereerQrCode, genereerQrCodeLezer };
