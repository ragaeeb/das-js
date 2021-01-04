# [![das-js](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/qnmnp9/master&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/qnmnp9/runs)

![Gatsby Build](https://github.com/ragaeeb/das-js/workflows/Gatsby%20Build/badge.svg)
![Tests](https://github.com/ragaeeb/das-js/workflows/Tests/badge.svg)
![Deploy release](https://github.com/ragaeeb/das-js/workflows/Deploy%20release/badge.svg)
![Check Markdown links](https://github.com/ragaeeb/das-js/workflows/Check%20Markdown%20links/badge.svg)
[![GitHub](https://img.shields.io/github/license/ragaeeb/das-js?color=blue)](https://github.com/ragaeeb/das-js/blob/master/LICENSE.md) ![GitHub stars](https://img.shields.io/github/stars/ragaeeb/das-js) ![GitHub forks](https://img.shields.io/github/forks/ragaeeb/das-js) ![GitHub issues](https://img.shields.io/github/issues/ragaeeb/das-js)

## A clean, beautiful and responsive template for masājid and Islāmic centres.

<h2>
  <img src="https://github.com/ragaeeb/das-js/blob/master/examples/example.gif" alt="Islamic Simplefolio" width="600px" />
  <br>
  <img src="https://github.com/ragaeeb/das-js/blob/master/examples/monthly.jpg" alt="Monthly Schedule" width="600px" />
  <br>
  <img src="https://github.com/ragaeeb/das-js/blob/master/examples/yearly.jpg" alt="Yearly Schedule" width="600px" />
  <br>
  <img src="https://github.com/ragaeeb/das-js/blob/master/examples/all_posts.jpg" alt="All Posts" width="600px" />
  <br>
  <img src="https://github.com/ragaeeb/das-js/blob/master/examples/sample_post.jpg" alt="Sample Post" width="600px" />
  <br>
  <img src="https://github.com/ragaeeb/das-js/blob/master/examples/mailing_list.jpg" alt="Newsletter" width="600px" />
  <br>
  <img src="https://github.com/ragaeeb/das-js/blob/master/examples/privacy.jpg" alt="Privacy Policy" width="600px" />
</h2>

## Features

⚡️ Modern UI Design + Reveal Animations\
⚡️ One Page Layout built with `React`, exported as `Preact` for optimization\
⚡️ Styled with Bootstrap v4.3 + Custom SCSS\
⚡️ Fully Responsive\
⚡️ Lazy Loading for Better SEO\
⚡️ Image optimization with Gatsby\
⚡️ Accurate and dynamic prayer times with support for dynamic iqāmah times\
⚡️ Ability to view upcoming and previous prayer times.
⚡️ Hijri date display\
⚡️ Automatic generation of monthly prayer timetable\
⚡️ Beautiful visual graph generation of annual prayer timings\
⚡️ Up to `1000` blog posts\
⚡️ Beautiful visual pie chart of monthly expenses for what your audience will be donating for\
⚡️ Privacy Policy built-in and included\
⚡️ Clear documentation steps on how to replicate for your masjid\
⚡️ Built in dynamic last-update feature with direct-link to commit history\
⚡️ Well unit-tested\
⚡️ Integrated support for 1:1 engagement with audience using `Chatwoot`.

To view a demo example, **[click here](https://dar-as-sahaba.com/)**\

---

## Getting Started 🚀

These instructions will get your Islāmic centre up and running from scratch bootstrapped with `Islamic Simplefolio`.

### Domain name registration

Go to a domain name registration platform and register a domain name. In this example we will use [namecheap.com](https://namecheap.com) and purchase a domain name for your masjid. In this example we will assume we have registered [dar-as-sahaba.com](https://dar-as-sahaba.com). Note that you do not need any of add-ons like SSL, or anything else. However for privacy reasons I suggest you add in the `Free Whoisguard` add-on.

### Cloudflare

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/cloudflare_dns.jpg" alt="Nameserver settings on Cloudflare" />

`Cloudflare` provides websites a set of free services such as `DDOS` protection and other speed optimizations that will be useful. We will be changing our name servers to Cloudflare to let it route our traffic.

1. Go to [Cloudflare](https://cloudflare.com), create an account, and then `Add a Site`.
2. Choose the `FREE` option.
3. Add the domain-name you have just registered (ie: [dar-as-sahaba.com](https://dar-as-sahaba.com))
4. Once it asks you to validate all the DNS information, simply continue.
5. Once everything is complete, `Cloudflare` will give you some name servers you need to replace your existing ones on `Namecheap` with.
6. Open another tab on your browser and go back to Namecheap, and click on `Manage` to edit your domain name settings.
7. Under your domain, in the `Domain` tab, you will see a `NAMESERVERS` section, from the dropdown use `Custom DNS`.
8. In the two fields, set the two `something.ns.cloudflare.com` addresses that `Cloudflare` gave you.
9. Save the settings.
10. Go back on `Cloudflare` and click the `Recheck Nameservers` button.

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/namecheap_dns.jpg" alt="Nameserver Settings on Namecheap" />

At this point this may take some time (ie: usually an hour or so) to change the nameservers over.

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/cloudflare_success.jpg" alt="Cloudflare success message" />

### Technical Part (Cloning & Configuration)

This is the slightly technical part. But you won't have to download any tools, but you will have to create a few accounts to get everything to work properly.

#### Placeholders

Go to `/src/mock/data.js` and fill your information that are specific for your centre:

##### Hero Section

This section modifies what appears at the very top of the page such as prayer timings, and hijri dates and links.

###### Calculation Parameters

These are configured using `12` degrees for the Fajr and ʿIshāʾ twilight angles (ie: Nautical Twilight) for the most accurate version of calculating the `Fajr` time instead of using the other conventions. Note that using other conventions that your region and other masājid in your area may be using may not result in the most accurate time which is vitally important because it may during the month of Ramaḍān eating Suḥūr later than the allowed time, or praying Fajr before its actual entrance! [Read more about this here](https://ia802902.us.archive.org/32/items/fajr-letter-das/Letter_Fajr-Ishaa_Ottawa-2016-06-27.pdf). Change these at your own discretion.

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/geo.jpg" alt="Getting latitude and longitude for an address" />

The only values you should need to modify here are `latitude`, `longitude` and replace those numbers with the exact geographical coordinates for [your Islāmic centre](https://www.latlong.net/convert-address-to-lat-long.html). You will also need to replace the `timeZone` which you can find [here](http://www.timezoneconverter.com/cgi-bin/findzone).

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/timezone.png" alt="Getting a timezone for your location" />

```javascript
export const heroData = {
  calculation: {
    fajrAngle: 12,
    ishaAngle: 12,
    latitude: '45.3506',
    longitude: '-75.793',
    method: 'NauticalTwilight',
    timeZone: 'America/Toronto',
  },
  …
```

###### Labels

If you want to customize the labels of each of the prayer times and events you can do so here.

```javascript
  …
  labels: {
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asr: 'ʿAṣr',
    maghrib: 'Maġrib',
    isha: 'ʿIshāʾ',
    middleOfTheNight: '1/2 Night Begins',
    lastThirdOfTheNight: 'Last 1/3 Night Begins',
    jumuah: 'Khuṭbah al-Jumuʿah',
  },
  …
```

###### Iqāmah Schedule

Some masājid have some variable timings for the different prayers that do not remain upon a fixed schedule throughout the year. As a result this section is a bit more complex, to allow some more customization.

For each of the events (ie: `fajr`, `dhuhr`, `jumuah`, etc.) you can customize exactly when the Iqāmah for that prayer is made in one of three ways.

###### Fixed Iqāmah Timings

If your timings for a prayer will always be a fixed pattern, you can just include them in text like this:

```javascript
  …
  iqamahs: {
    …
    fajr: '+20 mins',
    dhuhr: '+5 mins',
    …
  …
```

This means that no matter what time of the year, the iqāmah for Fajr will always be `20 minutes` after the aḏān and the iqāmah for Dhuhr will always be `5 minutes` after the aḏān. You can replace it with any text there and it will show up, it does not have to follow the `+X minutes` pattern, although this is a good convention to use to remain consistent.

###### Multiple Iqāmahs

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/iqamahs.jpg" alt="Setting multiple iqāmah times" />

If you have more than one congregational prayer (ie: you hold a second jamāʿah), you can enter it in a list like this:

```javascript
  …
  iqamahs: {
    …
    fajr: ['4:00 AM', '4:35 AM'],
    dhuhr: ['+5 mins', '+30 mins'],
    …
  …
```

###### Variable Iqāmahs

If you have very specific timings that vary throughout the year, you will have to be a bit more detailed. For the specific prayer that you need variable iqāmah timings for, you will have to list out all the months (ie: 1-12 with `1` for `January`, and `12` for `December`), and then provide the ranges for each.

The following example shows a masjid for which in `January` the Dhuhr prayer iqāmah will be at `12:30 PM`, then in `February`, they will hold two congregational prayers, one at `12:30 PM`, and one at `1:00 PM`.

From `March 1st` (until `March 7th` inclusive), the iqāmah will be at `12:30 PM`, then starting `March 8th` (until `March 20th` inclusive) the iqāmah will be at `1:30 PM`. Finally starting on `March 21st` until the end of the month, there will be two congregational prayers, one at `1:30 PM` and the other at `1:45 PM`.

Then for the rest of the year, the Dhuhr iqāmah will be fixed to `1:30 PM`.

You can add as many ranges as you want.

```javascript
  …
  iqamahs: {
    …
    dhuhr: {
      1: '12:30 PM',
      2: ['12:30 PM', '1:00 PM'],
      3: {
        1: '12:30 PM',
        8: '1:30 PM',
        21: ['1:30 PM', '1:45 PM'],
      },
      4: '1:30 PM',
      5: '1:30 PM',
      6: '1:30 PM',
      7: '1:30 PM',
      8: '1:30 PM',
      9: '1:30 PM',
      10: '1:30 PM',
      11: '12:30 PM',
      12: '12:30 PM',
    },
    …
  …
```

###### Adjusting Hijri Date

Sometimes throughout the year the calculated Hijri date can differ from the Islāmic date due to moonsightings which are supposed to take precedence over the calculated date. This is especially important in months such as `Ramaḍān` where your centre may be following the moonsighting of the locality to determine the Islamic date. During those times you may need to adjust the calculation by modifying the `hijriAdjust` value. `-1` means show the Hijri date to be `1 day before` the calculated one, `-2` means `2 days before`, `0` means leave it exactly as calculated, `1` means show the Hijri date to be `1 day after` the calculated one, `2` means it should be `2 days` after the calculated one, etc.

```javascript
  …
export const heroData = {
  …
  hijriAdjust: -1,
  …
```

###### Links

Sometimes you may need some additional details you want to provide to your audience regarding specific prayers. For example if your `Fajr` prayer timing differs from the other masājid in your locality, you may want to explain why. You can do this by adding the specific prayer you want to add this link for with the URL you want to link that prayer to.

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/fajr_link.jpg" alt="Attaching a link to Fajr timing" />

The following example shows both the Fajr and Dhuhr prayer labels that will be rendered as clickable links.

```javascript
  …
export const heroData = {
  …
  links: {
    fajr: 'https://archive.org/download/fajr-letter-das/Letter_Fajr-Ishaa_Ottawa-2016-06-27.pdf',
    dhuhr: 'https://anotherlink.pdf',
  },
  …
```

###### Calendar Link

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/calendar.jpg" alt="Google Calendar link" />

Instead of duplicating your events information on the website, it is optimal for you to create your events on `Google Calendar` and then link to it on the website so your audience can see the most up to date information about it.

```javascript
  …
export const heroData = {
  …
  calendarUrl: 'https://calendar.google.com/calendar/embed?src=60me58mrktt0lt24mijjkhddvc%40group.calendar.google.com&ctz=America%2FNew_York',
  …
```

If you don't want to include a calendar link, simply remove the `calendarUrl` entry from `data.js`.

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/calendar_share.jpg" alt="Making a Google Calendar public" />

To create a calendar for your Islāmic centre:

1. Go to [https://calendar.google.com](https://calendar.google.com).
2. On the left-side, under `Other Calendars`, click `Create New Calendar`.
3. Give it a name, description and set the timezone.
4. Click `Create Calendar`.
5. On the left side click on your newly created Calendar.
6. Under `Calendar Settings` scroll down to `Access Permissions`.
7. Check the `Make available to public` and ensure `See all event details` is selected.
8. Scroll down to `Integrate Calendar`, and copy the `Public URL to the calendar` value.
9. This is the URL we will use in the `calendarUrl` to allow your audience to access your centre's events.

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/calendar_url.jpg" alt="Getting the Calendar URL" />

###### Sāʾ al-Istijābah

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/istijaba.jpg" alt="Last Hour on Friday" />

You can display a reminder for all those who visit your website at the time when duʿāʾ is accepted in the last hour of Friday. You can show them a hadith or some custom text in the `istijabaText` field. If you do not want to display anything, then remove that.

```javascript
  …
export const heroData = {
  …
  istijabaText: 'The text you want to show',
  …
```

##### About Section

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/about.jpg" alt="About Us Section" />

This is the information that will be displayed right underneath the updates. You can add as many services as you want by copying and pasting the `title`, and `body` patterns.

```javascript
export const aboutData = {
  paragraphOne: 'First paragraph',
  paragraphTwo: 'Second paragraph',
  services: [
    {
      title: 'Five Daily Ṣalawāt',
      body:
        'The muṣallá is open to allow Muslims (both brothers and sisters) a location to pray their five daily ṣalawāt.',
    },
    {
      title: 'Ṣalat al-Jumʿuah',
      body:
        'Every week, salat-ul-Jumʿuah is held (due to limited space, for brothers only), where the khaṭīb deliver the khuṭbah strictly adhering to the Qur’ān & the Sunnah.',
    },
  ],
};
```

##### Donate Section

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/donate.jpg" alt="Donate Section" />

You can set all the ways your audience can donate to your Islāmic centre here.

For the `PayPal` you can either use a `paypal.me` link, or use a [payment button link](https://www.paypal.com/buttons/).

The `etransfer` email address will automatically be scrambled so that spam bots do not pick it up, but it should show up fine for the users.

In the `expenses` field, you can list out the individual expenses for your Islāmic centre that your audience will be donating to support. The app will automatically add the values up to create a total, and build a pie chart breaking down each expense.

You can remove any of the fields if you do not want to show them.

```javascript
export const donationsData = {
  directDeposit: 'Direct deposit information',
  etransfer: 'youremailaddress@gmail.com',
  expenses: [
    { label: 'Rent', value: 1000 },
    { label: 'Utilities', value: 600 },
  ],
  khutbah: 'After the Friday sermon, donations for the muṣallá are collected.',
  paypal: 'https://paypal.me/yourbrand',
  reminderDawah: 'Reminder text here',
  reminderReward: 'Another reminder about ṣadaqah',
};
```

##### Footer Section

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/footer.png" alt="Footer Section" />

Set your center's social media information here. You can set platforms such as [twitter](https://twitter.com), [soundcloud](https://soundcloud.com), [instagram](https://instagram.com), [facebook](https://facebook.com), [telegram](https://t.me), and [youtube](https://youtube.com).

Set the `effectiveDate` to the date your website launched live to enforce the `Privacy Policy` for your users.

```javascript
export const footerData = {
  networks: [
    {
      name: 'twitter',
      url: 'https://twitter.com/DarAsSahaba',
    },
  ],
  privacyPolicy: {
    effectiveDate: '18 July 2020',
  },
};
```

##### Contact Section

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/contact.jpg" alt="Contact Section" />

Set your centre's contact information here. The email address will automatically be scrambled to be protected from spam bots but should be visible to the user.

If you do not want to display a specific attribute, simply omit it.

```javascript
export const contactInfo = {
  address: 'Your masjid address',
  cta: 'Some information here about when they can come see your centre.',
  emailButton: 'Email Us',
  mailingList: 'Mailing List',
  email: 'yourmeail@gmail.com',
  mapUrl: 'https://goo.gl/maps/14LYnHa7R9sZsQBG7',
  telButton: 'Call Us',
  tel: '+12345678',
};
```

#### STYLES

Change the color theme of the website ( choose 2 colors to create a gradient ):

Go to `src/styles/abstracts/_variables.scss` and only change the values on these classes `$main-color` and `$secondary-color` to your prefered HEX color

```scss
// Default values
$main-color: #02aab0;
$secondary-color: #00cdac;
```

#### Site Properties

Go to `package.json` and only change the values on these properties `homepage`, `author` and `description` to your brand.

```scss
// Default values
$main-color: #02aab0;
$secondary-color: #00cdac;
```

#### Images

Replace `/src/images/splash.jpg` and `/src/images/favicon.png` with images matching your brand.

The splash picture should be `2000` pixels in width, by `1200` pixels in height.

The favicon is used to display a visual of your website on the browser tab, it should be square `192` pixels and transparent.

#### CNAME

Replace the value of the `/static/CNAME` file with your domain. It should not contain the `https:` any other prefix but simply just `yourdomain.com`.

#### Environment Variables

Here we will be creating various accounts needed to get the most of your website.

##### Chatwoot

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/chatwoot.jpg" alt="Chatwoot setup" />

Chatwoot is used to allow your audience to message you directly from your website. You can reply either using the Chatwoot app, or via email.

1. Go to [chatwoot.com](https://chatwoot.com).
2. Click `Create an Account` and create your account.
3. Go to `Inboxes` on the left side.
4. Fill in the details for your inbox such as the title and welcome messages you want for it.
5. Once you finish you will be given a `websiteToken` value, copy that.
6. In your GitHub repository, go to `Settings`.
7. Go to `Secrets` on the left.
8. Click `New Repository Secret`.
9. In the `Name` put: `CHATWOOT_TOKEN`
10. In the value paste the website token you copied.

##### Cypress.io

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/cypress.jpg" alt="Cypress setup" />

Cypress.io is used for end-to-end testing of your website to ensure it stays up and running.

1. Go to [cypress.io](https://cypress.io).
2. Click `Sign Up` and create your account. I would recommend you sign up using your `GitHub` SSO.
3. Click `Create New Project` and name it `Website`.
4. Select your `CI` as `GitHub Actions`.
5. Edit `/cypress.json` and fill in the `projectId` with the one given from Cypress.io.
6. In your GitHub repository, go to `Settings`.
7. Go to `Secrets` on the left.
8. Click `New Repository Secret`.
9. In the `Name` put: `CYPRESS_RECORD_KEY`
10. In the value paste the record key you were given `cypress run --record --key PASTE_THIS_VALUE_IN`.

##### Mailchimp

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/mailchimp.jpg" alt="Mailchimp setup" />

Mailchimp is used to allow you to manage your mailing lists for free. You will be able to send out emails to your audience, have them sign up, or unsubscribe at any time without having to manage all of this yourself.

1. Go to [mailchimp.com](https://mailchimp.com).
2. Click `Sign Up` and create your account.
3. Click on the `Audience` tab on the left.
4. In the `Manage Audience` dropdown, select `Signup Forms`.
5. Select `Embedded Forms`.
6. [Scroll down](https://www.gatsbyjs.com/plugins/gatsby-plugin-mailchimp/) to find the HTML code text box.
7. Find the `<form action>` section and copy the URL that is within the double quotes. It should look something like `https://website.us7.list-manage.com/subscribe/post?u=9d342348&amp;id=e1234`
8. In your GitHub repository, go to `Settings`.
9. Go to `Secrets` on the left.
10. Click `New Repository Secret`.
11. In the `Name` put: `MAILCHIMP_ENDPOINT`
12. In the value paste the copied endpoint.

##### GitHub Access Token

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/github_access_token.png" alt="GitHub Access Token setup" />

To allow automated updates to the website, you will need to create a GitHub access token. You can see some details on that [here](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token).

1. Go to your GitHub [Personal Access Tokens](https://github.com/settings/tokens).
2. Click `Generate New Token`.
3. Name it `Website Publish Permissions`.
4. Check the `repo`, `workflow` to give it access.
5. Click `Generate Token` and copy the value you are given.
6. In your GitHub repository, go to `Settings`.
7. Go to `Secrets` on the left.
8. Click `New Repository Secret`.
9. In the `Name` put: `REPO_ACCESS_TOKEN`
10. In the value paste the copied token.

##### Segment.io and Amplitude

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/amplitude.png" alt="Amplitude setup" />

To maintain analytics of your audience we use `Segment.io` and `Amplitude`. The benefit of this is that you can switch your analytics providers at any time in the future.

1. Go to [segment.com](https://app.segment.com/signup) and create an account.
2. When it is in the setup stage, choose `Website` for the data source and enter your URL.
3. In the next step choose `Amplitude` for sending your data.
4. Click on `Connections` on the left side, and click `Sources`.
5. Click on your `Website` and go to the `Settings` tab at the top.
6. Click on `API Keys` and copy the `Write Key` shown.
7. In your GitHub repository, go to `Settings`.
8. Go to `Secrets` on the left.
9. Click `New Repository Secret`.
10. In the `Name` put: `SEGMENT_PROD_KEY`
11. In the value paste the copied write key.
12. Got to [amplitude.com](https://amplitude.com) and sign up for an account.
13. At the top click on `Set up on the Free Plan` and verify your email to get a Free account.
14. Once you have filled everything out click back on the `Set up on the Free Plan`.
15. Enter a name for your organization and select your URL.
16. Select `Create New Project` under `Projects`.
17. Name your project and click `Create`.
18. Note down your `API Key`.
19. Click `Add Data Source`.
20. Select `Segment`.
21. In Segment's dashboard, for the `Amplitude` settings for the destination, click `API Key`.
22. Click `Edit` and paste in the key and save.
23. Enable the `Amplitude Settings` toggle.
24. Go back on `Amplitude` dashboard, and click `Next` on the `Connect Segment` page.
25. Back on the `Segment` dashboard, click `Event Tester` and click `Send Event`.
26. It should now all be connected.

##### Sentry.io

<img src="https://github.com/ragaeeb/das-js/blob/master/examples/sentry.png" alt="Sentry.io setup" />

To track technical failures and bugs we use the `sentry.io` platform.

1. Go to [sentry.io](https://sentry.io) and create an account. I suggest using your GitHub SSO.
2. In the platform filter search for `Gatsby` and select it.
3. Select `Create Project`.
4. Copy the `dsn` that is provided.
5. In your GitHub repository, go to `Settings`.
6. Go to `Secrets` on the left.
7. Click `New Repository Secret`.
8. In the `Name` put: `SENTRY_DSN`
9. In the value paste the copied `dsn` value.

---

## Technologies used 🛠️

- [Gatsby](https://www.gatsbyjs.org/) - Static Site Generator
- [GraphQL](https://graphql.org/) - Query language for APIs
- [React](https://es.reactjs.org/) - Front-End JavaScript library
- [Bootstrap 4](https://getbootstrap.com/docs/4.3/getting-started/introduction/) - Front-End UI library
- [Sass](https://sass-lang.com/documentation) - CSS extension language

## Development

### Adding static images

If we ever want to import an image directly which Gatsby can process we can do it like this:

Let's say we wanted to include image from 'src/images/das_bg.jpg', we can do:

```

import dasBg from '../images/das_bg.jpg';

```

And then in the `render()`

```
<img src={dasBg} />
```

Learned from tutorial [Level Up Tutorials: Scott Tolinski - Pro Gatsby 2](https://www.leveluptutorials.com/tutorials/pro-gatsby-2)

## Authors

- **Ragaeeb Haq** - [https://github.com/ragaeeb](https://github.com/ragaeeb)

## License 📄

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments 🎁

The app is a fork of the beautiful [Gatsby Simplefolio](https://github.com/cobidev/gatsby-simplefolio) by [Jacobo Martinez](https://github.com/cobidev) with several modifications to adapt the content to be suitable for masājid.

It uses [adhan-js](https://github.com/batoulapps/adhan-js) to compute the dynamic prayer times.
