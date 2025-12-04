import { useState, useEffect } from 'react';
import { LightPill } from '../types';

export function useLightPills() {
  const [pills, setPills] = useState<LightPill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPills = async () => {
      const pillPromises: Promise<LightPill>[] = [];
      
      for (let i = 1; i <= 29; i++) {
        const pillPromise = (async () => {
          const gifPath = `/gifslightpillbatch1/${i}.gif`;
          let metadata = null;
          
          try {
            const metadataPath = `/jsonmatadta/${String(i).padStart(2, '0')}.json`;
            const response = await fetch(metadataPath);
            if (response.ok) {
              metadata = await response.json();
            }
          } catch (error) {
            console.warn(`Failed to load metadata for pill ${i}:`, error);
          }
          
          return {
            id: i,
            gifPath,
            metadata,
          };
        })();
        
        pillPromises.push(pillPromise);
      }
      
      const loadedPills = await Promise.all(pillPromises);
      setPills(loadedPills);
      setLoading(false);
    };

    loadPills();
  }, []);

  return { pills, loading };
}

