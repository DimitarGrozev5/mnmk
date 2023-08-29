export type ZonesAndTransformers = {
  zones: Record<string, Zone>;
  zoneIds: string[];
  assets: Record<AssetId, Asset>;
  transformers: Record<TransformerId, Transformer>;
};

/**
 * Zone types
 */
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

/**
 * Elements types
 */
export type Element = {
  title: string;
  rect: ElementRect | undefined;
};

export type ElementRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/**
 * Asset types
 */
export type Asset = {
  id: AssetId;
  type: AssetType;
} & Element;

export type AssetId = string;
export type AssetType = "test";

/**
 * Transformer types
 */
export type Transformer = {
  id: TransformerId;
  sourcesIds: AssetId[];
  result: AssetId;
  type: TransformerType;
} & Element;
export type TransformerId = string;
export type TransformerType = "test";

// Additional types
export type IdRefs = Record<string, DOMRect>;

export type SelectedIds = {
  assets: string[];
  trans: string[];
};
