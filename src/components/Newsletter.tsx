import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimateIn from './AnimateIn';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(json.error || 'Failed to subscribe');
        setStatus('error');
        return;
      }
      setStatus('success');
      setEmail('');
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section className="py-16 section-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="container mx-auto relative z-10">
        <AnimateIn animation="scale" duration={1000} className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center">
              <Mail className="h-7 w-7 text-accent" />
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Stay Updated
          </h2>
          <p className="text-white/70 mb-8">
            Newsletter signup for updates. Latest exam updates and news, parenting tips for competitive exam prep.
          </p>

          {status === 'success' ? (
            <div className="flex items-center justify-center gap-2 text-accent font-semibold">
              <CheckCircle className="h-5 w-5" />
              Subscribed successfully! Thank you.
            </div>
          ) : (
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={handleSubmit}>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
              />
              <Button
                type="submit"
                disabled={status === 'loading'}
                className="bg-accent text-accent-foreground font-bold px-8 h-12 shrink-0 transition-all duration-300 hover:scale-105 hover:brightness-110"
              >
                {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
              </Button>
            </form>
          )}

          {status === 'error' && (
            <p className="text-red-400 text-sm mt-3">{errorMsg}</p>
          )}
        </AnimateIn>
      </div>
    </section>
  );
};

export default Newsletter;
