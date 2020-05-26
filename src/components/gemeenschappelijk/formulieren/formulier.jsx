import React from "react";
import Joi from "joi-browser";
import { Spinner } from "@blueprintjs/core";
import Knop from "./../knop";
import FormulierGroepDatumVak from "./groepDatumVak";
import Basis from "./../basis";

class Formulier extends Basis {
  state = {
    data: {},
    errors: {},
    schema: this.schema,
  };

  getSchema = () => {
    return this.state.schema ? this.state.schema : this.schema;
  };

  valideer = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.getSchema(), options);

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
    const schema = { [id]: this.getSchema()[id] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleWijziging = ({ currentTarget: invoer }) => {
    this.updateData(invoer);
  };

  hanldeNummerWijziging = (waardeAlsNummer, waardeAlsTekst, invoer) => {
    this.updateData(invoer);
  };

  handleDatumWijziging = (selectedDate, isUserChange, id) => {
    const invoer = { id: id, value: selectedDate };
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

  genereerDatumVak(
    id,
    inhoud,
    inhoudHelper,
    icoon,
    alleenLezen,
    verplicht,
    specifiekeWaarde,
    specifiekeFout,
    onFout
  ) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepDatumVak
        id={id}
        waarde={specifiekeWaarde ? specifiekeWaarde : data[id] ? data[id] : ""}
        inhoud={inhoud}
        inhoudHelper={inhoudHelper}
        inhoudFout={errors[id] && specifiekeFout ? specifiekeFout : errors[id]}
        icoon={icoon}
        alleenLezen={alleenLezen}
        verplicht={verplicht}
        onWaardeGewijzigd={this.handleDatumWijziging}
        onFout={onFout}
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
        onKlik={this.handleVerzendFormulier}
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
      <div style={{ marginTop: "30px" }}>
        <div className="belangrijkeMededeling-VerzendenFormulierNietGeslaagd">
          {waardeOpdrachtNietVerwerkt &&
            this.genereerMededeling(
              "meldingVerzendFormulierNietGelukt",
              titelFoutmeldingIndienenFormulier,
              inhoudFoutmeldingIndienenFormulier,
              "error",
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
