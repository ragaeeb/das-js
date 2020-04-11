const SalatEvents = require('./SalatEvents');

const SalatNames = {
  Fajr: 'Fajr',
  Sunrise: 'Sunrise',
  Dhuhr: 'Dhuhr',
  Asr: 'ʿAṣr',
  Maghrib: 'Maġrib',
  Isha: 'ʿIshāʾ',
  HalfNight: '1/2 Night Begins',
  LastThirdNight: 'Last 1/3 Night Begins',
};

const formatTime = (t, timeZone) => {
  const date = new Date(t);

  const time = date.toLocaleTimeString('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return time;
};

const formatDate = (result) => {
  if (!result[SalatEvents.Fajr]) {
    return '';
  }

  return new Date(result[SalatEvents.Fajr]).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Returns a list of formatted times ordered from earliest to latest.
 * @param {*} calculationResult The result of the calculation times (object).
 * @param {*} latitude
 * @param {*} longitude
 */
const formatAsObject = (calculationResult, timeZone) => {
  const timings = Object.entries(calculationResult)
    // sort the events from earliest to latest (to sort from fajr - isha)
    .sort(([, value], [, nextValue]) => value - nextValue)
    .map(([event, t]) => {
      return {
        label: SalatNames[event],
        time: t ? formatTime(t, timeZone) : '',
      };
    });

  return { date: formatDate(calculationResult), timings };
};

module.exports = formatAsObject;
