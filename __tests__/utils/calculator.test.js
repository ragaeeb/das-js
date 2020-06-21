import { describe, expect, it } from '@jest/globals';
import { daily, monthly } from '../../src/utils/calculator';

describe('calculator', () => {
  describe('daily', () => {
    it('should calculate the proper time for Ottawa', () => {
      const result = daily(
        '45.3506',
        '-75.793',
        'America/Toronto',
        new Date(2020, 5, 19, 10, 24, 0),
        {}
      );
      expect(result).toEqual({
        date: 'Friday, June 19, 2020',
        istijaba: false,
        timings: [
          {
            event: 'fajr',
            label: 'Fajr',
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
            time: '1:05 PM',
            value: new Date(2020, 5, 19, 17, 5, 0), // GMT-4
          },
          {
            event: 'asr',
            label: 'ʿAṣr',
            time: '5:15 PM',
            value: new Date(2020, 5, 19, 21, 15, 0), // GMT-4
          },
          {
            event: 'maghrib',
            label: 'Maġrib',
            time: '8:55 PM',
            value: new Date(2020, 5, 20, 0, 55, 0), // GMT-4
          },
          {
            event: 'isha',
            label: 'ʿIshāʾ',
            time: '10:23 PM',
            value: new Date(2020, 5, 20, 2, 23, 0), // GMT-4
          },
          {
            event: 'middleOfTheNight',
            label: '1/2 Night Begins',
            time: '12:21 AM',
            value: new Date(2020, 5, 20, 4, 21, 0), // GMT-4
          },
          {
            event: 'lastThirdOfTheNight',
            label: 'Last 1/3 Night Begins',
            time: '1:30 AM',
            value: new Date(2020, 5, 20, 5, 30, 0), // GMT-4
          },
        ],
      });
    });

    describe('monthly', () => {
      it('should have proper label and timings', () => {
        const result = monthly(
          '45.3506',
          '-75.793',
          'America/Toronto',
          new Date(2020, 5, 19, 10, 24, 0)
        );
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
            label: '1/2 Night Begins',
            time: '12:19 AM',
            value: new Date(2020, 5, 2, 4, 19, 0), // GMT-4
          },
          {
            event: 'lastThirdOfTheNight',
            label: 'Last 1/3 Night Begins',
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
            label: '1/2 Night Begins',
            time: '12:24 AM',
            value: new Date(2020, 6, 1, 4, 24, 0), // GMT-4
          },
          {
            event: 'lastThirdOfTheNight',
            label: 'Last 1/3 Night Begins',
            time: '1:33 AM',
            value: new Date(2020, 6, 1, 5, 33, 0), // GMT-4
          },
        ]);
      });

      it('should have 30 days for July', () => {
        const result = monthly(
          '45.3506',
          '-75.793',
          'America/Toronto',
          new Date(2020, 5, 19, 10, 24, 0)
        );
        expect(result.dates).toHaveLength(30);
      });

      it('should have 31 days for July', () => {
        const result = monthly(
          '45.3506',
          '-75.793',
          'America/Toronto',
          new Date(2020, 6, 19, 10, 24, 0)
        );
        expect(result.dates).toHaveLength(31);
      });
    });
  });
});
