import { describe, expect, test } from 'vitest';
import axios from 'axios';
import {
  adminUser,
  getAuthorization,
  registerAdminUser,
  registerSimpleUser,
  simpleUser,
  unknownUser,
  url,
} from './data';

describe('auth', () => {
  describe('You can login and logout as Simple User', () => {
    test('Login with a Simple User', async () => {
      const res = await axios.post(`${url}/auth/login`, simpleUser);
      getAuthorization(res);
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('message', 'User successfully logged in!');
    });

    test('Logout the Simple User', async () => {
      const res = await axios.get(`${url}/auth/logout`);
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('message', 'User successfully logged out!');
    });
  });

  describe('You can login and logout as Admin User', () => {
    test('Login with a Admin User', async () => {
      const res = await axios.post(`${url}/auth/login`, adminUser);
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('message', 'User successfully logged in!');
    });

    test('Logout the Admin User', async () => {
      const res = await axios.get(`${url}/auth/logout`);
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('message', 'User successfully logged out!');
    });
  });

  describe('You can register and remove a new Simple User', () => {
    test('Register a Simple User', async () => {
      const res = await axios.post(`${url}/auth/register`, registerSimpleUser);
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('message', 'User successfully created!');
    });

    test('Remove the User', async () => {
      try {
        const logged = await axios.post(`${url}/auth/login`, adminUser);
        const res = await axios.delete(`${url}/user`, {
          data: {
            email: registerSimpleUser.email,
          },
          headers: getAuthorization(logged),
        });
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('message', 'User removed!');
      } catch (err: any) {
        expect(err.response.status).not.toBe(401);
      }
    });
  });

  describe('You can register and remove a new Admin User', () => {
    test('Register a Admin User', async () => {
      const res = await axios.post(`${url}/auth/register`, registerAdminUser);
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('message', 'User successfully created!');
    });

    test('Remove the User', async () => {
      try {
        const logged = await axios.post(`${url}/auth/login`, adminUser);
        const res = await axios.delete(`${url}/user`, {
          data: {
            email: registerAdminUser.email,
          },
          headers: getAuthorization(logged),
        });
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('message', 'User removed!');
      } catch (err: any) {
        expect(err.response.status).not.toBe(401);
      }
    });
  });

  test('You cannot login with a non existant User', async () => {
    try {
      await axios.post(`${url}/auth/login`, unknownUser);
    } catch (err: any) {
      expect(err.response.status).toBe(404);
      expect(err.response.data).toHaveProperty('message', "User doesn't exist!");
    }
  });

  describe('Several try of registering', async () => {
    test('Try with a no valid email', async () => {
      try {
        await axios.post(`${url}/auth/register`, {
          email: 'notavalidemail.fr',
          password: 'Azerty12',
        });
      } catch (err: any) {
        expect(err.response.status).toBe(500);
        expect(err.response.data).toHaveProperty('message');
      }
    });

    test('Try with no valid password', async () => {
      try {
        await axios.post(`${url}/auth/register`, {
          email: 'valid@test.fr',
          password: 'azerty',
        });
      } catch (err: any) {
        expect(err.response.status).toBe(500);
        expect(err.response.data).toHaveProperty('message', 'The password must have minimum 8 characters');
      }
      try {
        await axios.post(`${url}/auth/register`, {
          email: 'valid@test.fr',
          password: 'azertyio',
        });
      } catch (err: any) {
        expect(err.response.status).toBe(500);
        expect(err.response.data).toHaveProperty(
          'message',
          'The password must have 1 uppercase, 1 lowercase and 1 number at minimum'
        );
      }
    });

    test('Try with an user already registered', async () => {
      try {
        await axios.post(`${url}/auth/register`, simpleUser);
      } catch (err: any) {
        expect(err.response.status).toBe(500);
        expect(err.response.data).toHaveProperty('message', 'User already exist!');
      }
    });
  });
});
