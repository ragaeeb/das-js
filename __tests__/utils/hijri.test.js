import { describe, expect, it } from '@jest/globals';
import hijri from '../../src/utils/hijri';

describe('hijri', () => {
  describe('writeIslamicDate', () => {
    it('should get the correct hijri date', () => {
      const result = hijri(0, new Date(2020, 5, 5));
      expect(result).toEqual({
        date: 14,
        day: 'al-Jumuʿah',
        month: 'Shawwāl',
        year: 1441,
      });
    });

    it('should get the correct adjusted hijri date forward', () => {
      const result = hijri(1, new Date(2020, 5, 5));
      expect(result).toEqual({
        date: 15,
        day: 'al-Jumuʿah',
        month: 'Shawwāl',
        year: 1441,
      });
    });

    it('should get the correct adjusted hijri date backward', () => {
      const result = hijri(-1, new Date(2020, 5, 5));
      expect(result).toEqual({
        date: 13,
        day: 'al-Jumuʿah',
        month: 'Shawwāl',
        year: 1441,
      });
    });
  });
});
