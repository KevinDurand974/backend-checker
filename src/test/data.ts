import { AxiosResponse } from 'axios';

export const url = 'http://localhost:5000/api';

export const adminUser = {
  email: 'test@test.fr',
  password: 'Musique2',
};
export const simpleUser = {
  email: 'test2@test.fr',
  password: 'Musique2',
};
export const registerSimpleUser = {
  email: 'regular@test.fr',
  password: 'Azerty01',
};

export const registerAdminUser = {
  email: 'admin@test.fr',
  password: 'Azerty01',
};

export const unknownUser = {
  email: 'unknown@test.fr',
  password: 'Azerty01',
};

export const getAuthorization = (response: AxiosResponse) => {
  const token = response.headers?.['set-cookie']![0]?.split(';')[0].replace('ut=', '');
  return { Authorization: `Bearer ${token}` };
};
