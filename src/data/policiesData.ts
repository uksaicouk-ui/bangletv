export interface PolicyDocument {
  id: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  executiveSummary: string;
  sections: {
    heading: string;
    content: string[];
    subpoints?: string[];
  }[];
}

export const POLICIES_COLLECTION: Record<string, PolicyDocument> = {
  copyright: {
    id: 'copyright',
    title: 'Copyright Protection & Intellectual Property Policy',
    subtitle: 'Strict copyright enforcement, zero-piracy mandate, and publisher attribution standards.',
    lastUpdated: 'September 2026',
    executiveSummary: 'BangleTV.com enforces strict copyright compliance. We do not rehost, copy, scrape, or pirate any copyrighted media. All international broadcasts, including BBC and Al Jazeera coverage, are referenced strictly via official public embed links, authorized APIs, or official websites.',
    sections: [
      {
        heading: '01. Zero-Piracy & Unauthorized Retransmission Ban',
        content: [
          'BangleTV.com is built on the unwavering principle that creator and broadcaster rights must be unconditionally protected. Our software platform strictly prohibits the unauthorized capture, restreaming, descrambling, commercial exploitation, or piracy of protected television signals.',
          'Every node operator in the BangleTV network covenants that all streams declared in their community manifest represent either: (a) lawful, authorized original productions owned by the community; (b) public-domain or Creative Commons licensed broadcasts; or (c) official, legally licensed retransmissions explicitly authorized in writing by the rights holder.'
        ]
      },
      {
        heading: '02. Policy Regarding BBC, Al Jazeera & International Broadcasters',
        content: [
          'In alignment with the founding charter of BangleTV.com, all references to BBC News, BBC Panorama, BBC World Service, Al Jazeera English, Al Jazeera Investigative Unit (I-Unit), and 101 East coverage are delivered exclusively through original, unaltered official publisher hyperlinks or approved embed players.',
          'BangleTV.com never mirrors, downloads, transcodes, or re-serves third-party investigative media on its own servers. Viewers are routed to the official publishers to ensure that view counts, digital royalties, advertising impressions, and editorial integrity remain entirely with the original copyright holders.'
        ]
      },
      {
        heading: '03. DMCA & International Takedown Procedures',
        content: [
          'If a copyright owner or their authorized agent believes that any manifest entry or community relay infringes their copyright, they may submit an expedited notice under the Digital Millennium Copyright Act (17 U.S.C. § 512) and international intellectual property conventions.',
          'Notices are processed by our designated legal agents in the United States and operational technicians within 24 hours. Upon verification, the offending manifest pointer or community node identifier will be immediately de-indexed and quarantined across the network directory.'
        ]
      },
      {
        heading: '04. Open-Source Code vs. Proprietary Content Distinction',
        content: [
          'A fundamental doctrine of our ecosystem is that "open-source software must never mean open ownership of community content."',
          'While the BangleTV client, node daemon, and federation protocols are published under permissive and copyleft open-source licenses, all audio-visual streams, literary scripts, journalistic footage, and community programs remain the exclusive proprietary intellectual property of their respective creators and community nodes.'
        ]
      }
    ]
  },
  privacy: {
    id: 'privacy',
    title: 'Privacy & Data Minimization Charter',
    subtitle: 'Zero behavioral telemetry, no surveillance capitalism, and user sovereignty.',
    lastUpdated: 'September 2026',
    executiveSummary: 'BangleTV.com collects zero personal tracking data, employs no commercial surveillance trackers, and never sells user viewing patterns. Your cultural viewing habits belong to you alone.',
    sections: [
      {
        heading: '01. Core Principle of Data Minimization',
        content: [
          'BangleTV.com was architected from inception to operate without requiring user registration, email sign-ups, phone numbers, or credit card collection for basic viewing. We believe access to public-interest journalism, national culture, and community programming is an essential civic right.',
          'We do not deploy third-party advertising tracking scripts, social media tracking pixels, fingerprinting libraries, or cross-site commercial telemetry engines.'
        ]
      },
      {
        heading: '02. Node-Level Connection Logs',
        content: [
          'When you connect to an open community broadcast stream, your device establishes a direct connection with the broadcasting node (or its CDN edge). Node daemons maintain temporary ephemeral connection logs strictly for network capacity management, DDoS prevention, and bitrate optimization.',
          'Ephemeral logs are automatically purged on rolling 48-hour cycles and are never aggregated into centralized corporate identity profiles.'
        ]
      },
      {
        heading: '03. Client-Side Local Storage',
        content: [
          'Preferences such as your chosen audio volume, bookmarked community nodes, player aspect ratio, and closed-caption settings are stored strictly in your browser’s local storage (LocalStorage) on your local device.',
          'This data never leaves your device and can be erased by clearing your browser cache at any time.'
        ]
      }
    ]
  },
  editorial: {
    id: 'editorial',
    title: 'Editorial Policy & Archival Integrity',
    subtitle: 'Commitment to truth, multi-perspective balance, and verifiable historical documentation.',
    lastUpdated: 'September 2026',
    executiveSummary: 'Our platform maintains strict editorial impartiality. We champion factual reporting, investigative journalism, citizen testimony, and rigorous historical documentation without political censorship or favoritism.',
    sections: [
      {
        heading: '01. Balanced International Coverage of Bangladesh',
        content: [
          'The Bangladesh Documentary & Reference Channel is committed to impartial, comprehensive coverage. We do not sanitize, distort, or suppress critical reports, nor do we ignore positive developmental achievements.',
          'The archive systematically catalogues investigative reporting from respected global outlets—including the BBC and Al Jazeera—spanning positive cultural milestones, economic advancements, human rights investigations, institutional critiques, and the historic student-led uprising of July 2024.'
        ]
      },
      {
        heading: '02. Separation of State and Community Editorial Voices',
        content: [
          'BangleTV.com ensures a clear demarcation between official state broadcasts (such as BTV World), commercial television newsrooms, independent investigative productions, and hyperlocal community diaspora voices.',
          'No state entity, commercial conglomerate, or political faction possesses editorial veto power over autonomous community nodes. Every node editorial board exercises independent discretion over their local broadcasts.'
        ]
      },
      {
        heading: '03. Protection of Free Inquiry & Investigative Record',
        content: [
          'Historical archives, wartime records of 1971, forensic human rights investigations, and investigative exposés on institutional corruption are preserved as critical public-interest records for education and scholarly study.',
          'BangleTV rejects historical revisionism and provides verifiable source links to original investigative publishers so citizens can review primary evidence directly.'
        ]
      }
    ]
  },
  distribution: {
    id: 'distribution',
    title: 'Content & Distribution Policy',
    subtitle: 'Permitted programming categories and strictly prohibited abuse categories.',
    lastUpdated: 'September 2026',
    executiveSummary: 'We foster lawful news, education, art, culture, and community advocacy. We enforce a zero-tolerance ban against hate speech, extremism, violence, child exploitation, malware, and cyber warfare.',
    sections: [
      {
        heading: '01. Permitted & Welcomed Programming',
        content: [
          'BangleTV.com actively promotes the lawful distribution of diverse public-interest media, including:',
          '• Authorized national and regional news broadcasts and current affairs roundtables.',
          '• Bengali arts, literature, poetry, theater, folk music, classical heritage, and contemporary indie cinema.',
          '• Educational lectures, science seminars, language preservation (Bengali, Sylheti, Chittagonian, indigenous languages of the Chittagong Hill Tracts).',
          '• Diaspora community town halls, immigrant support seminars, legal rights workshops, and youth forums.',
          '• Independent documentaries, investigative reporting, climate frontline dispatches, and agrarian programs.'
        ]
      },
      {
        heading: '02. Strictly Prohibited Content & Abuse Vectors',
        content: [
          'Any node distributing the following content will face instantaneous, permanent blacklisting and network-wide revocation:',
          '• Copyright infringement, unauthorized signal interception, or pirated sports/movies.',
          '• Terrorist or violent extremist recruitment, training material, or violent propaganda.',
          '• Direct incitement to imminent physical violence, riots, ethnic or religious pogroms, or lynch mob mobilization.',
          '• Child Sexual Abuse Material (CSAM) or any form of child exploitation (reported immediately to global law enforcement and NCMEC).',
          '• Non-consensual intimate imagery, sextortion, or harassment campaigns.',
          '• Distribution of malware, ransomware, spyware, phishing kits, or automated exploit payloads.',
          '• Doxxing, publishing non-public private residences, phone numbers, or coordinates with intent to endanger individuals.'
        ]
      },
      {
        heading: '03. Enforcement Mechanism',
        content: [
          'Community complaints are reviewed by the security and compliance desk. When a violation is substantiated, the node address is removed from the central directory consensus, and node cryptographic peer certificates are revoked.'
        ]
      }
    ]
  },
  governance: {
    id: 'governance',
    title: 'Community Governance Charter',
    subtitle: 'Decentralized local sovereignty, democratic node stewardship, and participatory oversight.',
    lastUpdated: 'September 2026',
    executiveSummary: 'Every community retains sovereign ownership of its channels, audience, editorial line, and distribution permissions. Local boards make local decisions.',
    sections: [
      {
        heading: '01. Self-Governing Community Nodes',
        content: [
          'Under the BangleTV governance model, each participating community (e.g., Tower Hamlets London, Jackson Heights New York, Surma Valley Sylhet, Danforth Toronto) organizes its own local operational committee.',
          'The central platform provides the open-source software stack and discovery directory, but never dictates what a local community council chooses to broadcast to its neighborhood.'
        ]
      },
      {
        heading: '02. Dispute Resolution & Community Arbitration',
        content: [
          'Disputes between peer nodes regarding channel namespace overlap or metadata conflicts are handled through peer consensus conferences.',
          'If a community node decides that another node’s programming does not align with its local standards, it simply un-peers from that specific node. There is no central executive decree required to disconnect peers.'
        ]
      }
    ]
  },
  federation: {
    id: 'federation',
    title: 'Federation Policy: “Federate the Network, Not the Content”',
    subtitle: 'Strictly opt-in federation, zero forced carriage, and independent content sovereignty.',
    lastUpdated: 'September 2026',
    executiveSummary: '“Federate the network, not the content.” Every community retains its own channels, content, audience, identity, editorial control, ownership and distribution permissions. Federation is strictly opt-in. No community is forced to receive, display or distribute another community’s content.',
    sections: [
      {
        heading: '01. The Non-Negotiable Federation Creed',
        content: [
          'In traditional closed cable and centralized Big Tech streaming monopolies, platforms aggregate content, strip creators of their audience relationships, and dictate algorithmic distribution.',
          'BangleTV.com inverts this architecture: "Federate the network, not the content." We build the shared roads, the open signaling standards, and the interoperable discovery protocol. But your content remains your exclusive domain.'
        ]
      },
      {
        heading: '02. Strictly Opt-In Peering',
        content: [
          'Federation across BangleTV nodes is 100% opt-in. A node operating in Sylhet or London can choose to federate with the Dhaka hub, or choose to remain a completely isolated community intranet.',
          'Even when federated, carriage is selective. A community node in Toronto can choose to relay Channel A and Channel B from Dhaka while declining Channel C. No central authority can force carriage of unwanted programming onto any community.'
        ]
      },
      {
        heading: '03. No Content Pooling or Forced Re-licensing',
        content: [
          'Joining the BangleTV federation does NOT grant any third party the right to sub-license, syndicate, monetize, or redistribute your broadcast without a separate explicit bilateral agreement.',
          'Communities retain total legal ownership and copyright over their productions.'
        ]
      }
    ]
  },
  security: {
    id: 'security',
    title: 'Security & Infrastructure Defense Architecture',
    subtitle: 'Cryptographic node authentication, tamper-proof feeds, and resilience against censorship.',
    lastUpdated: 'September 2026',
    executiveSummary: 'BangleTV utilizes cryptographic Ed25519 signing for channel manifests, mutual TLS for inter-node communication, and distributed edge caching to resist internet blackouts and cyber warfare.',
    sections: [
      {
        heading: '01. Manifest Authenticity & Cryptographic Verification',
        content: [
          'To prevent man-in-the-middle attacks, DNS spoofing, or rogue channel insertions, every community node signs its `bangle-feed.json` manifest using Ed25519 cryptographic keypairs.',
          'The client application validates the cryptographic signature of the feed before loading any stream endpoint, ensuring that viewers only receive authentic broadcast signals.'
        ]
      },
      {
        heading: '02. Anti-DDoS and Edge Distribution',
        content: [
          'Stream ingestion points utilize edge reverse proxies and Anycast routing to mitigate volumetric denial-of-service attacks.',
          'If a primary central directory is censored or blocked by an authoritarian regime, community nodes can fall back to peer-to-peer gossip discovery protocols and direct IP peering.'
        ]
      },
      {
        heading: '03. Responsible Vulnerability Disclosure',
        content: [
          'We welcome security researchers to audit our open-source codebase and infrastructure. Security reports should be directed to security@bangletv.com using our published PGP key.',
          'We commit to acknowledging reports within 24 hours and releasing verified patches within 7 days.'
        ]
      }
    ]
  },
  terms: {
    id: 'terms',
    title: 'Terms of Use & Platform Agreement',
    subtitle: 'Legal terms governing access to BangleTV.com web services and client software.',
    lastUpdated: 'September 2026',
    executiveSummary: 'By accessing BangleTV.com, you agree to respect broadcaster copyright, use services lawfully, and adhere to community standards.',
    sections: [
      {
        heading: '01. Acceptance of Terms',
        content: [
          'By visiting, streaming, or running a node connected to BangleTV.com, you acknowledge and agree to comply with these Terms of Use, our Privacy Policy, and our Content & Distribution Rules.',
          'If you disagree with any portion of these agreements, your sole remedy is to cease using the platform and disconnect your node from the directory.'
        ]
      },
      {
        heading: '02. Permitted Individual Use',
        content: [
          'Users are granted a personal, revocable, non-exclusive license to stream audio and video broadcasts for non-commercial, personal viewing. You may not scrape, decompile, extract raw stream keys, or repackage streams into paid commercial IPTV resale bundles.'
        ]
      },
      {
        heading: '03. Disclaimer of Warranties & Limitation of Liability',
        content: [
          'BangleTV.com and its open-source contributors provide the network directory and software "AS IS" without warranties of uninterrupted uptime, latency guarantees, or fitness for a particular commercial purpose.',
          'The platform operators are not liable for third-party broadcaster transmission dropouts, local internet censorship, or third-party content disputes.'
        ]
      }
    ]
  },
  opensource: {
    id: 'opensource',
    title: 'Open-Source Ecosystem Architecture',
    subtitle: 'The modular stack: Core → Node → Web → Player → Federation → Schema → SDK → Deployment → Documentation.',
    lastUpdated: 'September 2026',
    executiveSummary: 'BangleTV is an open ecosystem designed for longevity, resilience, and global interoperability. Every layer of the software stack is transparent and modular.',
    sections: [
      {
        heading: '01. The Modular Ecosystem Stack',
        content: [
          'The BangleTV architecture is structured in nine distinct, decoupled layers:',
          '1. Core: Cryptographic identity, signing verification, and low-level stream protocol definitions.',
          '2. Node: The standalone community server daemon managing local ingest, transcoding, and peer handshakes.',
          '3. Web: The universal responsive web portal optimized for modern desktop, tablet, and smart TV browsers.',
          '4. Player: Resilient multi-codec player handling adaptive HLS, official embeds, and low-latency audio.',
          '5. Federation: The opt-in peering protocol implementing the "Federate the network, not the content" standard.',
          '6. Schema: Standardized JSON-LD schemas for channel feeds, electronic program guides (EPG), and metadata.',
          '7. SDK: TypeScript, Python, and cURL development toolkits for broadcasters and university labs.',
          '8. Deployment: Automated Docker Swarm, Kubernetes, and bare-metal Debian orchestration recipes.',
          '9. Documentation: Comprehensive guides for community node custodians, legal teams, and developers.'
        ]
      },
      {
        heading: '02. The Open Code vs. Content Sovereignty Rule',
        content: [
          'We reiterate the fundamental rule: "Open-source software must never mean open ownership of community content."',
          'While anyone is free to fork the player, deploy the node daemon, or inspect the codebase under open licenses (MIT, Apache-2.0, MPL-2.0), the artistic, intellectual, and journalistic works broadcast over the network remain the proprietary property of their creators.'
        ]
      }
    ]
  },
  ownership: {
    id: 'ownership',
    title: 'Ownership, Strategic Control & Operational Governance',
    subtitle: 'Public transparency regarding the ownership, patron status, and operational leadership of BangleTV.com.',
    lastUpdated: 'September 2026',
    executiveSummary: 'BangleTV.com (and BengalTV.com), its principal assets, and major strategic decisions are owned, patronized, and controlled by Anwar Tariq Khan in the United States. Operational administration and technical execution are led from Bangladesh by Sheikh Mehedi Hasan Nadim. Operation from Bangladesh does not constitute ownership.',
    sections: [
      {
        heading: '01. Principal Ownership & Strategic Patronage (United States)',
        content: [
          'Anwar Tariq Khan is the Owner, Patron, and Principal Decision-Maker of BangleTV.com (including BengalTV.com).',
          'All principal digital assets, intellectual property trademarks, international domain portfolios, infrastructure funding, and major strategic decisions governing the platform are controlled, held, and patronized from the United States.',
          'Strategic governance includes platform-level constitutional policies, legal compliance, international federation agreements, and long-term expansion initiatives across the global Bengali diaspora.'
        ]
      },
      {
        heading: '02. Operational Head & Executive Operator (Bangladesh)',
        content: [
          'Sheikh Mehedi Hasan Nadim serves as the Founding Member and Operational Head / Executive Operator of BangleTV.com.',
          'Operating from Bangladesh, Sheikh Mehedi Hasan Nadim is responsible for day-to-day administration, local technical operations, server maintenance, infrastructure deployment, community node onboarding, and practical engineering execution.',
          'His vital technical stewardship ensures high uptime, stream quality monitoring, and direct coordination with local cultural and journalistic broadcast partners.'
        ]
      },
      {
        heading: '03. Legal Clarification on Operational Jurisdiction',
        content: [
          'It is expressly established and recorded in the governance charter of BangleTV.com that practical operation, technical execution, and administrative leadership from Bangladesh DOES NOT constitute ownership or equity control over BangleTV.com, BengalTV.com, or its principal assets.',
          'Ownership and ultimate executive decision-making remain firmly vested with Anwar Tariq Khan in the United States, guaranteeing institutional stability, international legal protections, and political neutrality.'
        ]
      }
    ]
  },
  contact: {
    id: 'contact',
    title: 'Contact, Node Registration & Legal Inquiries',
    subtitle: 'Direct lines to executive leadership, technical desks, and DMCA compliance officers.',
    lastUpdated: 'September 2026',
    executiveSummary: 'Reach out to the BangleTV international desk for community node registration, broadcast licensing inquiries, press contacts, or intellectual property verification.',
    sections: [
      {
        heading: '01. Key Departmental Desks',
        content: [
          '• Executive & Patron Office (USA): patron.office@bangletv.com — Anwar Tariq Khan',
          '• Technical Operations & Node Infrastructure (BD): operations@bangletv.com — Sheikh Mehedi Hasan Nadim',
          '• DMCA & Copyright Compliance: legal.copyright@bangletv.com',
          '• Bangladesh Documentary Archive Desk: archives@bangletv.com',
          '• Community Federation Onboarding: federation@bangletv.com'
        ]
      },
      {
        heading: '02. Community Node Onboarding Protocol',
        content: [
          'Bengali cultural associations, university media departments, and independent diaspora journalists interested in deploying a BangleTV node can submit an intake application. Verified nodes receive cryptographic signing certificates and inclusion in the global directory.'
        ]
      }
    ]
  }
};
