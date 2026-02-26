import { useState } from 'react';
import { MapPin, Phone, Mail, MessageCircle, Linkedin } from 'lucide-react';
import AnimateIn from './AnimateIn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBusinessInfo } from '@/hooks/useBusinessInfo';

const Contact = () => {
  const [institution, setInstitution] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [designation, setDesignation] = useState('');
  const [cityState, setCityState] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [studentCount, setStudentCount] = useState('');
  const [programInterest, setProgramInterest] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const { data: business } = useBusinessInfo();
  const whatsappNumber = business.whatsappNumber || '919346832477';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      '*Institutional Partnership Inquiry*',
      '',
      `Institution: ${institution || '—'}`,
      `Contact: ${contactPerson || '—'}`,
      designation ? `Designation: ${designation}` : '',
      `City/State: ${cityState || '—'}`,
      `Email: ${email || '—'}`,
      `Phone: ${phone || '—'}`,
      studentCount ? `Students: ${studentCount}` : '',
      programInterest.length ? `Program interest: ${programInterest.join(', ')}` : '',
      '',
      message ? `Message: ${message}` : '',
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`${whatsappLink}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const toggleProgram = (name: string) => {
    setProgramInterest((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );
  };

  return (
    <section id="contact" className="py-12 md:py-20 bg-background px-3 sm:px-4">
      <div className="container mx-auto max-w-full">
        <AnimateIn animation="fade-up" duration={900} className="text-center mb-16">
          <span className="inline-block bg-primary/10 text-primary font-bold px-4 py-2 rounded-full text-sm mb-4">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
            Partner With <span className="text-gradient-teal">Asli Prep</span>
          </h2>
          <p className="text-foreground/85 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Ready to elevate your institution's academic excellence? Let's discuss how we can work together.
          </p>
        </AnimateIn>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <AnimateIn animation="slide-left" duration={900} className="space-y-8">
          <div className="space-y-8">
            <div className="card-teal rounded-2xl p-8 text-white transition-all duration-300 hover:shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-white">Address</p>
                    <p className="text-white/95">
                      {business.addressLines[0]}<br />
                      {business.addressLines[1]}<br />
                      {business.cityStatePin}
                    </p>
                    <a 
                      href={business.googleMapsUrl}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-sm text-white/95 hover:text-white underline"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-white">Phone</p>
                    <p className="text-white/95">{business.phoneDisplay}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 text-white">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-white">Email</p>
                    <p className="text-white/95">{business.primaryEmail}</p>
                    {business.secondaryEmail && <p className="text-white/95">{business.secondaryEmail}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA - teal-green aligned with brand */}
            <a 
              href={whatsappLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 whatsapp-cta text-white rounded-2xl p-6 transition-all shadow-lg"
            >
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-8 w-8" />
              </div>
              <div>
                <p className="font-bold text-lg">Chat on WhatsApp</p>
                <p className="opacity-95">Quick response guaranteed</p>
              </div>
            </a>

            {/* LinkedIn – redirect link (same pattern as WhatsApp: clear icon + text) */}
            <a 
              href="https://www.linkedin.com/company/asliprep" 
              target="_blank" 
              rel="noopener noreferrer"
              className="linkedin-cta flex items-center gap-4 rounded-2xl p-6 shadow-lg"
            >
              <div className="linkedin-icon-wrap w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                <Linkedin className="h-8 w-8" strokeWidth={2} />
              </div>
              <div>
                <p className="font-bold text-lg text-white">Connect on LinkedIn</p>
                <p className="text-white/95 text-sm">Follow us for updates</p>
              </div>
            </a>
          </div>
          </AnimateIn>

          {/* Contact Form */}
          <AnimateIn animation="slide-right" delay={150} duration={900}>
          <div className="bg-white rounded-2xl shadow-xl border border-border p-4 sm:p-6 lg:p-8 transition-all duration-300 hover:shadow-2xl hover:border-primary/20 w-full max-w-full">
            <h3 className="text-2xl font-bold text-secondary mb-6">Contact Us – Institutional Partnerships</h3>
            
            <form className="space-y-6" onSubmit={handleSubmitInquiry}>
              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Institution Name *</label>
                  <Input placeholder="Your School/Institution Name" className="bg-muted border-border" value={institution} onChange={(e) => setInstitution(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Contact Person *</label>
                  <Input placeholder="Your Full Name" className="bg-muted border-border" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Designation</label>
                  <Input placeholder="Principal / Administrator" className="bg-muted border-border" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">City/State *</label>
                  <Input placeholder="Your City, State" className="bg-muted border-border" value={cityState} onChange={(e) => setCityState(e.target.value)} />
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <Input type="email" placeholder="email@institution.com" className="bg-muted border-border" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                  <Input type="tel" placeholder="+91 9876543210" className="bg-muted border-border" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Number of Students</label>
                <Select value={studentCount} onValueChange={setStudentCount}>
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Select student count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="50-100">50 - 100</SelectItem>
                    <SelectItem value="100-250">100 - 250</SelectItem>
                    <SelectItem value="250-500">250 - 500</SelectItem>
                    <SelectItem value="500-1000">500 - 1,000</SelectItem>
                    <SelectItem value="1000+">1,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Program Interest</label>
                <div className="flex flex-wrap gap-3">
                  {['Alpha', 'Beta', 'Gamma', 'All Programs'].map((program) => (
                    <label key={program} className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-primary"
                        checked={programInterest.includes(program)}
                        onChange={() => toggleProgram(program)}
                      />
                      <span className="text-sm font-medium">{program}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <Textarea 
                  placeholder="Tell us about your institution and requirements..." 
                  rows={4}
                  className="bg-muted border-border"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <Button type="submit" className="btn-lift w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg transition-all duration-300">
                <MessageCircle className="mr-2 h-5 w-5" />
                Submit Inquiry (Opens WhatsApp)
              </Button>
            </form>
          </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};

export default Contact;
