type ArrayAndAbject<T> = {
  asArray: (keyof T)[];
  asObject: T;
};

type Coordinate_Zone = { id: string; name: string };
type Coordinate_Subsystem = {
  id: string;
  name: string;
  zones: ArrayAndAbject<Record<string, Coordinate_Zone>>;
};
type CoordinateSystem = {
  id: string;
  name: string;
  subsystems: ArrayAndAbject<Record<string, Coordinate_Subsystem>>;
};

export const coordinateSystems: ArrayAndAbject<
  Record<string, CoordinateSystem>
> = {
  asArray: ["bgs", "ks70"],
  asObject: {
    bgs: {
      id: "bgs",
      name: "БГС 2005",
      subsystems: {
        asArray: ["cad", "utm"],
        asObject: {
          cad: {
            id: "cad",
            name: "Кадастрална",
            zones: {
              asArray: ["default"],
              asObject: {
                default: {
                  id: "default",
                  name: "Кадастрална",
                },
              },
            },
          },
          utm: {
            id: "utm",
            name: "UTM",
            zones: {
              asArray: ["utm34", "utm35"],
              asObject: {
                utm34: {
                  id: "utm34",
                  name: "UTM34",
                },
                utm35: {
                  id: "utm35",
                  name: "UTM35",
                },
              },
            },
          },
        },
      },
    },
    ks70: {
      id: "ks70",
      name: "КС 1970",
      subsystems: {
        asArray: ["default"],
        asObject: {
          default: {
            id: "default",
            name: "КС 1970",
            zones: {
              asArray: ["k3", "k5", "k7", "k9"],
              asObject: {
                k3: {
                  id: "k3",
                  name: "K3",
                },
                k5: {
                  id: "k5",
                  name: "K5",
                },
                k7: {
                  id: "k7",
                  name: "K7",
                },
                k9: {
                  id: "k9",
                  name: "K9",
                },
              },
            },
          },
        },
      },
    },
  },
};

export const getCS = (cs: string) => coordinateSystems.asObject[cs];
export const getCSS = (cs: string, subsystem: string) =>
  coordinateSystems.asObject[cs].subsystems.asObject[subsystem];
export const getCSZone = (cs: string, subsystem: string, zone: string) =>
  coordinateSystems.asObject[cs].subsystems.asObject[subsystem].zones.asObject[
    zone
  ];

export type CoordinateSystemCode = [string, string, string];

type HeightSystem = { name: string };

export const heightSystems: Record<string, HeightSystem> = {
  evrs: { name: "EVRS" },
  geo: { name: "Геодезична" },
  balt: { name: "Балтийска" },
};

export type HeightSystemCode = string;
