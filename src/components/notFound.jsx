import React from "react";
import { Card, Elevation } from "@blueprintjs/core";

const NotFound = () => {
  return (
    <Card className="card" elevation={Elevation.TWO}>
      <h1>404 - Not Found</h1>
      <p>De opgegeven pagina kon niet gevonden worden.</p>
    </Card>
  );
};

export default NotFound;
