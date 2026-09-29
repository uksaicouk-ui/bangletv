export interface Channel {
  id: string;
  name: string;
  banglaName?: string;
  category: 'National' | 'News' | 'Diaspora' | 'Community' | 'Documentary' | 'Culture' | 'Radio';
  communityNodeId: string;
  communityNodeName: string;
  logo: string;
  streamUrl: string;
  embedType: 'hls' | 'youtube' | 'audio' | 'embed';
  embedId?: string; // Specific video ID
  youtubeChannelId?: string; // 24/7 Live YouTube channel ID (e.g. UCN6sm8iHiPd0cnoUardDAnw)
  isLive: boolean;
  currentShow: string;
  nextShow: string;
  viewersCount: number;
  resolution: '4K' | '1080p' | '720p' | 'Audio HD';
  broadcastLanguage: string;
  description: string;
  editorialNote?: string;
  tags: string[];
}

export interface CommunityNode {
  id: string;
  name: string;
  city: string;
  country: string;
  flag: string;
  operator: string;
  operatorRole: string;
  status: 'online' | 'syncing' | 'opted-in' | 'independent';
  channelCount: number;
  federationMode: 'Opt-in Full Relay' | 'Opt-in Metadata Only' | 'Autonomous Isolated';
  latencyMs: number;
  endpointUrl: string;
  establishedYear: number;
  description: string;
}

export interface DocumentaryReference {
  id: string;
  title: string;
  banglaTitle?: string;
  publisher: 'BBC News' | 'Al Jazeera' | 'BBC Panorama' | 'Al Jazeera 101 East' | 'BBC World Service' | 'Al Jazeera Fault Lines';
  publisherType: 'Public Broadcaster (UK)' | 'International Media Network (Qatar)';
  airDate: string;
  duration: string;
  category: 'July 2024 Uprising' | 'Investigative' | 'History & 1971' | 'Climate & River Delta' | 'Economy & Diaspora';
  originalPublisherUrl: string;
  officialEmbedId?: string;
  thumbnailUrl: string;
  summary: string;
  investigativeAngle: string;
  neutralArchivalNote: string;
  verifiedSourceBadge: string;
  tags: string[];
}

export type PolicyTab =
  | 'copyright'
  | 'privacy'
  | 'editorial'
  | 'distribution'
  | 'governance'
  | 'federation'
  | 'security'
  | 'terms'
  | 'opensource'
  | 'contact'
  | 'ownership';
