import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MessageCircle, Brain, Zap, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContent } from '@/hooks/useContent';
import { useBusinessInfo } from '@/hooks/useBusinessInfo';

const features = [
  { icon: Brain, title: '24/7 Learning Assistant', desc: 'Get instant answers to doubts anytime, anywhere' },
  { icon: BookOpen, title: 'Curriculum-Aligned', desc: 'Covers JEE, NEET, Olympiad, and board syllabus' },
  { icon: Zap, title: 'Instant Explanations', desc: 'Step-by-step solutions for complex problems' },
  { icon: MessageCircle, title: 'Interactive Chat', desc: 'Natural conversation for a personalized learning experience' },
];

type VidyaContent = {
  sectionTitle: string;
  description: string;
  highlightText: string;
  imageUrl: string;
  yearWise: { year: string; content: string }[];
};

const defaultVidya: VidyaContent = {
  sectionTitle: 'Meet our AI Assistant VIDYA',
  description:
    'Our AI Assistant helps students with features and capabilities for JEE, NEET, and Olympiads. Demo or trial access at www.aslilearn.ai',
  highlightText: '2025–2026 – 500+ Schools',
  imageUrl: '/images/meet-vidya-classroom.png',
  yearWise: [],
};

const DEMO_WHATSAPP_MESSAGE = 'Hi, I Would Like To Have An Asli Prep Demo At My Campus.';

export default function MeetVidya() {
  const { data: vidya } = useContent<VidyaContent>('vidya', defaultVidya);
  const { data: business } = useBusinessInfo();
  const whatsappNumber = business?.whatsappNumber || '919346832477';
  const demoWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(DEMO_WHATSAPP_MESSAGE)}`;

  const title = vidya.sectionTitle || defaultVidya.sectionTitle;
  const description = vidya.description || defaultVidya.description;
  const imageUrl = vidya.imageUrl || defaultVidya.imageUrl;
  const yearWise = vidya.yearWise && vidya.yearWise.length > 0 ? vidya.yearWise : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-slate-50 via-white to-teal-50/30 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm mb-6">
                MEET VIDYA
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-secondary mb-6">
                {title.includes('VIDYA') ? (
                  <>
                    {title.split('VIDYA')[0]}
                    <span className="text-gradient-teal">VIDYA</span>
                    {title.split('VIDYA')[1] || ''}
                  </>
                ) : (
                  title
                )}
              </h1>
              <p className="text-xl text-foreground/90 mb-6 leading-relaxed">
                {description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-4 rounded-xl text-base sm:text-lg">
                  <a href={demoWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="text-center whitespace-normal leading-snug">
                    Want To Know More? Click to request a demo
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-2 bg-primary/20 rounded-3xl blur-xl" />
                <img
                  src={imageUrl}
                  alt="ASLI Prep – instructor and students with VIDYA in the classroom"
                  className="relative w-full h-auto rounded-2xl shadow-2xl object-cover border border-primary/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Year-wise Content (if set by admin) */}
      {yearWise.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block bg-accent text-accent-foreground font-bold px-4 py-2 rounded-full text-sm mb-4">
                YEAR-WISE PROGRESS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                Our <span className="text-gradient-teal">Journey</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {yearWise.map((yw, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="text-2xl font-bold text-primary mb-2">{yw.year}</div>
                  <p className="text-foreground/85 leading-relaxed">{yw.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-20 section-teal">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm mb-4">
              FEATURES & CAPABILITIES
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
              How VIDYA <span className="text-gradient-teal">Helps Students</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">{f.title}</h3>
                <p className="text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA – request demo via WhatsApp */}
      <section className="py-20 section-navy">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want to see VIDYA at your campus?
            </h2>
            <p className="text-white/70 mb-8">
              Request a demo and we’ll get in touch to schedule a session.
            </p>
            <Button asChild className="bg-accent text-accent-foreground font-bold px-6 py-4 text-base sm:text-lg">
              <a href={demoWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="text-center whitespace-normal leading-snug">
                Want To Know More? Click to request a demo
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
