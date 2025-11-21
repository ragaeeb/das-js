import { describe, expect, it } from 'bun:test';
import hijri from './hijri';

const EXPECTED_RESULT = {
  day: 'al-Jumuʿah',
  month: 'Shawwāl',
  year: 1441,
};

describe('hijri', () => {
  describe('writeIslamicDate', () => {
    it('should get the correct hijri date', () => {
      const result = hijri(0, new Date(2020, 5, 5));
      expect(result).toEqual({
        ...EXPECTED_RESULT,
        date: 14,
      });
    });

    it('should get the correct adjusted hijri date forward', () => {
      const result = hijri(1, new Date(2020, 5, 5));
      expect(result).toEqual({
        ...EXPECTED_RESULT,
        date: 15,
      });
    });

    it('should get the correct adjusted hijri date backward', () => {
      const result = hijri(-1, new Date(2020, 5, 5));
      expect(result).toEqual({
        ...EXPECTED_RESULT,
        date: 13,
      });
    });
  });
});
