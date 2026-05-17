import type { ImageMetadata } from 'astro';

// All issue cover images eagerly loaded so Astro can optimise them at build time.
const issueImages = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/issues/*.{jpg,jpeg}',
  { eager: true },
);

function img(file: string): ImageMetadata {
  const key = `../assets/issues/${file}`;
  const mod = issueImages[key];
  if (!mod) throw new Error(`Issue cover image not found: ${key}`);
  return mod.default;
}

export interface Footnote {
  /** Numeric marker shown in the body and in the footnotes list. */
  n: number;
  /** Footnote text rendered as plain prose. */
  text: string;
}

export type IssueBlock =
  | { type: 'p'; text: string; lede?: boolean }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'pull'; text: string }
  | { type: 'rule' };

export interface Issue {
  /** Sequential issue number — drives the "Issue No. 47" treatment. */
  number: number;
  slug: string;
  title: string;
  /** One-sentence dek shown under the title on the issue page and home hero. */
  dek: string;
  /** ISO date used for the byline and sort order. */
  date: string;
  /** Pretty date string for display ("September 15, 2025"). */
  displayDate: string;
  /** Section / kicker. */
  section: 'Climate' | 'Technology' | 'Urban planning' | 'Letters';
  /** Estimated reading time in minutes — written, not computed, to stay realistic. */
  readingTime: number;
  cover: ImageMetadata;
  /** Alt text for the cover photo. */
  coverAlt: string;
  /** Short photo credit shown beneath the cover. */
  coverCredit: string;
  /** Long-form body, block by block. */
  body: IssueBlock[];
  /** Optional inline citations, rendered as superscript markers in body text. */
  footnotes?: Footnote[];
}

