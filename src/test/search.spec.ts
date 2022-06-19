import { describe, expect, test } from 'vitest';
import axios from 'axios';
import { url } from './data';

axios.defaults.baseURL = url;

describe('Search', () => {
  test('Search "ore" (artist)', async () => {
    try {
      const res = await axios.post('/search', {
        search: 'ore',
      });
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('data');
      expect(res.data.data).toBeInstanceOf(Array);
      expect(res.data.data).toHaveLength(1);
    } catch (err) {
      throw console.error(err);
    }
  });

  test('Search "better" (title)', async () => {
    try {
      const res = await axios.post('/search', {
        search: 'better',
      });
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('data');
      expect(res.data.data).toBeInstanceOf(Array);
      expect(res.data.data).toHaveLength(1);
    } catch (err) {
      throw console.error(err);
    }
  });

  test('Search "4" (id)', async () => {
    try {
      const res = await axios.post('/search', {
        search: '4',
      });
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('data');
      expect(res.data.data).toBeInstanceOf(Array);
      expect(res.data.data).toHaveLength(1);
    } catch (err) {
      throw console.error(err);
    }
  });

  test('Search "azerty" (all)', async () => {
    try {
      await axios.post('/search', {
        search: 'azerty',
      });
    } catch (err: any) {
      expect(err.response.status).toBe(404);
      expect(err.response.data).not.toHaveProperty('data');
    }
  });

  test('Search "" (empty)', async () => {
    try {
      const res = await axios.post('/search', {
        search: '',
      });
      expect(res.status).toBe(200);
      expect(res.data).toHaveProperty('data');
      expect(res.data.data).toBeInstanceOf(Array);
    } catch (err) {
      throw console.error(err);
    }
  });
});
