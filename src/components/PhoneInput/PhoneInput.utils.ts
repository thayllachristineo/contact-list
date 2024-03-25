export const getInputMaskPhoneNumber = (value: string) => {
  const cleanValue = value ? value.replace(/\D/g, '') : '';

  const match =
    cleanValue.length > 10
      ? /(\d{0,2})(\d{0,5})(\d{0,4})/
      : /(\d{0,2})(\d{0,4})(\d{0,4})/;

  const group = cleanValue.match(match) || [];

  return !group[2]
    ? group[1]
    : `(${group[1]}) ${group[2]}${group[3] ? `-${group[3]}` : ''}`;
};

export const clearPhoneString = (phoneString: string) => {
  if (!phoneString) return phoneString;

  return phoneString
    .replace('(', '')
    .replace(')', '')
    .replace(/ /g, '')
    .replace('-', '')
    .replace(/_/g, '');
};
