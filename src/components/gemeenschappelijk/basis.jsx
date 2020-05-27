import React, { Component } from "react";
import Titel from "./titel";
import Mededeling from "./mededeling";
import FormulierGroep from "./formulieren/groep";
import FormulierGroepTekstvak from "./formulieren/groepTekstvak";
import FormulierGroepTekstveld from "./formulieren/groepTekstveld";
import FormulierGroepNumeriekVak from "./formulieren/groepNumeriekVak";
import FormulierGroepRadio from "./formulieren/groepRadio";
import FormulierGroepItemCheckbox from "./formulieren/groepItem-checkbox";
import FormulierGroepMobielNummer from "./formulieren/groepMobielNummer";
import * as qrCodeService from "../../services/qrCodeService";

class Basis extends Component {
  state = { inschrijvingsstatusAangevraagdApi: undefined };

  genereerTitel(id, inhoud, niveau, inhoudExtraInfo, tags, acties) {
    return (
      <Titel
        id={id}
        inhoud={inhoud}
        inhoudExtraInfo={inhoudExtraInfo}
        tags={tags}
        acties={acties}
        niveau={niveau ? niveau : 1}
      />
    );
  }

  genereerMededeling(id, titel, inhoud, icoon, intent) {
    return (
      <Mededeling
        id={id}
        titel={titel}
        inhoud={inhoud}
        icoon={icoon}
        intent={intent}
      />
    );
  }

  genereerFormulierGroep(formulierItems) {
    return <FormulierGroep formulierItems={formulierItems} />;
  }

  genereerTekstvak(
    id,
    inhoud,
    inhoudHelper,
    placeholder,
    icoon,
    alleenLezen,
    verplicht,
    specifiekeWaarde,
    specifiekeFout
  ) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepTekstvak
        id={id}
        waarde={specifiekeWaarde ? specifiekeWaarde : data[id] ? data[id] : ""}
        inhoud={inhoud}
        inhoudHelper={inhoudHelper}
        inhoudFout={errors[id] && specifiekeFout ? specifiekeFout : errors[id]}
        placeholder={placeholder}
        icoon={icoon}
        alleenLezen={alleenLezen}
        verplicht={verplicht}
        onWaardeGewijzigd={this.handleWijziging}
      />
    );
  }

  genereerPaswoordTekstvak(
    id,
    inhoud,
    inhoudHelper,
    placeholder,
    icoon,
    alleenLezen,
    verplicht,
    specifiekeWaarde,
    specifiekeFout
  ) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepTekstvak
        id={id}
        waarde={specifiekeWaarde ? specifiekeWaarde : data[id] ? data[id] : ""}
        inhoud={inhoud}
        inhoudHelper={inhoudHelper}
        inhoudFout={errors[id] && specifiekeFout ? specifiekeFout : errors[id]}
        placeholder={placeholder}
        icoon={icoon}
        alleenLezen={alleenLezen}
        verplicht={verplicht}
        onWaardeGewijzigd={this.handleWijziging}
        wachtwoord={true}
      />
    );
  }

  genereerTekstveld(
    id,
    inhoud,
    inhoudHelper,
    placeholder,
    icoon,
    alleenLezen,
    verplicht,
    specifiekeWaarde
  ) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepTekstveld
        id={id}
        waarde={specifiekeWaarde ? specifiekeWaarde : data[id] ? data[id] : ""}
        inhoud={inhoud}
        inhoudHelper={inhoudHelper}
        inhoudFout={errors[id]}
        placeholder={placeholder}
        icoon={icoon}
        alleenLezen={alleenLezen}
        verplicht={verplicht}
        onWaardeGewijzigd={this.handleWijziging}
      />
    );
  }

  genereerNumeriekVak(
    id,
    inhoud,
    inhoudHelper,
    placeholder,
    min,
    max,
    alleenLezen,
    verplicht,
    specifiekeWaarde,
    specifiekeOnWaardeGewijzigd
  ) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepNumeriekVak
        id={id}
        waarde={specifiekeWaarde ? specifiekeWaarde : data[id] ? data[id] : 0}
        inhoud={inhoud}
        inhoudHelper={inhoudHelper}
        inhoudFout={errors[id]}
        placeholder={placeholder}
        min={min}
        max={max}
        alleenLezen={alleenLezen}
        verplicht={verplicht}
        onWaardeGewijzigd={
          specifiekeOnWaardeGewijzigd
            ? specifiekeOnWaardeGewijzigd
            : this.hanldeNummerWijziging
        }
      />
    );
  }

  genereerMobielNummer(
    idPrefix,
    idMobielNummer,
    inhoudHelper,
    alleenLezen,
    verplicht
  ) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepMobielNummer
        id={idMobielNummer}
        idPrefix={idPrefix}
        idMobielNummer={idMobielNummer}
        waardePrefix={data[idPrefix]}
        waardeMobielNummer={data[idMobielNummer]}
        inhoudHelper={inhoudHelper}
        inhoudFout={errors[idPrefix] || errors[idMobielNummer]}
        alleenLezen={alleenLezen}
        verplicht={verplicht}
        onWaardeGewijzigdPrefix={this.handleWijziging}
        onWaardeGewijzigdMobielNummer={this.handleWijziging}
      />
    );
  }

  genereerRadio(id, inhoud, opties, verplicht, extraActie) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepRadio
        id={id}
        inhoud={inhoud}
        waarde={data[id]}
        opties={opties}
        inhoudFout={errors[id]}
        verplicht={verplicht}
        onWaardeGewijzigd={extraActie || this.handleWijziging}
      />
    );
  }

  genereerCheckbox(
    id,
    inhoud,
    inhoudHelper,
    alleenLezen,
    specifiekeWaarde,
    specifiekeActie
  ) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepItemCheckbox
        id={id}
        waarde={specifiekeWaarde ? specifiekeWaarde : data[id]}
        inhoud={inhoud}
        inhoudHelper={inhoudHelper}
        inhoudFout={errors[id]}
        alleenLezen={alleenLezen}
        onWaardeGewijzigd={
          specifiekeActie ? specifiekeActie : this.handleWijziging
        }
      />
    );
  }

  genereerQrCode(qrCode) {
    return <div className="qrCode">{qrCodeService.genereerQrCode(qrCode)}</div>;
  }
}

export default Basis;
