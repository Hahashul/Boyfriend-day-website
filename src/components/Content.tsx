/**
 * ============================================================
 *  Content.tsx — EVERYTHING you can personalize lives here.
 * ============================================================
 *  Edit the text, names, photos and songs in this one file and the
 *  whole website updates. You should not need to touch the components.
 *
 *  Tips
 *  - Strings can use ${PARTNER.nickname} etc. so names stay in sync.
 *    (Only inside `backticks`, not 'single' or "double" quotes.)
 *  - Photos go in  public/photos/   and are referenced as '/photos/name.jpg'
 *  - Songs go in   public/audio/    and are referenced as '/audio/name.mp3'
 *  - Use simple file names: lowercase, no spaces, no brackets. Use .jpg/.png
 *    (NOT .heic — Chrome and Android can't show it).
 *  - After editing, if the site in YOUR browser still shows old text, bump
 *    STORAGE_VERSION below (e.g. 'v1' -> 'v2').
 *    Visitors who open your link for the first time always see the new text.
 */

import type { PolaroidMemory, SongTrack, ScrapbookSettings } from '../types/scrapbook';

// ------------------------------------------------------------
// 0. HOUSEKEEPING
// ------------------------------------------------------------
/** Bump this whenever you change the content and your own browser still shows old stuff. */
export const STORAGE_VERSION = 'v20';

// ------------------------------------------------------------
// 1. THE TWO OF YOU  ✏️ change these first
// ------------------------------------------------------------
export const PARTNER = {
  fullName: 'Daksh Lalwani', // shown on the certificate
  firstName: 'Dakshi',          // used inside quiz questions
  nickname: 'Dakshi',              // used everywhere else ("Happy Boyfriend's Day, Nickname")
};

export const SENDER = {
  name: 'Aishu',                // that's you
};

/** Start of your relationship (YYYY-MM-DD) — drives the live days/hours counter. */
export const ANNIVERSARY_DATE = '2026-08-29';

export const DEFAULT_SETTINGS: ScrapbookSettings = {
  boyfriendName: PARTNER.fullName,
  senderName: SENDER.name,
  anniversaryDate: ANNIVERSARY_DATE,
  specialNickname: PARTNER.nickname,
  themeColor: '#BFE8FF',
};

// ------------------------------------------------------------
// 2. BROWSER TAB
// ------------------------------------------------------------
// NOTE: the tab title is set from here. The link-preview text (WhatsApp /
// Instagram previews) is read from index.html and metadata.json, so edit
// those two files as well if you want the preview to match.
export const SITE = {
  title: `Happy Boyfriend's Day, ${PARTNER.nickname}`,
};

// ------------------------------------------------------------
// 3. THEME SONG — the song on the top-right music button
// ------------------------------------------------------------
const THEME_TITLE = 'Kaise Hua';
const THEME_ARTIST = 'Vishal Mishra';
export const THEME_SONG = {
  url: '/audio/theme.mp3',
  playTitle: `Play “${THEME_TITLE}” — ${THEME_ARTIST}`,
  pauseTitle: `Pause “${THEME_TITLE}” — ${THEME_ARTIST}`,
  playingLabel: `“${THEME_TITLE}” — ${THEME_ARTIST} 🎵`,
  playLabel: `Play “${THEME_TITLE}” 🎵`,
};

// ------------------------------------------------------------
// 4. INTRO / ENVELOPE SCREEN
// ------------------------------------------------------------
export const INTRO = {
  envelopeText: 'Open me ♡', // written on the envelope drawing
  kicker: 'A little something for my favourite human',
  headline: `Happy Boyfriend's Day,`, // the nickname is added after this
  subtitle: '“Because you deserve more than just a text.”',
  // Funny messages shown one by one after clicking the envelope
  loadingMessages: [
    'Loading your surprise memories…',
    'Dusting off the old polaroids…',
    'Tuning the mixtape…',
    'Folding the love letter…',
    `Almost ready for you, ${PARTNER.nickname}…`,
  ],
  loadingSubtitle: 'Unboxing all our favorite memories...',
  loadingFooter: 'Please wait while your scrapbook unfolds...',
};

// ------------------------------------------------------------
// 5. TOP BAR, FOOTER & "NEXT" BUTTON
// ------------------------------------------------------------
export const NAV = {
  brand: `${PARTNER.nickname} & ${SENDER.name}`,
  home: { label: 'Home', icon: '🏠' },
  memories: { label: 'Polaroids', icon: '📸' },
  music: { label: 'Mixtape', icon: '📼' },
  quiz: { label: 'Games & Quiz', icon: '🎮' },
  letter: { label: 'Love Letter', icon: '💌' },
};

