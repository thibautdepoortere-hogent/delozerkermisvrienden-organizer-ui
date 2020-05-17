import validate from "uuid-validate";

function controleerVersie(guid) {
  return validate.version(guid);
}

function isGuid(guid) {
  return validate(guid);
}

function getGuidFormaat(guid) {
  if (guid.length === 32) {
    return (
      guid.substr(0, 8) +
      "-" +
      guid.substr(8, 4) +
      "-" +
      guid.substr(12, 4) +
      "-" +
      guid.substr(16, 4) +
      "-" +
      guid.substr(20, 12)
    );
  }
  return guid;
}

export { isGuid, getGuidFormaat };
