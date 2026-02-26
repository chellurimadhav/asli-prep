import { Star, Quote, Play } from 'lucide-react';
import AnimateIn from './AnimateIn';
import { useBusinessInfo } from '@/hooks/useBusinessInfo';
import { useContent } from '@/hooks/useContent';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

type TestimonialItem = {
  id: string;
  name: string;
  designation: string;
  schoolName: string;
  photoUrl: string;
  text: string;
  rating: number;
  active: boolean;
};

type TestimonialsData = {
  items: TestimonialItem[];
};

const fallbackTestimonials: TestimonialsData = {
  items: [
    {
      id: "1",
      name: "Priya Sharma",
      designation: "NEET Aspirant",
      schoolName: "",
      photoUrl: "",
      text: "Study materials and guidance were useful for my NEET exam!",
      rating: 5,
      active: true,
    },
    {
      id: "2",
      name: "Rahul Verma",
      designation: "JEE Aspirant",
      schoolName: "",
      photoUrl: "",
      text: "Regular assessments and feedback helped me prepare for JEE.",
      rating: 5,
      active: true,
    },
    {
      id: "3",
      name: "Ananya Reddy",
      designation: "Olympiad Winner",
      schoolName: "",
      photoUrl: "",
      text: "Motivational sessions kept me focused on my career goals.",
      rating: 5,
      active: true,
    },
    {
      id: "4",
      name: "Mrs. Lakshmi",
      designation: "Parent",
      schoolName: "",
      photoUrl: "",
      text: "Faculty made complex topics easy to understand.",
      rating: 5,
      active: true,
    },
    {
      id: "5",
      name: "Aditya Kumar",
      designation: "IIT-JEE Qualified",
      schoolName: "",
      photoUrl: "",
      text: "Gained confidence and clarity for competitive exams.",
      rating: 5,
      active: true,
    },
  ],
};

const emojiMap: Record<string, string> = {
  "1": "🎓",
  "2": "📚",
  "3": "🏆",
  "4": "👩‍👧",
  "5": "⭐",
};

const Testimonials = () => {
  const { data: business } = useBusinessInfo();
  const { data: testimonialsData } = useContent<TestimonialsData>('testimonials', fallbackTestimonials);

  const whatsappNumber = business.whatsappNumber || '919346832477';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hi%2C%20I%27d%20like%20to%20request%20video%20testimonials`;

  // Only show active testimonials
  const visibleTestimonials = testimonialsData.items.filter(t => t.active !== false);

  if (visibleTestimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-20 section-teal">
      <div className="container mx-auto">
        <AnimateIn animation="fade-up" duration={800} className="text-center mb-16">
          <span className="inline-block bg-accent text-accent-foreground font-bold px-4 py-2 rounded-full text-sm mb-4">
            SUCCESS STORIES
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
            Success Stories: Students, Teachers & <span className="text-gradient-teal">Administrators</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Testimonials from students, teachers, and school administrators. Personalized Learning, Proven Results.
          </p>
        </AnimateIn>

        <Carousel opts={{ align: 'start', loop: true }} className="w-full">
          <CarouselContent className="-ml-4">
            {visibleTestimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id || index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <AnimateIn animation="fade-in" delay={index * 80} duration={500} className="h-full">
                  <div className="card-hover bg-white rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all duration-300 h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <div className="relative mb-4">
                      <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                      <p className="text-foreground/80 italic pl-6">"{testimonial.text}"</p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl overflow-hidden flex-shrink-0">
                        {testimonial.photoUrl ? (
                          <img
                            src={testimonial.photoUrl}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          emojiMap[testimonial.id] || "🎓"
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-secondary">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.designation}
                          {testimonial.schoolName ? ` • ${testimonial.schoolName}` : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimateIn>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12" />
          <CarouselNext className="hidden md:flex -right-12" />
        </Carousel>

        {/* Video Testimonials CTA */}
        <AnimateIn animation="fade-up" delay={100} className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-secondary rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                <Play className="h-8 w-8 text-accent" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white font-bold text-xl mb-1">Watch Video Testimonials</p>
                <p className="text-white/70 text-sm">See real success stories from students, parents & principals</p>
              </div>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-accent-foreground font-bold px-8 py-3 rounded-xl hover:brightness-110 transition-all whitespace-nowrap"
            >
              Request Demo →
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
};

export default Testimonials;
