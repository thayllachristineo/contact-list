import { TContact, TContactForm } from '../types';

const URL = import.meta.env.VITE_SERVER_URL;
const URL_WITH = (id: TContact['id']) => `${URL}/${id}`;

export const addContact = (data: TContactForm) => {
  try {
    return fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
};

export const removeContact = (id: TContact['id']) => {
  try {
    return fetch(URL_WITH(id), {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateContact = (id: TContact['id'], data: TContactForm) => {
  try {
    return fetch(URL_WITH(id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
};

export const listContacts = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
