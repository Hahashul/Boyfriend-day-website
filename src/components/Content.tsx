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
export const STORAGE_VERSION = 'v1';

// ------------------------------------------------------------
// 1. THE TWO OF YOU  ✏️ change these first
// ------------------------------------------------------------
export const PARTNER = {
  fullName: 'Partner Full Name', // shown on the certificate
  firstName: 'Partner',          // used inside quiz questions
  nickname: 'Nickname',              // used everywhere else ("Happy Boyfriend's Day, Nickname")
};

export const SENDER = {
  name: 'Your Name',                // that's you
};

/** Start of your relationship (YYYY-MM-DD) — drives the live days/hours counter. */
export const ANNIVERSARY_DATE = '2024-01-01';

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
const THEME_TITLE = 'Song Title';
const THEME_ARTIST = 'Artist Name';
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
    title: 'Our First Photo',
    date: 'Add a date or place',
    caption: 'Write the story behind this photo.',
    noteOnBack: 'Write the story behind this photo.',
    imageUrl: '/photos/photo-1.jpg',
    doodleType: 'cozy',
    rotation: -2,
  },
  {
    id: 'mem-2',
    title: 'Favourite Trip',
    date: 'Add a date or place',
    caption: 'Write the story behind this photo.',
    noteOnBack: 'Write the story behind this photo.',
    imageUrl: '/photos/photo-2.jpg',
    doodleType: 'sunset',
    rotation: 2,
  },
  {
    id: 'mem-3',
    title: 'Silly Moment',
    date: 'Add a date or place',
    caption: 'Write the story behind this photo.',
    noteOnBack: 'Write the story behind this photo.',
    imageUrl: '/photos/photo-3.jpg',
    doodleType: 'cinema',
    rotation: -1.5,
  },
  {
    id: 'mem-4',
    title: 'Quiet Day',
    date: 'Add a date or place',
    caption: 'Write the story behind this photo.',
    noteOnBack: 'Write the story behind this photo.',
    imageUrl: '/photos/photo-4.jpg',
    doodleType: 'coffee',
    rotation: 1.8,
  },
  {
    id: 'mem-5',
    title: 'Hand in Hand',
    date: 'Add a date or place',
    caption: 'Write the story behind this photo.',
    noteOnBack: 'Write the story behind this photo.',
    imageUrl: '/photos/photo-5.jpg',
    doodleType: 'hands',
    rotation: -1.2,
  },
  {
    id: 'mem-6',
    title: 'Under the Stars',
    date: 'Add a date or place',
    caption: 'Write the story behind this photo.',
    noteOnBack: 'Write the story behind this photo.',
    imageUrl: '/photos/photo-6.jpg',
    doodleType: 'stargazing',
    rotation: 1.5,
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
  { id: 'track-1', title: 'Song Title 1', artist: 'Artist', duration: '3:30', lofiMelodyKey: 0, note: 'Why this song matters to you two.', customAudioUrl: '/audio/song-1.mp3' },
  { id: 'track-2', title: 'Song Title 2', artist: 'Artist', duration: '3:30', lofiMelodyKey: 1, note: 'Why this song matters to you two.', customAudioUrl: '/audio/song-2.mp3' },
  { id: 'track-3', title: 'Song Title 3', artist: 'Artist', duration: '3:30', lofiMelodyKey: 2, note: 'Why this song matters to you two.', customAudioUrl: '/audio/song-3.mp3' },
  { id: 'track-4', title: 'Song Title 4', artist: 'Artist', duration: '3:30', lofiMelodyKey: 0, note: 'Why this song matters to you two.', customAudioUrl: '/audio/song-4.mp3' },
  { id: 'track-5', title: 'Song Title 5', artist: 'Artist', duration: '3:30', lofiMelodyKey: 1, note: 'Why this song matters to you two.', customAudioUrl: '/audio/song-5.mp3' },
];

// ------------------------------------------------------------
// 10. GAMES & QUIZ
// ------------------------------------------------------------
export const GAMES = {
  badge: 'Quick & Playful',
  title: 'LITTLE GAMES & INTERACTIONS 🎮',
  subtitle: 'Two fun mini-games to test your memory and how well you know each other.',
  tabTrivia: '1. Trivia & Memories',
  tabWhoSaidIt: '2. Who Said It?',

  // 'correct' is the position of the right answer: 0 = first option, 1 = second, ...
  trivia: [
    {
      question: 'Where did we have our first date?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 0,
      explanation: 'A short, sweet line about the answer. 💕',
    },
    {
      question: 'What song reminds us of each other?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 1,
      explanation: 'A short, sweet line about the answer. 🎶',
    },
    {
      question: `What is ${SENDER.name}'s favourite food?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 2,
      explanation: 'A short, sweet line about the answer. 🍕',
    },
    {
      question: `What is ${PARTNER.firstName}'s biggest habit?`,
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 3,
      explanation: 'A short, sweet line about the answer. 😄',
    },
    {
      question: 'Where do we want to travel next?',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correct: 0,
      explanation: 'A short, sweet line about the answer. ✈️',
    },
  ],
  triviaNext: 'Next Question →',
  triviaSeeScore: 'See Score ✨',
  triviaPerfect: 'Perfect memory! You know every single chapter by heart.',
  triviaImperfect: `A couple silly slips, but still 100% certified ${PARTNER.nickname}!`,
  playAgain: 'Play Again',

  // author: 'partner' = said by him, 'sender' = said by you
  whoSaidIt: [
    {
      text: '"A line your partner always says."',
      author: 'partner',
      detail: 'A funny note about why this sounds so like them. 😄',
    },
    {
      text: '"A line you always say."',
      author: 'sender',
      detail: 'A funny note about why this sounds so like you. 😄',
    },
    {
      text: '"Another line your partner would say."',
      author: 'partner',
      detail: 'A funny note about this one. 💬',
    },
    {
      text: '"Another line you would say."',
      author: 'sender',
      detail: 'A funny note about this one. 💬',
    },
  ] as { text: string; author: 'partner' | 'sender'; detail: string }[],
  whoSaidItPrompt: 'WHO UTTERED THIS?',
  whoSaidItCorrect: 'Correct!',
  whoSaidItWrong: 'Nope!',
  whoSaidItSaidBy: 'Said by',
  whoSaidItNext: 'Next Quote →',
  whoSaidItSeeResults: 'See Results ✨',
  whoSaidItFinal: 'No one knows who says what better than you two.',
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
    'Write your opening paragraph here: how you feel, and what the last year has meant to you.',
    'Write about the small things you love: the habits, the jokes, the way they make ordinary days feel special.',
    'Write something honest and a little vulnerable: a thank-you, or an apology you never got to say.',
  ],
  // The big handwritten highlight in the middle of the letter
  highlight: '"One short line that sums up everything you love about them."',
  paragraphsAfter: [
    'Write about the future: what you hope for the two of you.',
  ],
  closingLine: 'I love you.', // big closing line (any language)
  closingWish: `Happy Boyfriend's Day, baby.`,
  signature: `— Forever yours, ${SENDER.name} ♡`,
  forLabel: `For ${PARTNER.fullName}`,
  hugButton: 'Send a Hug & Squeeze Back 🫂',
  hugReply: 'Hug received! You are my favorite person. 🤍',
};