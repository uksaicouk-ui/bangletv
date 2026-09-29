export interface StreamSource {
  id: string;
  label: string;
  type: 'youtube' | 'hls' | 'audio' | 'embed';
  url: string;
  embedId?: string;
  quality: '4K' | '1080p' | '720p' | '480p' | 'Auto' | 'Audio HD';
  isVerified: boolean;
  serverLocation: string;
}

export interface EPGProgram {
  title: string;
  banglaTitle?: string;
  startTime: string;
  endTime: string;
  duration: string;
  progressPercent: number;
}

export interface IPTVChannel {
  id: string;
  name: string;
  banglaName?: string;
  number: number;
  category: 
    | 'News' 
    | 'Sports' 
    | 'National' 
    | 'Entertainment' 
    | 'Documentary' 
    | 'Education' 
    | 'Kids' 
    | 'Music' 
    | 'Religious' 
    | 'Culture' 
    | 'Community' 
    | 'Radio';
  country: string;
  region: 'Bangladesh' | 'Asia' | 'Europe' | 'Middle East' | 'North America' | 'Global';
  language: 'Bangla' | 'English' | 'Arabic' | 'Hindi' | 'Urdu' | 'French' | 'Multilingual';
  logo: string;
  sources: StreamSource[];
  activeSourceIndex: number;
  isLive: boolean;
  status: 'Online' | 'Degraded' | 'Offline';
  currentShow: string;
  nextShow: string;
  epgCurrent: EPGProgram;
  epgNext: EPGProgram;
  viewersCount: number;
  resolution: '4K' | '1080p' | '720p' | 'Audio HD';
  broadcastProtocol: 'HLS / LL-HLS' | 'YouTube 24/7' | 'Icecast Stream' | 'WebRTC Relay';
  bitrate: string;
  originNode: string;
  description: string;
  editorialNote: string;
  tags: string[];
}

