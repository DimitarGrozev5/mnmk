import clsx from "clsx";
import TabPanel, { TabPanelRenderElement } from "./tab-panel";

type Props = {
  value: number;
  children:
    | React.ReactElement<typeof TabPanel>
    | React.ReactElement<typeof TabPanel>[];
};

const TabPanels: React.FC<Props> = ({ value, children }) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const tabPanels = childrenArray.map((tabPanel, index) => (
    <TabPanelRenderElement index={index} value={value} tabPanel={tabPanel} />
  ));

  return (
    <div
      className={clsx(
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