export type ZonesAndTransformers = {
  zones: Record<string, Zone>;
  zoneIds: string[];
  assets: Record<ElementId, Asset>;
  transformers: Record<ElementId, Transformer>;
  hoveredElementId: string | null;
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

/**
 * Elements types
 */
export type Element = {
  id: ElementId;
  title: string;
  rect: ElementRect | undefined;
};

export type ElementId = string;
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
  type: AssetType;
} & Element;

export type AssetType = "test";

/**
 * Transformer types
 */
export type Transformer = {
  sourcesIds: ElementId[];
  result: ElementId;
  type: TransformerType;
} & Element;
export type TransformerType = "test";

// Additional types
export type IdRefs = Record<string, DOMRect>;

export type SelectedIds = {
  assets: string[];
  trans: string[];
};
