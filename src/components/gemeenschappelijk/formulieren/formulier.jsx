import React, { Component } from "react";
import Joi from "joi-browser";
import { Spinner } from "@blueprintjs/core";
import FormulierGroep from "./groep";
import FormulierGroepRadio from "./groepRadio";
import FormulierGroepTekstvak from "./groepTekstvak";
import FormulierGroepTekstveld from "./groepTekstveld";
import FormulierGroepNumeriekVak from "./groepNumeriekVak";
import FormulierGroepMobielNummer from "./groepMobielNummer";
import Mededeling from "./../mededeling";
import Knop from "./../knop";
import Titel from "../titel";

class Formulier extends Component {
  state = { data: {}, errors: {} };

  valideer = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) {
      return null;
    }

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validatieEigenschap = ({ id, value }) => {
    const obj = { [id]: value };
    const schema = { [id]: this.schema[id] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleWijziging = ({ currentTarget: invoer }) => {
    this.updateData(invoer);
  };

  hanldeNummerWijziging = (waardeAlsNummer, waardeAlsTekst, invoer) => {
    this.updateData(invoer);
  };

  updateData(invoer) {
    const errors = { ...this.state.errors };
    const errorBericht = this.validatieEigenschap(invoer);
    if (errorBericht) {
      errors[invoer.id] = errorBericht;
    } else {
      delete errors[invoer.id];
    }

    const data = { ...this.state.data };
    data[invoer.id] = invoer.value;
    this.setState({ data: data, errors: errors });
  }

  handleVerzendFormulier = (e) => {
    e.preventDefault();

    const errors = this.valideer();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }

    this.verzendFormulier();
  };

  geneerTitel(id, inhoud, inhoudExtraInfo, acties) {
    return (
      <Titel
        id={id}
        inhoud={inhoud}
        inhoudExtraInfo={inhoudExtraInfo}
        acties={acties}
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
    specifiekeWaarde
  ) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepTekstvak
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

  genereerRadio(id, inhoud, opties, verplicht) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepRadio
        id={id}
        inhoud={inhoud}
        waarde={data[id]}
        opties={opties}
        inhoudFout={errors[id]}
        verplicht={verplicht}
        onWaardeGewijzigd={this.handleWijziging}
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

  genereerVerzendKnop(inhoud) {
    return (
      <Knop
        id="verzendKnop"
        inhoud={inhoud}
        intent="success"
        alleenLezen={this.valideer()}
      />
    );
  }

  genereerSpinner() {
    return <Spinner intent="success" size="30" />;
  }

  genereerVerzendKnopMetAttributen(
    waardeOpdrachtNietVerwerkt,
    waardeOpdrachtVerwerken,
    inhoudVerzendKnop,
    titelFoutmeldingIndienenFormulier,
    inhoudFoutmeldingIndienenFormulier
  ) {
    return (
      <div>
        <div className="belangrijkeMededeling-AanvraagNietIngediend">
          {waardeOpdrachtNietVerwerkt &&
            this.genereerMededeling(
              titelFoutmeldingIndienenFormulier,
              inhoudFoutmeldingIndienenFormulier,
              "Danger"
            )}
        </div>
        <div className="formulier-groep-altijdSamen">
          {this.genereerVerzendKnop(inhoudVerzendKnop)}
          <div className="spinner">
            {waardeOpdrachtVerwerken && this.genereerSpinner()}
          </div>
        </div>
      </div>
    );
  }
}

export default Formulier;
