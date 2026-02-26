import { 
  GraduationCap, 
  MonitorPlay, 
  FileText, 
  BarChart3, 
  Users, 
  Palette,
  CheckCircle
} from 'lucide-react';
import AnimateIn from './AnimateIn';

const features = [
  {
    icon: GraduationCap,
    title: 'Expert Faculty with Proven Track Record',
    description: 'Highly qualified teachers with extensive experience. Real-time performance tracking and feedback.',
  },
  {
    icon: MonitorPlay,
    title: 'Flexible Delivery Models',
    description: 'Online classes, offline classes, and hybrid learning options.',
  },
  {
    icon: Palette,
    title: 'White-Label Content Solutions',
    description: 'Institutions can brand content as their own. Customizable study materials. Seamless integration with school curriculum.',
  },
  {
    icon: FileText,
    title: 'Comprehensive Resource Library',
    description: 'Study material, video lectures, assessments and tests, teacher training modules, Learning Management System (LMS).',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Performance Tracking',
    description: 'Regular assessments, personalized feedback, progress reports for parents and teachers, identification of improvement areas.',
  },
  {
    icon: Users,
    title: 'Teacher Training',
    description: 'Professional development modules for your educators.',
  },
];

const WhyChooseUs = () => {
  return (
    <section id="about" className="py-20 section-navy relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto relative z-10">
        <AnimateIn animation="fade-up" duration={900} className="text-center mb-16">
          <div className="inline-flex justify-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/201/201623.png"
              alt="Confident learning"
              className="w-16 h-16 object-contain opacity-90"
            />
          </div>
          <span className="inline-block bg-accent text-accent-foreground font-bold px-4 py-2 rounded-full text-sm mb-4">
            WHY PARTNER WITH US
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Why Partner With <span className="text-gradient-gold">Asli Prep Foundation</span>
          </h2>
          <p className="text-white/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Partner with Excellence, Achieve Excellence. From School Boards to IIT/NEET - We Bridge the Gap.
          </p>
        </AnimateIn>

        {/* Top cards – common subtle style, aligned */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {features.map((feature, index) => (
            <AnimateIn key={index} animation="fade-up" delay={index * 100} duration={650} className="h-full flex">
            <div
              className="group h-full flex flex-col w-full text-left bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 ease-out-smooth hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform flex-shrink-0 bg-primary/30 border border-primary/20">
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/85 text-sm md:text-base flex-1 leading-relaxed">{feature.description}</p>
            </div>
            </AnimateIn>
          ))}
        </div>

        {/* Bottom two cards – aligned, differentiated colors to stand out */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch max-w-5xl mx-auto">
          <AnimateIn animation="slide-left" delay={0} duration={800} className="flex h-full">
          <div className="h-full flex flex-col w-full text-left bg-gradient-to-br from-primary/25 to-primary/10 backdrop-blur-sm border border-primary/40 rounded-2xl p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">For Schools & Institutions</h3>
            <ul className="space-y-4 flex-1">
              {[
                'Seamless integration with existing curriculum',
                'Marketing support for schools',
                'Teacher training and support',
                'Institutional pricing (inquiry-based)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90 text-sm md:text-base">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          </AnimateIn>
          
          <AnimateIn animation="slide-right" delay={150} duration={800} className="flex h-full">
          <div className="h-full flex flex-col w-full text-left bg-gradient-to-br from-accent/25 to-accent/10 backdrop-blur-sm border border-accent/40 rounded-2xl p-8 transition-all duration-300 hover:border-accent/50 hover:shadow-lg">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">For Students & Parents</h3>
            <ul className="space-y-4 flex-1">
              {[
                'Board + Competitive exam integration (not either/or)',
                'Regular progress reports and feedback',
                'Access to AI assistant VIDYA',
                'Proven track record with student testimonials',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-white/90 text-sm md:text-base">
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
