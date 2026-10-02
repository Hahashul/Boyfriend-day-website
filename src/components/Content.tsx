/**
 * ============================================================
 *  content.ts — EVERYTHING you can personalize lives here.
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
 *    STORAGE_VERSION below (e.g. 'v8' -> 'v9') or click Settings > Reset.
 *    Visitors who open your link for the first time always see the new text.
 */

import type { PolaroidMemory, SongTrack, ScrapbookSettings } from '../types/scrapbook';

// ------------------------------------------------------------
// 0. HOUSEKEEPING
// ------------------------------------------------------------
/** Bump this whenever you change the content and your own browser still shows old stuff. */
export const STORAGE_VERSION = 'v8';

// ------------------------------------------------------------
// 1. THE TWO OF YOU  ✏️ change these first
// ------------------------------------------------------------
export const PARTNER = {
  fullName: 'Abhinab P Kashyap', // shown on the certificate
  firstName: 'Abhinab',          // used inside quiz questions
  nickname: 'Abhi',              // used everywhere else ("Happy Boyfriend's Day, Abhi")
};

export const SENDER = {
  name: 'Parina',                // that's you
};

/** Start of your relationship (YYYY-MM-DD) — drives the live days/hours counter. */
export const ANNIVERSARY_DATE = '2024-10-20';

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
const THEME_TITLE = 'her';
const THEME_ARTIST = 'JVKE';
export const THEME_SONG = {
  url: '/audio/her.mp3',
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
    'Locating the famous white hoodie…',
    'Petting every stray dog along the way…',
    'Ordering hot chicken rolls & cold Red Bull…',
    'Queuing up Nepali songs on the cassette…',
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
  counterFooter: `...and I'd still choose you in every lifetime. ♡`,

  certificate: {
    tape: 'VERIFIED OFFICIAL',
    number: 'NO. 2026-BF-01',
    title: 'Official Best Boyfriend Certificate',
    presentedTo: 'Presented to:',
    perks: [
      'Unlimited warm hugs & back scratches on demand',
      'Pardon for stealing my food or fries',
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
    prizeLines: ['Valid for one argument.', 'No questions. No complaints.', 'Use it wisely, boyfriend.'],
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
    'Spank Her',
    'Tongue Wrestling',
    'Try a New Position Next Time',
    'Tie Her',
    'Jacuzzi Time',
    'Get Head',
    'Give Her A Hickey',
    'Risky Quickie',
    'Strip Poker',
    'Massage',
  ],
  hubText: 'SPIN',
  spinButton: 'Spin the Wheel 🎡',
  spinAgainButton: 'Spin Again 🎡',
  spinningButton: 'Spinning the Wheel...',
  hintIdle: 'Tap button or center hub to spin',
  hintSpinning: 'Hold your breath!',
  winnerBadge: 'THE WHEEL HAS SPOKEN!',
  winnerNote: '"Claimable on demand with your girlfriend. No trade-ins, no excuses! ♡"',
  winnerFooter: 'Enjoy your prize, boyfriend!',
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
 *  ✏️ The photo pairings below are my best guess from the file names — swap freely.
 */
export const MEMORIES: PolaroidMemory[] = [
  {
    id: 'mem-1',
    title: 'My Favourite Place',
    date: 'Warm Hugs',
    caption: 'Whenever I have a bad day, all I want is your hug and to be in your arms.',
    noteOnBack: 'Whenever I have a bad day, all I want is your hug and to be in your arms.',
    imageUrl: '/photos/hug.jpg',
    doodleType: 'cozy',
    rotation: -2,
  },
  {
    id: 'mem-2',
    title: 'Your Clothes = Mine',
    date: 'Wardrobe Raid',
    caption: 'I want your jacket, your hoodie, basically all your clothes. You’re mine, so technically they’re mine too.',
    noteOnBack: 'I want your jacket, your hoodie, basically all your clothes. You’re mine, so technically they’re mine too.',
    imageUrl: '/photos/tshirt-gift.jpg',
    doodleType: 'cinema',
    rotation: 2.2,
  },
  {
    id: 'mem-3',
    title: 'The Hand I’ll Always Remember',
    date: 'First Date',
    caption: 'You were the first person who offered me your hand to hold on a date. I’ll never forget how special that felt.',
    noteOnBack: 'You were the first person who offered me your hand to hold on a date. I’ll never forget how special that felt.',
    imageUrl: '/photos/hand-holding.jpg',
    doodleType: 'hands',
    rotation: -1.6,
  },
  {
    id: 'mem-4',
    title: 'My Favourite Pillow',
    date: 'Sleepy Rides',
    caption: 'Sleeping on each other’s shoulders will always be one of my favourite things. Your shoulder is my favourite place to sleep.',
    noteOnBack: 'Sleeping on each other’s shoulders will always be one of my favourite things. Your shoulder is my favourite place to sleep.',
    imageUrl: '/photos/him-sleeping.jpg',
    doodleType: 'cozy',
    rotation: 1.5,
  },
  {
    id: 'mem-5',
    title: 'Puri Beach & Ocean Waves',
    date: 'Puri Trip',
    caption: 'Golden sand & crashing waves',
    noteOnBack: 'Taking dozens of sweet pictures by the tide and having the time of our lives watching the waves crash at sunset.',
    imageUrl: '/photos/beach.jpg',
    doodleType: 'hands',
    rotation: 2.5,
  },
  {
    id: 'mem-6',
    title: 'Your Love Language',
    date: 'Snaps & Selfies',
    caption: 'You being obsessed with my pictures and snaps is honestly one of my favourite things.',
    noteOnBack: 'You being obsessed with my pictures and snaps is honestly one of my favourite things.',
    imageUrl: '/photos/mirror.jpg',
    doodleType: 'stargazing',
    rotation: -1.8,
  },
  {
    id: 'mem-7',
    title: 'Here’s To More…',
    date: 'Darjeeling Walk',
    caption: 'Here’s to more risky quickies and makeouts.',
    noteOnBack: 'Here’s to more risky quickies and makeouts.',
    imageUrl: '/photos/kiss-on-cheek.jpg',
    doodleType: 'coffee',
    rotation: -2.4,
  },
  {
    id: 'mem-8',
    title: 'Interest Accrued',
    date: 'Holi in Darjeeling',
    caption: 'Him seeing my butt as a bank loan… because he definitely got his interest.',
    noteOnBack: 'Him seeing my butt as a bank loan… because he definitely got his interest.',
    doodleType: 'coffee',
    rotation: 2.1,
  },
  {
    id: 'mem-9',
    title: 'Twinning',
    date: 'Bus to Kolkata',
    caption: 'To twinning at every festival.',
    noteOnBack: 'To twinning at every festival.',
    imageUrl: '/photos/saree.jpg',
    doodleType: 'cozy',
    rotation: 1.6,
  },
  {
    id: 'mem-10',
    title: 'Butter',
    date: 'Birthday Surprise',
    caption: 'You make my heart melt like butter.',
    noteOnBack: 'You make my heart melt like butter.',
    imageUrl: '/photos/noses.jpg',
    doodleType: 'stargazing',
    rotation: 1.8,
  },
  {
    id: 'mem-11',
    title: 'Emergency Lip Gloss',
    date: 'Pink Aesthetic',
    caption: 'Running out of lip gloss to apply before kissing you.',
    noteOnBack: 'Running out of lip gloss to apply before kissing you.',
    doodleType: 'stargazing',
    rotation: -1.5,
  },
  {
    id: 'mem-12',
    title: 'Always',
    date: 'McDonald’s Date',
    caption: 'To always trying to make you feel special, cuz you are.',
    noteOnBack: 'To always trying to make you feel special, cuz you are.',
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
 *  ✏️ These match the mp3 files in your /public/audio folder (after renaming them).
 *  The last one (Laakhau Hajarau) had no real audio file — add laakhau-hajarau.mp3
 *  or delete that entry.
 */
export const TRACKS: SongTrack[] = [
  { id: 'track-1', title: 'her', artist: 'JVKE', duration: '2:51', lofiMelodyKey: 0, note: 'The first song he dedicated to me.', customAudioUrl: '/audio/her.mp3' },
  { id: 'track-2', title: 'Inaam', artist: 'Anuv Jain', duration: '4:17', lofiMelodyKey: 1, note: '', customAudioUrl: '/audio/inaam.mp3' },
  { id: 'track-3', title: 'Aye Udi Udi Udi', artist: 'Saathiya', duration: '4:40', lofiMelodyKey: 2, note: '', customAudioUrl: '/audio/aye-udi-udi.mp3' },
  { id: 'track-4', title: 'Señorita', artist: 'Zindagi Na Milegi Dobara', duration: '4:08', lofiMelodyKey: 0, note: 'Our first dance together.', customAudioUrl: '/audio/senorita.mp3' },
  { id: 'track-5', title: 'Dildara', artist: 'Ra.One', duration: '4:30', lofiMelodyKey: 1, note: '', customAudioUrl: '/audio/dildara.mp3' },
  { id: 'track-6', title: 'Bardali', artist: 'Sushant KC ft. Indrakala Rai', duration: '3:32', lofiMelodyKey: 2, note: '', customAudioUrl: '/audio/bardali.mp3' },
  { id: 'track-7', title: 'Risaune Bhaye', artist: 'Sushant KC', duration: '3:19', lofiMelodyKey: 0, note: '', customAudioUrl: '/audio/risaune-bhaye.mp3' },
  { id: 'track-8', title: 'Call Out My Name', artist: 'The Weeknd', duration: '3:58', lofiMelodyKey: 1, note: '', customAudioUrl: '/audio/call-out-my-name.mp3' },
  { id: 'track-9', title: 'Uff Teri Adaa', artist: 'Karthik Calling Karthik', duration: '2:56', lofiMelodyKey: 2, note: '', customAudioUrl: '/audio/uff-teri-adaa.mp3' },
  { id: 'track-10', title: 'Laakhau Hajarau', artist: 'Yabesh Thapa', duration: '3:45', lofiMelodyKey: 0, note: 'He explained the Nepali lyrics to me because I didn’t understand them. Then we slow-danced to it.', customAudioUrl: '/audio/laakhau-hajarau.mp3' },
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
      question: 'How many fights in Darjeeling?',
      options: ['0', '1', '10', '50'],
      correct: 3,
      explanation: '50 fights! A Darjeeling record, but made up with hugs and laughter every single time. 😂❤️',
    },
    {
      question: 'What song did we first dance to?',
      options: ['Señorita', 'Tum Se Hi', 'Dildara', 'Laakhau Hajarau'],
      correct: 0,
      explanation: 'Señorita! First dance together salsa on the club dance floor. 💃🕺',
    },
    {
      question: `What’s ${SENDER.name}’s biggest turn-off?`,
      options: ['Being late', 'Loud chewing', 'Burping', 'Sweating'],
      correct: 0,
      explanation: 'Being late! Punctuality is non-negotiable for your girl! ⏰😤',
    },
    {
      question: `What’s ${SENDER.name}’s favourite ice cream flavour?`,
      options: ['Choco Chips', 'Cookies & Cream', 'Mint Chocolate', 'All of the above'],
      correct: 3,
      explanation: 'All of the above! Why choose just one when you can love them all? 🍨🍫',
    },
    {
      question: `When will ${PARTNER.firstName} stop smoking?`,
      options: ['Right now', 'Tonight', 'Tomorrow', 'Never'],
      correct: 0,
      explanation: 'Right now! Official girlfriend orders. No excuses, boyfriend! 🚭🤍',
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
      text: '"Look at that dog! Stop right now, we have to go pet it."',
      author: 'partner',
      detail: 'Non-negotiable protocol whenever any four-legged creature appears within a 50-meter radius. 🐶',
    },
    {
      text: '"Are you literally rage-baiting me right now on purpose?!"',
      author: 'sender',
      detail: `Asked at least twice every single week while ${PARTNER.nickname} stands there grinning with his dimple. 😤`,
    },
    {
      text: `"Let's get hot rolls, an ice-cold Red Bull, and blast some Nepali songs."`,
      author: 'partner',
      detail: `The undisputed culinary and musical holy grail for ${PARTNER.nickname} at any hour of the night. 🌯⚡`,
    },
    {
      text: '"Where is my pink Stanley cup and my pink sleeping mask?!"',
      author: 'sender',
      detail: 'Daily pink-aesthetic inventory audit. He knows his girl well. 🎀',
    },
    {
      text: `"Don't worry about those drunk guys, stay behind me."`,
      author: 'partner',
      detail: 'The protective gentleman on the night they first met at the club. 🛡️',
    },
    {
      text: `"I'm stealing your hoodie, your fries, and all your warmth."`,
      author: 'sender',
      detail: 'Girlfriend tax is 100% legally binding and non-refundable. 🍟',
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
    'When I look back at our time together, I realize how much you have changed my world in the quietest, most natural ways. You didn’t just become my first boyfriend — you gave me so many of my firsts, and you made the most ordinary, mundane days feel like something worth holding onto.',
    'I love sleeping on your shoulder during long rides. I love that I feel completely safe crying in your arms without ever feeling small or silly for doing it. Whenever I’m overwhelmed or anxious, your reassurance instantly brings my smile back. Your loyalty and the way you protect me make me feel cherished in a way I never knew I deserved.',
    'Being with you has genuinely made me want to become kinder, softer, and a better person.',
    'I know I’m not always easy. I know I sometimes nag you about your past, and I get jealous over stupid little things. I’m sorry for the times when I haven\'t been able to just let things go, and I appreciate your patience with me more than you probably realize. Thank you for never giving up on me on my difficult days.',
  ],
  // The big handwritten highlight in the middle of the letter
  highlight: '"I love your dancing, your dimple, your stupid rage-baiting, your protective side, and the gentle way you take care of me."',
  paragraphsAfter: [
    'Saying "I love you" has always been difficult for me. It’s not something I throw around lightly, which is why it means so much that I can say it to you with complete certainty.',
    'Ten years from now, I still want us to be slow dancing in the living room, exploring new mountain towns, sharing rolls, and laughing at the exact same silly inside jokes.',
  ],
  closingLine: 'Moi tumak bhal pao.', // big closing line (Assamese: "I love you")
  closingWish: `Happy Boyfriend's Day, baby.`,
  signature: `— Forever yours, ${SENDER.name} ♡`,
  forLabel: `For ${PARTNER.fullName}`,
  hugButton: 'Send a Hug & Squeeze Back 🫂',
  hugReply: 'Hug received! You are my favorite boy. 🤍',
};