import { beforeEach, describe, expect, it } from 'bun:test';
import type { CalculationConfig, SalatLabels } from './calculator';
import { daily, getIqamahTime, isFard, monthly } from './calculator';

const MIDDLE_OF_THE_NIGHT = '1/2 Night Begins';
const LAST_THIRD_OF_THE_NIGHT = 'Last 1/3 Night Begins';

const salatLabels: SalatLabels = {
  fajr: 'Fajr',
  sunrise: 'Sunrise',
  dhuhr: 'Dhuhr',
  asr: 'ʿAṣr',
  maghrib: 'Maġrib',
  isha: 'ʿIshāʾ',
  middleOfTheNight: MIDDLE_OF_THE_NIGHT,
  lastThirdOfTheNight: LAST_THIRD_OF_THE_NIGHT,
};

describe('calculator', () => {
  let params: CalculationConfig;

  beforeEach(() => {
    params = {
      fajrAngle: 12,
      ishaAngle: 12,
      latitude: '45.3506',
      longitude: '-75.793',
      method: 'NauticalTwilight',
      timeZone: 'America/Toronto',
    };
  });

  describe('daily', () => {
    it('should calculate the proper time for Ottawa', () => {
      const result = daily(salatLabels, params, new Date(2020, 5, 19, 10, 24, 0), {
        fajr: '4:45 AM',
        dhuhr: {
          6: '12:30 PM',
        },
        asr: {
          6: {
            1: '5:00 PM',
            22: '5:15 PM',
            24: '5:20 PM',
            28: '6:00 PM',
          },
        },
        maghrib: {
          6: {
            1: '6:30 PM',
            11: '6:45 PM',
            18: '6:50 PM',
          },
        },
        isha: {
          6: {
            1: '7:30 PM',
            11: '7:45 PM',
            21: '7:50 PM',
          },
        },
      });
      expect(result).toEqual({
        date: 'Friday, June 19, 2020',
        istijaba: false,
        timings: [
          {
            event: 'fajr',
            label: 'Fajr',
            iqamah: '4:45 AM',
            time: '3:46 AM',
            value: new Date(2020, 5, 19, 7, 46, 0), // GMT-4
          },
          {
            event: 'sunrise',
            label: 'Sunrise',
            time: '5:15 AM',
            value: new Date(2020, 5, 19, 9, 15, 0), // GMT-4
          },
          {
            event: 'dhuhr',
            label: 'Dhuhr',
            iqamah: '12:30 PM',
            time: '1:05 PM',
            value: new Date(2020, 5, 19, 17, 5, 0), // GMT-4
          },
          {
            event: 'asr',
            label: 'ʿAṣr',
            time: '5:15 PM',
            iqamah: '5:00 PM',
            value: new Date(2020, 5, 19, 21, 15, 0), // GMT-4
          },
          {
            event: 'maghrib',
            label: 'Maġrib',
            time: '8:55 PM',
            iqamah: '6:50 PM',
            value: new Date(2020, 5, 20, 0, 55, 0), // GMT-4
          },
          {
            event: 'isha',
            label: 'ʿIshāʾ',
            time: '10:23 PM',
            iqamah: '7:45 PM',
            value: new Date(2020, 5, 20, 2, 23, 0), // GMT-4
          },
          {
            event: 'middleOfTheNight',
            label: MIDDLE_OF_THE_NIGHT,
            time: '12:21 AM',
            value: new Date(2020, 5, 20, 4, 21, 0), // GMT-4
          },
          {
            event: 'lastThirdOfTheNight',
            label: LAST_THIRD_OF_THE_NIGHT,
            time: '1:30 AM',
            value: new Date(2020, 5, 20, 5, 30, 0), // GMT-4
          },
        ],
      });
    });

    it('should calculate the proper iqamah times for July 6, 2020', () => {
      const result = daily(salatLabels, params, new Date(2020, 6, 6, 16, 17, 0), {
        fajr: {
          7: {
            1: '4:15 AM',
            11: '4:25 AM',
            21: '4:40 AM',
          },
        },
        isha: {
          7: {
            1: '10:30 PM',
            11: '10:20 PM',
            21: '10:10 PM',
          },
        },
      });

      expect(result.timings[0].iqamah).toEqual('4:15 AM');
      expect(result.timings[5].iqamah).toEqual('10:30 PM');
    });

    describe('isFard', () => {
      it('should be true for fard prayers', () => {
        for (const key of ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']) {
          expect(isFard(key)).toBe(true);
        }
      });

      it('should be false for sunnah prayers', () => {
        for (const key of ['jumuah', 'sunrise', 'middleOfTheNight', 'lastThirdOfTheNight']) {
          expect(isFard(key)).toBe(false);
        }
      });
    });

    describe('getIqamahTime', () => {
      it('should get the time for Jumuah', () => {
        const result = getIqamahTime(
          new Date(2020, 5, 19, 10, 24, 0),
          {
            jumuah: {
              6: {
                1: '12:30 PM',
                11: '12:45 PM',
                21: '12:50 PM',
              },
            },
          },
          'jumuah'
        );

        expect(result).toEqual('12:45 PM');
      });

      it('should be undefined', () => {
        const result = getIqamahTime(new Date(2020, 5, 19, 10, 24, 0), {}, 'jumuah');
        expect(result).toBeUndefined();
      });
    });

    describe('monthly', () => {
      it('should have proper label and timings', () => {
        const result = monthly(salatLabels, params, new Date(2020, 5, 19, 10, 24, 0));
        expect(result.label).toEqual('June 2020');
        expect(result.dates[0].timings).toEqual([
          {
            event: 'fajr',
            label: 'Fajr',
            time: '3:53 AM',
            value: new Date(2020, 5, 1, 7, 53, 0), // GMT-4
          },
          {
            event: 'sunrise',
            label: 'Sunrise',
            time: '5:18 AM',
            value: new Date(2020, 5, 1, 9, 18, 0), // GMT-4
          },
          {
            event: 'dhuhr',
            label: 'Dhuhr',
            time: '1:01 PM',
            value: new Date(2020, 5, 1, 17, 1, 0), // GMT-4
          },
          {
            event: 'asr',
            label: 'ʿAṣr',
            time: '5:10 PM',
            value: new Date(2020, 5, 1, 21, 10, 0), // GMT-4
          },
          {
            event: 'maghrib',
            label: 'Maġrib',
            time: '8:45 PM',
            value: new Date(2020, 5, 2, 0, 45, 0), // GMT-4
          },
          {
            event: 'isha',
            label: 'ʿIshāʾ',
            time: '10:10 PM',
            value: new Date(2020, 5, 2, 2, 10, 0), // GMT-4
          },
          {
            event: 'middleOfTheNight',
            label: MIDDLE_OF_THE_NIGHT,
            time: '12:19 AM',
            value: new Date(2020, 5, 2, 4, 19, 0), // GMT-4
          },
          {
            event: 'lastThirdOfTheNight',
            label: LAST_THIRD_OF_THE_NIGHT,
            time: '1:30 AM',
            value: new Date(2020, 5, 2, 5, 30, 0), // GMT-4
          },
        ]);

        expect(result.dates[result.dates.length - 1].timings).toEqual([
          {
            event: 'fajr',
            label: 'Fajr',
            time: '3:51 AM',
            value: new Date(2020, 5, 30, 7, 51, 0), // GMT-4
          },
          {
            event: 'sunrise',
            label: 'Sunrise',
            time: '5:19 AM',
            value: new Date(2020, 5, 30, 9, 19, 0), // GMT-4
          },
          {
            event: 'dhuhr',
            label: 'Dhuhr',
            time: '1:07 PM',
            value: new Date(2020, 5, 30, 17, 7, 0), // GMT-4
          },
          {
            event: 'asr',
            label: 'ʿAṣr',
            time: '5:16 PM',
            value: new Date(2020, 5, 30, 21, 16, 0), // GMT-4
          },
          {
            event: 'maghrib',
            label: 'Maġrib',
            time: '8:55 PM',
            value: new Date(2020, 6, 1, 0, 55, 0), // GMT-4
          },
          {
            event: 'isha',
            label: 'ʿIshāʾ',
            time: '10:22 PM',
            value: new Date(2020, 6, 1, 2, 22, 0), // GMT-4
          },
          {
            event: 'middleOfTheNight',
            label: MIDDLE_OF_THE_NIGHT,
            time: '12:24 AM',
            value: new Date(2020, 6, 1, 4, 24, 0), // GMT-4
          },
          {
            event: 'lastThirdOfTheNight',
            label: LAST_THIRD_OF_THE_NIGHT,
            time: '1:33 AM',
            value: new Date(2020, 6, 1, 5, 33, 0), // GMT-4
          },
        ]);
      });

      it('should have 30 days for June', () => {
        const result = monthly(salatLabels, params, new Date(2020, 5, 19, 10, 24, 0));
        expect(result.dates).toHaveLength(30);
      });

      it('should have 31 days for July', () => {
        const result = monthly(salatLabels, params, new Date(2020, 6, 19, 10, 24, 0));
        expect(result.dates).toHaveLength(31);
      });
    });
  });
});
