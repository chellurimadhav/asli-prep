import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Knowledge base: topics and answers based on website content
const KNOWLEDGE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['alpha', 'program', 'foundation', 'board', 'grades v', 'grades 5', 'cbse', 'state board', 'mathematics', 'physics', 'chemistry', 'biology', 'foundational'],
    answer: '**ALPHA** is our Foundation Program for students in Grades V to X. It builds strong foundational concepts aligned with CBSE/State board curriculum. Subjects: Mathematics, Physics, Chemistry, Biology. Focus: strong foundational focus according to boards. Ideal for students building fundamental concepts.',
  },
  {
    keywords: ['beta', 'iit', 'neet', 'jee', 'competitive', 'grades viii', 'grades 8', 'grades 9', 'grades 10', 'logical reasoning', 'syllabus'],
    answer: '**BETA** is for Advanced IIT/NEET Preparation (Grades VIII to X). It covers Mathematics, Physics, Chemistry, Biology, and Logical Reasoning. Aligned with IIT-JEE & NEET syllabus. Focus: higher-order thinking and problem-solving for students ready for competitive exam prep.',
  },
  {
    keywords: ['gamma', 'olympiad', 'imo', 'nso', 'nco', 'ieo', 'excellence', 'national', 'international'],
    answer: '**GAMMA** is our Olympiad-Level Excellence program (Grades VI to X). Subjects: Mathematics, Physics, Chemistry, Biology. Aligned with IMO, NSO, NCO, IEO. Focus: advanced problem-solving and critical thinking for top achievers aiming for national/international Olympiads.',
  },
  {
    keywords: ['programs', 'three', 'tier', 'alpha beta gamma', 'overview'],
    answer: 'We offer a **three-tier learning system**: **ALPHA** (Foundation, Board-Aligned), **BETA** (IIT/NEET Preparation), and **GAMMA** (Olympiad Excellence). Each program serves different grades and goals. Scroll to the Programs section or ask about a specific program.',
  },
  {
    keywords: ['partner', 'school', 'institution', 'partnership', 'b2b', 'for schools'],
    answer: 'We partner with schools and institutions for institutional partnerships (B2B). Benefits: seamless curriculum integration, marketing support, teacher training, institutional pricing. Contact us for inquiry. You can submit an inquiry via the Contact form—it opens WhatsApp directly.',
  },
  {
    keywords: ['contact', 'address', 'phone', 'email', 'where', 'location', 'hyderabad'],
    answer: '**Contact:** Address: Plot No. 47, Rd No: 4A, Golden Tulip Estates, Kondapur, Hyderabad, Telangana - 500 084. Phone: +91 9346832477. Email: info@asliprep.com, asliprep@gmail.com. You can also chat on WhatsApp for a quick response.',
  },
  {
    keywords: ['whatsapp', 'chat', 'message'],
    answer: 'You can chat with us on WhatsApp: +91 9346832477. The "Submit Inquiry" button in the Contact section also opens WhatsApp with your inquiry details pre-filled.',
  },
  {
    keywords: ['vidya', 'ai', 'assistant', 'robot'],
    answer: '**VIDYA** is our AI assistant—your 24/7 learning companion. Try it at www.aslilearn.ai. It helps students with JEE, NEET, and Olympiad preparation.',
  },
  {
    keywords: ['jee', 'neet', 'olympiad', 'exam', 'competitive exam', 'preparation'],
    answer: 'Asli Prep Foundation supports preparation for **JEE** (IIT-JEE), **NEET**, and **Olympiads** (IMO, NSO, NCO, IEO). We offer Alpha (foundation), Beta (IIT/NEET focus), and Gamma (Olympiad focus) programs. Partner with us for comprehensive preparation that bridges school learning and competitive exams.',
  },
  {
    keywords: ['who', 'what is asli prep', 'about', 'foundation'],
    answer: '**Asli Prep Foundation** is your right school partner for JEE | NEET | Olympiad foundations. We empower Indian school students (Grades VI to X) with knowledge and resources for IIT-JEE, NEET, and Olympiads. We offer white-label solutions for schools and partner with institutions.',
  },
  {
    keywords: ['success', 'rate', 'schools', 'students', 'awards', 'experience'],
    answer: 'We have 500+ partner schools, 95% success rate, 5+ years of experience, and 50+ awards won. You can read success stories and testimonials on our website.',
  },
  {
    keywords: ['brochure', 'download', 'resource', 'material'],
    answer: 'You can download our Program Brochure from the Downloadable Resources section on the website. It includes a complete overview of courses, curriculum, and programs.',
  },
];

