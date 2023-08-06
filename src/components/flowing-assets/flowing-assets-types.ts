export type ZonesAndTransformers = {
  zones: Zone[];
  transformers: Transformer[];
};

export type Zone = {
  id: string;
  name: string;
  assets: Asset[];
};

export type Asset = {
  id: string;
  component: React.ReactNode;
};

export type Transformer = {
  id: string;
  sources: Asset[];
  result: Asset;
  component: React.ReactNode;
};