export const FOOTER = {
  title: `Happy Boyfriend's Day, ${PARTNER.nickname} ♡`,
};

/** The big button at the bottom of each page. */
export const NEXT_BUTTONS = {
  home: { label: 'View Our Photo Polaroids', icon: '📸' },
  memories: { label: 'Listen to Our Mixtape', icon: '📼' },
  music: { label: 'Play Little Games & Quiz', icon: '🎮' },
  quiz: { label: 'Read Your Love Letter', icon: '💌' },
  letter: { label: 'Back to Home Keepsakes', icon: '🏠' },
};

// ------------------------------------------------------------
// 6. HOME PAGE
// ------------------------------------------------------------
export const HOME = {
  counterTitle: 'We have been in love for...',
  counterLabels: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
  counterFooter: `...and I'd still choose you in every lifetime. ♡`,

  certificate: {
    tape: 'VERIFIED OFFICIAL',
    number: 'NO. 2026-BF-01',
    title: 'Official Best Boyfriend Certificate',
    presentedTo: 'Presented to:',
    perks: [
      'Unlimited warm hugs & back scratches on demand',
      'Pardon for stealing my snacks',
      'Permanent VIP residency inside my heart',
      'Entitled to endless love and affection',
    ],
    signedWith: 'Signed with love,',
  },

  scratchCard: {
    tape: 'SURPRISE TICKET',
    kicker: 'SECRET SCRATCH CARD',
    title: `Today's Secret Scratch Note`,
    hint: `Tap or scratch the ticket below to uncover today's secret surprise!`,
    youWon: 'YOU WON:',
    prize: 'ONE SKIP-THE-FIGHT PASS',
    prizeLines: ['Valid for one argument.', 'No questions. No complaints.', 'Use it wisely.'],
    coverCta: 'Tap to Scratch & Reveal 🎟️',
    coverSub: 'Click to peel silver foil',
    statusUnlocked: 'Coupon Unlocked ✨',
    statusLocked: 'Locked Mystery',
    hideAgain: 'Hide again',
  },
};

// ------------------------------------------------------------
// 7. SURPRISE WHEEL (on the Home page)
// ------------------------------------------------------------
export const WHEEL = {
  tape: 'SPIN TO WIN 🎡',
  title: 'The Surprise Wheel',
  // Add or remove items freely — the wheel adjusts to any number (4 to 12 looks best).
  rewards: [
    'Movie Night (Your Pick)',
    'Breakfast in Bed',
    'Massage',
    'Dinner Date',
    'Slow Dance',
    'Pick the Playlist',
    'Surprise Gift',
    'Cuddle Session',
  ],
  hubText: 'SPIN',
  spinButton: 'Spin the Wheel 🎡',
  spinAgainButton: 'Spin Again 🎡',
  spinningButton: 'Spinning the Wheel...',
  hintIdle: 'Tap button or center hub to spin',
  hintSpinning: 'Hold your breath!',
  winnerBadge: 'THE WHEEL HAS SPOKEN!',
  winnerNote: '"Claimable on demand. No trade-ins, no excuses! ♡"',
  winnerFooter: 'Enjoy your prize!',
};

// ------------------------------------------------------------
// 8. POLAROID MEMORIES
// ------------------------------------------------------------
export const MEMORY_PAGE = {
  badge: 'Physical Scrapbook Gallery',
  title: 'OUR POLAROID MEMORY WALL 📸',
  subtitle: 'Polaroids, film strips & tilted snapshots. Tap any photo to flip or enlarge.',
  signOff: `Forever yours, ${SENDER.name} ♡`, // written on the back of each polaroid
  // Example text shown inside the "Add Polaroid" form
  formPlaceholders: {
    title: 'e.g. Sunset Walk by the Lake',
    date: 'e.g. October 2024',
    caption: 'e.g. Freezing cold but your hug kept me warm',
  },
};

/**
 * Your polaroid cards.
 *  - title / date / caption: shown on the FRONT
 *  - noteOnBack: the handwritten note on the BACK
 *  - imageUrl: path to your photo in public/photos/ (leave out for a doodle card)
 *  - doodleType: 'sunset' | 'coffee' | 'hands' | 'stargazing' | 'cinema' | 'cozy'
 *  - rotation: tilt in degrees (-3 to 3 looks natural)
 *
 *  ✏️ Photos: save them as photo-1.jpg, photo-2.jpg … or change the paths below.
 */