const DEFAULT_ANSWER = "I can help with questions about our **programs** (Alpha, Beta, Gamma), **JEE/NEET/Olympiad** preparation, **partnerships** for schools, **contact details**, and **VIDYA AI**. Try asking: 'What is Alpha?', 'How do I contact?', 'Tell me about Beta program.'";

function getAnswer(userMessage: string): string {
  const lower = userMessage.toLowerCase().trim();
  if (!lower) return "Please type a question about our programs, contact info, or partnerships.";
  for (const { keywords, answer } of KNOWLEDGE) {
    if (keywords.some((k) => lower.includes(k))) return answer;
  }
  return DEFAULT_ANSWER;
}

function formatMessage(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

const HINT_KEY = 'asliprep-chat-hint-seen';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [labelVisible, setLabelVisible] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm here to help with questions about Asli Prep Foundation—our programs (Alpha, Beta, Gamma), JEE/NEET/Olympiad prep, partnerships, and contact info. What would you like to know?" },
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Show "Chat with us" label after a short delay so visitors notice the chatbot
  useEffect(() => {
    const t = setTimeout(() => setLabelVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  // One-time hint bubble for new visitors
  useEffect(() => {
    if (open || typeof sessionStorage === 'undefined') return;
    const seen = sessionStorage.getItem(HINT_KEY);
    if (seen) return;
    const show = setTimeout(() => setHintVisible(true), 1500);
    return () => clearTimeout(show);
  }, [open]);

  const dismissHint = () => {
    setHintVisible(false);
    try { sessionStorage.setItem(HINT_KEY, '1'); } catch {}
  };

  useEffect(() => {
    if (open) {
      setHintVisible(false);
      try { sessionStorage.setItem(HINT_KEY, '1'); } catch { /* ignore */ }
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    const answer = getAnswer(text);
    setMessages((prev) => [...prev, { role: 'bot', text: answer }]);
  };

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div 
          className="fixed bottom-20 z-50 w-[calc(100vw-2rem)] max-w-md rounded-2xl bg-white shadow-2xl border border-border flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300"
          style={{ right: 'max(1rem, env(safe-area-inset-right))' }}
        >
          <div className="bg-primary text-white px-4 py-3 flex items-center justify-between">
            <span className="font-bold">Asli Prep Assistant</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 hover:bg-white/20 rounded"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 max-h-80 min-h-64">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                    m.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {m.role === 'bot' ? formatMessage(m.text) : m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-border flex gap-2">
            <Input
              placeholder="Ask about programs, contact, partnerships..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button type="button" size="icon" onClick={handleSend} className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* One-time hint bubble so visitors know they can chat */}
      {hintVisible && !open && (
        <div
          className="fixed bottom-20 z-50 max-w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-300"
          style={{ right: 'max(1rem, env(safe-area-inset-right))' }}
          role="tooltip"
        >
          <div className="bg-primary text-white text-sm font-medium rounded-2xl rounded-br-md px-4 py-3 shadow-lg border border-primary/20">
            <p>Have questions? Chat with our assistant here 👋</p>
            <button
              type="button"
              onClick={dismissHint}
              className="mt-2 text-xs text-white/90 underline hover:text-white"
            >
              Got it
            </button>
          </div>
          <div className="absolute -bottom-1 right-6 w-3 h-3 bg-primary rotate-45 border-r border-b border-primary/20" />
        </div>
      )}

      {/* Toggle button with visible label – inset on mobile so content isn’t covered */}
      <div
        className="fixed z-50 flex items-center gap-2"
        style={{
          bottom: 'max(1rem, env(safe-area-inset-bottom))',
          right: 'max(1rem, env(safe-area-inset-right))',
        }}
      >
        <span
          className={`bg-primary text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg whitespace-nowrap transition-all duration-300 ${
            labelVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
          }`}
        >
          Chat with us
        </span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-all duration-300 hover:scale-110 chat-button-pulse"
          aria-label="Open chat - Ask about programs, contact, partnerships"
        >
          <MessageCircle className="h-7 w-7" />
        </button>
      </div>
    </>
  );
}
