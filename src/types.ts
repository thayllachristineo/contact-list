export type TContact = {
  id: string;
  name: string;
  mainPhone: number;
  cellPhone?: number;
  homePhone?: number;
};

export type TContacts = Array<TContact>;

export type TContactForm = Omit<TContact, 'id'>;
