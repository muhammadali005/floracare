import React, { useState } from 'react';
import { 
  Mail, 
  User, 
  Heart, 
  Send, 
  Check, 
  Copy, 
  Sprout, 
  ShieldCheck, 
  Compass, 
  Lightbulb, 
  MessageSquare, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const email = 'm.aleydev@gmail.com';
  const [copied, setCopied] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    senderEmail: '',
    subject: 'Plant Care Feedback',
    message: '',
  });
  const [isSent, setIsSent] = useState<boolean>(false);

  const handleCopyEmail = () => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard
          .writeText(email)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          })
          .catch((err) => console.warn('Clipboard write prevented:', err));
      }
    } catch (err) {
      console.warn('Clipboard copy error:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    setIsSent(true);
    setTimeout(() => {
      setFormData({
        name: '',
        senderEmail: '',
        subject: 'Plant Care Feedback',
        message: '',
      });
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Hero / Creator Intro */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-400/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
            <Sprout className="w-3.5 h-3.5 text-emerald-300" />
            About the Creator & Mission
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-serif leading-tight">
            Cultivating Tech with a Green Heart
          </h1>

          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Welcome to FloraCare! I built this application to bring together two of my biggest passions: cutting-edge software engineering and the wonder of the plant kingdom. Whether you are nursing a rescue plant back to life or curating an indoor jungle, FloraCare is designed to make botanical knowledge approachable, accurate, and actionable.
          </p>

          {/* Quick Contact Badge */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-xs shadow-md cursor-default pointer-events-none select-none"
              tabIndex={-1}
              aria-disabled="true"
            >
              <Mail className="w-4 h-4 text-emerald-700" />
              <span>Contact via Email</span>
            </button>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700/80 text-white border border-emerald-600/50 text-xs font-medium transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-emerald-300" />
                  <span>{email}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Creator Profile & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Creator Card */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-serif text-2xl font-bold shadow-md shadow-emerald-500/20">
                MA
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-stone-900">
                  Muhammad Ali
                </h3>
                <p className="text-xs font-medium text-emerald-700">
                  Software Engineer
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-0.5">
                  <Compass className="w-3 h-3 text-emerald-600" />
                  <span>Plant Tech & UI Designer</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed">
              Hi there! I'm Muhammad Ali, the engineer behind FloraCare. Like many plant enthusiasts, I learned plant care the hard way: overwatering sensitive roots, misjudging lighting directions, and battling mysterious yellowing leaves without knowing what was wrong.
            </p>

            <p className="text-xs text-stone-600 leading-relaxed">
              I created FloraCare to bridge empirical plant pathology with conversational intelligence—giving every gardener an on-demand botanical doctor that provides exact species identification, tailored watering cycles, and diagnostic clarity.
            </p>

            {/* Contact details card */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-600" /> Direct Inquiries
              </h4>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Email:</span>
                <a
                  href={`mailto:${email}`}
                  className="font-mono text-emerald-800 font-semibold hover:underline"
                >
                  {email}
                </a>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Response Time:</span>
                <span className="text-stone-700 font-medium">Within 24–48 hours</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Focus Areas:</span>
                <span className="text-stone-700 font-medium">Web Apps, AI, Botany</span>
              </div>
            </div>
          </div>

          {/* Plant Care Philosophy */}
          <div className="bg-emerald-50/60 rounded-3xl p-6 border border-emerald-100 space-y-3">
            <h4 className="text-sm font-bold text-emerald-950 font-serif flex items-center gap-2">
              <Heart className="w-4 h-4 text-emerald-600" />
              Our Botanical Philosophy
            </h4>
            <p className="text-xs text-emerald-900/80 leading-relaxed">
              "There are no bad plant parents—only mismatched care instructions." By understanding a plant's native rainforest understory or desert origin, we can simulate its ideal habitat and watch it flourish.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form & App Features */}
        <div className="md:col-span-7 space-y-8">
          {/* Interactive Get in Touch Form */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Get in Touch
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Have a question, feedback, plant feature request, or just want to talk about rare aroids? Send me a message below or directly to <a href={`mailto:${email}`} className="text-emerald-700 underline font-medium">{email}</a>.
              </p>
            </div>

            {isSent ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2 animate-in fade-in zoom-in-95 duration-150">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-lg text-emerald-950">
                  Message Dispatched!
                </h4>
                <p className="text-xs text-emerald-800 max-w-sm mx-auto">
                  Thank you for reaching out! You can also email directly at <strong className="font-mono">{email}</strong>.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-3 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jane Gardener"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-stone-50/50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.senderEmail}
                      onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                      placeholder="e.g. jane@example.com"
                      className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-stone-50/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Topic / Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-stone-50/50"
                  >
                    <option value="Plant Care Feedback">General Feedback & Appreciation</option>
                    <option value="Feature Request">Feature / Plant Species Request</option>
                    <option value="Bug Report">Issue or Bug Report</option>
                    <option value="Collaboration">Collaboration & Botanical Consulting</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your note, feedback, or inquiry here..."
                    className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 bg-stone-50/50"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a
                    href={`mailto:${email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`}
                    className="text-xs text-emerald-700 hover:text-emerald-900 font-medium flex items-center gap-1"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Open in Mail Client
                  </a>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm shadow-emerald-600/20"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Pillars of FloraCare */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              What Powers FloraCare
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Taxonomic Accuracy
                </span>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Pinpoint Latin binomial names, plant families, and natural geographic origins.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-emerald-600" />
                  Root-Level Diagnostics
                </span>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Fast triage for chlorosis, under/overwatering, fungal spores, and pest infestations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  Adaptive Botanical Chat
                </span>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Role-based assistance spanning deep pathology, everyday care, and quick fact checks.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 space-y-1">
                <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Habit & Watering Rhythm
                </span>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Organize your living sanctuary with countdown reminders tailored to each room.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
