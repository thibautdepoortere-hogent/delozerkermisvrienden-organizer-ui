import validate from "uuid-validate";

export function controleerVersie(guid) {
  return validate.version(guid);
}

export function isGuid(guid) {
  return validate(guid);
}

export function getGuidFormaat(guid) {
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
