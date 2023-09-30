import { useEffect, useState } from "react";
import { tw } from "../../../util/tw";

type TabPanelProps = {
  children: React.ReactNode;
};

const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return children;
};

type RenderElementProps = {
  index: number;
  value: number;
  tabPanel: React.ReactComponentElement<typeof TabPanel>;
};

export const TabPanelRenderElement: React.FC<RenderElementProps> = ({
  index,
  value,
  tabPanel,
}) => {
  const [selectedPanelIndex, setSelectedPanelIndex] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedPanelIndex(value);
    }, 10);

    () => clearTimeout(timer);
  }, [value]);

  return (
    <div
      className={tw(
        "flex flex-col items-center gap-2",
        "transition-all duration-500 ease-out",
        "absolute inset-0 opacity-0",
        value > index && "-translate-x-full",
        value < index && "translate-x-full",
        value === index && "relative",
        selectedPanelIndex === index && "translate-x-0 opacity-100"
      )}
    >
      {tabPanel}
    </div>
  );
};

export default TabPanel;
