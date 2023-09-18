import React, { useCallback, useMemo, useState } from "react";
import { tw } from "../../../util/tw";
import Tab, { TabRenderElement } from "./tab";
import TabPanel from "./tab-panel";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import TabPanels from "./tab-panels";
import Button from "../button/button";

type Props = {
  tabs: React.ReactComponentElement<typeof Tab>[];
  children:
    | React.ReactComponentElement<typeof TabPanel>
    | React.ReactComponentElement<typeof TabPanel>[];
};

const Wizard: React.FC<Props> = ({ tabs, children }) => {
  const [panelIndex, setPanelIndex] = useState(0);

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
        completed={false}
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
  }, [panelIndex, tabs]);

  const prevStepHandler = useCallback(() => {
    if (panelIndex > 0) {
      setPanelIndex(panelIndex - 1);
    }
  }, [panelIndex]);

  const nextStepHandler = useCallback(() => {
    if (!tabs[panelIndex].props.completed) {
      return;
    }
    if (panelIndex + 1 < tabs.length) {
      setPanelIndex(panelIndex + 1);
    }
  }, [panelIndex, tabs]);

  return (
    <div className={tw("flex flex-col items-stretch gap-2")}>
      <div
        className={tw(
          "flex flex-row justify-center items-center gap-2 flex-wrap"
        )}
      >
        {tabsComponents}
      </div>

      <TabPanels value={panelIndex}>{children}</TabPanels>

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
          disabled={panelIndex === tabs.length - 1}
          onClick={nextStepHandler}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Wizard;
