import {
  CalculationParameters as AdhanCalcParams,
  Coordinates as AdhanCoordinates,
  PrayerTimes as AdhanPrayerTimes,
  SunnahTimes as AdhanSunnahTimes,
} from 'adhan';

const ONE_HOUR = 60 * 60 * 1000;
const FRIDAY = 5;

interface CalculationConfig {
  latitude: string;
  longitude: string;
  timeZone: string;
  method: string;
  fajrAngle: number;
  ishaAngle: number;
}

interface IqamahData {
  [key: string]: string | { [month: number]: string | { [day: number]: string } };
}

interface SalatLabels {
  [key: string]: string;
}

interface Timing {
  event: string;
  label: string;
  time: string;
  value: Date;
  iqamah?: string;
}

interface DailyResult {
  date: string;
  timings: Timing[];
  istijaba: boolean;
}

interface MonthlyResult {
  label: string;
  dates: DailyResult[];
}

interface YearlyResult {
  label: number;
  dates: DailyResult[];
}

const formatTime = (t: Date, timeZone: string): string => {
  const time = new Date(t).toLocaleTimeString('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return time;
};

const formatDate = (fajr: Date): string =>
  new Date(fajr).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

/**
 * Returns a list of formatted times ordered from earliest to latest.
 */
const formatAsObject = (
  calculationResult: Record<string, Date> & { sunset?: Date },
  timeZone: string,
  iqamahs: Record<string, string>,
  salatLabels: SalatLabels
): { date: string; timings: Timing[] } => {
  const { sunset, ...rest } = calculationResult;
  const timings = Object.entries(rest)
    // sort the events from earliest to latest (to sort from fajr - isha)
    .sort(([, value], [, nextValue]) => value.getTime() - nextValue.getTime())
    .map(([event, t]) => ({
      event,
      label: salatLabels[event],
      time: formatTime(t, timeZone),
      value: t,
      ...(iqamahs[event] && { iqamah: iqamahs[event] }),
    }));

  return { date: formatDate(rest.fajr), timings };
};

const getIqamahInRange = (day: string, monthData: unknown): string | null => {
  if (typeof monthData === 'string') {
    return monthData;
  }

  if (Array.isArray(monthData)) {
    return monthData.join(', ');
  }

  if (typeof monthData === 'object' && monthData !== null) {
    const ranges = Object.keys(monthData);

    for (let i = ranges.length - 1; i >= 0; i -= 1) {
      const range = ranges[i];

      if (Number.parseInt(day, 10) >= Number.parseInt(range, 10)) {
        const rangeTime = (monthData as Record<string, unknown>)[range];

        if (Array.isArray(rangeTime)) {
          return rangeTime.join(', ');
        }

        if (typeof rangeTime === 'string') {
          return rangeTime;
        }
      }
    }
  }

  return null;
};

const reduceIqamahs = (now: Date, iqamahs: IqamahData): Record<string, string> => {
  const month = now.getMonth() + 1;
  const day = now.getDate().toString();
  const result: Record<string, string> = {};

  for (const [salat, data] of Object.entries(iqamahs)) {
    result[salat] =
      typeof data === 'string'
        ? data
        : (getIqamahInRange(day, (data as Record<number, unknown>)[month]) ?? '');
  }

  return result;
};

const getIqamahTime = (now: Date, iqamahs: IqamahData, id: string): string =>
  reduceIqamahs(now, iqamahs)[id];

const daily = (
  salatLabels: SalatLabels,
  { latitude, longitude, timeZone, method, fajrAngle, ishaAngle }: CalculationConfig,
  now: Date = new Date(),
  iqamahs: IqamahData = {}
): DailyResult => {
  const fard = new AdhanPrayerTimes(
    new AdhanCoordinates(Number(latitude), Number(longitude)),
    now,
    new AdhanCalcParams(method as never, fajrAngle, ishaAngle)
  );

  const sunan = new AdhanSunnahTimes(fard);
  const { coordinates, calculationParameters, date, ...rest } = { ...fard, ...sunan } as Record<
    string,
    unknown
  >;

  const result = formatAsObject(
    rest as Record<string, Date>,
    timeZone,
    reduceIqamahs(now, iqamahs),
    salatLabels
  );

  const nextPrayer = fard.nextPrayer();
  const nextPrayerTime = nextPrayer ? fard.timeForPrayer(nextPrayer) : null;
  const diff = nextPrayerTime ? nextPrayerTime.getTime() - now.getTime() : Number.POSITIVE_INFINITY;

  return {
    ...result,
    istijaba: now.getDay() === FRIDAY && nextPrayer === 'maghrib' && diff < ONE_HOUR,
  };
};

const monthly = (
  salatLabels: SalatLabels,
  calculation: CalculationConfig,
  targetDate: Date = new Date()
): MonthlyResult => {
  const times: DailyResult[] = [];
  const iqamahs: IqamahData = {};
  const now = new Date(targetDate.getTime());
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  for (let i = 1; i <= 31; i += 1) {
    now.setDate(i);
    const timings = daily(salatLabels, calculation, now, iqamahs);
    times.push(timings);

    if (now > lastDayOfMonth) {
      break;
    }
  }

  const monthName = now.toLocaleDateString('en-US', {
    month: 'long',
  });

  return {
    label: `${monthName} ${targetDate.getFullYear()}`,
    dates: times,
  };
};

const yearly = (
  salatLabels: SalatLabels,
  calculation: CalculationConfig,
  targetDate: Date = new Date()
): YearlyResult => {
  const times: DailyResult[] = [];
  const iqamahs: IqamahData = {};
  const now = new Date(targetDate.getFullYear(), 0, 1);
  const lastDayOfYear = new Date(now.getFullYear(), 11, 31);

  while (now <= lastDayOfYear) {
    const timings = daily(salatLabels, calculation, now, iqamahs);
    times.push(timings);

    now.setDate(now.getDate() + 1);
  }

  return {
    label: targetDate.getFullYear(),
    dates: times,
  };
};

const isFard = (event: string): boolean =>
  ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].includes(event);

export { daily, monthly, yearly, getIqamahTime, isFard };
export type {
  CalculationConfig,
  DailyResult,
  MonthlyResult,
  YearlyResult,
  Timing,
  SalatLabels,
  IqamahData,
};
