export type Zones = Zone[];

export type Zone = {
  id: string;
  name: string;
  assets: Asset[];
};

export type Asset = {
  id: string;
  component: React.ReactNode;
};
