import { tw } from "../../../util/tw";
import TabPanel, { TabPanelRenderElement } from "./tab-panel";

export type AccessFunctionProps = {
  index: number;
  setCompleted: (completed: boolean) => void;
  invalidatePanel: (index: number) => void;
};

type Props = { value: number } & (
  | CoponentChildrenProps
  | FunctionChildrenProps
);

type CoponentChildrenProps = {
  setCompleted?: never;
  invalidatePanel?: never;
  children:
    | React.ReactComponentElement<typeof TabPanel>
    | React.ReactComponentElement<typeof TabPanel>[];
};

type FunctionChildrenProps = {
  setCompleted: (index: number) => (completed: boolean) => void;
  invalidatePanel: (index: number) => void;
  children:
    | ((
        props: AccessFunctionProps
      ) => React.ReactComponentElement<typeof TabPanel>)
    | ((
        props: AccessFunctionProps
      ) => React.ReactComponentElement<typeof TabPanel>)[];
};

const TabPanels: React.FC<Props> = ({
  value,
  children,
  setCompleted,
  invalidatePanel,
}) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const tabPanels = childrenArray.map((tabPanel, index) => {
    const panel = (() => {
      if (typeof tabPanel === "function" && setCompleted) {
        return tabPanel({
          index,
          setCompleted: setCompleted(index),
          invalidatePanel,
        });
      }

      return tabPanel as React.ReactComponentElement<typeof TabPanel>;
    })();

    return (
      <TabPanelRenderElement
        key={index}
        index={index}
        value={value}
        tabPanel={panel.props.children}
      />
    );
  });

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