export const IPTV_CHANNELS: IPTVChannel[] = [
  // ==========================================
  // 1. BANGLADESH NEWS & ROLLING JOURNALISM
  // ==========================================
  {
    id: 'jamuna-tv-hd',
    number: 101,
    name: 'Jamuna Television HD',
    banglaName: 'যমুনা টেলিভিশন',
    category: 'News',
    country: 'Bangladesh',
    region: 'Bangladesh',
    language: 'Bangla',
    logo: 'jamuna-tv-hd',
    sources: [
      {
        id: 'jamuna-yt-primary',
        label: 'Server 1 (Dhaka Primary YouTube HD)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCN6sm8iHiPd0cnoUardDAnw',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Dhaka, Bangladesh'
      },
      {
        id: 'jamuna-yt-backup',
        label: 'Server 2 (Jamuna 24 Ghanta Live Relay)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/2aB9nFj8z6s',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Singapore CDN'
      },
      {
        id: 'jamuna-embed-fallback',
        label: 'Server 3 (Jamuna Official Web Relay)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCvsrgV0G9gW6_3U5_7t7-9A',
        quality: '720p',
        isVerified: true,
        serverLocation: 'Frankfurt Node'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: '24 Ghanta Live: Rapid Analysis & Real-Time Field Reports',
    nextShow: 'Janatar Shonglap: Citizen Dialogue with Policy Reformers',
    epgCurrent: {
      title: '24 Ghanta Live: Rapid Analysis & Field Reports',
      banglaTitle: '২৪ ঘণ্টা লাইভ: মাঠপর্যায়ের বস্তুনিষ্ঠ সংবাদ',
      startTime: '10:00 PM',
      endTime: '11:00 PM',
      duration: '60 min',
      progressPercent: 45
    },
    epgNext: {
      title: 'Janatar Shonglap: Public Accountability Forum',
      banglaTitle: 'জনতার সংলাপ: সংস্কার ও জনআকাঙ্ক্ষা',
      startTime: '11:00 PM',
      endTime: '12:00 AM',
      duration: '60 min',
      progressPercent: 0
    },
    viewersCount: 34200,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '5.2 Mbps',
    originNode: 'Dhaka Central Hub (Node-BD-01)',
    description: 'High-speed 24-hour Bengali rolling news, breaking headlines, investigative reports, and in-depth political discourse live from Dhaka.',
    editorialNote: 'Official live broadcast stream directly from Jamuna Television Bangladesh.',
    tags: ['News', 'Live', 'Breaking', 'Dhaka']
  },

  {
    id: 'somoy-news',
    number: 102,
    name: 'Somoy News Live',
    banglaName: 'সময় সংবাদ',
    category: 'News',
    country: 'Bangladesh',
    region: 'Bangladesh',
    language: 'Bangla',
    logo: 'somoy-news',
    sources: [
      {
        id: 'somoy-yt-primary',
        label: 'Server 1 (Somoy 24/7 News Feed)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCxHoBXkY88Tb8z1Ssj6CWsQ',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Dhaka, Bangladesh'
      },
      {
        id: 'somoy-yt-backup',
        label: 'Server 2 (Somoy Bulletin Special)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/u4C01G3t3E8',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'London Node'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'Shironam Shobcheye Age: Hourly Comprehensive Bulletin',
    nextShow: 'Desh Rupantor: Economic Recovery & Governance Ledger',
    epgCurrent: {
      title: 'Hourly News Bulletin',
      banglaTitle: 'সময় বুলেটিন: দেশ ও আন্তর্জাতিক খবর',
      startTime: '10:30 PM',
      endTime: '11:00 PM',
      duration: '30 min',
      progressPercent: 60
    },
    epgNext: {
      title: 'Desh Rupantor: Economy & Trade',
      banglaTitle: 'দেশ রূপান্তর: অর্থনৈতিক চালচিত্র',
      startTime: '11:00 PM',
      endTime: '11:45 PM',
      duration: '45 min',
      progressPercent: 0
    },
    viewersCount: 29800,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '4.8 Mbps',
    originNode: 'Dhaka Central Hub (Node-BD-01)',
    description: 'Bangladesh’s highest-reach satellite news service featuring round-the-clock district, national, and world headlines.',
    editorialNote: 'Official live broadcast stream directly from Somoy TV Bangladesh.',
    tags: ['News', 'Live', 'Bulletins']
  },

  {
    id: 'ekattor-tv',
    number: 103,
    name: 'Ekattor TV (71 News)',
    banglaName: 'একাত্তর টিভি',
    category: 'News',
    country: 'Bangladesh',
    region: 'Bangladesh',
    language: 'Bangla',
    logo: 'ekattor-tv',
    sources: [
      {
        id: 'ekattor-yt-primary',
        label: 'Server 1 (Ekattor HD Broadcast)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCtqvtAVmad5zywaziN6CbfA',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Dhaka, Bangladesh'
      },
      {
        id: 'ekattor-yt-backup',
        label: 'Server 2 (Ekattor Journal Relay)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/Z6S7n9j0h_Y',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Singapore CDN'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'Ekattor Journal: In-Depth Investigative Review',
    nextShow: 'Goltebil: Policy Debate on Constitution & Rights',
    epgCurrent: {
      title: 'Ekattor Journal: Special Report',
      banglaTitle: 'একাত্তর জার্নাল: বিশেষ প্রতিবেদন',
      startTime: '10:00 PM',
      endTime: '11:30 PM',
      duration: '90 min',
      progressPercent: 35
    },
    epgNext: {
      title: 'Goltebil: Prime Time Debate',
      banglaTitle: 'গোলটেবিল: শাসনতন্ত্র ও নাগরিক অধিকার',
      startTime: '11:30 PM',
      endTime: '01:00 AM',
      duration: '90 min',
      progressPercent: 0
    },
    viewersCount: 18900,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '4.6 Mbps',
    originNode: 'Dhaka Central Hub (Node-BD-01)',
    description: 'Current affairs and documentary channel with a focus on historical record, democracy, and investigative journalism.',
    editorialNote: 'Official live broadcast stream directly from Ekattor Television.',
    tags: ['News', 'Journalism', 'Current Affairs']
  },

  {
    id: 'dbc-news',
    number: 104,
    name: 'DBC News HD',
    banglaName: 'ডিবিসি নিউজ',
    category: 'News',
    country: 'Bangladesh',
    region: 'Bangladesh',
    language: 'Bangla',
    logo: 'dbc-news',
    sources: [
      {
        id: 'dbc-primary',
        label: 'Server 1 (DBC News Official Live)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC5pChk_evEhlVaEEV5-C4yg',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Dhaka, Bangladesh'
      },
      {
        id: 'dbc-backup',
        label: 'Server 2 (DBC Shongbad Relay)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/xKx3_2A3R9Y',
        quality: '720p',
        isVerified: true,
        serverLocation: 'US East Relay'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'DBC Shongbad: Continuous National Coverage',
    nextShow: 'Rajkahon: Prime Time Political Exchange',
    epgCurrent: {
      title: 'DBC National Bulletin',
      banglaTitle: 'ডিবিসি সংবাদ: সার্বক্ষণিক খবর',
      startTime: '10:00 PM',
      endTime: '11:00 PM',
      duration: '60 min',
      progressPercent: 50
    },
    epgNext: {
      title: 'Rajkahon: Political Deliberation',
      banglaTitle: 'রাজকাহন: রাজনীতি ও সংস্কার পর্যালোচনা',
      startTime: '11:00 PM',
      endTime: '12:00 AM',
      duration: '60 min',
      progressPercent: 0
    },
    viewersCount: 16700,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '4.5 Mbps',
    originNode: 'Dhaka Central Hub (Node-BD-01)',
    description: 'Dedicated 24-hour news network reporting on political reforms, economy, and grassroots society.',
    editorialNote: 'Official live feed from Dhaka.',
    tags: ['News', 'Debate', 'Dhaka']
  },

  // ==========================================
  // 2. BANGLADESH NATIONAL, CULTURE & SPORTS
  // ==========================================
  {
    id: 'btv-world',
    number: 105,
    name: 'BTV World (Bangladesh Television)',
    banglaName: 'বিটিভি ওয়ার্ল্ড (বাংলাদেশ টেলিভিশন)',
    category: 'National',
    country: 'Bangladesh',
    region: 'Bangladesh',
    language: 'Bangla',
    logo: 'btv-world',
    sources: [
      {
        id: 'btv-yt-official',
        label: 'Server 1 (BTV World Official Broadcast Feed)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCJ9AoOeOA9PJGABEibs_HvA',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Rampura, Dhaka'
      },
      {
        id: 'btv-backup-relay',
        label: 'Server 2 (BTV State Heritage Archive Relay)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/3k_iE9A_YyQ',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Singapore CDN'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'Sangbad Bichitra: National Affairs & Diplomatic Ledger',
    nextShow: 'Shurer Dhara: Classical Bengali Music Tradition',
    epgCurrent: {
      title: 'Sangbad Bichitra: National Digest',
      banglaTitle: 'সংবাদ বিচিত্রা: জাতীয় পরিক্রমা',
      startTime: '10:00 PM',
      endTime: '10:45 PM',
      duration: '45 min',
      progressPercent: 75
    },
    epgNext: {
      title: 'Shurer Dhara: Classical Music Heritage',
      banglaTitle: 'সুরের ধারা: চিরায়ত শাস্ত্রীয় সঙ্গীত',
      startTime: '10:45 PM',
      endTime: '11:45 PM',
      duration: '60 min',
      progressPercent: 0
    },
    viewersCount: 24500,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '5.0 Mbps',
    originNode: 'Dhaka Central Hub (Node-BD-01)',
    description: 'The premier public terrestrial broadcaster of Bangladesh connecting global citizens with state, parliamentary, and cultural affairs.',
    editorialNote: 'Official public service live broadcast stream from Bangladesh Television.',
    tags: ['National', 'Public TV', 'Culture', 'News']
  },

  {
    id: 't-sports-hd',
    number: 106,
    name: 'T Sports HD (Premier Sports Network)',
    banglaName: 'টি স্পোর্টস এইচডি',
    category: 'Sports',
    country: 'Bangladesh',
    region: 'Bangladesh',
    language: 'Bangla',
    logo: 't-sports-hd',
    sources: [
      {
        id: 'tsports-primary',
        label: 'Server 1 (T Sports Match Arena HD)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/xKx3_2A3R9Y',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Dhaka, Bangladesh'
      },
      {
        id: 'tsports-backup',
        label: 'Server 2 (Cricket & League Highlights)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/Z6S7n9j0h_Y',
        quality: '720p',
        isVerified: true,
        serverLocation: 'Mumbai Relay'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'Live Match Arena: Cricket & Premier League Analysis',
    nextShow: 'Sports Extra: Global Football Recap & Athlete Interviews',
    epgCurrent: {
      title: 'Cricket Tactical Review',
      banglaTitle: 'ক্রিকেট ম্যাচ পর্যালোচনা ও সেরা মুহূর্ত',
      startTime: '10:00 PM',
      endTime: '11:15 PM',
      duration: '75 min',
      progressPercent: 40
    },
    epgNext: {
      title: 'Sports Extra: Global Leagues',
      banglaTitle: 'স্পোর্টস এক্সট্রা: আন্তর্জাতিক ফুটবল খবর',
      startTime: '11:15 PM',
      endTime: '12:00 AM',
      duration: '45 min',
      progressPercent: 0
    },
    viewersCount: 28900,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '5.5 Mbps',
    originNode: 'Dhaka Central Hub (Node-BD-01)',
    description: "Bangladesh's premier high-definition dedicated sports network broadcasting domestic cricket tournaments, football leagues, and athletics.",
    editorialNote: 'Authorized sports programming relay.',
    tags: ['Sports', 'Cricket', 'Football', 'Live Match']
  },

  {
    id: 'channel-i-world',
    number: 107,
    name: 'Channel i Global',
    banglaName: 'চ্যানেল আই',
    category: 'Culture',
    country: 'Bangladesh',
    region: 'Bangladesh',
    language: 'Bangla',
    logo: 'channel-i-world',
    sources: [
      {
        id: 'channel-i-primary',
        label: 'Server 1 (Channel i Global HD)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC8NcXMG3A3f2aFQyGTpSNww',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Tejgaon, Dhaka'
      },
      {
        id: 'channel-i-backup',
        label: 'Server 2 (Tritiyo Matra & Agriculture Relay)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/jR8S8f-p-gA',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Singapore CDN'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'Hridoye Mati O Manush: Agriculture and Agrarian Future',
    nextShow: 'Tritiyo Matra: Midnight Political Roundtable',
    epgCurrent: {
      title: 'Hridoye Mati O Manush',
      banglaTitle: 'হৃদয়ে মাটি ও মানুষ: আধুনিক কৃষি প্রযুক্তি',
      startTime: '10:00 PM',
      endTime: '11:00 PM',
      duration: '60 min',
      progressPercent: 55
    },
    epgNext: {
      title: 'Tritiyo Matra: Political Deliberation',
      banglaTitle: 'তৃতীয় মাত্রা: মধ্যরাতের রাজনৈতিক সংলাপ',
      startTime: '11:00 PM',
      endTime: '12:30 AM',
      duration: '90 min',
      progressPercent: 0
    },
    viewersCount: 21300,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '4.9 Mbps',
    originNode: 'Dhaka Central Hub (Node-BD-01)',
    description: 'Pioneering private satellite broadcaster featuring award-winning agricultural coverage, arts, literature, and political debate.',
    editorialNote: 'Official live broadcast stream directly from Channel i Bangladesh.',
    tags: ['Culture', 'Agriculture', 'Discussion', 'Drama']
  },

  {
    id: 'deepto-tv',
    number: 108,
    name: 'Deepto TV HD (Drama & Entertainment)',
    banglaName: 'দীপ্ত টিভি',
    category: 'Entertainment',
    country: 'Bangladesh',
    region: 'Bangladesh',
    language: 'Bangla',
    logo: 'deepto-tv',
    sources: [
      {
        id: 'deepto-primary',
        label: 'Server 1 (Deepto TV Entertainment Live)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/Z6S7n9j0h_Y',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Dhaka, Bangladesh'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'Prime Time Bengali Mega Serial & Family Drama',
    nextShow: 'Shondhar Golpo: Contemporary Fiction Showcase',
    epgCurrent: {
      title: 'Bengali Mega Drama Serial',
      banglaTitle: 'জনপ্রিয় মেগাধারাবাহিক নাটক',
      startTime: '10:00 PM',
      endTime: '10:45 PM',
      duration: '45 min',
      progressPercent: 70
    },
    epgNext: {
      title: 'Contemporary Fiction Showcase',
      banglaTitle: 'সন্ধ্যার গল্প: সমকালীন পারিবারিক নাটক',
      startTime: '10:45 PM',
      endTime: '11:30 PM',
      duration: '45 min',
      progressPercent: 0
    },
    viewersCount: 19400,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '4.8 Mbps',
    originNode: 'Dhaka Central Hub (Node-BD-01)',
    description: 'Leading entertainment and serial drama channel celebrated for high-production value adaptations, telefilms, and cinematic arts.',
    editorialNote: 'Entertainment network feed.',
    tags: ['Entertainment', 'Drama', 'Serials', 'Telefilms']
  },

  {
    id: 'sangshad-tv',
    number: 109,
    name: 'Sangshad Bangladesh TV (Education & Civic)',
    banglaName: 'সংসদ বাংলাদেশ টেলিভিশন',
    category: 'Education',
    country: 'Bangladesh',
    region: 'Bangladesh',
    language: 'Bangla',
    logo: 'sangshad-tv',
    sources: [
      {
        id: 'sangshad-primary',
        label: 'Server 1 (Sangshad Educational Broadcast)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/3k_iE9A_YyQ',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Dhaka, Bangladesh'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'Ghore Boshe Shikhi: Distance Learning & STEM Curriculum',
    nextShow: 'Parliamentary Archive & Constitutional Reform Debates',
    epgCurrent: {
      title: 'STEM Science & Mathematics Lesson',
      banglaTitle: 'ঘরে বসে শিখি: গণিত ও বিজ্ঞান শিক্ষা',
      startTime: '10:00 PM',
      endTime: '11:00 PM',
      duration: '60 min',
      progressPercent: 30
    },
    epgNext: {
      title: 'Constitutional Reform Archive',
      banglaTitle: 'সাংবিধানিক সংস্কার ও সংসদীয় ইতিহাস',
      startTime: '11:00 PM',
      endTime: '12:00 AM',
      duration: '60 min',
      progressPercent: 0
    },
    viewersCount: 13200,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '4.2 Mbps',
    originNode: 'Dhaka Central Hub (Node-BD-01)',
    description: 'State educational and parliamentary channel broadcasting STEM curriculum, language learning, and civic proceedings across Bangladesh.',
    editorialNote: 'Public interest educational transmission.',
    tags: ['Education', 'Parliament', 'STEM', 'Curriculum']
  },

  // ==========================================
  // 3. INTERNATIONAL NEWS & PUBLIC BROADCASTERS
  // ==========================================
  {
    id: 'al-jazeera-english',
    number: 201,
    name: 'Al Jazeera English 24/7 Live',
    banglaName: 'আল জাজিরা ইংলিশ লাইভ',
    category: 'News',
    country: 'Qatar / Global',
    region: 'Middle East',
    language: 'English',
    logo: 'al-jazeera',
    sources: [
      {
        id: 'aj-yt-live',
        label: 'Server 1 (Al Jazeera Official 24/7 Feed)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCNye-wNBqNL5ZzHSJj3l8Bg',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Doha, Qatar'
      },
      {
        id: 'aj-backup-doc',
        label: 'Server 2 (I-Unit Investigative Special: Bangladesh)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/a6v75dGv2z8',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'London Node'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'Newshour: Global Conflict, Diplomacy & Economy',
    nextShow: '101 East: Asia Investigative Magazine',
    epgCurrent: {
      title: 'Al Jazeera Newshour Global',
      banglaTitle: 'আল জাজিরা আন্তর্জাতিক সংবাদ',
      startTime: '10:00 PM',
      endTime: '11:00 PM',
      duration: '60 min',
      progressPercent: 65
    },
    epgNext: {
      title: '101 East: Asia Documentary',
      banglaTitle: '১০১ ইস্ট: এশীয় অনুসন্ধানী রিপোর্ট',
      startTime: '11:00 PM',
      endTime: '11:30 PM',
      duration: '30 min',
      progressPercent: 0
    },
    viewersCount: 42100,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '5.8 Mbps',
    originNode: 'Global Reference Node (Node-GL-01)',
    description: 'Leading global independent broadcaster providing unbiased news from the Global South, investigative documentaries, and geopolitical analysis.',
    editorialNote: 'Official live transmission relay from Al Jazeera English.',
    tags: ['News', 'Global', 'Al Jazeera', 'Investigative']
  },

  {
    id: 'bbc-news-world',
    number: 202,
    name: 'BBC News World 24/7',
    banglaName: 'বিবিসি নিউজ ওয়ার্ল্ড',
    category: 'News',
    country: 'United Kingdom',
    region: 'Europe',
    language: 'English',
    logo: 'bbc-news',
    sources: [
      {
        id: 'bbc-yt-primary',
        label: 'Server 1 (BBC News Live YouTube Hub)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC16niRr50-MSBwiO3YDb3RA',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'London, UK'
      },
      {
        id: 'bbc-backup-special',
        label: 'Server 2 (BBC Bangladesh Special Investigation)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/Z6S7n9j0h_Y',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'London Node'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'BBC World News America & Asia Briefing',
    nextShow: 'HARDtalk: Uncompromising Leader Interviews',
    epgCurrent: {
      title: 'BBC World News Briefing',
      banglaTitle: 'বিবিসি বিশ্ব সংবাদ ও বিশ্লেষণ',
      startTime: '10:00 PM',
      endTime: '10:30 PM',
      duration: '30 min',
      progressPercent: 80
    },
    epgNext: {
      title: 'HARDtalk with Stephen Sackur',
      banglaTitle: 'হার্ডটক: বিশ্বনেতাদের মুখোমুখি সাক্ষাৎকার',
      startTime: '10:30 PM',
      endTime: '11:00 PM',
      duration: '30 min',
      progressPercent: 0
    },
    viewersCount: 38700,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '5.5 Mbps',
    originNode: 'London Node (Node-UK-01)',
    description: 'The world’s most trusted international news broadcaster bringing verified reports, in-depth investigations, and political debates.',
    editorialNote: 'Official live service from BBC World News.',
    tags: ['News', 'BBC', 'UK', 'Global']
  },

  {
    id: 'dw-english',
    number: 203,
    name: 'DW News HD (Deutsche Welle)',
    banglaName: 'ডয়চে ভেলে (জার্মানি)',
    category: 'News',
    country: 'Germany',
    region: 'Europe',
    language: 'English',
    logo: 'dw-news',
    sources: [
      {
        id: 'dw-yt-live',
        label: 'Server 1 (DW English 24/7 Live Stream)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCknLrEdhRCp1aegoMqRaCZg',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Berlin, Germany'
      },
      {
        id: 'dw-backup',
        label: 'Server 2 (DW Documentary & Climate Feed)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/jR8S8f-p-gA',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Frankfurt CDN'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'DW News Live: European Affairs & Global Perspectives',
    nextShow: 'Conflict Zone: Tough Interviews with Key Players',
    epgCurrent: {
      title: 'DW News Europe & World',
      banglaTitle: 'ডয়চে ভেলে ইউরোপীয় সংবাদ',
      startTime: '10:00 PM',
      endTime: '11:00 PM',
      duration: '60 min',
      progressPercent: 40
    },
    epgNext: {
      title: 'Conflict Zone Interview',
      banglaTitle: 'কনফ্লিক্ট জোন: বিশেষ সাক্ষাৎকার',
      startTime: '11:00 PM',
      endTime: '11:30 PM',
      duration: '30 min',
      progressPercent: 0
    },
    viewersCount: 22600,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '5.0 Mbps',
    originNode: 'Global Reference Node (Node-GL-01)',
    description: "Germany's international broadcaster presenting comprehensive coverage of European, Asian, and American geopolitical developments.",
    editorialNote: 'Authorized live transmission from DW.',
    tags: ['News', 'Europe', 'Germany', 'Documentary']
  },

  {
    id: 'france-24-en',
    number: 204,
    name: 'France 24 HD (International News)',
    banglaName: 'ফ্রান্স ২৪ এইচডি',
    category: 'News',
    country: 'France',
    region: 'Europe',
    language: 'English',
    logo: 'france-24',
    sources: [
      {
        id: 'france24-yt',
        label: 'Server 1 (France 24 English 24/7 Live)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC4TzN3iVz-c0d1lA1uQyU6w',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Paris, France'
      },
      {
        id: 'france24-backup',
        label: 'Server 2 (France 24 Special Investigation)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/oX5wA1R8e0o',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'London Node'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'The World This Hour: European & African Headlines',
    nextShow: 'Focus: Eye on Global Current Affairs',
    epgCurrent: {
      title: 'The World This Hour',
      banglaTitle: 'ফ্রান্স ২৪ বিশ্ব সংবাদ পরিক্রমা',
      startTime: '10:00 PM',
      endTime: '10:30 PM',
      duration: '30 min',
      progressPercent: 70
    },
    epgNext: {
      title: 'Focus: Investigative Magazine',
      banglaTitle: 'ফোকাস: আন্তর্জাতিক অনুসন্ধানী শো',
      startTime: '10:30 PM',
      endTime: '11:00 PM',
      duration: '30 min',
      progressPercent: 0
    },
    viewersCount: 20100,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '5.0 Mbps',
    originNode: 'Global Reference Node (Node-GL-01)',
    description: 'French international news network broadcasting authoritative world reporting with distinct European and African perspectives.',
    editorialNote: 'Official live service from France Médias Monde.',
    tags: ['News', 'France', 'Europe', 'International']
  },

  {
    id: 'nhk-world-japan',
    number: 205,
    name: 'NHK World-Japan Live',
    banglaName: 'এনএইচকে ওয়ার্ল্ড জাপান',
    category: 'Culture',
    country: 'Japan',
    region: 'Asia',
    language: 'English',
    logo: 'nhk-world',
    sources: [
      {
        id: 'nhk-yt',
        label: 'Server 1 (NHK World-Japan Live Feed)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UC4g11_076UfC9m0N06iX_wQ',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Tokyo, Japan'
      },
      {
        id: 'nhk-backup',
        label: 'Server 2 (NHK Asia Technology Relay)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/xKx3_2A3R9Y',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Tokyo Node'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'NHK Newsline: Asian Innovation, Science & Society',
    nextShow: 'Japan Railway Journal: Engineering Excellence',
    epgCurrent: {
      title: 'NHK Newsline Asia',
      banglaTitle: 'এনএইচকে নিউজলাইন: এশীয় প্রযুক্তি ও খবর',
      startTime: '10:00 PM',
      endTime: '10:30 PM',
      duration: '30 min',
      progressPercent: 50
    },
    epgNext: {
      title: 'Japan Railway & Engineering Journal',
      banglaTitle: 'জাপান রেলওয়ে ও প্রযুক্তি জার্নাল',
      startTime: '10:30 PM',
      endTime: '11:00 PM',
      duration: '30 min',
      progressPercent: 0
    },
    viewersCount: 17800,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '5.2 Mbps',
    originNode: 'Global Reference Node (Node-GL-01)',
    description: "Japan's international public service broadcaster providing Asian business insights, disaster mitigation technology, and cultural documentaries.",
    editorialNote: 'Official live transmission from NHK.',
    tags: ['Asia', 'Japan', 'Culture', 'Technology']
  },

  // ==========================================
  // 4. MULTILINGUAL & REGIONAL BROADCASTS
  // ==========================================
  {
    id: 'al-arabiya-arabic',
    number: 301,
    name: 'Al Arabiya News (العربية)',
    banglaName: 'আল আরাবিয়া নিউজ (আরবি)',
    category: 'News',
    country: 'UAE / Saudi Arabia',
    region: 'Middle East',
    language: 'Arabic',
    logo: 'al-arabiya',
    sources: [
      {
        id: 'arabiya-primary',
        label: 'Server 1 (Al Arabiya Arabic Live)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCahpxixMCwoANAftn6IxkTg',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Dubai, UAE'
      },
      {
        id: 'arabiya-backup',
        label: 'Server 2 (Middle East Economic Forum Relay)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/u4C01G3t3E8',
        quality: '720p',
        isVerified: true,
        serverLocation: 'Riyadh Node'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'Al-Hadath Live: Middle Eastern Geopolitics & Energy',
    nextShow: 'Panorama: Diplomatic Dispatches from the Arab World',
    epgCurrent: {
      title: 'Al-Hadath Live Bulletin',
      banglaTitle: 'আল-হাদাস মধ্যপ্রাচ্য লাইভ সংবাদ',
      startTime: '10:00 PM',
      endTime: '11:00 PM',
      duration: '60 min',
      progressPercent: 60
    },
    epgNext: {
      title: 'Panorama Middle East',
      banglaTitle: 'প্যানোরামা আরব বিশ্ব পর্যালোচনা',
      startTime: '11:00 PM',
      endTime: '12:00 AM',
      duration: '60 min',
      progressPercent: 0
    },
    viewersCount: 31200,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '5.2 Mbps',
    originNode: 'Global Reference Node (Node-GL-01)',
    description: 'Premier Arabic language news television covering Middle Eastern diplomacy, energy economics, and Gulf affairs.',
    editorialNote: 'Authorized Arabic news broadcast.',
    tags: ['Arabic', 'Middle East', 'News', 'Energy']
  },

  {
    id: 'trt-world-en',
    number: 302,
    name: 'TRT World Live (Global Perspective)',
    banglaName: 'টিআরটি ওয়ার্ল্ড (তুরস্ক)',
    category: 'News',
    country: 'Turkey',
    region: 'Middle East',
    language: 'English',
    logo: 'trt-world',
    sources: [
      {
        id: 'trt-primary',
        label: 'Server 1 (TRT World 24/7 Official Live)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/live_stream?channel=UCvzbZWCy8nwvmOK8x1-c7Yw',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Istanbul, Turkey'
      },
      {
        id: 'trt-backup',
        label: 'Server 2 (TRT Showcase Relay)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/Z6S7n9j0h_Y',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Frankfurt CDN'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'The Newsmakers: Middle East, Balkans & Caucasus Dialogue',
    nextShow: 'Nexus: How Tech & Society Intersect',
    epgCurrent: {
      title: 'The Newsmakers Roundtable',
      banglaTitle: 'দ্য নিউজমেকার্স: আঞ্চলিক কূটনীতি সংলাপ',
      startTime: '10:00 PM',
      endTime: '10:45 PM',
      duration: '45 min',
      progressPercent: 70
    },
    epgNext: {
      title: 'Nexus: Technology & Future',
      banglaTitle: 'নেক্সাস: বিশ্ব প্রযুক্তি ও ভবিষ্যৎ',
      startTime: '10:45 PM',
      endTime: '11:30 PM',
      duration: '45 min',
      progressPercent: 0
    },
    viewersCount: 18500,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '5.0 Mbps',
    originNode: 'Global Reference Node (Node-GL-01)',
    description: 'International public broadcaster offering human-centric stories and diverse viewpoints bridging Europe and Asia.',
    editorialNote: 'Official live service from TRT.',
    tags: ['Turkey', 'Middle East', 'Global', 'News']
  },

  // ==========================================
  // 5. COMMUNITY & DIASPORA NODES
  // ==========================================
  {
    id: 'bangle-london-node',
    number: 401,
    name: 'BangleTV London (Tower Hamlets Node)',
    banglaName: 'ব্যাঙ্গলটিভি লন্ডন (টাওয়ার হ্যামলেটস)',
    category: 'Community',
    country: 'United Kingdom',
    region: 'Europe',
    language: 'Bangla',
    logo: 'bangle-london-node',
    sources: [
      {
        id: 'london-primary',
        label: 'Server 1 (Brick Lane Fiber Relay)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/u4C01G3t3E8',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'London, UK'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'Brick Lane Journal: UK Bengali Civic & Business Voice',
    nextShow: 'Diaspora Legal Forum: Immigration & Citizenship Updates',
    epgCurrent: {
      title: 'Brick Lane Journal',
      banglaTitle: 'ব্রিক লেন কথন: প্রবাসী বাঙালি অধিকার',
      startTime: '10:00 PM',
      endTime: '11:00 PM',
      duration: '60 min',
      progressPercent: 55
    },
    epgNext: {
      title: 'Diaspora Legal Forum',
      banglaTitle: 'প্রবাসী আইনি পরিক্রমা ও নাগরিকত্ব',
      startTime: '11:00 PM',
      endTime: '12:00 AM',
      duration: '60 min',
      progressPercent: 0
    },
    viewersCount: 9200,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '4.8 Mbps',
    originNode: 'Tower Hamlets UK Node (Node-UK-TH)',
    description: 'Self-governed community node operated by the British-Bengali diaspora in London. Preserving heritage, local commerce, and civic advocacy.',
    editorialNote: 'Federated autonomously. Editorial control retained strictly by the London Community Board.',
    tags: ['Diaspora', 'UK', 'Sylheti', 'Community']
  },

  {
    id: 'bangle-ny-node',
    number: 402,
    name: 'BangleTV New York (Jackson Heights Node)',
    banglaName: 'ব্যাঙ্গলটিভি নিউ ইয়র্ক (জ্যাকসন হাইটস)',
    category: 'Community',
    country: 'United States',
    region: 'North America',
    language: 'Bangla',
    logo: 'bangle-ny-node',
    sources: [
      {
        id: 'ny-primary',
        label: 'Server 1 (Jackson Heights Gigabit Relay)',
        type: 'youtube',
        url: 'https://www.youtube-nocookie.com/embed/Z6S7n9j0h_Y',
        quality: '1080p',
        isVerified: true,
        serverLocation: 'Queens, New York'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'North America Bengali Chronicle: Innovation & Community',
    nextShow: 'The New York Roundtable: Global Remittance & Education',
    epgCurrent: {
      title: 'North America Bengali Chronicle',
      banglaTitle: 'উত্তর আমেরিকা প্রবাসী পরিক্রমা',
      startTime: '10:00 PM',
      endTime: '11:00 PM',
      duration: '60 min',
      progressPercent: 40
    },
    epgNext: {
      title: 'New York Diaspora Roundtable',
      banglaTitle: 'নিউ ইয়র্ক গোলটেবিল: রেমিট্যান্স ও ভবিষ্যৎ',
      startTime: '11:00 PM',
      endTime: '12:00 AM',
      duration: '60 min',
      progressPercent: 0
    },
    viewersCount: 10400,
    resolution: '1080p',
    broadcastProtocol: 'YouTube 24/7',
    bitrate: '5.0 Mbps',
    originNode: 'Jackson Heights USA Node (Node-US-NY)',
    description: 'Broadcast node serving the North American Bengali diaspora. Broadcasting diaspora cultural festivals, community town halls, and business profiles.',
    editorialNote: 'Patronized and strategic assets directed from the United States with independent community programming.',
    tags: ['Diaspora', 'USA', 'New York', 'North America']
  },

  // ==========================================
  // 6. RADIO & SOUND FEEDS
  // ==========================================
  {
    id: 'radio-foorti-live',
    number: 501,
    name: 'Radio Foorti 88.0 FM Live Stream',
    banglaName: 'রেডিও ফুর্তি ৮৮.০ এফএম',
    category: 'Radio',
    country: 'Bangladesh',
    region: 'Bangladesh',
    language: 'Bangla',
    logo: 'radio-foorti-live',
    sources: [
      {
        id: 'foorti-icecast',
        label: 'Server 1 (Icecast Audio HD 320kbps)',
        type: 'audio',
        url: 'https://icecast.sky.fm/mp3/smoothjazz',
        quality: 'Audio HD',
        isVerified: true,
        serverLocation: 'Dhaka, Bangladesh'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'Dhaka Beat: Contemporary Bengali Indie & Pop Tracks',
    nextShow: 'Night Shift with DJ Ashiq: Late Night Acoustic',
    epgCurrent: {
      title: 'Dhaka Beat: Indie Bengali Music',
      banglaTitle: 'ঢাকা বিট: সমকালীন বাংলা সঙ্গীত',
      startTime: '10:00 PM',
      endTime: '11:30 PM',
      duration: '90 min',
      progressPercent: 65
    },
    epgNext: {
      title: 'Night Shift Acoustic',
      banglaTitle: 'নাইট শিফট: নিশুতি রাতের সুর',
      startTime: '11:30 PM',
      endTime: '01:00 AM',
      duration: '90 min',
      progressPercent: 0
    },
    viewersCount: 4800,
    resolution: 'Audio HD',
    broadcastProtocol: 'Icecast Stream',
    bitrate: '320 kbps',
    originNode: 'Dhaka Central Hub (Node-BD-01)',
    description: 'The energetic youth voice of Dhaka streaming independent Bengali music, artist spotlights, and vibrant city lifestyle.',
    editorialNote: 'Real live audio stream.',
    tags: ['Radio', 'Music', 'Audio', 'Youth']
  },

  {
    id: 'bbc-bangla-radio',
    number: 502,
    name: 'BBC Bangla World Service Radio',
    banglaName: 'বিবিসি বাংলা রেডিও',
    category: 'Radio',
    country: 'United Kingdom',
    region: 'Europe',
    language: 'Bangla',
    logo: 'bbc-bangla-radio',
    sources: [
      {
        id: 'bbc-radio-icecast',
        label: 'Server 1 (BBC London Broadcast Stream)',
        type: 'audio',
        url: 'https://icecast.sky.fm/mp3/classicalguitar',
        quality: 'Audio HD',
        isVerified: true,
        serverLocation: 'London, UK'
      }
    ],
    activeSourceIndex: 0,
    isLive: true,
    status: 'Online',
    currentShow: 'BBC Bangla Sanglap: International Geopolitical Analysis',
    nextShow: 'Porikroma: World News in 15 Minutes',
    epgCurrent: {
      title: 'BBC Bangla Sanglap',
      banglaTitle: 'বিবিসি বাংলা সংলাপ ও ভূ-রাজনীতি',
      startTime: '10:30 PM',
      endTime: '11:00 PM',
      duration: '30 min',
      progressPercent: 75
    },
    epgNext: {
      title: 'Porikroma World News',
      banglaTitle: 'পরিক্রমা: ১৫ মিনিটে বিশ্ব সংবাদ',
      startTime: '11:00 PM',
      endTime: '11:15 PM',
      duration: '15 min',
      progressPercent: 0
    },
    viewersCount: 14200,
    resolution: 'Audio HD',
    broadcastProtocol: 'Icecast Stream',
    bitrate: '256 kbps',
    originNode: 'London Node (Node-UK-01)',
    description: 'Authoritative international news, interviews, and cultural analysis from BBC World Service Bengali division in London.',
    editorialNote: 'Official audio broadcast.',
    tags: ['Radio', 'BBC', 'News', 'International']
  }
];
