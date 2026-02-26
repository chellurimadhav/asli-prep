import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Programs from '@/components/Programs';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Downloadables from '@/components/Downloadables';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const { hash } = useLocation();

  // Scroll to section when hash is present (fixes Contact/Testimonials etc. on phone and when navigating from other pages)
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div className="min-h-screen w-full min-w-0 bg-background">
      <Navbar />
      <Hero />
      <Programs />
      <WhyChooseUs />
      <Testimonials />
      <Downloadables />
      <Newsletter />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
