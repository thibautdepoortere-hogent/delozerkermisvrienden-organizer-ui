import React, { Component } from "react";
import Joi from "joi-browser";
import FormulierGroep from "./groep";
import FormulierGroepRadio from "./groepRadio";
import FormulierGroepTekstvak from "./groepTekstvak";
import FormulierGroepTekstveld from "./groepTekstveld";
import FormulierGroepNumeriekVak from "./groepNumeriekVak";
import FormulierGroepMobielNummer from "./groepMobielNummer";
import BelangrijkeMededeling from "./../belangrijkeMededeling";

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

  genereerFormulierGroep(data) {
    return <FormulierGroep data={data} />;
  }

  genereerTekstvak(
    id,
    omschrijving,
    icoon,
    placeholder,
    verplicht,
    helperOmschrijving
  ) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepTekstvak
        id={id}
        omschrijving={omschrijving}
        waarde={data[id]}
        icoon={icoon}
        placeholder={placeholder}
        verplicht={verplicht}
        helperOmschrijving={helperOmschrijving}
        foutOmschrijving={errors[id]}
        onInhoudGewijzigd={this.handleWijziging}
      />
    );
  }

  genereerTekstveld(id, omschrijving, icoon, placeholder, verplicht) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepTekstveld
        id={id}
        omschrijving={omschrijving}
        waarde={data[id]}
        icoon={icoon}
        placeholder={placeholder}
        verplicht={verplicht}
        foutOmschrijving={errors[id]}
        onInhoudGewijzigd={this.handleWijziging}
      />
    );
  }

  genereerNumeriekVak(
    id,
    omschrijving,
    min,
    max,
    verplicht,
    enkelLezen,
    helperOmschrijving,
    specifiekOnInhoudGewijzigdEvent
  ) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepNumeriekVak
        id={id}
        enkelLezen={enkelLezen}
        omschrijving={omschrijving}
        waarde={data[id]}
        min={min}
        max={max}
        verplicht={verplicht}
        helperOmschrijving={helperOmschrijving}
        foutOmschrijving={errors[id]}
        onInhoudGewijzigd={
          specifiekOnInhoudGewijzigdEvent
            ? specifiekOnInhoudGewijzigdEvent
            : this.hanldeNummerWijziging
        }
      />
    );
  }

  genereerMobielNummer(idPrefix, idMobielNummer, verplicht) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepMobielNummer
        idPrefix={idPrefix}
        idMobielNummer={idMobielNummer}
        waardePrefix={data[idPrefix]}
        waardeMobielNummer={data[idMobielNummer]}
        verplicht={true}
        foutOmschrijving={errors[idPrefix] || errors[idMobielNummer]}
        onInhoudGewijzigdPrefix={this.handleWijziging}
        onInhoudGewijzigdMobielNummer={this.handleWijziging}
      />
    );
  }

  genereerRadio(id, omschrijving, opties, verplicht) {
    const { data, errors } = this.state;
    return (
      <FormulierGroepRadio
        id={id}
        omschrijving={omschrijving}
        waarde={data[id]}
        data={opties}
        verplicht={verplicht}
        foutOmschrijving={errors[id]}
        onInhoudGewijzigd={this.handleWijziging}
      />
    );
  }

  genereerBelangrijkeMededeling(titel, inhoud, intent, icoon) {
    return (
      <BelangrijkeMededeling
        titel={titel}
        mededeling={inhoud}
        intent={intent}
        icoon={icoon}
      />
    );
  }

  genereerKnop(omschrijving) {
    return <button disabled={this.valideer()}>{omschrijving}</button>;
  }
}

export default Formulier;
