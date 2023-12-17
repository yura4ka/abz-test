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
