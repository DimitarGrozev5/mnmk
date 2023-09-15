import React from "react";
import clsx from "clsx";
import Tab, { TabRenderElement } from "./tab";

type Props = {
  value: number;
  onChange: (value: number) => void;
  children: React.ReactElement<typeof Tab> | React.ReactElement<typeof Tab>[];
};

const Tabs: React.FC<Props> = ({ value, onChange, children }) => {
  console.log("rerender");

  const childrenArray = Array.isArray(children) ? children : [children];
  const tabs = childrenArray.map((tab, index) => (
    <TabRenderElement
      index={index}
      value={value}
      onChange={onChange}
      tabLabel={tab}
    />
  ));

  return (
    <div
      className={clsx(
        "flex flex-row gap-2 items-center justify-center",
        "self-center"
      )}
    >
      {tabs}
    </div>
  );
};

export default Tabs;
