import { useLightPills } from '../hooks/useLightPills';
import { LightPillCard } from './LightPillCard';

export function Gallery() {
  const { pills, loading } = useLightPills();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 mx-auto border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin"></div>
          <p className="text-muted-foreground font-light">Loading mystical Light Pills...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-light tracking-wide text-foreground">
            Light Pill Gallery
          </h1>
          <p className="text-muted-foreground font-light text-sm uppercase tracking-widest">
            A Collection of 29 Mystical Experiences
          </p>
          <div className="w-24 h-px bg-border mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {pills.map((pill) => (
            <LightPillCard key={pill.id} pill={pill} />
          ))}
        </div>
      </div>
    </div>
  );
}

