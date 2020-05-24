import React from "react";
import { Tag } from "@blueprintjs/core";

const Etiket = ({ id, inhoud, icoon, intent, alleenLezen }) => {
  return (
    <div className="knop-vullen">
      <Tag
        id={id}
        active={!alleenLezen}
        icon={icoon}
        intent={intent}
        minimal={true}
      >
        {inhoud}
      </Tag>
    </div>
  );
};

export default Etiket;
