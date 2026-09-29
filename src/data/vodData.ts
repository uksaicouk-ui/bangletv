export interface VODItem {
  id: string;
  title: string;
  banglaTitle?: string;
  category: 'Documentary' | 'News' | 'Entertainment' | 'Sports' | 'Education' | 'Culture' | 'Talk Show';
  duration: string;
  airDate: string;
  channelName: string;
  region: string;
  language: 'Bengali' | 'English' | 'Sylheti' | 'Multilingual' | 'Bengali / English';
  thumbnailUrl: string;
  videoEmbedId: string;
  synopsis: string;
  presenter?: string;
  tags: string[];
}

export const VOD_CATALOG: VODItem[] = [
  // Investigative & Documentary
  {
    id: 'vod-aj-pm-men',
    title: "All the Prime Minister's Men",
    banglaTitle: "অল দ্য প্রাইম মিনিস্টার্স মেন (অনুসন্ধানী প্রামাণ্যচিত্র)",
    category: 'Documentary',
    duration: '1h 04m',
    airDate: 'February 2021',
    channelName: 'Al Jazeera I-Unit',
    region: 'International',
    language: 'English',
    thumbnailUrl: 'https://i.ytimg.com/vi/a6v75dGv2z8/hqdefault.jpg',
    videoEmbedId: 'a6v75dGv2z8',
    synopsis: "Al Jazeera's award-winning investigative unit exposes shadow military networks, illicit surveillance procurement, and cross-border operations.",
    presenter: 'Al Jazeera Investigative Unit',
    tags: ['Investigation', 'Intelligence', 'State Security']
  },
  {
    id: 'vod-aj-hasina-fall',
    title: "The Fall of Hasina: Bangladesh's Gen Z Revolution",
    banglaTitle: "হাসিনার পতন: বাংলাদেশের জেন-জি বিপ্লব",
    category: 'Documentary',
    duration: '48m 22s',
    airDate: 'August 2024',
    channelName: 'Al Jazeera English',
    region: 'Bangladesh',
    language: 'English',
    thumbnailUrl: 'https://i.ytimg.com/vi/rF8kM1XQ77k/hqdefault.jpg',
    videoEmbedId: 'rF8kM1XQ77k',
    synopsis: "Documenting the mass student uprising that swept through Dhaka, universities, and regional cities ending 15 years of authoritarian governance.",
    presenter: 'AJ Field Reporting Unit',
    tags: ['July 2024', 'Student Movement', 'Politics']
  },
  {
    id: 'vod-aj-aynaghor',
    title: 'Aynaghor: The Mirror House of Forced Disappearances',
    banglaTitle: 'আয়নাঘর: গোপন বন্দিশালার অন্ধকূপ ও বেঁচে ফেরাদের জবানবন্দি',
    category: 'Documentary',
    duration: '34m 50s',
    airDate: 'October 2024',
    channelName: 'Al Jazeera 101 East',
    region: 'Bangladesh',
    language: 'English',
    thumbnailUrl: 'https://i.ytimg.com/vi/69q9Z1z2w2E/hqdefault.jpg',
    videoEmbedId: '69q9Z1z2w2E',
    synopsis: "Survivors of clandestine military detention facilities describe their years in isolation, corroborated by human rights investigators.",
    presenter: '101 East Current Affairs',
    tags: ['Human Rights', 'Aynaghor', 'Justice']
  },

  // News & Current Affairs Talk Shows
  {
    id: 'vod-tritiyo-matra-roundtable',
    title: 'Tritiyo Matra: National Transition & Institutional Reform',
    banglaTitle: 'তৃতীয় মাত্রা: অন্তর্বর্তীকালীন রূপান্তর ও সাংবিধানিক সংস্কার',
    category: 'Talk Show',
    duration: '52m 10s',
    airDate: 'September 2024',
    channelName: 'Channel i Global',
    region: 'Dhaka, Bangladesh',
    language: 'Bengali',
    thumbnailUrl: 'https://i.ytimg.com/vi/Z6S7n9j0h_Y/hqdefault.jpg',
    videoEmbedId: 'Z6S7n9j0h_Y',
    synopsis: "Distinguished legal scholars, university coordinators, and senior editors deliberate on judicial independence and election overhaul.",
    presenter: 'Zillur Rahman',
    tags: ['Talk Show', 'Constitution', 'Reform', 'Democracy']
  },
  {
    id: 'vod-bbc-bangladesh-turmoil',
    title: 'Bangladesh: The Month That Shook a Nation',
    banglaTitle: 'বিবিসি অনুসন্ধান: যে মাস বাংলাদেশকে বদলে দিল',
    category: 'News',
    duration: '29m 14s',
    airDate: 'September 2024',
    channelName: 'BBC News',
    region: 'International',
    language: 'English',
    thumbnailUrl: 'https://i.ytimg.com/vi/Z6S7n9j0h_Y/hqdefault.jpg',
    videoEmbedId: 'Z6S7n9j0h_Y',
    synopsis: "BBC correspondents retrace the 36 critical days of movement, military stance, and the inauguration of Nobel laureate Muhammad Yunus.",
    presenter: 'BBC World Service',
    tags: ['BBC News', 'Investigation', 'Diplomacy']
  },

  // Culture & Agriculture
  {
    id: 'vod-hridoye-mati-o-manush',
    title: 'Hridoye Mati O Manush: High-Yield Floating Agriculture',
    banglaTitle: 'হৃদয়ে মাটি ও মানুষ: জলমগ্ন হাওর ও বদ্বীপে ভাসমান কৃষিব্যবস্থা',
    category: 'Culture',
    duration: '38m 45s',
    airDate: 'July 2024',
    channelName: 'Channel i Global',
    region: 'Gopalganj / Haor, Bangladesh',
    language: 'Bengali',
    thumbnailUrl: 'https://i.ytimg.com/vi/jR8S8f-p-gA/hqdefault.jpg',
    videoEmbedId: 'jR8S8f-p-gA',
    synopsis: "Shykh Seraj visits indigenous farmers pioneering hydroponic water hyacinth floating beds in flood-vulnerable delta districts.",
    presenter: 'Shykh Seraj',
    tags: ['Agriculture', 'Haor', 'Environment', 'Innovation']
  },
  {
    id: 'vod-baul-shadhona',
    title: 'Mystic Melodies of Surma: Baul Shah Abdul Karim Archive',
    banglaTitle: 'সুরমার মরমী সুর: বাউল শাহ আবদুল করিমের জীবন ও গান',
    category: 'Culture',
    duration: '45m 20s',
    airDate: 'August 2024',
    channelName: 'Surma Valley Independent Network',
    region: 'Sylhet, Bangladesh',
    language: 'Bengali',
    thumbnailUrl: 'https://i.ytimg.com/vi/3k_iE9A_YyQ/hqdefault.jpg',
    videoEmbedId: '3k_iE9A_YyQ',
    synopsis: "An exploration of Sufi and Baul philosophy along the Surma and Kalni rivers, featuring archival acoustic recordings and master musicians.",
    presenter: 'Sylhet Heritage Node',
    tags: ['Baul', 'Folk Music', 'Sylhet', 'Spiritual']
  },

  // Sports & Athletics
  {
    id: 'vod-cricket-bangladesh-test',
    title: 'Historic Overseas Test Series Victory: Tactical Review',
    banglaTitle: 'ঐতিহাসিক বিদেশের মাটিতে টেস্ট সিরিজ জয়: ট্যাকটিক্যাল বিশ্লেষণ',
    category: 'Sports',
    duration: '35m 12s',
    airDate: 'September 2024',
    channelName: 'T Sports HD',
    region: 'Dhaka, Bangladesh',
    language: 'Bengali',
    thumbnailUrl: 'https://i.ytimg.com/vi/xKx3_2A3R9Y/hqdefault.jpg',
    videoEmbedId: 'xKx3_2A3R9Y',
    synopsis: "Comprehensive tactical breakdown of Bangladesh's historic 2-0 Test series victory abroad, featuring masterclass swing bowling and middle-order resilience.",
    presenter: 'T Sports Cricket Analysis Desk',
    tags: ['Cricket', 'Test Series', 'Highlights', 'T Sports']
  },

  // Education & History
  {
    id: 'vod-1971-birth-of-nation',
    title: 'The Birth of Bangladesh: 1971 War of Liberation Dispatches',
    banglaTitle: 'বাংলাদেশের জন্ম: ১৯৭১ সালের মুক্তিযুদ্ধ বিবিসি আর্কাইভ প্রতিবেদন',
    category: 'Education',
    duration: '58m 05s',
    airDate: 'December 2021',
    channelName: 'BBC World Service',
    region: 'UK / Bangladesh',
    language: 'English',
    thumbnailUrl: 'https://i.ytimg.com/vi/3k_iE9A_YyQ/hqdefault.jpg',
    videoEmbedId: '3k_iE9A_YyQ',
    synopsis: "Historical dispatches from Mark Tully and international war correspondents chronicling Operation Searchlight, Mukti Bahini operations, and freedom.",
    presenter: 'Sir Mark Tully',
    tags: ['1971', 'History', 'Liberation War', 'Education']
  },
  {
    id: 'vod-rana-plaza-investigation',
    title: 'Rana Plaza: 10 Years After the Garment Catastrophe',
    banglaTitle: 'রানা প্লাজা: পোশাক শ্রমিকদের নিরাপত্তা ও এক দশকের আন্তর্জাতিক নিরীক্ষা',
    category: 'Education',
    duration: '42m 18s',
    airDate: 'April 2023',
    channelName: 'BBC Panorama',
    region: 'Savar, Bangladesh',
    language: 'English',
    thumbnailUrl: 'https://i.ytimg.com/vi/oX5wA1R8e0o/hqdefault.jpg',
    videoEmbedId: 'oX5wA1R8e0o',
    synopsis: "Industrial auditing of workplace safety accords, structural engineering compliance, and supply chain accountability across global retail brands.",
    presenter: 'BBC Panorama',
    tags: ['Labor Rights', 'Rana Plaza', 'Industry', 'Economy']
  },

  // Entertainment & Performing Arts
  {
    id: 'vod-drama-natok-classic',
    title: 'Classic Bengali Telefilm & Literature Adaptation',
    banglaTitle: 'চিরায়ত বাংলা নাটক: সাহিত্যনির্ভর রূপায়ণ ও সমকালীন জীবনবোধ',
    category: 'Entertainment',
    duration: '46m 30s',
    airDate: 'October 2024',
    channelName: 'Channel i Global',
    region: 'Dhaka, Bangladesh',
    language: 'Bengali',
    thumbnailUrl: 'https://i.ytimg.com/vi/Z6S7n9j0h_Y/hqdefault.jpg',
    videoEmbedId: 'Z6S7n9j0h_Y',
    synopsis: "Critically acclaimed television play capturing social dynamics, urban relationships, and nuanced character performances by veteran dramatists.",
    presenter: 'Channel i Theatre Wing',
    tags: ['Natok', 'Drama', 'Literature', 'Entertainment']
  },
  {
    id: 'vod-diaspora-london-voices',
    title: 'Brick Lane Voices: 50 Years of British-Bengali Settlement',
    banglaTitle: 'ব্রিক লেন কথন: যুক্তরাজ্যে পাঁচ দশকের বাঙালি অভিবাসন ও অর্জন',
    category: 'Culture',
    duration: '39m 50s',
    airDate: 'August 2024',
    channelName: 'BangleTV London (Tower Hamlets)',
    region: 'London, UK',
    language: 'Bengali / English',
    thumbnailUrl: 'https://i.ytimg.com/vi/u4C01G3t3E8/hqdefault.jpg',
    videoEmbedId: 'u4C01G3t3E8',
    synopsis: "First-generation elders and youth activists reflect on anti-racism mobilizations in East London, civic leadership, and culinary enterprise.",
    presenter: 'Tower Hamlets Heritage Trust',
    tags: ['Diaspora', 'UK', 'Brick Lane', 'History']
  }
];
