import React from "react";
import FormulierGroepItemLabel from "./groepItem-label";
import FormulierGroepItemTekstvak from "./groepItem-tekstvak";
import Knop from "../knop";

const FormulierGroepTekstvakMetKnop = ({
  id,
  waarde,
  inhoud,
  inhoudKnop,
  inhoudHelper,
  inhoudFout,
  placeholder,
  icoon,
  intentKnop,
  alleenLezen,
  verplicht,
  onWaardeGewijzigd,
  onKlikKnop,
}) => {
  return (
    <div className="formulier-groep-altijdSamen">
      <div className="bp3-form-group">
        <FormulierGroepItemLabel
          id={id}
          inhoud={inhoud}
          inhoudExtraInfo={extraInfo(verplicht)}
        />
        <FormulierGroepItemTekstvak
          id={id}
          waarde={waarde}
          inhoudHelper={inhoudHelper}
          inhoudFout={inhoudFout}
          placeholder={placeholder}
          icoon={icoon}
          alleenLezen={alleenLezen}
          onWaardeGewijzigd={onWaardeGewijzigd}
        />
      </div>
      <div className="formulier-groep-tekstvakKnop-knop">
        <Knop
          id={id + "Knop"}
          inhoud={inhoudKnop}
          intent={intentKnop}
          onKlik={onKlikKnop}
        />
      </div>
    </div>
  );
};

function extraInfo(verplicht) {
  if (verplicht) {
    return "Verplicht";
  }
}

export default FormulierGroepTekstvakMetKnop;
