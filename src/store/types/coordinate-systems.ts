type Coordinate_Zone = { id: string; name: string };
type Coordinate_Subsystem = {
  id: string;
  name: string;
  zones: Record<string, Coordinate_Zone>;
};
type CoordinateSystem = {
  id: string;
  name: string;
  subsystems: Record<string, Coordinate_Subsystem>;
};

export const coordinateSystems: Record<string, CoordinateSystem> = {
  bgs: {
    id: "bgs",
    name: "БГС 2005",
    subsystems: {
      cad: {
        id: "cad",
        name: "Кадастрална",
        zones: {
          default: {
            id: "default",
            name: "БГС 2005 - кадастрална",
          },
        },
      },
    },
  },
  ks70: {
    id: "ks70",
    name: "КС 1970",
    subsystems: {
      default: {
        id: "default",
        name: "КС 1970",
        zones: {
          k3: {
            id: "k3",
            name: "КС 1970 - K3",
          },
          k5: {
            id: "k5",
            name: "КС 1970 - K5",
          },
          k7: {
            id: "k7",
            name: "КС 1970 - K7",
          },
          k9: {
            id: "k9",
            name: "КС 1970 - K9",
          },
        },
      },
    },
  },
};

export const coordinateSystemsAsArray = Object.values(coordinateSystems).map(
  (system) => ({
    ...system,
    subsystems: Object.values(system.subsystems).map((subsystem) => ({
      ...subsystem,
      zones: Object.values(subsystem.zones),
    })),
  })
);

type HeightSystem = { name: string };

export const heightSystems: Record<string, HeightSystem> = {
  evrs: { name: "EVRS" },
  geo: { name: "Геодезична" },
  balt: { name: "Балтийска" },
};
