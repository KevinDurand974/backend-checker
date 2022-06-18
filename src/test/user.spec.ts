import { describe, expect, test } from 'vitest';
import axios from 'axios';
import { adminUser, getAuthorization, registerTestUser, simpleUser, url } from './data';

axios.defaults.baseURL = url;

describe('User', () => {
  test('Show all Users', async () => {
    try {
      const logged = await axios.post(`/auth/login`, adminUser);
      const res = await axios.get(`/user`, {
        headers: getAuthorization(logged),
      });
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('data');
      expect(res.data.data).toBeInstanceOf(Array);
    } catch (err) {
      throw console.error(err);
    }
  });

  test('Show Users with user_id = 1', async () => {
    try {
      const logged = await axios.post(`/auth/login`, adminUser);
      const res = await axios.get(`/user/1`, {
        headers: getAuthorization(logged),
      });
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('data');
      expect(res.data.data).toBeTypeOf('object');
    } catch (err) {
      throw console.error(err);
    }
  });

  test('Show Users with user_id = 2', async () => {
    try {
      const logged = await axios.post(`/auth/login`, adminUser);
      await axios.get(`/user/2`, {
        headers: getAuthorization(logged),
      });
    } catch (err: any) {
      expect(err.response.status).toBe(404);
      expect(err.response.data).not.toHaveProperty('data');
    }
  });

  describe('Updating User', () => {
    test('Update user_id = 3', async () => {
      try {
        const logged = await axios.post(`/auth/login`, adminUser);
        const resUpdate = await axios.put(
          `/user/3`,
          {
            name: 'Updated Name',
          },
          {
            headers: getAuthorization(logged),
          }
        );
        expect(resUpdate.status).toBe(200);
        expect(resUpdate.data).not.toHaveProperty('data');
        const resShow = await axios.get(`/user/3`, {
          headers: getAuthorization(logged),
        });
        expect(resShow.status).toBe(200);
        expect(resShow.data).toHaveProperty('data');
        expect(resShow.data.data).toHaveProperty('name', 'Updated Name');
      } catch (err) {
        throw console.error(err);
      }
    });

    test('Update user_id = 2', async () => {
      try {
        const logged = await axios.post(`/auth/login`, adminUser);
        await axios.put(
          `/user/2`,
          {
            name: 'Updated Name',
          },
          {
            headers: getAuthorization(logged),
          }
        );
      } catch (err: any) {
        expect(err.response.status).toBe(404);
      }
    });
  });

  describe('Delete an User', () => {
    test('Delete user with email', async () => {
      try {
        const logged = await axios.post(`/auth/login`, adminUser);
        await axios.delete(`/user`, {
          headers: getAuthorization(logged),
          data: { email: 'removed@test.fr' },
        });
      } catch (err: any) {
        expect(err.response.status).toBe(404);
      }
    });

    test('Create and Delete user', async () => {
      try {
        await axios.post(`/auth/register`, registerTestUser);
        const logged = await axios.post(`/auth/login`, adminUser);
        const del = await axios.delete(`/user`, {
          headers: getAuthorization(logged),
          data: { email: registerTestUser.email },
        });
        expect(del.status).toBe(200);
        expect(del.data).not.toHaveProperty('data');
      } catch (err: any) {
        throw console.error(err);
      }
    });
  });

  describe('Select user musics', () => {
    test('Get all musics of admin user', async () => {
      try {
        const logged = await axios.post(`/auth/login`, adminUser);
        const res = await axios.get(`/user/music`, {
          headers: getAuthorization(logged),
        });
        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('data');
        expect(res.data.data).toBeInstanceOf(Array);
      } catch (err) {
        throw console.error(err);
      }
    });

    test('Get all musics of simple user', async () => {
      try {
        const logged = await axios.post(`/auth/login`, simpleUser);
        const res = await axios.get(`/user/music`, {
          headers: getAuthorization(logged),
        });
        expect(res.status).toBe(200);
        expect(res.data).not.toHaveProperty('data');
      } catch (err) {
        throw console.error(err);
      }
    });
  });

  test('Add a music to simple user', async () => {
    try {
      const logged = await axios.post(`/auth/login`, simpleUser);
      const add = await axios.post(
        `/user/music`,
        {
          music_id: 3,
        },
        {
          headers: getAuthorization(logged),
        }
      );
      expect(add.status).toBe(200);
      const res = await axios.get(`/user/music`, {
        headers: getAuthorization(logged),
      });
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('data');
      expect(res.data.data).toBeInstanceOf(Array);
      expect(res.data.data[0]).toHaveProperty('music_id', 3);
    } catch (err) {
      throw console.error(err);
    }
  });

  test('Remove music 3 on simple user', async () => {
    try {
      const logged = await axios.post(`/auth/login`, simpleUser);
      const remove = await axios.delete(`/user/music`, {
        headers: getAuthorization(logged),
        data: {
          music_id: 3,
        },
      });
      expect(remove.status).toBe(200);
      const res = await axios.get(`/user/music`, {
        headers: getAuthorization(logged),
      });
      expect(res.status).toBe(200);
      expect(res.data).not.toHaveProperty('data');
    } catch (err) {
      throw console.error(err);
    }
  });

  test('Remove music 1 on simple user', async () => {
    try {
      const logged = await axios.post(`/auth/login`, simpleUser);
      await axios.delete(`/user/music`, {
        headers: getAuthorization(logged),
        data: {
          music_id: 1,
        },
      });
    } catch (err: any) {
      expect(err.response.status).toBe(404);
    }
  });
});
