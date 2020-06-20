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
          },
          {
            event: 'sunrise',
            label: 'Sunrise',
            time: '5:15 AM',
          },
          {
            event: 'dhuhr',
            label: 'Dhuhr',
            time: '1:05 PM',
          },
          {
            event: 'asr',
            label: 'ʿAṣr',
            time: '5:15 PM',
          },
          {
            event: 'maghrib',
            label: 'Maġrib',
            time: '8:55 PM',
          },
          {
            event: 'isha',
            label: 'ʿIshāʾ',
            time: '10:23 PM',
          },
          {
            event: 'middleOfTheNight',
            label: '1/2 Night Begins',
            time: '12:21 AM',
          },
          {
            event: 'lastThirdOfTheNight',
            label: 'Last 1/3 Night Begins',
            time: '1:30 AM',
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
          },
          {
            event: 'sunrise',
            label: 'Sunrise',
            time: '5:18 AM',
          },
          {
            event: 'dhuhr',
            label: 'Dhuhr',
            time: '1:01 PM',
          },
          {
            event: 'asr',
            label: 'ʿAṣr',
            time: '5:10 PM',
          },
          {
            event: 'maghrib',
            label: 'Maġrib',
            time: '8:45 PM',
          },
          {
            event: 'isha',
            label: 'ʿIshāʾ',
            time: '10:10 PM',
          },
          {
            event: 'middleOfTheNight',
            label: '1/2 Night Begins',
            time: '12:19 AM',
          },
          {
            event: 'lastThirdOfTheNight',
            label: 'Last 1/3 Night Begins',
            time: '1:30 AM',
          },
        ]);

        expect(result.dates[result.dates.length - 1].timings).toEqual([
          {
            event: 'fajr',
            label: 'Fajr',
            time: '3:51 AM',
          },
          {
            event: 'sunrise',
            label: 'Sunrise',
            time: '5:19 AM',
          },
          {
            event: 'dhuhr',
            label: 'Dhuhr',
            time: '1:07 PM',
          },
          {
            event: 'asr',
            label: 'ʿAṣr',
            time: '5:16 PM',
          },
          {
            event: 'maghrib',
            label: 'Maġrib',
            time: '8:55 PM',
          },
          {
            event: 'isha',
            label: 'ʿIshāʾ',
            time: '10:22 PM',
          },
          {
            event: 'middleOfTheNight',
            label: '1/2 Night Begins',
            time: '12:24 AM',
          },
          {
            event: 'lastThirdOfTheNight',
            label: 'Last 1/3 Night Begins',
            time: '1:33 AM',
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
