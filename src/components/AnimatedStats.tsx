import { useRef, useEffect, useState } from 'react';
import { Building2, TrendingUp, CalendarDays, Trophy, GraduationCap, Video } from 'lucide-react';

const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

function useCountUp(end: number, duration: number, startOnView = true) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(!startOnView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutQuart(progress);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, startOnView, hasAnimated]);

  return { count, ref };
}

const iconClass = 'w-10 h-10 md:w-12 md:h-12 mx-auto';

const StatCard = ({ 
  number, 
  suffix = '', 
  label, 
  icon, 
  duration = 2000,
  variant = 'light'
}: { 
  number: number; 
  suffix?: string; 
  label: string; 
  icon: React.ReactNode; 
  duration?: number;
  variant?: 'dark' | 'light';
}) => {
  const { count, ref } = useCountUp(number, duration);

  if (variant === 'dark') {
    return (
      <div ref={ref} className="text-center p-4 sm:p-5 md:p-8 bg-white/15 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300 group min-w-0 overflow-hidden">
        <div className="mb-3 flex justify-center [&_svg]:text-white/90 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:scale-110">{icon}</div>
        <div className="text-2xl md:text-4xl font-bold text-accent tabular-nums">{count}{suffix}</div>
        <div className="text-sm md:text-base text-white/80 font-medium mt-1">{label}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className="text-center p-4 sm:p-5 md:p-8 bg-white rounded-xl sm:rounded-2xl shadow-lg border border-border hover:shadow-xl transition-all duration-300 group min-w-0 overflow-hidden">
      <div className="mb-3 flex justify-center text-primary [&_svg]:text-primary [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:scale-105">{icon}</div>
      <div className="text-xl sm:text-2xl md:text-4xl font-bold text-primary tabular-nums truncate">{count}{suffix}</div>
      <div className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium mt-1 line-clamp-2">{label}</div>
    </div>
  );
};

const heroStats = [
  { number: 500, suffix: '+', label: 'Partner Schools', icon: <Building2 className={iconClass} strokeWidth={1.75} /> },
  { number: 95, suffix: '%', label: 'Success Rate', icon: <TrendingUp className={iconClass} strokeWidth={1.75} />, duration: 1500 },
  { number: 5, suffix: '+', label: 'Years of Experience', icon: <CalendarDays className={iconClass} strokeWidth={1.75} />, duration: 1200 },
  { number: 50, suffix: '+', label: 'Awards Won', icon: <Trophy className={iconClass} strokeWidth={1.75} /> },
];

const defaultStats = [
  { number: 10000, suffix: '+', label: 'Active Students', icon: <GraduationCap className={iconClass} strokeWidth={1.75} />, duration: 2500 },
  { number: 500, suffix: '+', label: 'Video Lectures', icon: <Video className={iconClass} strokeWidth={1.75} /> },
  { number: 50, suffix: '+', label: 'Partner Schools', icon: <Building2 className={iconClass} strokeWidth={1.75} /> },
  { number: 95, suffix: '%', label: 'Success Rate', icon: <TrendingUp className={iconClass} strokeWidth={1.75} />, duration: 1500 },
];

export default function AnimatedStats({ variant = 'light', preset = 'default' }: { variant?: 'dark' | 'light'; preset?: 'hero' | 'default' }) {
  const stats = preset === 'hero' ? heroStats : defaultStats;
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 min-w-0">
      {stats.map((s, i) => (
        <StatCard key={i} number={s.number} suffix={s.suffix} label={s.label} icon={s.icon} duration={s.duration ?? 2000} variant={variant} />
      ))}
    </div>
  );
}
