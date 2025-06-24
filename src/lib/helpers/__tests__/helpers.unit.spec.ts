import { describe, it, expect } from 'vitest';
import { buildQueryParams, parseQueryParams, validateAudioFile, formatTime } from '..';
import { FiltersState } from '@/features/filters/filtersSlice';

describe('helper functions (black-box)', () => {
  describe('buildQueryParams', () => {
    it('Ignores null, empty values', () => {
      const filters: FiltersState = {
        sort: 'title',
        order: 'asc',
        genre: null,
        page: 2,
        limit: 50,
        search: '',
        artist: null,
      };

      expect(buildQueryParams(filters)).toBe('sort=title&order=asc&page=2&limit=50');
    });
  });

  describe('parseQueryParams', () => {
    it('Parses valid query params', () => {
      const queryString = '?sort=artist&order=desc&page=3&limit=15';
      expect(parseQueryParams(queryString)).toEqual({
        artist: null,
        genre: null,
        limit: 15,
        order: 'desc',
        page: 3,
        search: '',
        sort: 'artist',
      });
    });

    it('Returns default values if invalid params', () => {
      const queryString = '?page=not_a_number';

      expect(parseQueryParams(queryString)).toEqual({
        artist: null,
        genre: null,
        limit: 10,
        order: null,
        page: 1,
        search: '',
        sort: null,
      });
    });
  });

  describe('validateAudioFile', () => {
    it('Invalid file type', () => {
      const testFile = new File([new ArrayBuffer(10)], 'test.txt', { type: 'text/plain' });
      expect(validateAudioFile(testFile)).toBe('Only MP3 or WAV files are allowed');
    });

    it('Too large file', () => {
      const testFile = new File([new ArrayBuffer(11 * 1024 * 1024)], 'test.txt', {
        type: 'audio/mpeg',
      });
      expect(validateAudioFile(testFile)).toBe('File size should be less than 10MB');
    });

    it('Correct file should return null', () => {
      const testFile = new File([new ArrayBuffer(50)], 'test.txt', { type: 'audio/mpeg' });
      expect(validateAudioFile(testFile)).toBe(null);
    });
  });

  describe('formatTime', () => {
    it('o sedonds should be converted to 0:00', () => {
      expect(formatTime(0)).toBe('0:00');
    });

    it('NaN should be converted to 0:00', () => {
      expect(formatTime(NaN)).toBe('0:00');
    });

    it('70 sedonds should be converted to 1:10', () => {
      expect(formatTime(70)).toBe('1:10');
    });

    it('3599 sedonds should be converted to 59:59', () => {
      expect(formatTime(3599)).toBe('59:59');
    });
  });
});
