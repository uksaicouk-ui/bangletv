import React, { useState } from 'react';
import { 
  X, Send, Sparkles, Tv, MessageSquare, ShieldCheck, 
  Lightbulb, FileText, CheckCircle2, Copy, Download, Mail, ExternalLink, Globe 
} from 'lucide-react';

interface ViewerFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'idea' | 'channel' | 'tip' | 'node' | 'general';
}

type SubmissionCategory = 'idea' | 'channel' | 'tip' | 'node' | 'general';

interface SubmittedProposal {
  id: string;
  type: string;
  title: string;
  sender: string;
  email: string;
  location: string;
  details: string;
  links: string;
  submittedAt: string;
}

export const ViewerFeedbackModal: React.FC<ViewerFeedbackModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'idea',
}) => {
  const [category, setCategory] = useState<SubmissionCategory>(defaultType);
  const [title, setTitle] = useState('');
  const [senderName, setSenderName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');
  const [referenceLinks, setReferenceLinks] = useState('');
  const [isConfidential, setIsConfidential] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [receiptId, setReceiptId] = useState('');
  const [copiedReceipt, setCopiedReceipt] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !details.trim() || !email.trim()) return;

    const generatedId = `BTV-${category.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setReceiptId(generatedId);

    const newProposal: SubmittedProposal = {
      id: generatedId,
      type: category,
      title,
      sender: senderName || 'Anonymous Viewer',
      email,
      location: location || 'Global',
      details,
      links: referenceLinks,
      submittedAt: new Date().toISOString()
    };

    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('bangletv_viewer_dispatches') || '[]');
      existing.unshift(newProposal);
      localStorage.setItem('bangletv_viewer_dispatches', JSON.stringify(existing));
    } catch {
      // ignore storage limits
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setTitle('');
    setDetails('');
    setReferenceLinks('');
    setIsSubmitted(false);
    setReceiptId('');
  };

  const handleCopyReceipt = () => {
    navigator.clipboard.writeText(receiptId);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  const categoryOptions = [
    { 
      id: 'idea' as const, 
      label: 'Programme Idea (অনুষ্ঠান প্রস্তাবনা)', 
      icon: Lightbulb, 
      desc: 'Suggest documentary concepts, cultural talk shows, investigative themes, or agrarian series.' 
    },
    { 
      id: 'channel' as const, 
      label: 'Channel Suggestion (নতুন চ্যানেল প্রস্তাবনা)', 
      icon: Tv, 
      desc: 'Recommend legal public broadcasts, community stations, or regional channels to peer.' 
    },
    { 
      id: 'tip' as const, 
      label: 'News Tip / Information (তথ্য ও সংবাদ প্রতিবেদন)', 
      icon: FileText, 
      desc: 'Share verified leads, investigative documents, grassroots reporting, or whistleblower tips.' 
    },
    { 
      id: 'node' as const, 
      label: 'Community Node Host (নোড হোস্ট করার আবেদন)', 
      icon: Globe, 
      desc: 'Apply to operate an autonomous BangleTV community relay in your city or diaspora region.' 
    },
    { 
      id: 'general' as const, 
      label: 'General Feedback (মতামত ও পরামর্শ)', 
      icon: MessageSquare, 
      desc: 'Technical issues, platform suggestions, and streaming experience feedback.' 
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0d131f] border border-white/15 rounded-xl max-w-2xl w-full p-6 shadow-2xl space-y-6 my-8 animate-fadeIn text-slate-200">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Viewer Dispatch & Editorial Proposals</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-brand">
              Submit Programme Ideas, Channel Proposals & News Tips
            </h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              BangleTV is powered by community collaboration. Propose new shows, nominate regional feeds, or submit public interest tips.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Confirmation State */
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div>
              <h4 className="text-xl font-bold text-white font-brand mb-1">
                Proposal Successfully Dispatched!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you for contributing to BangleTV's public broadcast ecosystem. Your submission has been securely logged with our editorial desk.
              </p>
            </div>

            {/* Receipt Box */}
            <div className="p-4 bg-black/50 border border-white/10 rounded-lg max-w-md mx-auto flex items-center justify-between text-xs font-mono">
              <div className="text-left">
                <span className="text-slate-500 block text-[10px] uppercase">Dispatch Tracking ID</span>
                <span className="text-emerald-400 font-bold">{receiptId}</span>
              </div>
              <button
                onClick={handleCopyReceipt}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
              >
                {copiedReceipt ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedReceipt ? 'Copied' : 'Copy ID'}</span>
              </button>
            </div>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs transition-colors cursor-pointer"
              >
                Submit Another Proposal
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded text-xs transition-colors cursor-pointer"
              >
                Return to Broadcast
              </button>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Category Selector */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Submission Objective (প্রস্তাবনার ধরন) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {categoryOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = category === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCategory(opt.id)}
                      className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-sm'
                          : 'bg-black/30 hover:bg-slate-800/40 border-white/10 text-slate-300'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <div>
                        <div className="text-xs font-semibold">{opt.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{opt.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title / Subject */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Proposal Title or Subject (বিষয় / প্রস্তাবনার শিরোনাম) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Weekly investigative program on judicial reforms in Dhaka..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Sender Name, Email & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Name (নাম)
                </label>
                <input
                  type="text"
                  placeholder="Your Name or Alias"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Contact Email (ইমেইল) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                  Location (দেশ / এলাকা)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka, London, New York"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Proposal Details / Description */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Detailed Brief & Content Concept (বিস্তারিত বিবরণ) *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Explain the background, proposed broadcast format, guest speakers, community relevance, or investigative evidence..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            {/* Links / References */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                Relevant Links / Portfolios / Feeds (তথ্যসূত্র বা লিংক)
              </label>
              <input
                type="text"
                placeholder="https://... (Drive link, YouTube reel, stream URL, research PDF)"
                value={referenceLinks}
                onChange={(e) => setReferenceLinks(e.target.value)}
                className="w-full px-3 py-1.5 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Confidentiality Toggle */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <input
                type="checkbox"
                id="confidential"
                checked={isConfidential}
                onChange={(e) => setIsConfidential(e.target.checked)}
                className="rounded border-white/20 text-emerald-500 focus:ring-0 cursor-pointer"
              />
              <label htmlFor="confidential" className="text-slate-300 cursor-pointer">
                Treat as confidential editorial whistleblower tip (protect sender identity)
              </label>
            </div>

            {/* Public Direct Email Inboxes */}
            <div className="p-3 bg-black/40 border border-white/5 rounded-lg text-[11px] text-slate-400 space-y-1">
              <span className="font-semibold text-white block">Official Public Direct Contact Channels:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 font-mono text-[10px]">
                <div>• Editorial Desk: <a href="mailto:editorial@bangletv.com" className="text-emerald-400 hover:underline">editorial@bangletv.com</a></div>
                <div>• Show Proposals: <a href="mailto:proposals@bangletv.com" className="text-emerald-400 hover:underline">proposals@bangletv.com</a></div>
                <div>• Federation Ingest: <a href="mailto:nodes@bangletv.com" className="text-emerald-400 hover:underline">nodes@bangletv.com</a></div>
                <div>• Rights & Compliance: <a href="mailto:rights@bangletv.com" className="text-emerald-400 hover:underline">rights@bangletv.com</a></div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Proposal</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
