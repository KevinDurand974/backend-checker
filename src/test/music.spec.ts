import { describe, expect, test } from 'vitest';
import axios from 'axios';
import { adminUser, getAuthorization, simpleUser, url } from './data';
import { Music } from '@types';

axios.defaults.baseURL = url;

describe('Musics', () => {
  test('Doesnt show any musics with simple user', async () => {
    try {
      const logged = await axios.post(`/auth/login`, simpleUser);
      await axios.get(`/music`, {
        headers: getAuthorization(logged),
      });
    } catch (err: any) {
      expect(err.response.status).toBe(403);
    }
  });

  test('Show all music with admin user', async () => {
    try {
      const logged = await axios.post(`/auth/login`, adminUser);
      const res = await axios.get(`/music`, {
        headers: getAuthorization(logged),
      });
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('data');
      expect(res.data.data).toBeInstanceOf(Array);
      expect(res.data.data).toHaveLength(2);
    } catch (err) {
      throw console.error(err);
    }
  });

  describe('Add few music', () => {
    test('Add a music (1)', async () => {
      try {
        const logged = await axios.post(`/auth/login`, adminUser);
        const res = await axios.post(
          `/music`,
          {
            artist: 'Man With A Mission',
            title: 'Database feat.TAKUMA(10-FEET)',
          },
          {
            headers: getAuthorization(logged),
          }
        );
        expect(res.status).toBe(200);
        expect(res.data).not.toHaveProperty('data');
      } catch (err) {
        throw console.error(err);
      }
    });

    test('Add a music (2)', async () => {
      try {
        const logged = await axios.post(`/auth/login`, adminUser);
        const res = await axios.post(
          `/music`,
          {
            artist: 'XLAB',
            title: 'Will be changed',
          },
          {
            headers: getAuthorization(logged),
          }
        );
        expect(res.status).toBe(200);
        expect(res.data).not.toHaveProperty('data');
      } catch (err) {
        throw console.error(err);
      }
    });
  });

  test('Update XLAB title', async () => {
    try {
      const logged = await axios.post(`/auth/login`, adminUser);
      const list = await axios.get(`/music`, {
        headers: getAuthorization(logged),
      });
      const music: Music = list.data.data.filter((music: Music) =>
        music.artist.toLocaleLowerCase().includes('xlab')
      )[0];
      const update = await axios.put(
        `/music/${music.music_id}`,
        {
          title: 'Mader Fak',
        },
        {
          headers: getAuthorization(logged),
        }
      );
      expect(update.status).toBe(200);
      expect(update.data).not.toHaveProperty('data');
    } catch (err) {
      throw console.error(err);
    }
  });

  test('Check if now we have 4 musics', async () => {
    try {
      const logged = await axios.post(`/auth/login`, adminUser);
      const res = await axios.get(`/music`, {
        headers: getAuthorization(logged),
      });
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('data');
      expect(res.data.data).toBeInstanceOf(Array);
      expect(res.data.data).toHaveLength(4);
    } catch (err) {
      throw console.error(err);
    }
  });

  test('Remove the last 2 musics', async () => {
    try {
      const logged = await axios.post(`/auth/login`, adminUser);
      const list = await axios.get(`/music`, {
        headers: getAuthorization(logged),
      });
      const musics: Music[] = list.data.data.filter((music: Music) => {
        return ![3, 4].includes(music.music_id);
      });
      const del1 = await axios.delete(`/music/${musics[0].music_id}`, {
        headers: getAuthorization(logged),
      });
      expect(del1.status).toBe(200);
      const del2 = await axios.delete(`/music/${musics[1].music_id}`, {
        headers: getAuthorization(logged),
      });
      expect(del2.status).toBe(200);
    } catch (err) {
      throw console.error(err);
    }
  });

  test('Check if now we have 2 musics', async () => {
    try {
      const logged = await axios.post(`/auth/login`, adminUser);
      const res = await axios.get(`/music`, {
        headers: getAuthorization(logged),
      });
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('data');
      expect(res.data.data).toBeInstanceOf(Array);
      expect(res.data.data).toHaveLength(2);
    } catch (err) {
      throw console.error(err);
    }
  });
});