export const issues: Issue[] = [
  {
    number: 47,
    slug: 'the-grid-doesnt-know-its-thursday',
    title: "The Grid Doesn't Know It's Thursday",
    dek: 'What a humid week in Sacramento taught me about why we keep mis-pricing the climate transition.',
    date: '2026-05-17',
    displayDate: 'May 17, 2026',
    section: 'Climate',
    readingTime: 11,
    cover: img('01-grid.jpg'),
    coverAlt: 'A line of high-voltage transmission towers stretching across a flat western landscape at dusk.',
    coverCredit: 'Photograph: American Public Power Association / Unsplash',
    body: [
      { type: 'p', lede: true, text: 'The first heat alert of the season landed on a Thursday, which is the day a friend in the California ISO’s operations center calls "the most boring day in power." Thursday afternoons are when industrial load is high and residential cooling is low and nobody is paying attention. By six o’clock that evening the wholesale price for a megawatt-hour on the grid had cleared at $940, which is roughly twenty times the price it cleared at on Monday¹ — and the heat wave, which the National Weather Service had been warning about for nine days, had not even begun.' },
      { type: 'p', text: 'I have been thinking about that Thursday for about a month. Not because anything went catastrophically wrong; nothing did. The lights stayed on. Nobody died. The story did not even make the Sacramento Bee. But the price tells you everything you need to know about the gap between the climate transition we have agreed to on paper and the climate transition we are actually building.' },
      { type: 'p', text: 'The grid does not know it is Thursday. The grid does not know that climate change is on the news. The grid is a real-time auction for the right to deliver one more electron, and on a Thursday in May, with a heat wave forty-eight hours out, it cleared at twenty times its normal rate because the supply curve was bending vertical against demand that was not even peak demand. It was warm-up demand.' },
      { type: 'h2', text: 'A pricing problem, not a willpower problem' },
      { type: 'p', text: 'There is a habit, in climate writing, of telling stories in moral registers. We need to choose better. We need to want it more. The story is rarely told as a story about prices, which is unfortunate, because the story is almost entirely a story about prices.' },
      { type: 'p', text: 'When the operator at the California ISO sees a price like $940 per megawatt-hour, what they are seeing is a system telling them, with mathematical clarity: you do not have enough firm capacity for the demand you are about to face. The price is not a punishment. It is a signal. And the signal, lately, has been arriving earlier and earlier in the year, which means the system’s reserve margin is being eaten by exactly the kind of slow, structural heating that climate models have been forecasting for thirty years.²' },
      { type: 'pull', text: 'The signal is not noisy. The signal is not subtle. The signal is a thousand dollars a megawatt-hour on a Thursday in May.' },
      { type: 'p', text: 'The honest answer to what we should do about this is unsatisfying, because it does not involve a clever app or a celebrity-backed nonprofit. The honest answer is that we should be building transmission lines and four-hour storage at a rate this country has not built infrastructure since the Eisenhower highway program, and we should be doing it in places where local politics make every line a four-year permitting fight. That is the actual climate transition. The rest is decoration.' },
      { type: 'h2', text: 'What the ISO operators see' },
      { type: 'p', text: 'I spent two days last summer in the gallery above the California ISO’s main operations floor, on a press visit that I had been angling for since 2022. The floor itself is not dramatic. It looks like a small NASA control room that has been redecorated by a regional bank. The drama is on the screens, and the drama is almost entirely about reserves.' },
      { type: 'p', text: 'A grid operator is not, fundamentally, trying to deliver clean power, or cheap power, or even reliable power in any abstract sense. A grid operator is trying to hold a thirteen percent operating reserve at all times — enough surplus capacity to absorb the loss of the single largest generator on the system without dropping load. On a Thursday in May, with industrial demand normal and cooling demand starting to climb and a heat wave forty-eight hours out, that reserve was sitting at about six percent. The $940 price was the auction the system runs in real time to find more.' },
      { type: 'p', text: 'I asked one of the operators — a woman in her mid-fifties with thirty years on the floor — what she would do if she were running the world. She said: "I would build storage. I would build storage like we built freeways. I would build storage until the price on a Thursday in May was the same as the price on a Sunday in October." She said this the way somebody says they would like to lose ten pounds. With a small, sad laugh.' },
      { type: 'h2', text: 'The slow climate' },
      { type: 'p', text: 'I have started using the phrase "the slow climate" to describe what is actually happening, as distinct from the climate we read about. The fast climate is the wildfire and the hurricane and the photograph of the polar bear. The slow climate is the actuarial table. It is the insurance company quietly pulling out of three counties in Florida. It is the cost of a homeowners policy in Paradise, California, going up by 340 percent in four years. It is the reserve margin on a Thursday in May, on a normal day, sitting at six percent instead of thirteen.' },
      { type: 'p', text: 'The slow climate does not make for compelling television, which is most of why it does not get the political weight it deserves. But it is what is actually doing the damage, and it is what the people who price risk for a living — reinsurers, grid operators, mortgage underwriters — have been quietly screaming about for the last decade.³' },
      { type: 'p', text: 'A reinsurer I have known since 2019 puts it this way: "We are not arguing about whether climate change is real. We have not been arguing about that for fifteen years. We are arguing about which decade in the next forty is going to be the one where the loss curves stop being insurable." That is the conversation. It is happening in offices in Munich and Zurich and Bermuda, and it is not happening on cable news.' },
      { type: 'rule' },
      { type: 'p', text: 'So. The grid does not know it is Thursday. The reinsurers know what year it is. The rest of us are somewhere in between, and the work of the next decade is, mostly, building the boring infrastructure that closes the gap. Wires. Storage. Substations. Permits. A great deal of permits.' },
      { type: 'p', text: 'I am not optimistic about the politics. I am cautiously optimistic about the engineering. The two are very different things, and the next twenty years of this story are going to be the story of which one moves faster.' },
      { type: 'p', text: 'Write to me, as always, at adam@fieldletter.dcrader.dev. I read every reply.' },
    ],
    footnotes: [
      { n: 1, text: 'California Independent System Operator, OASIS market data, hour-ending 18:00 PT, April 23 2026. Monday’s comparable price was $46.40/MWh.' },
      { n: 2, text: 'The clearest recent treatment of this dynamic is the Lawrence Berkeley National Laboratory’s "Western Resource Adequacy in a Warming Climate" working paper, March 2026.' },
      { n: 3, text: 'See Swiss Re Institute, "Sigma 03/2025: Natural catastrophes in 2024" — the third year in a row global insured losses crossed $130bn.' },
    ],
  },
  {
    number: 46,
    slug: 'streetcars-and-the-myth-of-the-easy-trip',
    title: 'Streetcars and the Myth of the Easy Trip',
    dek: 'Why the cities that win the next decade will be the ones that quietly fix their thirty-minute trips.',
    date: '2026-05-10',
    displayDate: 'May 10, 2026',
    section: 'Urban planning',
    readingTime: 9,
    cover: img('02-streetcar.jpg'),
    coverAlt: 'A red and cream streetcar on a wide brick avenue in early evening, lit windows reflecting off wet pavement.',
    coverCredit: 'Photograph: Kyle Sudu / Unsplash',
    body: [
      { type: 'p', lede: true, text: 'Every American transit agency keeps two sets of books. The first is the book of headline trips — the airport runs, the football-game shuttles, the rare event the local paper writes a feature about. The second is the book of thirty-minute trips, which is to say the daily, dull, ten-thousand-times-repeated movements of an actual city. The first set of books is what gets photographed. The second set of books is what decides whether anyone takes the bus.' },
      { type: 'p', text: 'I have lived in cities with brand-new light rail that nobody rides, and I have lived in cities with thirty-year-old buses that move a quarter-million people a day. The variable is almost never the vehicle. The variable is whether the thirty-minute trip works.' },
      { type: 'h2', text: 'A boring definition' },
      { type: 'p', text: 'A "thirty-minute trip" is what a planner means when they say "isochrone." Pick a point in a city — say, a particular intersection in West Oakland. Now draw a polygon around every place a person could reach from that point in thirty minutes, using only the transit system and their own two feet. The size and shape of that polygon, more than anything else, is the answer to the question of whether transit is useful in that part of the city.' },
      { type: 'p', text: 'The polygon for a person at 14th and Mandela, in West Oakland, in 2024, is about eleven square miles — enough to reach downtown, Emeryville, a sliver of Berkeley, and most of the lower flatlands. The polygon for the same intersection in 1948, before the freeway came through and before the streetcar lines were torn up, was almost certainly larger. We have a lot of data about a lot of things. We do not have a lot of data about that.' },
      { type: 'pull', text: 'The vehicle is almost never the variable. The variable is whether the thirty-minute trip works.' },
      { type: 'h2', text: 'What the streetcar got right' },
      { type: 'p', text: 'I am not, for the record, one of those people who thinks the streetcar was killed by a General Motors conspiracy. The streetcar was killed, mostly, by the car — by the fact that the car was, for forty years, a genuinely better technology for a wealthy American household than the streetcar was. You can lament that and still concede it. The streetcar lost on the merits, for a particular kind of buyer, in a particular era.' },
      { type: 'p', text: 'But what the streetcar got right — and what the modern American bus system, with a few honorable exceptions, has spent eighty years getting wrong — was frequency. A streetcar line in 1925 Pittsburgh ran every four to six minutes from before dawn until after midnight.¹ You did not consult a schedule. You walked to the corner. If transit is going to compete with the car for anything but the airport run, that is the bar. Every six minutes. From dawn until late.' },
      { type: 'p', text: 'The best transit systems on the continent today — Vancouver’s SkyTrain feeder buses, Toronto’s 504 King streetcar, the better routes in Mexico City — are good for exactly this reason. The bad ones, which is most of them, are bad for exactly the opposite reason. A thirty-minute headway is a polite way of telling people not to ride.' },
      { type: 'h2', text: 'Three cities to watch' },
      { type: 'p', text: 'I am watching three American cities very closely on this. Minneapolis, which has quietly built the best mid-sized bus network in the country, mostly by taking frequency seriously and refusing to build any new rail until ridership justified it. Indianapolis, which surprised everyone by passing a referendum on a real bus-rapid-transit network and then — the harder part — actually building it on time. And Cincinnati, whose downtown streetcar is an honest cautionary tale about what happens when you fund the vehicle and not the operations.' },
      { type: 'p', text: 'The Cincinnati streetcar opened in 2016 with no dedicated lane, no transit-signal priority, and a headway that started at twelve minutes and drifted, over the next few years, to twenty. It is a charming object that almost nobody uses for an actual trip. That is what happens when the photograph is the point.' },
      { type: 'rule' },
      { type: 'p', text: 'The cities that win the next decade are not going to be the ones with the most photogenic transit. They are going to be the ones that quietly, unglamorously, get the thirty-minute polygon to grow. That is the work. The streetcar is a beautiful object. The polygon is the city.' },
    ],
    footnotes: [
      { n: 1, text: 'See John Lewis, "The Pittsburgh Trolley: Lines and Operations 1900–1945" (Carnegie Mellon Press, 1998), Appendix C, for headway tables on the lines serving Squirrel Hill.' },
    ],
  },
  {
    number: 45,
    slug: 'i-turned-off-the-second-screen',
    title: 'I Turned Off the Second Screen',
    dek: 'After six weeks without a tablet on the kitchen counter, the strangest thing I noticed was the silence.',
    date: '2026-05-03',
    displayDate: 'May 3, 2026',
    section: 'Technology',
    readingTime: 8,
    cover: img('03-screen.jpg'),
    coverAlt: 'A glowing tablet propped on a kitchen counter beside a half-empty coffee cup, blurred light in the background.',
    coverCredit: 'Photograph: Roberto Cortese / Unsplash',
    body: [
      { type: 'p', lede: true, text: 'In the first week of April I unplugged the iPad in the kitchen. The iPad was, in theory, for recipes. In practice it was for whatever the New York Times push-notified me about while a tomato sauce reduced. The recipes thing was the cover story. The actual job of the iPad on the counter was to keep me from being alone with the tomato sauce.' },
      { type: 'p', text: 'I have been doing what people in my house call "small experiments in subtraction" for about three years now. The iPad was the latest one. Six weeks in, I do not particularly want to write a triumphant essay about how it changed my life, because it did not change my life. I will say, however, that I am writing this essay slightly faster than I would have written it in March, and I think that is not a coincidence.' },
      { type: 'h2', text: 'What "second screen" means' },
      { type: 'p', text: 'The phrase "second screen" originally meant the phone you used while watching the TV. It has gradually broadened to mean any screen that is on at the same time as another screen, which is most screens, most of the time. The kitchen iPad was a second screen for my own life. I was not doing anything on the iPad. I was just keeping it warm.' },
      { type: 'p', text: 'I want to be careful here, because I am not making the argument that screens are bad. I am making a smaller and stranger argument, which is that I had, somewhere along the way, started using a screen the way a person in 1992 might have used a cigarette — not for the nicotine, but for the thing to do with your hands while you were waiting.' },
      { type: 'pull', text: 'I was not doing anything on the iPad. I was just keeping it warm.' },
      { type: 'h2', text: 'Six weeks of small data' },
      { type: 'p', text: 'I kept a small notebook by the stove. I am not going to claim it is rigorous data; it is the diary of a person trying to pay attention. A few things showed up consistently.' },
      { type: 'p', text: 'I noticed silence. The iPad had, without my realizing it, been generating a low-grade ambient soundtrack — video previews, notification chimes, the sound a webpage makes when an ad autoplays. With the iPad off, the kitchen was as quiet as the kitchen actually is, which is to say full of the small sounds of cooking, a refrigerator compressor, a dog’s sigh, a car going by outside. I had forgotten what those sounded like, separately.' },
      { type: 'p', text: 'I noticed that I started talking to my wife more. We have been married for thirteen years; we do not have a communication problem. But the easy availability of a screen, on a counter, while she was telling me about her day, had been allowing me to be sixty percent present in a conversation, and the difference between sixty and ninety percent is not a small one.' },
      { type: 'p', text: 'I noticed that recipes, which were the alibi for the iPad in the first place, turned out to work approximately as well from a printed cookbook propped behind the burner. The relevant cookbook, in my house, is "How to Cook Everything" by Mark Bittman, which has been on the shelf since 2008 and is missing its dust jacket. I read the recipe before I started. I did not need to consult it every ninety seconds.' },
      { type: 'h2', text: 'What this is not' },
      { type: 'p', text: 'This is not a "throw your phone in a drawer" essay. I am not throwing my phone in a drawer. I do most of my work on a phone or a laptop, I read the news on a phone, and I am not interested in the asceticism market — the market for hand-tooled leather books and a Faraday-cage pouch you keep your phone in during dinner. That market is, mostly, performing virtue at $80 a pop.' },
      { type: 'p', text: 'I am making the much smaller claim that a screen on a kitchen counter, kept warm for no reason in particular, was costing me something I did not know I was spending. The cost was attention. The cost was the quiet. The cost was a small percentage of the marriage, which is a thing you do not want to spend small percentages of.' },
      { type: 'rule' },
      { type: 'p', text: 'The iPad is in a drawer now. I will probably plug it back in at some point. If I do, I would like to plug it back in deliberately — because there is a recipe I actually want to read, not because there is a small empty place on the counter that needs to be lit up. That is a small thing. Most of the things worth changing, in my experience, are.' },
    ],
  },
  {
    number: 44,
    slug: 'the-actuaries-saw-it-first',
    title: 'The Actuaries Saw It First',
    dek: 'Inside the reinsurance industry’s decade-long, mostly silent capitulation to a warmer planet.',
    date: '2026-04-26',
    displayDate: 'April 26, 2026',
    section: 'Climate',
    readingTime: 12,
    cover: img('04-flood.jpg'),
    coverAlt: 'Aerial view of a suburban street partially submerged in floodwater, rooftops barely visible above brown water.',
    coverCredit: 'Photograph: Chris Gallagher / Unsplash',
    body: [
      { type: 'p', lede: true, text: 'The first industry to capitulate to climate change was not the oil industry, and it was not the airline industry, and it was certainly not, despite its protestations to the contrary, the technology industry. The first industry to capitulate to climate change was the reinsurance industry, and it did so in 2003.' },
      { type: 'p', text: 'I do not mean that the reinsurers had a road-to-Damascus moment and rewrote their public relations. I mean something narrower and harder to undo. I mean that, starting around 2003 and accelerating sharply after 2017, the largest reinsurance companies in the world — Munich Re, Swiss Re, Hannover Re, the Berkshire Hathaway reinsurance group — began silently revising the catastrophe models they use to price insurance against weather events. The models came up. Then they came up again. Then, in 2023, several of them simply stopped writing coverage in certain American counties altogether.¹' },
      { type: 'p', text: 'There is no press release for this. There does not need to be one. The market does the talking.' },
      { type: 'h2', text: 'What reinsurance is' },
      { type: 'p', text: 'A brief primer, because most people do not need to think about this and most of what they hear about it is wrong. Your homeowner’s insurance company — State Farm, USAA, Liberty Mutual — does not, in fact, bear the full risk of paying out on your house. It bears a slice. The rest of the risk it lays off, in turn, to a reinsurance company, which is essentially an insurance company for insurance companies. Reinsurance is what allows a single hurricane to not bankrupt every primary insurer on the Gulf Coast at once.' },
      { type: 'p', text: 'The reinsurance industry is, in plain terms, the place where the actuarial math actually has to add up. A primary insurer can take a bad year. A reinsurer that takes a bad year takes the bad year for the entire industry. Reinsurers, accordingly, hire the best catastrophe modelers in the world. And those modelers have been quietly, for twenty years now, marking the climate to market.' },
      { type: 'pull', text: 'There is no press release for capitulation in this industry. The market does the talking.' },
      { type: 'h2', text: '2003, 2017, 2023' },
      { type: 'p', text: 'Three dates anchor the story. 2003 was the summer of the European heat wave — the one that killed an estimated 72,000 people across the continent. It also broke several reinsurance models for European mortality risk, in the technical sense that the modeled tail of the distribution turned out to be much fatter than the historical data had suggested. Several reinsurers spent the following winter rewriting how heat-related mortality entered their pricing.' },
      { type: 'p', text: '2017 was the year Atlantic hurricanes — Harvey, Irma, Maria — caused something north of $300 billion in damages, of which only about a third was insured. The uninsured two-thirds is the relevant number. It is the size of the protection gap, which is what the industry calls the difference between what was lost and what was covered. The protection gap, after 2017, was understood to be the central problem of the next decade.²' },
      { type: 'p', text: '2023 was the year State Farm stopped writing new homeowners policies in California, citing wildfire risk, and Allstate followed. AIG had already stopped writing in parts of Florida. Citizens Property Insurance Corporation, Florida’s state-run insurer of last resort, was by then carrying 1.3 million policies, a number it had been built explicitly to never have to carry.' },
      { type: 'h2', text: 'What the actuaries actually do' },
      { type: 'p', text: 'I have spent more time than is strictly healthy reading reinsurance trade publications, because they are the place where the climate conversation is happening with the gloves off. There is none of the political tip-toeing of an IPCC report and none of the rhetorical excess of an op-ed. There is just a series of polite, devastating sentences about how the loss-cost curve for a category of risk is no longer stationary, and what that does to a balance sheet.' },
      { type: 'p', text: 'A specific kind of sentence shows up over and over in these reports. It goes roughly: "Recent loss experience has diverged from historical baselines in a manner consistent with non-stationarity in the underlying hazard." Translated: the math has stopped working, because the world the math was about is gone.' },
      { type: 'p', text: 'When a reinsurer writes that sentence, what they do next is reprice. Repricing, in this context, is not a five percent annual increase. Repricing is a 240 percent annual increase in coastal Louisiana, or a withdrawal from the market in three counties in Arizona, or a quiet decision that a particular kind of wildfire-prone property is no longer insurable at any price. These are not theoretical decisions. They are the decisions that decide, in the next decade, which neighborhoods continue to be mortgageable and which do not.³' },
      { type: 'h2', text: 'The state of last resort' },
      { type: 'p', text: 'When the private market exits a region, the state, usually, steps in. Florida has Citizens. California has the FAIR Plan. Texas has the TWIA. Louisiana has Citizens Coastal. These are insurers of last resort, and they exist precisely so that a market exit does not become a credit-market exit — because if a house is uninsurable, it is also unmortgageable, and a town in which no house is mortgageable is a town that very quickly stops being a town.' },
      { type: 'p', text: 'The state insurers of last resort are, mostly, doing their jobs. They are also, mostly, undercapitalized and underpriced for the actual loss curve, because they are political entities and not market actors. The reinsurance industry knows this. The state insurers know it too. The conversation, increasingly, is about who pays when the state insurer of last resort is itself overwhelmed, which several of the modelers I trust think will happen, somewhere, in the next ten years.' },
      { type: 'rule' },
      { type: 'p', text: 'The actuaries saw this first. They have been seeing it, with increasing alarm, since the early 2000s. They are not climate activists; some of them, in their personal politics, are quite conservative. They are simply people whose job is to make the math add up, and the math has, for a long time now, refused to.' },
      { type: 'p', text: 'If you want a clear-eyed view of where the climate is actually going, you can read the IPCC reports, which are good and which have to be politically negotiated word by word. Or you can read the annual "Sigma" report from Swiss Re. The Sigma report does not have to be negotiated with anyone. The Sigma report just has to be true.' },
    ],
    footnotes: [
      { n: 1, text: 'See Swiss Re Institute, "Sigma 03/2025: Natural catastrophes in 2024," and Munich Re’s NatCatSERVICE summary for the same year.' },
      { n: 2, text: 'The standard reference for protection-gap analysis after 2017 is Lloyd’s of London, "Closing the Insurance Gap," published in 2018.' },
      { n: 3, text: 'See Benjamin Keys & Philip Mulder, "Neglected No More: Housing Markets, Mortgage Lending, and Sea Level Rise," NBER Working Paper 27930, with updates through 2024.' },
    ],
  },
  {
    number: 43,
    slug: 'in-defense-of-boring-zoning',
    title: 'In Defense of Boring Zoning',
    dek: 'The most consequential climate policy in California is also the least photogenic. That is the point.',
    date: '2026-04-19',
    displayDate: 'April 19, 2026',
    section: 'Urban planning',
    readingTime: 10,
    cover: img('05-zoning.jpg'),
    coverAlt: 'A residential street of two- and three-story buildings under a clear sky, mature trees lining the sidewalk.',
    coverCredit: 'Photograph: Avi Werde / Unsplash',
    body: [
      { type: 'p', lede: true, text: 'In June of 2024 the California state legislature passed a small, technical revision to a state law most people have never heard of, called the Housing Accountability Act. The revision was twenty-three pages long, was not covered by any major California newspaper at the time, and is, by my estimation, the single most consequential piece of climate policy the state has passed in twenty years. It has nothing to do with electric cars and almost nothing to do with the grid. It has to do with the question of where, in a given city, you are allowed to build a four-story building.' },
      { type: 'p', text: 'This is, I am aware, not the most stirring opening to an essay. I have lost subscribers to less. But the boring policy is the policy that works, and most of what we will call the climate transition, in twenty years’ time, will turn out to have been the cumulative effect of a hundred boring policies that did the actual work.' },
      { type: 'h2', text: 'What zoning is' },
      { type: 'p', text: 'A zoning map is a map of what a city has agreed, in advance, to allow on each parcel of land within its borders. Single-family residential. Multi-family residential. Commercial. Industrial. Mixed-use. Open space. Most American cities have maps that were drawn, in their broad strokes, between 1920 and 1955. The maps have been amended over and over, but the basic shape is generally older than your grandparents.' },
      { type: 'p', text: 'A 1947 zoning map is not a neutral document. It is, in most American cities, a record of how the local political class wanted the city to be sorted by race and income, written into law. The history of American urban segregation is, more than anything else, a history of zoning. That is not a contested claim in the academic literature; it is the consensus.¹' },
      { type: 'p', text: 'But the consequence of an old zoning map, in 2026, is not just historical. It is that the map decides what gets built, and what gets built decides who can afford to live in a city, and who can afford to live in a city decides how far they have to drive to get to a job. And how far people have to drive is, in a state like California, the largest single source of greenhouse gas emissions. The zoning map is a climate document, even though it was not written as one.' },
      { type: 'pull', text: 'The zoning map is a climate document, even though nobody wrote it as one.' },
      { type: 'h2', text: 'The slow, technical fix' },
      { type: 'p', text: 'For the last six years, California has been doing what is, in policy terms, an unusual thing. It has been quietly, technically, and unspectacularly disabling the parts of municipal zoning that prevent housing from being built near transit. SB 9, in 2021, allowed lot splits and duplexes on most single-family parcels. SB 10, the same year, allowed up to ten-unit buildings in transit-rich areas. SB 423, in 2023, extended the streamlined approval process for affordable housing. The 2024 revision to the Housing Accountability Act tightened the screws further: a city that does not meet its state-mandated housing target now loses certain land-use powers it has had since 1953.' },
      { type: 'p', text: 'None of these laws is glamorous. None of them has been the subject of a documentary. Several of them passed in committee on a 5-2 vote that was not covered by the Sacramento Bee. They are, collectively, doing more for the climate than any single piece of legislation passed by the state in my lifetime, because they are quietly remaking the shape of where Californians are allowed to live, and the shape of where Californians live decides how much they drive, and how much they drive decides the emissions.' },
      { type: 'h2', text: 'A confession of method' },
      { type: 'p', text: 'I should be honest about a methodological problem here. I am, by training and inclination, a person who likes the boring fix. I left municipal government in 2021 in part because I had concluded that the most useful work I could do was probably to write about exactly this kind of policy — the kind that does not generate a press conference and does not produce a satisfying enemy.' },
      { type: 'p', text: 'There is, I am aware, a respectable counter-position. The counter-position says that the climate emergency requires emergency responses, and that emergency responses require a clear villain and a clear deadline, and that boring incrementalism is what got us into this in the first place. I am not unsympathetic to that argument. I just do not think it is right.' },
      { type: 'p', text: 'The historical record of climate policy that actually moves the emissions curve is, almost without exception, a record of technical, unglamorous, often regulatory changes that happened slowly and persistently for many years. California’s vehicle-emission standards. The European Union’s building energy directives. Denmark’s offshore-wind feed-in tariffs. The American Inflation Reduction Act’s technology-neutral tax credits. The pattern is the pattern.²' },
      { type: 'h2', text: 'What this looks like at the parcel level' },
      { type: 'p', text: 'I spent last fall walking a single block in West Berkeley with a friend who is a small architect. The block has, on its east side, a row of single-family houses from the 1920s. On its west side, the same block has — since the 2022 zoning amendments — four new four-story buildings, each with about thirty units, going up next to the Ashby BART station. The four buildings will, when finished, house roughly six hundred people on the same amount of land that previously housed fourteen. Almost all of those six hundred people will be able to walk to BART in under five minutes.' },
      { type: 'p', text: 'I am not, for the record, going to argue that the new buildings are beautiful. They are not. They are the slightly mediocre architecture of cost-constrained mid-rise multifamily, and they will, in twenty years, look like the slightly mediocre architecture of the 1970s does today. That is fine. The point is not the architecture. The point is that, in twenty years, six hundred people are going to be living a five-minute walk from a train station instead of a forty-five-minute drive from a job. Multiply that, parcel by parcel, across a state of forty million people, and you have a climate policy.' },
      { type: 'rule' },
      { type: 'p', text: 'The boring policy is the policy that works. The zoning map is a climate document. The slow, technical fix is doing the slow, technical work. I would like, in twenty years, for it to be the kind of work we look back on with the same affection we now reserve for the interstate highway system, which is also boring, also technical, and also reshaped the country in ways nobody at the time fully understood.' },
      { type: 'p', text: 'In the meantime, here is to the staff lawyers at the Department of Housing and Community Development, who are not getting written about, and who are doing the work.' },
    ],
    footnotes: [
      { n: 1, text: 'The canonical account is Richard Rothstein’s "The Color of Law" (Liveright, 2017). For the more recent California-specific story, see Conor Dougherty’s "Golden Gates" (Penguin Press, 2020).' },
      { n: 2, text: 'I have stolen this framing, more or less wholesale, from the economist Jenny Holmes, whose 2022 paper "What Actually Moves the Curve" remains the best short treatment of climate policy effectiveness I know.' },
    ],
  },
  {
    number: 42,
    slug: 'the-ai-in-the-room',
    title: 'The AI in the Room',
    dek: 'I spent four months trying to use a coding assistant to do my actual job. Here is what I will and will not let it touch.',
    date: '2026-04-12',
    displayDate: 'April 12, 2026',
    section: 'Technology',
    readingTime: 9,
    cover: img('06-ai.jpg'),
    coverAlt: 'Abstract representation of a neural network rendered as a glowing lattice of green and blue nodes.',
    coverCredit: 'Photograph: Google DeepMind / Unsplash',
    body: [
      { type: 'p', lede: true, text: 'For the first three months of this year I ran a small, fairly serious experiment, which was: I tried to use a large-language-model coding assistant for as much of my weekly work as I could justify. The work, for context, is a mix of writing, GIS analysis, the occasional Python script for a chart, and a fair amount of correspondence. The assistant was Claude, the one from Anthropic. It was the model that came out late last year, and it is, by some distance, the best one I have used.' },
      { type: 'p', text: 'I did not approach the experiment in either a posture of "this changes everything" or a posture of "this is mostly nonsense." Both of those postures, in my experience, are tells. The first is usually written by somebody who is paid to think the first thing. The second is usually written by somebody who has not actually tried the tools.' },
      { type: 'p', text: 'What I came out with, after three months, is a small and specific set of rules about what I will and will not let the assistant touch. I am writing them down here, because I think they are more useful than the usual essay about whether AI is good or bad.' },
      { type: 'h2', text: 'What I let it do' },
      { type: 'p', text: 'I let it write the boring kind of code. Specifically: I let it write the data-loading and data-cleaning code at the start of a GIS analysis, the kind that reads in a CSV from the California Energy Commission, casts the columns, drops the rows with missing geocoordinates, and joins to a county shapefile. It writes this code in about thirty seconds, and the code is correct about ninety percent of the time, and the ten percent where it is wrong I catch by reading it before I run it. This used to take me forty-five minutes. It now takes me five.' },
      { type: 'p', text: 'I let it format. I let it convert a verbal description of a chart into the matplotlib code for the chart. I let it refactor a long Python notebook into a script, which is a thing I previously dreaded. I let it write the SQL query for the kind of join I have written ten thousand times in my life.' },
      { type: 'p', text: 'I let it summarize, with one specific caveat. I let it summarize documents I have read, as a check on my own summary. I do not let it summarize documents I have not read. The difference is the difference between using a calculator to check your arithmetic and using a calculator to do your thinking.' },
      { type: 'pull', text: 'The difference is between using a calculator to check your arithmetic and using one to do your thinking.' },
      { type: 'h2', text: 'What I do not let it do' },
      { type: 'p', text: 'I do not let it write prose for me. This is going to sound like a writer’s ego, but it is not. It is a fairly hard-headed observation about what writing actually is, for the kind of writing I do. The model produces prose that is grammatical and well-organized and, in a way that took me a few weeks to articulate, deeply uninteresting. The model has read a great deal of average prose and writes more of it. My job, such as it is, is to not write average prose.' },
      { type: 'p', text: 'I do not let it make analytical judgments. I do not let it tell me whether a data set supports a claim, because I have caught it, more than once, telling me yes when the answer was clearly no. The model is a tireless and confident pattern-matcher, and analysis is, in a deep sense, not a pattern-matching problem. Analysis is the question of which pattern is the one that actually applies. The model is not good at that question, because the question is mostly about what is not in the data.' },
      { type: 'p', text: 'I do not let it write anything that goes out under my name without my having read every word of it. This sounds obvious. It is not obvious. There is a slope, and I have seen people slide down it in real time. The slope starts with "I had it write the rough draft and then I edited it heavily." The slope ends with "I had it write the email." I am trying to stay off the slope.' },
      { type: 'h2', text: 'What this means in practice' },
      { type: 'p', text: 'In practice the model has eaten about thirty percent of the busywork of my week. The busywork is, importantly, the worst part of my week. It is the part where I am writing the seventh import statement of the day and wondering whether this is what I went to graduate school for. The model takes that part. I get back about five hours a week. I have, mostly, spent those five hours writing more, which is to say writing for Field Letter rather than against a deadline for a freelance client.' },
      { type: 'p', text: 'The model has not made me a better writer, or a better analyst, or a better thinker. It has not, particularly, made me a worse one either. It has, very specifically, replaced a pile of small annoyances with a different and smaller pile of new annoyances. The new annoyances are: catching its errors, deciding when to trust it, and figuring out where the line is.' },
      { type: 'p', text: 'I think that is the actual story of useful AI in 2026. It is not a transformation. It is not a destruction. It is a tool that, for the specific narrow tasks at which it is good, is genuinely much better than the tool we had before. And it is a tool which, if you give it tasks it is not good at, will fail in ways that look exactly like success until you check.' },
      { type: 'rule' },
      { type: 'p', text: 'I am keeping the assistant. I am keeping the rules. The boring kind of code, yes. The prose, no. The analytical judgments, absolutely not. Every word of anything that goes out under my name read by me, every time, no exceptions. I think those are pretty good rules for now. Ask me again in a year.' },
    ],
  },
  {
    number: 41,
    slug: 'the-quiet-comeback-of-the-night-train',
    title: 'The Quiet Comeback of the Night Train',
    dek: 'A trip from Zurich to Amsterdam, eight hours of darkness, and the surprisingly hopeful economics of European night rail.',
    date: '2026-04-05',
    displayDate: 'April 5, 2026',
    section: 'Urban planning',
    readingTime: 8,
    cover: img('07-transit.jpg'),
    coverAlt: 'The interior of a quiet train station at night, long-exposure light trails from a departing train along the platform.',
    coverCredit: 'Photograph: Daniel Abadia / Unsplash',
    body: [
      { type: 'p', lede: true, text: 'There is a sleeper train that leaves Zurich Hauptbahnhof at 9:42 in the evening and arrives in Amsterdam Centraal at 6:21 the next morning. I took it last month, with my wife, on the way back from a conference. The train was sold out, which is a sentence that ten years ago I would have said about a Beyoncé concert and not about a sleeper train, and I think that is the interesting part of the story.' },
      { type: 'p', text: 'European night trains, by 2010, had been declared dead so many times that it had stopped being news. The German national railway, Deutsche Bahn, withdrew from the night-train market in 2016. The French national railway closed its last domestic night line in 2017. The conventional wisdom was that the night train had been killed, finally, by the budget airline.' },
      { type: 'p', text: 'The conventional wisdom turned out to be wrong, or at least premature. By 2026, there are seventeen regular night-train routes operating across continental Europe, with three more announced for next year. The 9:42 from Zurich to Amsterdam is a Nightjet, run by the Austrian national railway, which has quietly become the most interesting passenger-rail operator in the world.' },
      { type: 'h2', text: 'Why the night train came back' },
      { type: 'p', text: 'A combination of three things, none of them dramatic. The first is climate, which generated political appetite for funding sleeper trains as an alternative to short-haul flights. The second is policy, which followed the appetite: France banned domestic flights on routes where a train alternative under two and a half hours exists. Spain has begun a similar process. Germany has rejoined the night-train market through partnerships with the Austrians and the Swedes.' },
      { type: 'p', text: 'The third is the surprisingly favorable economics of sleeper trains once you stop trying to compete with budget airlines on price and start competing with hotels on convenience. A Nightjet sleeper cabin from Zurich to Amsterdam, with two berths, runs about €280. A budget flight on the same route is about €120, plus another €180 for a hotel at either end, which you would otherwise need. The numbers, for a thoughtful traveler, are competitive. For a traveler who also values not arriving at an airport at 4:30 in the morning, they are favorable.¹' },
      { type: 'pull', text: 'The night train came back not by competing with airlines on price, but by competing with hotels on convenience.' },
      { type: 'h2', text: 'What this looks like for an American' },
      { type: 'p', text: 'I am aware that I have just written four paragraphs about a transportation mode that effectively does not exist in the United States. Amtrak has one functioning network of long-distance sleeper trains, and it is, with great affection, a hobbyist’s experience rather than a serious transportation option. The Coast Starlight is a beautiful object that nobody actually uses to get anywhere.' },
      { type: 'p', text: 'There is, however, a real question worth asking, which is: are there American city pairs where a night train would actually work? The honest answer, for the most part, is no — American cities are too spread out, the rail infrastructure is owned by freight companies who do not particularly want passenger trains, and the political will is not there. But there are a few pairs where the math is interesting. Chicago to Minneapolis. Chicago to Washington, D.C. Los Angeles to the Bay Area, if California ever finishes its high-speed-rail project. Atlanta to Washington. These are corridors where the trip is six to nine hours, which is the sweet spot for sleeper economics.' },
      { type: 'p', text: 'I am not particularly optimistic about American night rail. I am, however, surprisingly interested in the fact that the European night train, which by every conventional metric should have stayed dead, did not. Sometimes a technology does come back. Usually it comes back because the conditions that killed it changed, and the conditions that killed European sleeper trains — cheap short-haul flights, no climate policy, no political appetite — have changed quite a lot.' },
      { type: 'h2', text: 'On the train itself' },
      { type: 'p', text: 'The train, by the way, was lovely. The sleeper cabin was small and well-organized in the European way. Mira and I had a glass of wine in the dining car, watched the Rhine valley go by in the last of the light, and then read in our bunks until we fell asleep. We woke up to a member of the train staff knocking gently on the door with two coffees and two croissants, somewhere in the Dutch countryside, with the sun coming up. The whole experience cost what a mid-range hotel in central Amsterdam would have cost, and it was, by a significant margin, the most pleasant overnight transportation I have used in years.' },
      { type: 'p', text: 'If you are in Europe with any reason to go between two cities that are six to twelve hours apart, take the night train. The night train is, against my expectations and most of the trade press from a decade ago, back.' },
    ],
    footnotes: [
      { n: 1, text: 'ÖBB Nightjet published tariffs as of March 2026; budget-flight comparison based on March 2026 fares on Ryanair and easyJet for the Zurich–Amsterdam city pair.' },
    ],
  },
  {
    number: 40,
    slug: 'a-housekeeping-letter',
    title: 'A Housekeeping Letter',
    dek: 'Some notes on what is coming this spring, a small change to how the comments work, and one apology.',
    date: '2026-03-29',
    displayDate: 'March 29, 2026',
    section: 'Letters',
    readingTime: 4,
    cover: img('08-data.jpg'),
    coverAlt: 'A simple wooden desk with an open notebook, a fountain pen, and a stack of mail in a quiet morning light.',
    coverCredit: 'Photograph: Glenn Carstens-Peters / Unsplash',
    body: [
      { type: 'p', lede: true, text: 'I am taking my usual occasional liberty of skipping the essay this week, because there are a few small bits of housekeeping that have accumulated and that I would rather address in one place than as a footnote to something else.' },
      { type: 'h2', text: 'What is coming this spring' },
      { type: 'p', text: 'I am working on a longer piece on California’s offshore-wind program, which has been the subject of more emails to me than any single topic in the last six months. The piece has taken longer than I expected because I am trying to talk to actual people in the program rather than read more white papers about it. I will get it to you in May.' },
      { type: 'p', text: 'I am also writing a short series, probably three issues, on the politics of permitting. It will sit at the intersection of climate, urbanism, and the regulatory state, which is the intersection I have been spending most of my reading time at. Some of you will love it. Some of you will write me sharp letters about it. I am ready for both.' },
      { type: 'h2', text: 'The comments are moving' },
      { type: 'p', text: 'I have, after a great deal of thought, decided to move comments off the issues themselves and into a single weekly thread, posted on Mondays, where readers can discuss the previous day’s issue. The reason is small and human: I was not reading the comments under the issues, and I was reading the comments in the weekly thread, and I would rather you talk to me where I can hear you.' },
      { type: 'pull', text: 'I would rather you talk to me where I can hear you.' },
      { type: 'h2', text: 'An apology' },
      { type: 'p', text: 'Issue No. 38, on California water rights, contained an error: I stated that the Imperial Irrigation District holds senior water rights of 3.1 million acre-feet from the Colorado River. The correct figure is 3.85 million acre-feet. Several of you wrote in to point this out, including one reader who has worked at IID for the last twenty-six years and was extremely polite about my mistake. I have fixed the issue on the site and added a correction note. I am sorry. The thrust of the piece is not affected, but the number is the number.' },
      { type: 'h2', text: 'Thank you' },
      { type: 'p', text: 'The list crossed twenty-two thousand subscribers last week. About four thousand of you have been here since the first year, which is to say since the days when I was writing this from a kitchen table in Cleveland to a list of forty-one people, most of them my friends from grad school. I cannot quite get over the fact that I now do this for a living. Thank you. Genuinely.' },
      { type: 'p', text: 'A new essay will land next Sunday, as usual. I will see you then.' },
    ],
  },
];

/** Issues sorted newest-first for archive & recent-issues use. */
export const issuesByDate: Issue[] = [...issues].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
);

export const currentIssue: Issue = issuesByDate[0];
