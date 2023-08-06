import FlowingAssets_Desktop from "./components/flowing-assets/flowing-assets-desktop/flowing-assets-desktop";
import { mockZones } from "./components/flowing-assets/mock-zones";

function App() {
  return (
    <>
      <div className="flex flex-col w-full items-stretch p-10">
        <FlowingAssets_Desktop zones={mockZones} />
      </div>
    </>
  );
}

export default App;
