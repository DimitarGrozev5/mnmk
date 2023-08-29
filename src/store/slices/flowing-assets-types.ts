export type ZonesAndTransformers = {
  zones: Zone[];
  assets: Record<AssetId, Asset>;
  transformers: Record<TransformerId, Transformer>;
};

export type Zone = {
  id: string;
  name: string;
  elementsIds: string[];
  type: "assets" | "transformers";
};

export type Asset = {
  id: AssetId;
  type: AssetType;
};

export type AssetId = string;
export type AssetType = "test";

export type Transformer = {
  id: TransformerId;
  sourcesIds: AssetId[];
  result: AssetId;
  type: TransformerType;
};
export type TransformerId = string;
export type TransformerType = "test";

// Additional types
export type IdRefs = Record<string, DOMRect>;

export type SelectedIds = {
  assets: string[];
  trans: string[];
};
