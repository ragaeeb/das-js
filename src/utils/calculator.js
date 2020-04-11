const SunCalc = require('suncalc');
const { CalculationMethod, PrayerTimes, Coordinates } = require('adhan');
const SalatEvents = require('./SalatEvents');

const extractTime = data => data.getTime();

const calculate = (date, latitude, longitude) => {
  const {
    nauticalDawn: fajr,
    sunrise,
    sunset: maghrib,
    nauticalDusk: isha,
    solarNoon: dhuhr,
  } = SunCalc.getTimes(date, latitude, longitude);

  const coordinates = new Coordinates(latitude, longitude);
  const { asr } = new PrayerTimes(coordinates, date, CalculationMethod.MuslimWorldLeague());

  return {
    fajr,
    sunrise,
    dhuhr,
    asr,
    maghrib,
    isha,
  };
};

const calculateForCoordinates = (latitude, longitude, now = new Date()) => {
  now.setUTCHours(12); // we set it to 12 since we want it for that specific day, so we should get a good average
  now.setUTCMinutes(0);
  now.setUTCSeconds(0);
  now.setUTCMilliseconds(0);

  const today = calculate(now, Number(latitude), Number(longitude));

  const next = new Date(now.getTime());
  next.setUTCHours(12); // for some reason by default it sets it to 5AM
  next.setUTCDate(next.getUTCDate() + 1);

  const tomorrow = calculate(next, Number(latitude), Number(longitude));

  const halfNight = new Date((today.maghrib.getTime() + tomorrow.fajr.getTime()) / 2);

  const diff = tomorrow.fajr.getTime() - today.maghrib.getTime();
  const lastThirdNight = new Date(tomorrow.fajr.getTime() - diff / 3);

  return {
    [SalatEvents.Fajr]: extractTime(today.fajr),
    [SalatEvents.Sunrise]: extractTime(today.sunrise),
    [SalatEvents.Dhuhr]: extractTime(today.dhuhr),
    [SalatEvents.Asr]: extractTime(today.asr),
    [SalatEvents.Maghrib]: extractTime(today.maghrib),
    [SalatEvents.Isha]: extractTime(today.isha),
    [SalatEvents.HalfNight]: extractTime(halfNight),
    [SalatEvents.LastThirdNight]: extractTime(lastThirdNight),
  };
};

module.exports = calculateForCoordinates;
