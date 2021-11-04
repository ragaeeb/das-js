const { CalculationParameters, PrayerTimes, SunnahTimes, Coordinates } = require('adhan');

const ONE_HOUR = 60 * 60 * 1000;
const FRIDAY = 5;

const formatTime = (t, timeZone) => {
  const time = new Date(t).toLocaleTimeString('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return time;
};

const formatDate = (fajr) =>
  new Date(fajr).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

/**
 * Returns a list of formatted times ordered from earliest to latest.
 * @param {*} calculationResult The result of the calculation times (object).
 * @param {*} latitude
 * @param {*} longitude
 */
const formatAsObject = (calculationResult, timeZone, iqamahs, salatLabels) => {
  const timings = Object.entries(calculationResult)
    // sort the events from earliest to latest (to sort from fajr - isha)
    .sort(([, value], [, nextValue]) => value - nextValue)
    .map(([event, t]) => ({
      event,
      label: salatLabels[event],
      time: formatTime(t, timeZone),
      value: t,
      ...(iqamahs[event] && { iqamah: iqamahs[event] }),
    }));

  return { date: formatDate(calculationResult.fajr), timings };
};

const getIqamahInRange = (day, monthData) => {
  if (typeof monthData === 'string') {
    return monthData;
  }

  if (Array.isArray(monthData)) {
    return monthData.join(', ');
  }

  const ranges = Object.keys(monthData || {});

  for (let i = ranges.length - 1; i >= 0; i -= 1) {
    const range = ranges[i];

    if (parseInt(day, 10) >= parseInt(range, 10)) {
      const rangeTime = monthData[range];

      if (Array.isArray(rangeTime)) {
        return rangeTime.join(', ');
      }

      return rangeTime;
    }
  }

  return null;
};

const reduceIqamahs = (now, iqamahs) => {
  const month = now.getMonth() + 1;
  const day = now.getDate().toString();
  return Object.entries(iqamahs).reduce(
    (result, [salat, data]) => ({
      ...result,
      [salat]: typeof data === 'string' ? data : getIqamahInRange(day, data[month]),
    }),
    {}
  );
};

const getIqamahTime = (now, iqamahs, id) => reduceIqamahs(now, iqamahs)[id];

const daily = (
  salatLabels,
  { latitude, longitude, timeZone, method, fajrAngle, ishaAngle },
  now = new Date(),
  iqamahs = {}
) => {
  const fard = new PrayerTimes(
    new Coordinates(Number(latitude), Number(longitude)),
    now,
    new CalculationParameters(method, fajrAngle, ishaAngle)
  );

  const sunan = new SunnahTimes(fard);
  const { coordinates, calculationParameters, date, ...rest } = { ...fard, ...sunan };

  const result = formatAsObject(rest, timeZone, reduceIqamahs(now, iqamahs), salatLabels);

  const nextPrayer = fard.nextPrayer();
  const diff = fard.timeForPrayer(nextPrayer) - now;

  return {
    ...result,
    istijaba: now.getDay() === FRIDAY && nextPrayer === 'maghrib' && diff < ONE_HOUR,
  };
};

const monthly = (salatLabels, calculation, targetDate = new Date()) => {
  const times = [];
  const iqamahs = {};
  const now = new Date(targetDate.getTime());
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // https://stackoverflow.com/questions/222309/calculate-last-day-of-month-in-javascript

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

const yearly = (salatLabels, calculation, targetDate = new Date()) => {
  const times = [];
  const iqamahs = {};
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

const isFard = (event) => ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].includes(event);

module.exports = {
  daily,
  monthly,
  yearly,
  getIqamahTime,
  isFard,
};
