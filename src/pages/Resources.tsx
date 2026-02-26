import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, Video, Download, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const resources = [
  { icon: FileText, title: 'Free Sample Study Materials', desc: 'Comprehensive, exam-aligned content', action: 'Download' },
  { icon: BookOpen, title: 'Downloadable Guides', desc: 'Blog articles on exam preparation, parenting tips for competitive exam prep', action: 'View' },
  { icon: Video, title: 'Video Library', desc: 'Sample lectures. Latest exam updates and news', action: 'Watch' },
  { icon: FileText, title: 'Success Stories & Case Studies', desc: 'Testimonials from students, teachers, and administrators', action: 'Read' },
];

export default function Resources() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero – same colours as main page: light bg, dark blue + green text for readability */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-slate-50 via-white to-teal-50/30">
        <div className="container mx-auto">
          <div className="max-w-3xl">
            <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm mb-6">
              RESOURCES
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-secondary mb-6">
              Free <span className="text-gradient-teal">Resources</span>
            </h1>
            <p className="text-xl text-foreground/90 leading-relaxed">
              Free sample study materials, blog articles on exam preparation, parenting tips for competitive exam prep, latest exam updates and news, video library (sample lectures), downloadable guides, success stories and case studies.
            </p>
          </div>
        </div>
      </section>

      {/* Downloadables */}
      <section className="py-20 section-teal">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm mb-4">
              DOWNLOADABLES
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
              Request <span className="text-gradient-teal">Resources</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg border border-border hover:shadow-xl transition-all hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <r.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">{r.title}</h3>
                <p className="text-muted-foreground mb-6">{r.desc}</p>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  <Download className="mr-2 h-4 w-4" />
                  {r.action}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 section-navy">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-white/70 mb-8">
              Newsletter signup for updates. Latest exam updates and news, parenting tips for competitive exam prep.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
              />
              <Button type="submit" className="bg-accent text-accent-foreground font-bold px-8 h-12">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
