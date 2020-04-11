const gmod = (n, m) => ((n % m) + m) % m;

const kuwaiticalendar = (adjust, now) => {
  let today = now;

  if (adjust) {
    const adjustmili = 1000 * 60 * 60 * 24 * adjust;
    const todaymili = today.getTime() + adjustmili;
    today = new Date(todaymili);
  }

  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  let m = month + 1;
  let y = year;
  if (m < 3) {
    y -= 1;
    m += 12;
  }

  let a = Math.floor(y / 100);
  let b = 2 - a + Math.floor(a / 4);
  if (y < 1583) b = 0;
  if (y === 1582) {
    if (m > 10) b = -10;
    if (m === 10) {
      b = 0;
      if (day > 4) {
        b = -10;
      }
    }
  }

  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;

  b = 0;
  if (jd > 2299160) {
    a = Math.floor((jd - 1867216.25) / 36524.25);
    b = 1 + a - Math.floor(a / 4);
  }
  const bb = jd + b + 1524;
  let cc = Math.floor((bb - 122.1) / 365.25);
  const dd = Math.floor(365.25 * cc);
  const ee = Math.floor((bb - dd) / 30.6001);
  day = bb - dd - Math.floor(30.6001 * ee);
  month = ee - 1;
  if (ee > 13) {
    cc += 1;
    month = ee - 13;
  }
  year = cc - 4716;
  let wd;

  if (adjust) {
    wd = gmod(jd + 1 - adjust, 7) + 1;
  } else {
    wd = gmod(jd + 1, 7) + 1;
  }

  const iyear = 10631 / 30;
  const epochastro = 1948084;
  const shift1 = 8.01 / 60;

  let z = jd - epochastro;
  const cyc = Math.floor(z / 10631);
  z -= 10631 * cyc;
  const j = Math.floor((z - shift1) / iyear);
  const iy = 30 * cyc + j;
  z -= Math.floor(j * iyear + shift1);
  let im = Math.floor((z + 28.5001) / 29.5);
  if (im === 13) {
    im = 12;
  }

  const id = z - Math.floor(29.5001 * im - 29);

  // calculated day (CE), calculated month (CE), calculated year (CE), julian day number, weekday number, islamic date, islamic month, islamic year
  return [day, month, year, jd - 1, wd - 1, id, im - 1, iy];
};

const writeIslamicDate = (adjustment, today) => {
  const wdNames = [
    'al-ʾAḥad',
    'al-ʾIthnayn',
    'ath-Thulāthāʾ',
    'al-ʾArbiʿāʾ',
    'al-Khamīs',
    'al-Jumuʿah',
    'al-Sabt',
  ];

  const iMonthNames = [
    'al-Muḥarram',
    'Ṣafar',
    'Rabīʿ al-ʾAwwal',
    'Rabīʿ al-ʾĀkhir',
    'Jumadā al-ʾŪlā',
    'Jumādā al-ʾĀkhirah',
    'Rajab',
    'Shaʿbān',
    'Ramaḍān',
    'Shawwāl',
    'Ḏū al-Qaʿdah',
    'Ḏū al-Ḥijjah',
  ];

  const iDate = kuwaiticalendar(adjustment, today);
  return `${wdNames[iDate[4]]}, ${iDate[5]} ${iMonthNames[iDate[6]]} ${iDate[7]} H`;
};

export default writeIslamicDate;
