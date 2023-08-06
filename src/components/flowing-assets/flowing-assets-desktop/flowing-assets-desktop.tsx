import { Zones } from "../flowing-assets-types";

type Props = {
  zones: Zones;
};

const FlowingAssets_Desktop: React.FC<Props> = ({ zones }) => {
  return zones.map((zone) => <h1 key={zone.id}>{zone.name}</h1>);
};

export default FlowingAssets_Desktop;
