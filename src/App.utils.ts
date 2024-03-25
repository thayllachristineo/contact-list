import { TContacts } from './types';

export const removeAccent = (str: string) =>
  str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const getGroups = (contacts: TContacts = [], filter?: string) => {
  return contacts.reduce<Record<string, TContacts>>((prev, curr) => {
    console.log(curr.name);

    const firstLetter = curr.name.charAt(0).toUpperCase();

    if (
      !filter ||
      removeAccent(curr.name.toLowerCase()).includes(
        removeAccent(filter.toLowerCase()),
      )
    ) {
      prev[firstLetter] = prev[firstLetter] || [];
      prev[firstLetter].push(curr);
    }

    return prev;
  }, {});
};

export const getSortedGroupsArray = (groups: Record<string, TContacts>) =>
  Object.entries(groups).sort(([letterA], [letterB]) =>
    letterA.localeCompare(letterB),
  );
