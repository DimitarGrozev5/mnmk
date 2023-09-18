import React, {   useMemo,  } from "react";
import Tab, { TabRenderElement } from "./tab";
import { tw } from "../../../util/tw";

type Props = {
  value: number;
  onChange: (value: number) => void;
  children:
    | React.ReactComponentElement<typeof Tab>
    | React.ReactComponentElement<typeof Tab>[];
};

const Tabs: React.FC<Props> = ({ value, onChange, children }) => {
  const childrenArray = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );

  const tabs = childrenArray.map((tab, index) => (
    <TabRenderElement
      key={index}
      index={index}
      value={value}
      onChange={onChange}
      tabLabel={tab}
      numbered={false}
      trackCompleted={false}
      completed={false}
    />
  ));

  return (
    <div
      className={tw(
        "flex flex-row gap-2 items-center justify-center",
        "self-center"
      )}
    >
      {tabs}
    </div>
  );
};

export default Tabs;
