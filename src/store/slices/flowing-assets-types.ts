import {
  CoordinateSystemCode,
  HeightSystemCode,
} from "../types/coordinate-systems";

export type ZonesAndTransformers = {
  zones: Record<string, Zone>;
  zoneIds: string[];
  assets: ElementRecord<Asset>;
  transformers: ElementRecord<Transformer>;

  hoveredElementId: ElementId | null;
  connectedToHoveredIds: ElementId[];

  dragging: boolean;
};

/**
 * Zone types
 */
export type Zone = {
  id: ZoneId;
  name: string;
  elementsIds: string[];
  type: ZoneType;
  dx: number;
  dy: number;
  itemsPerRow: number;
};
export type ZoneId = string;
export type ZoneType = "assets" | "transformers";

/**
 * Elements types
 */
export type Element = {
  id: ElementId;
  rect: ElementRect | undefined;
};

export type ElementId = string;
export type ElementRect = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

export type ElementRecord<T extends Asset | Transformer> = Record<ElementId, T>;

/**
 * Asset types
 */
export type Asset = {
  [K in keyof AssetType]: {
    type: K;
    data: AssetType[K];
  } & Element;
}[keyof AssetType];

// export type Asset = {
//   type: AssetType;
// } & Element;

export type AssetType = {
  test: "test";
  add_new: "add_new";
  txt_file: { fileName: string };
  csv_file: { fileName: string };
  control_points_data: {
    pointName: string;

    northing: number;
    nortingStDev: number;

    easting: number;
    eastingStDev: number;

    height: number;
    heightStDev: number;

    coordinateSystem: CoordinateSystemCode;
    heightSystem: HeightSystemCode;
  };
  gps_measurment_data: {
    pointName: string;

    northing: number;
    nortingStDev: number;

    easting: number;
    eastingStDev: number;

    height: number;
    heightStDev: number;

    PDOP: number | null;
    VDOP: number | null;

    coordinateSystem: CoordinateSystemCode;
    heightSystem: HeightSystemCode;

    stationHeight: number;

    code: string;
  };

  ts_measurement_data: {
    stationsArray: string[];
    stations: Record<
      string,
      {
        id: string;
        stationName: string;
        stationHeight: number;

        measurementsArray: string[];
        measurements: Record<
          string,
          {
            id: string;
            observedName: string;
            observedSignalHeight: number;
            horizontalAngle: number;
            zenithAngle: number;
            slantDistance: number;
            horizontalDistance: number;
            code: string;
          }
        >;
      }
    >;
  };
};

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
