import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close mobile menu on scroll
  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = () => setIsOpen(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const mainLinks = [
    { label: 'Home', href: '/' },
    { label: 'Programs', href: '/#programs' },
    { label: 'Why Us', href: '/#about' },
    { label: 'About', href: '/about' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/#contact' },
  ];

  const moreLinks = [
    { label: 'For Schools', href: '/for-schools' },
    { label: 'Meet VIDYA', href: '/meet-vidya' },
    { label: 'Testimonials', href: '/#testimonials' },
  ];

  const linkClass = "nav-link-hover text-foreground/80 hover:text-primary font-medium text-sm transition-colors duration-300 py-2";

  // On mobile: close menu and ensure hash links scroll to section (works when already on home or after nav)
  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault();
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        requestAnimationFrame(() => {
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
        });
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isOpen ? 'bg-white shadow-md' : 'bg-white/98 backdrop-blur-lg'}`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <a href="/" className="flex items-center shrink-0 transition-opacity duration-300 hover:opacity-90">
            <img src="/images/asliprepfound.png" alt="ASLI Prep Foundation" className="h-10 md:h-12 w-auto" />
          </a>

          {/* Desktop Navigation - compact layout */}
          <div className="hidden lg:flex items-center gap-6">
            {mainLinks.map((link) => (
              <a key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </a>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger className={`${linkClass} flex items-center gap-1 outline-none`}>
                More <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.label} asChild>
                    <a href={link.href} className="cursor-pointer">
                      {link.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="https://www.aslilearn.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-semibold text-sm transition-colors"
            >
              Meet VIDYA
            </a>
            <a href="/#contact">
              <Button size="sm" className="btn-lift bg-primary hover:bg-primary/90 text-white font-semibold h-9 px-5 rounded-lg">
                Partner With Us
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 -mr-2 rounded-lg text-foreground hover:bg-muted/80 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation - slide down, solid background (no transparency) */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="py-4 space-y-1 bg-white border-t border-border">
            {mainLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`block ${linkClass} px-2 py-2.5 rounded-lg hover:bg-muted/60`}
                onClick={(e) => handleMobileNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            {moreLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`block ${linkClass} px-2 py-2.5 rounded-lg hover:bg-muted/60`}
                onClick={(e) => handleMobileNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://www.aslilearn.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-primary font-semibold px-2 py-2.5 rounded-lg hover:bg-primary/5"
              onClick={() => setIsOpen(false)}
            >
              Meet VIDYA →
            </a>
            <a href="/#contact" onClick={(e) => handleMobileNavClick(e, '/#contact')} className="block pt-2">
              <Button className="btn-lift w-full bg-primary hover:bg-primary/90 text-white font-semibold h-10 rounded-lg">
                Partner With Us
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
