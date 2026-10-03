// ─────────────────────────────────────────────────────────────────────────
// EVERYTHING PERSONAL LIVES IN THIS FILE (plus src/data/photos.js).
// Edit names, dates, messages, songs, coupons, etc. here. Nothing else in
// the codebase needs to change. See README.md for a full guide.
// ─────────────────────────────────────────────────────────────────────────

const relationship = {
  herName: "Loretta",
  nickname: "pretty girl",
  myName: "Charles",

  // Approximate CITY-LEVEL coordinates only — never use home addresses.
  locations: {
    me: {
      name: "Downtown San Diego",
      short: "San Diego",
      coordinates: [32.7157, -117.1611],
    },
    her: {
      name: "Chino Hills",
      short: "Chino Hills",
      coordinates: [33.9898, -117.7326],
    },
  },

  importantDates: {
    // Used only if you reference them elsewhere; ISO format.
    started: "2024-08-06",
  },

  // ── TIMELINE ─────────────────────────────────────────────────────────
  // photo is optional — path relative to /public.
  // Timeline photos live in their own folder: /public/photos/timeline/
  // Drop files there (e.g. timeline-1.jpg, timeline-2.jpg...) and point
  // each entry below at one — this pool is separate from src/data/photos.js
  // so the collage/random-surprise sections never reuse a timeline photo.
  timeline: [
    {
      date: "not long after",
      title: "when we first started",
      photo: "/photos/timeline/timeline-1.jpg",
      description:
        "Still in the photo booth, green frog hats and all. We had no idea what we were getting into.",
    },
    {
      date: "one year in",
      title: "our one year date",
      photo: "/photos/timeline/timeline-2.jpg",
      description: "Standing in front of the tank, your head on my shoulder. Already one year, somehow.",
    },
    {
      date: "two years in",
      title: "our two year date",
      photo: "/photos/timeline/timeline-3.jpg",
      description: "The fountains were putting on a show, but you were still the best part of the night.",
    },
    {
      date: "the best one yet",
      title: "my favorite date",
      photo: "/photos/timeline/timeline-4.jpg",
      description:
        "Disneyland, lanterns everywhere, you kissing my cheek in the middle of it. My favorite date of all of them.",
    },
    {
      date: "right now",
      title: "today",
      photo: "/photos/timeline/timeline-5.jpg",
      description: "Still choosing you. Still glad I did the first time.",
    },
    {
      date: null,
      title: "what comes next",
      photo: null,
      description: "more coming soon...",
      isFuture: true,
    },
  ],

  // ── REASONS I LOVE YOU (jar of notes) — at least 40 ────────────────────
  reasonsILoveYou: [
    "I love hearing about your day even when nothing important happened.",
    "I love your laugh when something actually catches you off guard.",
    "I love how pretty you look when you're not trying.",
    "I love how somehow normal days become memories when you're there.",
    "I love how excited you get about things you care about.",
    "I love the way you look at me.",
    "I love having someone I want to tell everything to.",
    "I love all the little habits you probably don't even notice.",
    "I love how you say my name.",
    "I love that you text me random things throughout the day.",
    "I love how you get so invested in shows we're watching.",
    "I love your terrible jokes that somehow still make me laugh.",
    "I love how you fall asleep mid-sentence on calls.",
    "I love that you remember tiny things I mentioned once.",
    "I love how you steal my hoodies and never give them back.",
    "I love the face you make when you're concentrating.",
    "I love that you're my favorite person to do absolutely nothing with.",
    "I love how you care about the people around you.",
    "I love your bad singing in the car.",
    "I love how you get shy when I compliment you.",
    "I love that you still get excited to see me.",
    "I love how you always know when something's wrong with me.",
    "I love that you're stubborn in the cutest way possible.",
    "I love how safe I feel telling you things.",
    "I love your weird sense of humor.",
    "I love how you plan little things for us.",
    "I love that you're a better person than you give yourself credit for.",
    "I love how you get sleepy and clingy at the same time.",
    "I love that being around you makes hard days easier.",
    "I love how you say what you're thinking without filtering it.",
    "I love your ridiculous food opinions.",
    "I love how proud you get of small wins.",
    "I love that you never make me feel like too much.",
    "I love how you remember our inside jokes years later.",
    "I love your morning voice.",
    "I love that you try so hard for the people you love.",
    "I love how competitive you get over dumb games.",
    "I love that you're the last person I want to talk to before sleep.",
    "I love how you make ordinary places feel special.",
    "I love that you're my person.",
    "I love how you make me want to be better.",
    "I love that loving you has never felt complicated.",
    "I love that even after all this time, I still get excited when I see your name pop up.",
  ],

  // ── COMPLIMENT MACHINE — at least 30 ───────────────────────────────────
  compliments: [
    "you're dangerously pretty",
    "your smile could fix approximately 73% of my problems",
    "you're my favorite notification",
    "you look good in literally everything and it's annoying",
    "I'd choose you again",
    "your laugh is one of my favorite sounds",
    "you're cute even when you're mad at me",
    "you make everything better just by being there",
    "you're the best part of my day, most days",
    "you have no idea how pretty you actually are",
    "you're the reason my camera roll is 90% one person",
    "you're annoyingly easy to fall for",
    "you make bad days feel survivable",
    "I don't think you understand how much I like you",
    "you're my favorite hello and my least favorite goodbye",
    "your energy is unmatched, even when you're tired",
    "you make ordinary things feel like an event",
    "you're the main character and you don't even try to be",
    "you're prettier than every photo of you and that's saying a lot",
    "you make it very hard to focus on anything else",
    "I like you more today than I did yesterday, somehow",
    "you're my favorite person to be bored with",
    "you're the softest, most stubborn person I know",
    "you give main love interest in a movie energy",
    "you're doing better than you think you are",
    "you're the calm in most of my chaos",
    "your hugs are a certified cure for bad days",
    "you're impossible not to love",
    "you make me want to text you immediately after we hang up",
    "you're the best decision I keep making over and over",
    "you're cute in a way that should probably be illegal",
    "you're my favorite distraction",
  ],

  // ── SONGS ───────────────────────────────────────────────────────────────
  // cover: path in /public/songs, or leave null for a generated placeholder
  songs: [
    {
      title: "Iris",
      artist: "Goo Goo Dolls",
      cover: "/songs/iris.jpg",
      link: "https://open.spotify.com/track/6Qyc6fS4DsZjB2mRW9DsQs?si=d6eb26170bf34",
      note: "the song that brought us back together",
    },
    {
      title: "I Remember Everything",
      artist: "Zach Bryan",
      cover: "/songs/i-remember-everything.jpg",
      link: "https://open.spotify.com/track/4KULAymBBJcPRpk1yO4dOG?si=06e1073ff5f14537",
      note: "our night drive song — all the memories, all at once",
    },
    {
      title: "I Love You, I'm Sorry",
      artist: "Gracie Abrams",
      cover: "/songs/i-love-you-im-sorry.jpg",
      link: "https://open.spotify.com/track/51rfRCiUSvxXlCSCfIztBy?si=9fce093fb5fd4c3f",
      note: "my favorite song — I play it enough that you probably think of me every time it comes on",
    },
  ],

  // ── DATE IDEAS ────────────────────────────────────────────────────────
  dateIdeas: [
    { title: "sunset picnic", tags: ["cozy", "cheap"] },
    { title: "late-night boba", tags: ["late night", "spontaneous"] },
    { title: "photo booth", tags: ["fun", "cheap"] },
    { title: "thrift-store challenge", tags: ["cheap", "spontaneous"] },
    { title: "target $10 gift challenge", tags: ["cheap", "fun"] },
    { title: "cook dinner together", tags: ["cozy", "stay home"] },
    { title: "dessert crawl", tags: ["food", "spontaneous"] },
    { title: "beach sunset", tags: ["cozy", "adventure"] },
    { title: "lego night", tags: ["stay home", "cozy"] },
    { title: "arcade", tags: ["fun", "spontaneous"] },
    { title: "mini golf", tags: ["fun", "cheap"] },
    { title: "bookstore date", tags: ["cozy", "cheap"] },
    { title: "farmers market", tags: ["food", "cozy"] },
    { title: "ikea date", tags: ["fun", "spontaneous"] },
    { title: "movie + snack exchange", tags: ["stay home", "cozy"] },
    { title: "disposable-camera day", tags: ["adventure", "spontaneous"] },
    { title: "drive somewhere with no destination", tags: ["spontaneous", "late night"] },
    { title: "make each other drinks from pinterest", tags: ["stay home", "cheap"] },
    { title: "picnic + cards", tags: ["cozy", "cheap"] },
    { title: "choose outfits for each other", tags: ["fun", "stay home"] },
    { title: "brandy melville trip, you try on everything", tags: ["fun", "shopping"] },
    { title: "hollister + pacsun mall run", tags: ["fun", "shopping"] },
    { title: "garage rack, $20 budget each", tags: ["shopping", "cheap"] },
    { title: "full mall circuit: brandy, garage, hollister, pacsun", tags: ["shopping", "fun"] },
    { title: "chubby cattle hot pot night", tags: ["food"] },
    { title: "malatang, you build the bowl", tags: ["food"] },
    { title: "korean bbq", tags: ["food"] },
    { title: "boba / drink crawl, rate every flavor", tags: ["food", "fun"] },
  ],

  // ── COUPONS ──────────────────────────────────────────────────────────
  coupons: [
    { title: "one free forehead kiss", stamp: "♡" },
    { title: "kiss anywhere you want, redeemable immediately", stamp: "💋" },
    { title: "one full massage, no complaining halfway through", stamp: "💆" },
    { title: "one drink of your choice, boba or whatever's the fun drink this week", stamp: "🧋" },
    { title: "chubby cattle or malatang, my treat", stamp: "🍲" },
    { title: "30 minute cuddle extension", stamp: "♡" },
    { title: "big spoon for the night, your pick", stamp: "🤍" },
    { title: "passenger princess pass", stamp: "★" },
    { title: "you pick the movie", stamp: "🎬" },
    { title: 'one "you were right" token', stamp: "✓" },
    { title: "midnight food run", stamp: "🌙" },
    { title: "flowers for no reason", stamp: "✿" },
    { title: "date of your choice", stamp: "♡" },
    { title: "50 photos until you like one", stamp: "📷" },
    { title: "unlimited hugs for 10 minutes", stamp: "♡" },
  ],

  // ── OPEN WHEN MESSAGES ───────────────────────────────────────────────
  openWhenMessages: [
    {
      label: "when you miss me",
      message:
        "hey babe, im writing each of these here one by one. i know these days are hard, especially with long distance, i just want to express how much i love you and how proud of you i am. if you ever need help please reach out to me. like i offered if you miss me text me and ill try to find a time to come by and see you. i really am sorry for recently my actions.",
    },
    {
      label: "when you're sad",
      message:
        "hi loretta, if you're sad open this up for me. text me your order anytime and tell me you're sad you can bet that i will get you your order. thats the most i can do when we arent together im sorry its not much but its all i can do. but dont worry when we do see each other you will feel a lot better!",
    },
    {
      label: "when you're bored",
      message:
        "hi laura, you look bored. u can always watch your 番茄小说 or watch some tiktok! go out with some friends, text me we can hangout lol, im sorry ur bored poor baby. if you ever have any spontaneous activities u wanna do, just know im always down! we need to go fishing lol.",
    },
    {
      label: "when you can't sleep",
      message:
        "hey my night owl, did u take ur melatonin yet, make sure you do take that watch some tiktok and go to sleep. you probably have a long day ahead of u tomorrow so dont stay awake too long! i love u so much",
    },
    {
      label: "when you need attention",
      message: "dont even read this, just call me.",
    },
    {
      label: "when you need a reminder",
      message:
        "did you eat today? did you sleep enough? did you do all your homework? did you pack lunch for tomorrow? did you forget anything at home? IS YOUR RING ON?",
    },
  ],

  // ── RANDOM PHOTO SURPRISE CAPTIONS ──────────────────────────────────
  surpriseCaptions: [
    "hello",
    "remember me",
    "your boyfriend has appeared",
    "unfortunately I'm still obsessed with you",
    "breaking news: I miss you",
    "rare boyfriend sighting",
    "he's back on his phone again",
    "proof of life",
  ],

  // ── KISS COUNTER MILESTONES ─────────────────────────────────────────
  kissMilestones: [
    { at: 5, message: "getting greedy already" },
    { at: 10, message: "okay this is getting expensive" },
    { at: 25, message: "girl 😭" },
    { at: 50, message: "I'm cooked" },
    { at: 100, message: "come collect them then" },
    { at: 250, message: "this is legally extortion" },
  ],

  // ── FINAL LETTER ─────────────────────────────────────────────────────
  finalLetter: `You found it.

I know this website has been unserious in about 50 different ways, but I wanted to make you something that was ours.

A little place you could come back to when you're bored, when you miss me, or when we're far apart.

I love our big memories, but I think I love the random ones even more.

The drives.

The dumb conversations.

The pictures we never post.

Sitting around doing absolutely nothing.

All the things that don't sound important until they're with someone you really love.

And even when you're in Chino Hills and I'm down in San Diego, you're still somehow one of the closest people in my life.

I don't know what every future page looks like yet.

But I hope there are a lot more pictures to put on this website.

A lot more places to put on our map.

A lot more stupid stories.

And a lot more memories with you in them.

love you pretty girl ♡`,
};

export default relationship;