export const MEMORIES: PolaroidMemory[] = [
  {
    id: 'mem-1',
    title: 'My Favourite Place',
    date: '',
    caption: '',
    noteOnBack: 'Whenever I have a bad day, all I want is your hug and to be in your arms.',
    imageUrl: '/photos/1.jpg',
    doodleType: 'cozy',
    rotation: -2,
  },
  {
    id: 'mem-2',
    title: 'THE DAY',
    date: '',
    caption: '',
    noteOnBack: 'Finally, the day you chose to make me yours was so unexpected.',
    imageUrl: '/photos/2.jpg',
    doodleType: 'cinema',
    rotation: 2.2,
  },
  {
    id: 'mem-3',
    title: 'your efforts',
    date: '',
    caption: '',
    noteOnBack: 'You remembered that I love sunflowers. You remembered that I always wanted someone to sing a song while proposing to me, and you actually did it',
    imageUrl: '/photos/3.jpg',
    doodleType: 'hands',
    rotation: -1.6,
  },
  {
    id: 'mem-4',
    title: 'mine kuchupuchu ',
    date: '',
    caption: '',
    noteOnBack: 'You are so cute. This cutest side of you will always have a special place in my heart.',
    imageUrl: '/photos/4.jpg',
    doodleType: 'cozy',
    rotation: 1.5,
  },
  {
    id: 'mem-5',
    title: '(26/07/2026)',
    date: '',
    caption: '',
    noteOnBack: 'You didn’t care about the crowd or what anyone would think. You just followed your heart and proposed to me.',
    imageUrl: '/photos/5.PNG',
    doodleType: 'hands',
    rotation: 2.5,
  },
  {
    id: 'mem-6',
    title: 'Your Love Language',
    date: '',
    caption: '',
    noteOnBack: 'You being obsessed with my pictures and snaps is honestly one of my favourite things.',
    imageUrl: '/photos/6.PNG',
    doodleType: 'stargazing',
    rotation: -1.8,
  },
  {
    id: 'mem-7',
    title: 'my sukoon',
    date: '',
    caption: '',
    noteOnBack: 'You know how much I love mountains they give me the most peace. I don’t know when or how, but somehow, you became my mountain.',
    imageUrl: '/photos/7.PNG',
    doodleType: 'coffee',
    rotation: -2.4,
  },
  {
    id: 'mem-8',
    title: 'butter ',
    date: '',
    caption: '',
    noteOnBack: 'You make my heart melt like a butter',
    imageUrl: '/photos/8.JPG',
    doodleType: 'coffee',
    rotation: 2.1,
  },
  {
    id: 'mem-9',
    title: 'your fav photo ',
    date: '',
    caption: '',
    noteOnBack: 'The babyyy part of us will always remain same no matter how much you gives tantrum ',
    imageUrl: '/photos/9.jpg',
    doodleType: 'cozy',
    rotation: 1.6,
  },
  {
    id: 'mem-10',
    title: 'The right one ',
    date: '',
    caption: '',
    noteOnBack: 'When I saw this, I realised I chose the right one. ',
    imageUrl: '/photos/10.PNG',
    doodleType: 'stargazing',
    rotation: 1.8,
  },
  {
    id: 'mem-11',
    title: '29/08/2026',
    date: '',
    caption: '',
    noteOnBack: 'The day we finally became official… literally, after 5 years of being us, we could finally say, “Us As Official “',
    imageUrl: '/photos/11.PNG',
    doodleType: 'stargazing',
    rotation: -1.5,
  },
  {
    id: 'mem-12',
    title: 'fav story',
    date: '',
    caption: '',
    noteOnBack: 'Somehow, after all these years, my favourite person became my favourite love story.',
    imageUrl: '/photos/12.PNG',
    doodleType: 'sunset',
    rotation: -1.2,
  },
];

// ------------------------------------------------------------
// 9. MIXTAPE (MUSIC PAGE)
// ------------------------------------------------------------
export const MUSIC_PAGE = {
  badge: `Mixtape For ${PARTNER.nickname}`,
  title: 'THE SOUNDTRACK OF US 📼',
  quote: `"Every love song somehow became an ${PARTNER.nickname} song."`,
  tapeSideLabel: 'SIDE A · VINTAGE LO-FI STEREO',
  tapeNamesLabel: `${PARTNER.nickname.toUpperCase()} & ${SENDER.name.toUpperCase()} · 90 MIN`,
  tapeForLabel: `For ${PARTNER.nickname} ♡`,
};

/**
 * Your songs. Put each mp3 in public/audio/ and point customAudioUrl at it.
 *  - note: a little "liner note" about why the song matters (can be '')
 *  - lofiMelodyKey: just 0, 1 or 2 — picks the fallback tune
 *
 *  ✏️ Save songs as song-1.mp3, song-2.mp3 … or change the paths below.
 */
