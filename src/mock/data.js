import { v1 as uuidv1 } from 'uuid';

// HEAD DATA
export const headData = {
  title: 'Dār as-Ṣaḥābah',
  lang: 'en',
  description: 'Dār as-Ṣaḥābah Association',
};

// HERO DATA
export const heroData = {
  cta: 'Why our Fajr timing is different from other masājid?',
  latitude: '45.3506',
  longitude: '-75.793',
  scheduleLabel: 'How To Pray The ʿĪd Prayer At Home',
  schedulePdf: 'https://s7.gifyu.com/images/eid-home-description.png',
  timeZone: 'America/Toronto',
  fajrPdf: 'https://archive.org/download/fajr-letter-das/Letter_Fajr-Ishaa_Ottawa-2016-06-27.pdf',
};

// ABOUT DATA
export const aboutData = {
  img: 'profile.jpg',
  paragraphOne:
    'As-Ṣaḥāba Muṣallá was officially opened in October 2005 and has been serving the Ramsey community as a place for Muslims to pray 5 times a day, (including the Jumu’ah Prayer) ever since. Lectures on Islām are held on a regular basis and the presence of the Muṣallá has affected the Ramsey area in a positive way, walḥamdulillāh.',
  paragraphTwo: 'As a service to the Muslim community, Dār As-Ṣaḥāba Provides the Following:',
  services: [
    {
      title: 'Five Daily Ṣalawāt',
      body:
        'The muṣallá is open to allow Muslims (both brothers and sisters) a location to pray their five daily ṣalawāt.',
    },
    {
      title: 'Ṣalat al-Jum’uah',
      body:
        'Every week, salat-ul-Jum’uah is held at Dār As-Ṣaḥāba (due to limited space, for brothers only), where the khaṭīb deliver the khuṭbah strictly adhering to the Qur’ān & the Sunnah.',
    },
    {
      title: 'Ṣalat al-Tarawīḥ',
      body:
        'During the month of Ramaḍān, every evening Ṣalat al-Tarawīḥ is held (due to limited space, for brothers only).',
    },
    {
      title: 'Ṣalat al-‘Īd',
      body:
        'For both ‘Īd al-Fiṭr and ‘Īd al-Aḍḥá, Dār As-Ṣaḥāba holds ‘Īd prayers for the community at a neighbouring park, weather permitting, or community centre.',
    },
    {
      title: 'Lectures',
      body:
        'A few knowledgeable brothers remind us of the importance of various facets of our dīn in weekly gatherings. Occasionally, tele-lectures of our esteemed scholars are streamed via the internet at the muṣallá for all to hear.',
    },
    {
      title: 'Distributing reading and audio/visual materials',
      body:
        'To those who are interested about Islām, we have provided copies of the Qur’an with translations in the English and French languages; for non-Arabic speaking Muslims, we have also provided translated copies of the Qur’ān in other languages such as Spanish, Somali, Farsi, Urdu, Pashto, etc. As well, we have provided books and tapes/CDs for people ranging from those interested in Islām to those that are interested in further pursuing Islām academically.',
    },
  ],
  resume: 'https://www.resumemaker.online/es.php', // if no resume, the button will not show up
};

export const donationsData = {
  expenses: [
    { label: 'Rent', value: 3400 },
    { label: 'Utilities', value: 600 },
    { label: 'Cleaning', value: 240 },
    { label: 'Phone/Internet', value: 117 },
    { label: 'Supplies', value: 160 },
  ],
};

// PROJECTS DATA
export const projectsData = [
  {
    id: uuidv1(),
    img: 'project.jpg',
    title: '',
    info: '',
    info2: '',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  },
  {
    id: uuidv1(),
    img: 'project.jpg',
    title: '',
    info: '',
    info2: '',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  },
  {
    id: uuidv1(),
    img: 'project.jpg',
    title: '',
    info: '',
    info2: '',
    url: '',
    repo: 'https://github.com/cobidev/react-simplefolio', // if no repo, the button will not show up
  },
];

// CONTACT DATA
export const contactInfo = {
  cta:
    'Feel free to drop by the muṣallá at any time to perform the congregational prayers and to partake in the activities. If you would require help with learning about Islām and wish to speak to one of the members of the administration, please contact us through the website first so that we can schedule an appointment with you at a convenient time in shā’ Allāh.',
  emailButton: 'Email Us',
  email: 'dar.as.sahaba@gmail.com',
  telButton: 'Call Us',
  tel: '+16133215459',
};

// FOOTER DATA
export const footerData = {
  networks: [
    {
      id: uuidv1(),
      name: 'twitter',
      url: 'https://twitter.com/DarAsSahaba',
    },
    {
      id: uuidv1(),
      name: 'soundcloud',
      url: 'https://soundcloud.com/DarAsSahaba',
    },
    {
      id: uuidv1(),
      name: 'instagram',
      url: 'https://instagram.com/DarAsSahaba',
    },
    {
      id: uuidv1(),
      name: 'facebook',
      url: 'https://facebook.com/DarAsSahaba',
    },
    {
      id: uuidv1(),
      name: 'telegram',
      url: 'https://t.me/DarAsSahaba',
    },
    {
      id: uuidv1(),
      name: 'youtube',
      url: 'https://www.youtube.com/channel/UC4JRttylAMmZubEmFOjX7Vg',
    },
  ],
};

// Github start/fork buttons
export const githubButtons = {
  isEnabled: false, // set to false to disable the GitHub stars/fork buttons
};
