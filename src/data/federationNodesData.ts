import { CommunityNode } from '../types';

export const FEDERATION_NODES: CommunityNode[] = [
  {
    id: 'node-dhaka-central',
    name: 'Dhaka Metropolitan Node',
    city: 'Dhaka',
    country: 'Bangladesh',
    flag: '🇧🇩',
    operator: 'Sheikh Mehedi Hasan Nadim',
    operatorRole: 'Founding Member & Operational Head / Executive Operator (Dhaka Operations)',
    status: 'online',
    channelCount: 5,
    federationMode: 'Opt-in Full Relay',
    latencyMs: 14,
    endpointUrl: 'https://dhaka.node.bangletv.com/v1/feed',
    establishedYear: 2023,
    description: 'Central operational hub for technical maintenance, stream ingestion, transcoding pipeline, and South Asian peering.'
  },
  {
    id: 'node-ny-usa',
    name: 'North America Jackson Heights Node',
    city: 'New York',
    country: 'United States',
    flag: '🇺🇸',
    operator: 'Anwar Tariq Khan',
    operatorRole: 'Owner, Patron and Principal Decision-Maker (United States HQ)',
    status: 'online',
    channelCount: 3,
    federationMode: 'Opt-in Full Relay',
    latencyMs: 38,
    endpointUrl: 'https://nyc.node.bangletv.com/v1/feed',
    establishedYear: 2022,
    description: 'Principal strategic and decision node. Controls primary network assets, legal governance, and North American diaspora infrastructure.'
  },
  {
    id: 'node-london-uk',
    name: 'London Tower Hamlets Node',
    city: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    operator: 'Tower Hamlets Bengali Heritage Media Council',
    operatorRole: 'Autonomous Community Operator',
    status: 'online',
    channelCount: 2,
    federationMode: 'Opt-in Full Relay',
    latencyMs: 24,
    endpointUrl: 'https://london.node.bangletv.com/v1/feed',
    establishedYear: 2023,
    description: 'Self-governing British Bengali diaspora node broadcasting East London civic affairs, youth debates, and cultural programming.'
  },
  {
    id: 'node-sylhet-bd',
    name: 'Sylhet Surma Regional Node',
    city: 'Sylhet',
    country: 'Bangladesh',
    flag: '🇧🇩',
    operator: 'Surma Valley Independent Media Collective',
    operatorRole: 'Hyperlocal Node Custodian',
    status: 'online',
    channelCount: 2,
    federationMode: 'Opt-in Metadata Only',
    latencyMs: 18,
    endpointUrl: 'https://sylhet.node.bangletv.com/v1/feed',
    establishedYear: 2024,
    description: 'Preserving regional folk traditions, Sylheti linguistic heritage, tea community journalism, and bilateral diaspora ties.'
  },
  {
    id: 'node-kolkata-in',
    name: 'Kolkata Arts & Literature Node',
    city: 'Kolkata',
    country: 'India',
    flag: '🇮🇳',
    operator: 'College Street Cultural Forum',
    operatorRole: 'Cultural Curator Node',
    status: 'opted-in',
    channelCount: 2,
    federationMode: 'Opt-in Metadata Only',
    latencyMs: 32,
    endpointUrl: 'https://kolkata.node.bangletv.com/v1/feed',
    establishedYear: 2024,
    description: 'Cross-border Bengali cultural exchange specializing in literature, theatre, parallel cinema, and intellectual seminars.'
  },
  {
    id: 'node-toronto-ca',
    name: 'Toronto Danforth Node',
    city: 'Toronto',
    country: 'Canada',
    flag: '🇨🇦',
    operator: 'Greater Toronto Bengali Civic Association',
    operatorRole: 'Community Trustee',
    status: 'online',
    channelCount: 2,
    federationMode: 'Opt-in Full Relay',
    latencyMs: 44,
    endpointUrl: 'https://toronto.node.bangletv.com/v1/feed',
    establishedYear: 2024,
    description: 'Connecting Canadian Bengali diaspora communities through immigrant settlement discussions, arts, and winter university youth programming.'
  },
  {
    id: 'node-sydney-au',
    name: 'Sydney Lakemba Node',
    city: 'Sydney',
    country: 'Australia',
    flag: '🇦🇺',
    operator: 'Oceanic Bengali Broadcasting Union',
    operatorRole: 'Regional Node Administrator',
    status: 'online',
    channelCount: 1,
    federationMode: 'Opt-in Metadata Only',
    latencyMs: 95,
    endpointUrl: 'https://sydney.node.bangletv.com/v1/feed',
    establishedYear: 2025,
    description: 'Australia and New Zealand regional broadcast gateway providing community time-zone shifted programming and civic announcements.'
  },
  {
    id: 'node-chittagong-bd',
    name: 'Chittagong Maritime Node',
    city: 'Chittagong',
    country: 'Bangladesh',
    flag: '🇧🇩',
    operator: 'Chattogram Coastal Media Trust',
    operatorRole: 'Maritime Broadcast Custodian',
    status: 'online',
    channelCount: 1,
    federationMode: 'Autonomous Isolated',
    latencyMs: 19,
    endpointUrl: 'https://ctg.node.bangletv.com/v1/feed',
    establishedYear: 2024,
    description: 'Focusing on coastal commerce, shipbreaking safety forums, Bay of Bengal maritime ecology, and port city business.'
  }
];

