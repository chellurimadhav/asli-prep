import { ArrowRight, Star, Rocket, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedStats from './AnimatedStats';
import AnimateIn from './AnimateIn';
import { useContent } from '@/hooks/useContent';

const Hero = () => {
  const { data: heroContent } = useContent<{
    title: string;
    subtitle: string;
    tagline: string;
    ctaText: string;
    heroImageUrl: string;
  }>("hero", {
    title: "Elevate Your School's Academic Excellence",
    subtitle: "Partner with us for IIT/NEET/Olympiad Success",
    tagline:
      "Partner with us for comprehensive preparation programs that bridge the gap between school learning and competitive exam success.",
    ctaText: "Schedule Institutional Partnership Meeting",
    heroImageUrl: "/images/mainImage.png",
  });

  return (
    <section id="main-content" className="relative pt-20 pb-32 sm:pb-36 md:pt-24 md:pb-16 lg:pt-28 lg:pb-20 overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-teal-50/30 hero-section-bg" aria-label="Main content">
      {/* 3D Background Objects - styled for light background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-[10%] w-36 h-36 bg-primary/10 rounded-3xl animate-float-slow" style={{ transform: 'rotate(15deg)' }} />
        <div className="absolute top-40 right-[15%] w-28 h-28 bg-accent/15 rounded-full animate-float-delayed" />
        <div className="absolute bottom-40 left-[20%] w-44 h-44 bg-primary/10 rounded-3xl animate-float-slow" style={{ transform: 'rotate(-12deg)' }} />
        <div className="absolute top-1/2 right-[8%] w-24 h-24 border-2 border-primary/20 rounded-xl animate-float" style={{ transform: 'rotate(45deg)' }} />
        <div className="absolute bottom-20 right-[25%] w-32 h-32 bg-accent/10 rounded-2xl animate-float-delayed" style={{ transform: 'rotate(-15deg)' }} />
        <div className="absolute top-1/3 right-[35%] w-20 h-20 bg-primary/15 rounded-full animate-float" />
        <div className="absolute top-32 right-[40%] animate-float-slow" style={{ perspective: '800px' }}>
          <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/15 rounded-xl shadow-lg" style={{ transform: 'rotateX(20deg) rotateY(35deg)' }} />
        </div>
        <div className="absolute bottom-36 right-[6%] w-0 h-0 border-l-[45px] border-l-transparent border-r-[45px] border-r-transparent border-b-[75px] border-b-primary/10 animate-float" />
        <div className="absolute top-1/4 right-[45%] w-14 h-14 bg-accent/12 rounded-full animate-float-delayed" />
      </div>

      <div className="container mx-auto relative z-10 min-w-0 px-4 sm:px-6 lg:px-8">
        {/* Mobile: headline → photo (arrow area) → badges + CTAs. Laptop: original layout – image left, content right in one column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 xl:gap-16 min-h-0 lg:min-h-[80vh] items-start lg:items-center">
          {/* 1. Headline – staggered entrance; tablet stays stacked like phone */}
          <AnimateIn animation="fade-up" delay={0} duration={700} className="order-1 lg:col-start-2 lg:row-start-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-3 md:mb-6 transition-all duration-300 hover:bg-primary/15">
              <Star className="h-3.5 w-3.5 md:h-4 md:w-4 text-primary" />
              <span className="text-secondary font-medium text-sm md:text-base">Your Right School Partner for JEE | NEET | OLYMPIAD FOUNDATIONS!</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary leading-tight mb-2 md:mb-4">
              {heroContent.title || "Elevate Your School's Academic Excellence"}
            </h1>
            <p className="text-lg md:text-2xl font-bold text-primary mb-3 md:mb-6">
              {heroContent.subtitle || "Partner with us for IIT/NEET/Olympiad Success"}
            </p>
            <p className="text-base md:text-xl text-foreground/85 mb-4 md:mb-6 max-w-xl mx-auto lg:mx-0 line-clamp-3 lg:line-clamp-none leading-relaxed">
              {heroContent.tagline ||
                "Partner with us for comprehensive preparation programs that bridge the gap between school learning and competitive exam success."}
            </p>
          </AnimateIn>

          {/* 2. Photo – scale-in + hover transition */}
          <AnimateIn animation="fade-in" delay={150} duration={800} className="order-2 lg:col-start-1 lg:row-start-1 flex justify-center lg:justify-start lg:items-start">
            <div className="relative w-full max-w-lg mx-auto lg:max-w-xl xl:max-w-3xl 2xl:max-w-4xl hero-image-wrap">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-60 hero-glow" />
              <img
                src={heroContent.heroImageUrl || "/images/mainImage.png"}
                alt="ASLI Prep - JEE NEET Olympiad Preparation"
                className="relative w-full h-auto rounded-2xl shadow-2xl object-contain hero-image"
              />
            </div>
          </AnimateIn>

          {/* Schedule Meeting CTA – centered under image; on desktop sits in col 1 row 2; on mobile clear gap below image */}
          <AnimateIn animation="fade-up" delay={250} duration={700} className="order-3 lg:col-start-1 lg:row-start-2 flex justify-center lg:justify-center mt-4 lg:-mt-16">
            <a href="/#contact" className="w-full max-w-full sm:max-w-lg lg:max-w-xl xl:max-w-2xl group/btn flex justify-center min-w-0">
              <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold px-4 sm:px-6 py-5 md:px-8 md:py-6 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 [&_svg]:transition-transform [&_svg]:duration-300 group-hover/btn:[&_svg]:translate-x-1 whitespace-normal text-center break-words">
                {heroContent.ctaText || "Schedule Institutional Partnership Meeting"}
                <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0" />
              </Button>
            </a>
          </AnimateIn>

          {/* Block 3: Badges + Explore Programs – right column row 2 on desktop; on mobile stacked below Schedule with no overlap */}
          <AnimateIn animation="fade-up" delay={300} duration={700} className="order-4 lg:col-start-2 lg:row-start-2 flex flex-col items-center lg:items-start text-center lg:text-left mt-6 lg:-mt-24">
            <div className="flex flex-wrap gap-2 md:gap-4 mb-4 md:mb-8 justify-center lg:justify-start min-w-0 w-full">
              <div className="badge-alpha flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl text-sm hover:scale-105 transition-transform duration-300">
                <Star className="h-4 w-4 md:h-5 md:w-5" /> ALPHA
              </div>
              <div className="badge-beta flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl text-sm hover:scale-105 transition-transform duration-300">
                <Rocket className="h-4 w-4 md:h-5 md:w-5" /> BETA
              </div>
              <div className="badge-gamma flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-5 md:py-3 rounded-lg md:rounded-xl text-sm hover:scale-105 transition-transform duration-300">
                <Trophy className="h-4 w-4 md:h-5 md:w-5" /> GAMMA
              </div>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center lg:justify-start w-full max-w-2xl lg:max-w-none mx-auto">
              <a href="/#programs" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary text-primary font-bold px-6 py-5 md:px-8 md:py-6 text-base md:text-lg rounded-xl hover:bg-primary/5 transition-all duration-300 hover:-translate-y-0.5">
                  Explore Programs
                </Button>
              </a>
            </div>
          </AnimateIn>
        </div>

        {/* Key Statistics – full container width, no side gaps; contained on mobile/tablet */}
        <AnimateIn animation="fade-up" delay={200} duration={800} className="mt-12 md:mt-16 min-w-0">
          <div className="w-full min-w-0 bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-border shadow-lg transition-all duration-300 hover:shadow-xl hover:border-primary/20 overflow-hidden">
            <AnimatedStats variant="light" preset="hero" />
          </div>
        </AnimateIn>
      </div>

      {/* VIDYA AI Banner – slide-up on view */}
      <AnimateIn animation="fade-up" duration={600} className="mt-16 relative z-10">
        <div className="bg-secondary py-6 transition-all duration-300 hover:bg-secondary/95">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-110 ring-2 ring-white/30">
                  <img src="/images/vidya-avatar.png" alt="VIDYA AI Assistant" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Meet our AI Assistant VIDYA</p>
                  <p className="text-white/70 text-sm">Your 24/7 learning companion</p>
                </div>
              </div>
              <a
                href="https://www.aslilearn.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground font-bold px-6 py-2 rounded-lg hover:brightness-110 transition-all duration-300 hover:scale-105"
              >
                Try VIDYA Now →
              </a>
            </div>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
};

export default Hero;
