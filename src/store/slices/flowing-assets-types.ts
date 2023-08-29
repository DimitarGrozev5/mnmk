export type ZonesAndTransformers = {
  zones: Record<string, Zone>;
  zoneIds: string[];
  assets: Record<AssetId, Asset>;
  transformers: Record<TransformerId, Transformer>;
};

export type Zone = {
  id: string;
  name: string;
  elementsIds: string[];
  type: ZoneType;
};
export type ZoneType = "assets" | "transformers";
export const ZoneType = {
  Assets: "assets" as ZoneType,
  Transformers: "transformers" as ZoneType,
};

export type Asset = {
  id: AssetId;
  type: AssetType;
  title: string;
};

export type AssetId = string;
export type AssetType = "test";

export type Transformer = {
  id: TransformerId;
  sourcesIds: AssetId[];
  result: AssetId;
  type: TransformerType;
  title: string;
};
export type TransformerId = string;
export type TransformerType = "test";

// Additional types
export type IdRefs = Record<string, DOMRect>;

export type SelectedIds = {
  assets: string[];
  trans: string[];
};
