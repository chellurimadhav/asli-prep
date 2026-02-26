import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';

interface AnimateInProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
}

const animationClasses: Record<AnimationType, { base: string; visible: string }> = {
  'fade-up': {
    base: 'opacity-0 translate-y-8 transition-all',
    visible: 'opacity-100 translate-y-0',
  },
  'fade-in': {
    base: 'opacity-0 scale-[0.98] transition-all',
    visible: 'opacity-100 scale-100',
  },
  'slide-left': {
    base: 'opacity-0 -translate-x-8 transition-all',
    visible: 'opacity-100 translate-x-0',
  },
  'slide-right': {
    base: 'opacity-0 translate-x-8 transition-all',
    visible: 'opacity-100 translate-x-0',
  },
  scale: {
    base: 'opacity-0 scale-[0.96] transition-all',
    visible: 'opacity-100 scale-100',
  },
};

export default function AnimateIn({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(() => setIsVisible(true), delay);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const anim = animationClasses[animation];

  return (
    <div
      ref={ref}
      className={cn(anim.base, isVisible && anim.visible, className)}
      style={{ transitionDuration: `${duration}ms`, transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {children}
    </div>
  );
}
