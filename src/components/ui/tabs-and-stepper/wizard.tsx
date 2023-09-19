import React, { useCallback, useMemo, useState } from "react";
import { tw } from "../../../util/tw";
import Tab, { TabRenderElement } from "./tab";
import TabPanel from "./tab-panel";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import TabPanels, { AccessFunctionProps } from "./tab-panels";
import Button from "../button/button";
import { produce } from "immer";

type Props = {
  tabs: React.ReactComponentElement<typeof Tab>[];
  children:
    | ((
        props: AccessFunctionProps
      ) => React.ReactComponentElement<typeof TabPanel>)
    | ((
        props: AccessFunctionProps
      ) => React.ReactComponentElement<typeof TabPanel>)[];
};

const Wizard: React.FC<Props> = ({ tabs, children }) => {
  const [panelIndex, setPanelIndex] = useState(0);
  const [completed, setCompleted] = useState(
    tabs.map((tab) => !!tab.props.completed)
  );

  const setCompletedHandler = useCallback(
    (index: number) => (completed: boolean) =>
      setCompleted(
        produce((draft) => {
          draft[index] = completed;
        })
      ),
    []
  );

  const invalidatePanel = useCallback(
    (index: number) =>
      setCompleted(
        produce((draft) => {
          draft[index] = false;
        })
      ),
    []
  );

  const ch = Array.isArray(children) ? children : [children];
  if (ch.length !== tabs.length)
    console.warn("Tabs and children must be the same length");

  const tabsComponents = useMemo(() => {
    const t = tabs.map((tab, index) => (
      <TabRenderElement
        key={index}
        index={index}
        value={panelIndex}
        onChange={setPanelIndex}
        tabLabel={tab.props.label}
        numbered={true}
        trackCompleted={true}
        completed={completed[index]}
        disableClick
      />
    ));

    return [
      t[0],
      ...t.slice(1).map((tab, index) => (
        <React.Fragment key={index + 1}>
          <ChevronDoubleRightIcon className={tw("h-6 w-6", "text-slate-500")} />
          {tab}
        </React.Fragment>
      )),
    ];
  }, [completed, panelIndex, tabs]);

  const prevStepHandler = useCallback(() => {
    if (panelIndex > 0) {
      setPanelIndex(panelIndex - 1);
    }
  }, [panelIndex]);

  const nextStepHandler = useCallback(() => {
    if (!completed[panelIndex]) {
      return;
    }
    if (panelIndex + 1 < tabs.length) {
      setPanelIndex(panelIndex + 1);
    }
  }, [completed, panelIndex, tabs.length]);

  return (
    <div className={tw("flex flex-col items-stretch gap-2")}>
      <div
        className={tw(
          "flex flex-row justify-center items-center gap-2 flex-wrap"
        )}
      >
        {tabsComponents}
      </div>

      <TabPanels
        value={panelIndex}
        setCompleted={setCompletedHandler}
        invalidatePanel={invalidatePanel}
      >
        {children}
      </TabPanels>

      <div className={tw("flex flex-row justify-between items-center")}>
        <Button
          variant="contained"
          disabled={panelIndex === 0}
          onClick={prevStepHandler}
        >
          Back
        </Button>
        <Button
          variant="contained"
          disabled={panelIndex === tabs.length - 1 || !completed[panelIndex]}
          onClick={nextStepHandler}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Wizard;