export const TRACKS: SongTrack[] = [
  { id: 'track-1', title: 'KAISE HUA', artist: 'Vishal Mishra', duration: '3:30', lofiMelodyKey: 0, note: 'Why this song matters to you two.', customAudioUrl: '/audio/theme.mp3' },
];

// ------------------------------------------------------------
// 10. GAMES & QUIZ
// ------------------------------------------------------------
export const GAMES = {
  badge: 'Quick & Playful',
  title: 'LITTLE GAMES & INTERACTIONS 🎮',
  subtitle: 'A little quiz to see how well you know us.',

  // 'correct' is the position of the right answer: 0 = first option, 1 = second, ...
  trivia: [
    {
      question: 'Which song did we first dance to?',
      options: ['Señorita', 'Tum Se Hi', 'Khat', 'Kaise Hua'],
      correct: 1,
      explanation: 'Our first dance, and I still smile every time I hear it. 💃',
    },
    {
      question: 'While proposing to you, did I say “I love you” or “Will you be my boyfriend?”',
      options: ['I love you', 'Will you be my boyfriend?'],
      correct: 0,
      explanation: 'Three little words, and everything changed. 💕',
    },
    {
      question: 'What is my favourite dish?',
      options: ['Pasta', 'Pizza', 'Coffee'],
      correct: 1,
      explanation: 'Always pizza. You should know this by now! 🍕',
    },
    {
      question: 'What’s my biggest turn-off?',
      options: [
        'Not picking up my calls',
        'Not remembering me when you’re out roaming around',
        'Coming late',
      ],
      correct: 1,
      explanation: 'Remember me wherever you roam. That is all I ask. 🥺',
    },
  ],
  triviaNext: 'Next Question →',
  triviaSeeScore: 'See Score ✨',
  triviaPerfect: 'Perfect memory! You know every single chapter by heart.',
  triviaImperfect: `A couple silly slips, but still 100% certified ${PARTNER.nickname}!`,
  playAgain: 'Play Again',

  tryAgain: 'Try Again',
  partnerButton: `${PARTNER.nickname} 🙋‍♂️`,
  senderButton: `${SENDER.name} 🙋‍♀️`,
};

// ------------------------------------------------------------
// 11. LOVE LETTER
// ------------------------------------------------------------
export const LETTER = {
  badge: 'The Final Chapter',
  title: 'Okay, One Serious Thing. 💌',
  subtitle: 'The words I want you to remember today, tomorrow, and every day in between.',
  tape: `FOR ${PARTNER.nickname.toUpperCase()} · FROM ${SENDER.name.toUpperCase()}`,
  stampLabel: 'TIMELESS',
  headerNote: `Written with all my heart · Boyfriend's Day Edition`,
  printButton: 'Print keepsake',
  salutation: `Dearest ${PARTNER.nickname},`,

  // Each string is one paragraph. Add or delete lines as you like.
  paragraphsBefore: [
    'To be very honest, I think I fell in love with you a long time ago. Things didn’t work out between us back then, and we ended up going our separate ways, not by choice. But somehow, we started talking again. We were both sure we weren’t going down that lane, but I guess if something is meant to happen, destiny finds its way. We grew up, became more mature, had deeper conversations, and somewhere along the way, I fell for you again.',
    'Then you came to Mumbai just to say sorry to me. I never expected anyone to make that kind of effort for me. You made me realise that even I can feel loved. And then came your proposal—with the crowd, the sunflower, my favourite song, and you not caring about anything else. Those three days in Mumbai were so special. You did all those little things I had secretly craved for, and honestly, they made me fall even more in love with you.',
  ],
  // The big handwritten highlight in the middle of the letter
  highlight: '"I love your chimpanzee eyes, your warm smile and how safe I feel in your arms."',
  paragraphsAfter: [
    'I love the way you love me now. When I’m happy, you’re happy; when I’m sad, you sit with me and ask what’s wrong. Even after all our fights and my overthinking, you always want to fix things. I’ve realised it’s never you against me, it’s always the problem against us. And I hope we always keep choosing each other like that.',
    'You’re slowly making me feel loved in a new way every single day. Yes, you’re a kutta insaan sometimes and I hate some of your habits, but after all the fights, tantrums and everything else, I still love you. Maybe it was just my luck that I fell in love with you… and honestly, I’m so glad I did.',
  ],
  closingLine: 'I love you.', // big closing line (any language)
  closingWish: `Happy Boyfriend's Day, baby.`,
  signature: `— Forever yours, ${SENDER.name} ♡`,
  forLabel: `For ${PARTNER.fullName}`,
  hugButton: 'Send a Hug & Squeeze Back 🫂',
  hugReply: 'Hug received! You are my favorite person. 🤍',
};