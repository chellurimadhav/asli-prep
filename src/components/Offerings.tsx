import { ArrowRight, Atom, Stethoscope, BookOpen, Zap, Rocket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const offerings = [
  {
    name: 'JEE Preparation',
    desc: 'Advanced problem solving with deep conceptual understanding.',
    icon: Atom,
    color: 'bg-primary',
    href: '/#programs',
  },
  {
    name: 'NEET Preparation',
    desc: 'Concept clarity, biology mastery, and exam-focused practice.',
    icon: Stethoscope,
    color: 'bg-secondary',
    href: '/#programs',
  },
  {
    name: 'KCET Preparation',
    desc: 'Structured curriculum, mock tests, and expert mentoring for KCET aspirants.',
    icon: BookOpen,
    color: 'bg-primary',
    href: '/#programs',
  },
  {
    name: 'EAPCET Preparation',
    desc: 'Early exposure to competitive problem solving and logic building.',
    icon: Zap,
    color: 'bg-accent',
    href: '/#programs',
  },
  {
    name: 'Future Unicorns Launchpad',
    desc: "India's biggest entrepreneurship & talent platform empowering students with innovation, skills, and leadership mindset.",
    icon: Rocket,
    color: 'bg-secondary',
    href: '/#contact',
  },
];

const Offerings = () => {
  return (
    <section id="programs" className="py-20 section-teal">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm mb-4">
            ASLI PREP OFFERINGS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
            Asli Prep <span className="text-gradient-teal">Offerings</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-6">
          {offerings.map((item, i) => (
            <Card key={i} className="bg-white border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group">
              <CardContent className="p-6">
                <div className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{item.desc}</p>
                <a
                  href={item.href}
                  className="inline-flex items-center gap-1 text-primary font-semibold hover:gap-2 transition-all"
                >
                  Explore More
                  <ArrowRight className="h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offerings;
