import React from "react";
import FormulierGroepItemFout from "./groepItem-fout";
import FormulierGroepItemIcoon from "./groepItem-icoon";
import FormulierGroepItemHelper from "./groepItem-helper";
import { DateInput } from "@blueprintjs/datetime";
import * as datumService from "../../../services/datumService";

const FormulierGroepItemDatumVak = ({
  id,
  waarde,
  inhoudHelper,
  inhoudFout,
  icoon,
  alleenLezen,
  onWaardeGewijzigd,
  onFout,
}) => {
  return (
    // <DateInput
    //   id={id}
    //   value={waarde}
    //   defaultValue={new Date()}
    //   placeholder={"DD/MM/JJJJ"}
    //   disabled={alleenLezen}
    //   formatDate={(date) => datumService.getDatumBelgischeNotatie(date)}
    //   parseDate={(str) => datumService.getDatumVanBelgischeNotatie(str)}
    //   todayButtonText="Vandaag"
    //   outOfRangeMessage="Buiten bereik"
    //   invalidDateMessage="Ongeldige datum"
    //   clearButtonText="Wissen"
    //   onChange={(selectedDate, isUserChange) =>
    //     onWaardeGewijzigd(selectedDate, isUserChange, id)
    //   }
    //   onError={onFout}
    // />

    <div className="bp3-form-content filter-component-item">
      <div className="bp3-input-group">
        {icoon && <FormulierGroepItemIcoon id={id} waarde={icoon} />}
        <DateInput
          id={id}
          value={waarde}
          minDate={datumService.getMinimumDatum(20)}
          placeholder={"DD/MM/JJJJ"}
          disabled={alleenLezen}
          formatDate={(date) => datumService.getDatumBelgischeNotatie(date)}
          parseDate={(str) => datumService.getDatumVanBelgischeNotatie(str)}
          todayButtonText="Vandaag"
          outOfRangeMessage="Buiten bereik"
          invalidDateMessage="Ongeldige datum"
          clearButtonText="Wissen"
          showActionsBar={true}
          onChange={(selectedDate, isUserChange) =>
            onWaardeGewijzigd(selectedDate, isUserChange, id)
          }
          onError={onFout}
          fill={true}
        />
      </div>
      {inhoudHelper && (
        <FormulierGroepItemHelper id={id} inhoud={inhoudHelper} />
      )}
      {inhoudFout && <FormulierGroepItemFout id={id} inhoud={inhoudFout} />}
    </div>
  );
};

export default FormulierGroepItemDatumVak;
