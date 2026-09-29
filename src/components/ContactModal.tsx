import React, { useState } from 'react';
import { X, Mail, ShieldAlert, CheckCircle2, Send, Server, FileText } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPolicies: (tab?: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onOpenPolicies,
}) => {
  const [inquiryType, setInquiryType] = useState<'node' | 'copyright' | 'press' | 'general'>('node');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ name: '', email: '', organization: '', message: '' });
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0d131f] border border-white/15 rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-5">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-1">
              <Mail className="w-4 h-4" />
              <span>Official Inquiries & Network Desk</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-brand">
              Contact BangleTV.com Desk
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Inquiry Transmitted</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              Your inquiry has been routed to the appropriate executive or technical operational desk. You will receive an acknowledgment within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Department Selector */}
            <div>
              <label className="block text-slate-300 font-medium mb-1.5">Select Department</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'node', label: 'Community Node Intake' },
                  { id: 'copyright', label: 'DMCA / Copyright Desk' },
                  { id: 'press', label: 'Press & Media Relations' },
                  { id: 'general', label: 'General Technical Support' },
                ].map((dept) => (
                  <button
                    type="button"
                    key={dept.id}
                    onClick={() => setInquiryType(dept.id as any)}
                    className={`p-2 rounded text-left border transition-all cursor-pointer ${
                      inquiryType === dept.id
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold'
                        : 'bg-black/30 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {dept.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Your Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Dr. Rafiqul Islam"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Official Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="name@organization.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Organization or Node (Optional)</label>
              <input
                type="text"
                placeholder="e.g. London Bengali Cultural Trust"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Message or Notice Particulars</label>
              <textarea
                required
                rows={4}
                placeholder="Provide detailed description of your node configuration, query, or citation reference..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded text-white focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            {inquiryType === 'copyright' && (
              <div className="p-3 bg-red-950/30 border border-red-500/30 rounded text-[11px] text-red-200 leading-relaxed">
                <strong>DMCA Statutory Notice:</strong> Include the exact URL of the offending manifest pointer, proof of copyright ownership, and physical or electronic signature.
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Controlled & patronized from USA · Operated from BD
              </span>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded flex items-center gap-1.5 cursor-pointer"
              >
                <span>Transmit Inquiry</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
