import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { LightPill } from '../types';
import { Eye, Edit2 } from 'lucide-react';
import { Button } from './ui/button';
import { JsonEditor } from './JsonEditor';

interface LightPillCardProps {
  pill: LightPill;
}

export function LightPillCard({ pill }: LightPillCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isJsonEditorOpen, setIsJsonEditorOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const metadata = pill.metadata;
  const name = metadata?.name || `Light Pill #${pill.id}`;
  const role = metadata?.attributes?.find(attr => attr.trait_type === 'Role')?.value || '';
  const rarity = metadata?.attributes?.find(attr => attr.trait_type === 'Rarity')?.value || '';
  const aura = metadata?.attributes?.find(attr => attr.trait_type === 'Pill Aura')?.value || '';

  return (
    <>
      <Card 
        className="group relative overflow-hidden border-2 border-green-500/30 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-green-400 hover:bg-card/80 hover:shadow-lg hover:shadow-green-500/30 hover:border-glow cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                <div className="h-8 w-8 animate-pulse rounded-full border-2 border-muted-foreground/30"></div>
              </div>
            )}
            <img
              src={pill.gifPath}
              alt={name}
              className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
              <h3 className="font-gothic text-lg font-bold text-white mb-1 group-hover:neon-glow">{name}</h3>
              {role && (
                <p className="text-xs text-white/80 font-light">{role}</p>
              )}
            </div>
            <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="rounded-full bg-black/50 p-2 backdrop-blur-sm">
                <Eye className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <DialogTitle className="font-serif text-2xl">{name}</DialogTitle>
                <DialogDescription className="text-muted-foreground mt-2">
                  {metadata?.description || 'A mystical Light Pill from the collection'}
                </DialogDescription>
              </div>
              <Button
                onClick={() => setIsJsonEditorOpen(true)}
                variant="outline"
                size="sm"
                className="ml-4 border-border hover:bg-foreground/5"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Metadata
              </Button>
            </div>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
                <img
                  src={pill.gifPath}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {metadata && (
                <>
                  {role && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Role</h4>
                      <p className="font-serif text-lg">{role}</p>
                    </div>
                  )}
                  
                  {rarity && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Rarity</h4>
                      <p className="text-sm">{rarity}</p>
                    </div>
                  )}
                  
                  {aura && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Pill Aura</h4>
                      <p className="text-sm">{aura}</p>
                    </div>
                  )}
                  
                  {metadata.attributes && metadata.attributes.length > 0 && (
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Attributes</h4>
                      <div className="space-y-2">
                        {metadata.attributes
                          .filter(attr => 
                            !['Role', 'Rarity', 'Pill Aura'].includes(attr.trait_type)
                          )
                          .map((attr, idx) => (
                            <div key={idx} className="border-b border-border/30 pb-2 last:border-0">
                              <div className="text-xs text-muted-foreground mb-1">{attr.trait_type}</div>
                              <div className="text-sm">{attr.value}</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <JsonEditor
        isOpen={isJsonEditorOpen}
        onClose={() => setIsJsonEditorOpen(false)}
        pillId={pill.id}
        metadata={metadata}
      />
    </>
  );
}

