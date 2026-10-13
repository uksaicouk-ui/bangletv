import React from 'react';
import { AlertCircle, X, Radio } from 'lucide-react';

interface BreakingNewsBannerProps {
  news: string | null;
  reporter?: string | null;
  onDismiss?: () => void;
  onOpenJournalistPortal?: () => void;
}

export const BreakingNewsBanner: React.FC<BreakingNewsBannerProps> = ({
  news,
  reporter,
  onDismiss,
  onOpenJournalistPortal,
}) => {
  if (!news) return null;

  return (
    <div className="w-full bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white text-xs font-sans border-b border-red-500 shadow-xl relative z-30 animate-fadeIn">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        
        {/* Left Badge & Content */}
        <div className="flex items-center gap-3 overflow-hidden flex-1">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/40 rounded-md font-bold uppercase tracking-wider text-[11px] font-mono flex-shrink-0 animate-pulse border border-white/20">
            <Radio className="w-3.5 h-3.5 text-white" />
            <span>ব্রেকিং নিউজ</span>
          </div>

          <div className="truncate font-medium text-white text-xs sm:text-sm">
            <span>{news}</span>
            {reporter && (
              <span className="text-red-200 ml-2 text-xs font-mono">
                — {reporter} (সরেজমিন ডেস্ক)
              </span>
            )}
          </div>
        </div>

        {/* Action / Dismiss */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {onOpenJournalistPortal && (
            <button
              onClick={onOpenJournalistPortal}
              className="text-[11px] underline text-red-100 hover:text-white transition-colors cursor-pointer hidden md:inline-block"
            >
              সাংবাদিক ডেস্ক →
            </button>
          )}

          {onDismiss && (
            <button
              onClick={onDismiss}
              className="p-1 hover:bg-black/30 rounded text-red-100 hover:text-white transition-colors cursor-pointer"
              title="বন্ধ করুন"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
