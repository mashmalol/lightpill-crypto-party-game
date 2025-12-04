export interface LightPillMetadata {
  name: string;
  description: string;
  image: string;
  background_color: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  properties: {
    category: string;
    files: Array<{
      uri: string;
      type: string;
    }>;
    creators: Array<{
      address: string;
      share: number;
    }>;
    ai_prompt: string;
  };
}

export interface LightPill {
  id: number;
  gifPath: string;
  metadata: LightPillMetadata | null;
}

