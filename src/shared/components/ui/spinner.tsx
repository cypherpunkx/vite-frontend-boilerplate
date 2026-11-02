import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

export function Spinner({ className, size = 'md', label }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center gap-2 text-slate-600">
      <Loader2 className={cn('animate-spin text-blue-600', sizeMap[size], className)} />
      {label && <span className="text-sm text-slate-500 font-medium">{label}</span>}
    </div>
  );
}

export function PageLoader({ label = 'Memuat halaman...' }: { label?: string }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <Spinner size="lg" label={label} />
    </div>
  );
}
