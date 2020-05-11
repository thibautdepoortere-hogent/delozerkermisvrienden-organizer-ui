const tabelKolommen = [
  {
    id: 1,
    naam: "Datum inschrijving",
    veld: "datumInschrijving",
    formatteer: "datum",
    verbergBijSmaller: true,
  },
  {
    id: 2,
    naam: "Naam",
    velden: ["voornaam", "achternaam"],
    scheidingsteken: " ",
    verbergBijSmaller: false,
  },
  {
    id: 3,
    naam: "Locatie",
    velden: ["postcode", "gemeente"],
    scheidingsteken: " - ",
    verbergBijSmaller: false,
  },
  {
    id: 4,
    naam: "Mobiel nummer",
    velden: ["prefixMobielNummer", "mobielNummer"],
    scheidingsteken: "",
    formatteer: "telefoon",
    verbergBijSmaller: true,
  },
  {
    id: 5,
    naam: "Aantal meter",
    veld: "aantalMeter",
    verbergBijSmaller: false,
  },
  {
    id: 6,
    naam: "standnummer",
    veld: "standnummer",
    verbergBijSmaller: true,
  },
];

export { tabelKolommen };
