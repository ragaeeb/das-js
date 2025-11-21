import type { CalculationConfig, IqamahData, SalatLabels } from '../utils/calculator';

interface HeroLink {
  [key: string]: string;
}

interface HeroData {
  calculation: CalculationConfig;
  labels: SalatLabels;
  hijriAdjust: number;
  links: HeroLink;
  istijabaText: string;
  iqamahs?: IqamahData;
}

interface SocialNetwork {
  name: string;
  url: string;
}

interface PrivacyPolicy {
  effectiveDate: string;
}

interface FooterData {
  networks: SocialNetwork[];
  privacyPolicy: PrivacyPolicy;
}

export const heroData: HeroData = {
  calculation: {
    fajrAngle: 12,
    ishaAngle: 12,
    latitude: '45.3506',
    longitude: '-75.793',
    method: 'NauticalTwilight',
    timeZone: 'America/Toronto',
  },
  labels: {
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asr: 'ʿAṣr',
    maghrib: 'Maġrib',
    isha: 'ʿIshāʾ',
    middleOfTheNight: '1/2 Night Begins',
    lastThirdOfTheNight: 'Last 1/3 Night Begins',
    tarawih: 'Tarawīḥ',
  },
  hijriAdjust: 0,
  links: {
    fajr: 'https://archive.org/download/fajr-letter-das/Letter_Fajr-Ishaa_Ottawa-2016-06-27.pdf',
  },
  istijabaText:
    'The Messenger of Allāh ﷺ said, "Friday has twelve meaning hours to it. There is no Muslim who asks Allāh for anything (during it) except that Allāh gives it to him so seek it during the last hour after ʿaṣr." [Abū Dāwūd al-Sijistānī, al-Sunan #1048] [Al-Albānī: Ṣaḥīḥ]',
};

export const footerData: FooterData = {
  networks: [
    {
      name: 'twitter',
      url: 'https://twitter.com/DarAsSahaba',
    },
    {
      name: 'soundcloud',
      url: 'https://soundcloud.com/DarAsSahaba',
    },
    {
      name: 'instagram',
      url: 'https://instagram.com/DarAsSahaba',
    },
    {
      name: 'facebook',
      url: 'https://facebook.com/DarAsSahaba',
    },
    {
      name: 'telegram',
      url: 'https://t.me/DarAsSahaba',
    },
    {
      name: 'youtube',
      url: 'https://www.youtube.com/channel/UC4JRttylAMmZubEmFOjX7Vg',
    },
  ],
  privacyPolicy: {
    effectiveDate: '18 July 2020',
  },
};

export type { HeroData, FooterData, SocialNetwork, PrivacyPolicy };
