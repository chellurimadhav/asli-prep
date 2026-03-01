import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Target, Eye, Heart, Award, Users, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useContent } from '@/hooks/useContent';

const values = [
  { icon: BookOpen, title: 'Excellence', desc: 'Delivering the highest quality educational content and teaching methodologies' },
  { icon: Heart, title: 'Empowerment', desc: 'Enabling every student to reach their full potential regardless of background' },
  { icon: Users, title: 'Partnership', desc: 'Collaborating with schools to create integrated learning ecosystems' },
  { icon: GraduationCap, title: 'Innovation', desc: 'Leveraging technology and AI to enhance learning outcomes' },
];

type AboutContent = {
  description: string;
  imageUrl: string;
  mission: string;
  vision: string;
  milestones: { year: string; title: string; desc: string }[];
};

const defaultAbout: AboutContent = {
  description:
    'Asli Prep Foundation empowers Indian school students (Grades VI to X) with the knowledge, skills, and resources to excel in IIT-JEE, NEET, and Olympiads through high-quality academic support.',
  imageUrl: '',
  mission:
    'To empower Indian school students with the knowledge, skills, and resources to excel in competitive exams like IIT-JEE, NEET, and Olympiads by offering high-quality academic support through their schools.',
  vision:
    'To be the leading educational foundation that bridges the gap between school learning and competitive exam preparation, ensuring every student has the opportunity to reach their full potential.',
  milestones: [
    { year: '2019', title: 'Foundation', desc: 'Asli Prep Foundation established with a vision to bridge school and competitive exam preparation' },
    { year: '2021', title: 'Growth', desc: 'Expanded to 200+ partner schools across India' },
    { year: '2023', title: 'VIDYA Launch', desc: 'AI-powered learning assistant VIDYA introduced at aslilearn.ai' },
    { year: '2025', title: '500+ Schools', desc: 'Reached 500+ partner schools and 10,000+ students enrolled' },
  ],
};

export default function About() {
  const { data: about } = useContent<AboutContent>('about', defaultAbout);

  const description = about.description || defaultAbout.description;
  const mission = about.mission || defaultAbout.mission;
  const vision = about.vision || defaultAbout.vision;
  const milestones = about.milestones && about.milestones.length > 0 ? about.milestones : defaultAbout.milestones;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero – same colours as main page: light bg, dark blue + green text for readability */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-slate-50 via-white to-teal-50/30 px-4 sm:px-6">
        <div className="container mx-auto max-w-full overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl min-w-0">
              <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm mb-6">
                ABOUT US
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-secondary mb-6 break-words">
                Bridging School Learning & <span className="text-gradient-teal">Competitive Success</span>
              </h1>
              <p className="text-xl text-foreground/90 mb-8 leading-relaxed break-words">
                {description}
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90 text-white font-bold px-6 sm:px-8 py-4 rounded-xl text-lg w-full sm:w-auto">
                <a href="/#contact" className="block text-center">Schedule Institutional Partnership Meeting</a>
              </Button>
            </div>
            {about.imageUrl && (
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                  <div className="absolute -inset-2 bg-primary/20 rounded-3xl blur-xl" />
                  <img
                    src={about.imageUrl}
                    alt="About Asli Prep Foundation"
                    className="relative w-full h-auto rounded-2xl shadow-2xl object-cover border border-primary/20"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 section-teal">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Our Mission</h2>
              <p className="text-foreground/90 text-lg leading-relaxed">
                {mission}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-border">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-secondary mb-4">Our Vision</h2>
              <p className="text-foreground/90 text-lg leading-relaxed">
                {vision}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm mb-4">
              CORE VALUES
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
              What We <span className="text-gradient-teal">Stand For</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all hover:-translate-y-2">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <v.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">{v.title}</h3>
                <p className="text-foreground/85 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 section-navy relative overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-accent text-accent-foreground font-bold px-4 py-2 rounded-full text-sm mb-4">
              OUR JOURNEY
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Achievements & <span className="text-gradient-gold">Milestones</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((m, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                <div className="text-3xl font-bold text-accent mb-2">{m.year}</div>
                <h3 className="text-xl font-bold text-white mb-2">{m.title}</h3>
                <p className="text-white/70 text-sm">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