export interface EcosystemModule {
  id: string;
  layer: string;
  name: string;
  purpose: string;
  license: string;
  techStack: string;
  specSummary: string;
}

export const OPEN_SOURCE_ECOSYSTEM: EcosystemModule[] = [
  {
    id: 'mod-core',
    layer: 'Core',
    name: 'bangle-core',
    purpose: 'Underlying protocol specifications, cryptographic node identity, and trust verification primitives.',
    license: 'MPL-2.0 (Open Source Engine)',
    techStack: 'Rust / Go',
    specSummary: 'Implements cryptographic signature validation, decentralized stream discovery, and peer identity consensus.'
  },
  {
    id: 'mod-node',
    layer: 'Node',
    name: 'bangle-node-daemon',
    purpose: 'Standalone community server daemon allowing any community worldwide to run an independent broadcast node.',
    license: 'GPL-3.0',
    techStack: 'Node.js / TypeScript / Docker',
    specSummary: 'Lightweight daemon managing local channel feeds, stream health probing, caching proxies, and opt-in federation peering.'
  },
  {
    id: 'mod-web',
    layer: 'Web',
    name: 'bangle-web-portal',
    purpose: 'High-performance global web application and responsive broadcast portal for desktop, tablet, and smart TVs.',
    license: 'MIT',
    techStack: 'React 19 / TypeScript / Vite / Tailwind CSS',
    specSummary: 'Universal responsive streaming interface with accessible accessibility, zero telemetry tracking, and low-latency rendering.'
  },
  {
    id: 'mod-player',
    layer: 'Player',
    name: 'bangle-open-player',
    purpose: 'Universal open-source video and audio player engine with adaptive bitrate HLS, secure embed sandboxes, and low-power rendering.',
    license: 'MIT',
    techStack: 'hls.js / WebCodecs / HTML5 Video',
    specSummary: 'Handles multi-resolution HLS manifests, DRM-free open streams, official publisher embeds, and custom audio pipelines.'
  },
  {
    id: 'mod-federation',
    layer: 'Federation',
    name: 'bangle-federation-protocol',
    purpose: 'The “Federate the network, not the content” consensus protocol enabling opt-in peer peering without forced carriage.',
    license: 'Apache-2.0',
    techStack: 'gRPC / JSON-LD / WebSub',
    specSummary: 'Defines bidirectional opt-in handshake, selective channel carriage rules, and community quarantine controls.'
  },
  {
    id: 'mod-schema',
    layer: 'Schema',
    name: 'bangle-stream-spec-v1',
    purpose: 'Open schema standard for IPTV channel manifests, EPG metadata, publisher verification, and legal provenance.',
    license: 'CC-BY-4.0',
    techStack: 'JSON Schema / OpenAPI 3.1',
    specSummary: 'Standardized schemas for channel feeds, program schedules, stream bitrates, and publisher licensing declarations.'
  },
  {
    id: 'mod-sdk',
    layer: 'SDK',
    name: '@bangletv/node-sdk',
    purpose: 'Client developer kit for community broadcasters, university studios, and diaspora programmers to integrate in minutes.',
    license: 'MIT',
    techStack: 'TypeScript / Python / cURL',
    specSummary: 'High-level programmatic API for channel registration, live status broadcasting, and manifest signing.'
  },
  {
    id: 'mod-deployment',
    layer: 'Deployment',
    name: 'bangle-deploy-recipes',
    purpose: 'One-click deployment templates for Raspberry Pi, Debian servers, Docker Swarm, and low-cost bare-metal servers.',
    license: 'MIT',
    techStack: 'Docker / Compose / Ansible',
    specSummary: 'Self-hosting templates optimized for low-bandwidth regions, solar-powered nodes, and university campus intranets.'
  },
  {
    id: 'mod-documentation',
    layer: 'Documentation',
    name: 'bangle-docs-handbook',
    purpose: 'Comprehensive operational manual, legal handbooks, community governance guides, and federation protocols.',
    license: 'CC-BY-SA-4.0',
    techStack: 'Markdown / Starlight / VitePress',
    specSummary: 'Complete architectural blueprints, FAQ for community boards, DMCA procedures, and translation to Bengali.'
  }
];
