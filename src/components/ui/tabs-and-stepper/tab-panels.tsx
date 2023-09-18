import { tw } from "../../../util/tw";
import TabPanel, { TabPanelRenderElement } from "./tab-panel";

type Props = {
  value: number;
  children:
    | React.ReactComponentElement<typeof TabPanel>
    | React.ReactComponentElement<typeof TabPanel>[];
};

const TabPanels: React.FC<Props> = ({ value, children }) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const tabPanels = childrenArray.map((tabPanel, index) => (
    <TabPanelRenderElement
      key={index}
      index={index}
      value={value}
      tabPanel={tabPanel}
    />
  ));

  return (
    <div
      className={tw(
        "flex flex-col items-stretch",
        "relative",
        "transition-all duration-100, overflow-hidden"
      )}
    >
      {tabPanels}
    </div>
  );
};

export default TabPanels;
