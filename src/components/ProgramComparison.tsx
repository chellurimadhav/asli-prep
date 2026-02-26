import { useState } from 'react';
import { Star, Rocket, Trophy } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Brain } from 'lucide-react';
import { useBusinessInfo } from '@/hooks/useBusinessInfo';

const comparisonData = [
  { feature: 'Target Grades', alpha: 'V to X', beta: 'VIII to X', gamma: 'VI to X' },
  { feature: 'Curriculum Alignment', alpha: 'CBSE/State Board', beta: 'IIT-JEE & NEET', gamma: 'IMO, NSO, NCO, IEO' },
  { feature: 'Focus', alpha: 'Fundamental Concepts', beta: 'Competitive Exam Prep', gamma: 'Olympiad Excellence' },
  { feature: 'Subjects', alpha: 'Math, Physics, Chemistry, Biology', beta: '+ Logical Reasoning', gamma: 'Math, Physics, Chemistry, Biology' },
  { feature: 'Difficulty Level', alpha: 'Board-aligned', beta: 'Advanced', gamma: 'Olympiad-level' },
  { feature: 'Best For', alpha: 'Building foundations', beta: 'JEE/NEET aspirants', gamma: 'Top achievers' },
];

export default function ProgramComparison() {
  const [open, setOpen] = useState(false);
  const { data: business } = useBusinessInfo();
  const whatsappNumber = business.whatsappNumber || '919346832477';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="mt-16 text-center cursor-pointer">
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border border-border">
            <Brain className="h-12 w-12 text-primary" />
            <div className="text-left">
              <p className="font-bold text-secondary text-lg">Not sure which program is right?</p>
              <p className="text-muted-foreground">Compare Alpha, Beta & Gamma side by side</p>
            </div>
            <Button className="bg-primary text-white font-bold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shrink-0">
              Compare Programs
            </Button>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">Program Comparison: Alpha vs Beta vs Gamma</DialogTitle>
        </DialogHeader>
        <div className="rounded-xl border border-border overflow-hidden bg-card">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/70">
                <TableHead className="font-bold w-[180px] text-foreground">Feature</TableHead>
                <TableHead className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Star className="h-5 w-5 text-primary" />
                    <span className="font-bold text-primary">ALPHA</span>
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Rocket className="h-5 w-5 text-secondary" />
                    <span className="font-bold text-secondary">BETA</span>
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Trophy className="h-5 w-5 text-accent" />
                    <span className="font-bold text-accent">GAMMA</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonData.map((row, i) => (
                <TableRow key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                  <TableCell className="font-semibold text-foreground">{row.feature}</TableCell>
                  <TableCell className="text-center text-foreground/90 font-medium">{row.alpha}</TableCell>
                  <TableCell className="text-center text-foreground/90 font-medium">{row.beta}</TableCell>
                  <TableCell className="text-center text-foreground/90 font-medium">{row.gamma}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button asChild>
            <a href="/#contact" onClick={() => setOpen(false)}>Schedule Partnership Meeting</a>
          </Button>
          <Button variant="outline" asChild>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
