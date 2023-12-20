export function formatPhoneNumber(value: string) {
  const offset = value[0] === "+" ? 1 : 0;
  return (
    "+38 " +
    `(0${value.substring(offset + 3, offset + 5)}) ` +
    `${value.substring(offset + 5, offset + 8)} ` +
    `${value.substring(offset + 8, offset + 10)} ` +
    `${value.substring(offset + 10, offset + 12)}`
  );
}

export function normalizePhoneNumber(value: string) {
  return value.replace(/[-\s()]/g, "");
}

export const emailRegex =
  // eslint-disable-next-line no-control-regex
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

export const phoneRegex = /^[+]{0,1}380([0-9]{9})$/;
