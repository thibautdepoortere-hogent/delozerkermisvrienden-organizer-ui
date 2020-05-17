import React from "react";
import QRCode from "qrcode.react";

const getQrCode = (qrCode) => {
  return <QRCode value={qrCode} size={160} />;
};

export { getQrCode };
