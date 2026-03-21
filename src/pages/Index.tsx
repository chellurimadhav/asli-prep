import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { SeoHead } from '@/components/SeoHead';
import { seoContact, seoHome } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Programs from '@/components/Programs';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Downloadables from '@/components/Downloadables';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

/** URL hash for / and /#contact — syncs React Router + plain `<a href="/#contact">` clicks */
function useUrlHash() {
  const location = useLocation();
  const [hash, setHash] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash : ''
  );

  useEffect(() => {
    setHash(window.location.hash);
  }, [location.pathname, location.search, location.hash, location.key]);

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return hash;
}

const Index = () => {
  const hash = useUrlHash();
  const isContactSection = hash === '#contact';
  const seo = isContactSection ? seoContact : seoHome;

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
      <SeoHead {...seo} key={isContactSection ? 'contact' : 'home'} />
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
