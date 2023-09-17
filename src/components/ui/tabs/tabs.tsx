import React from "react";
import Tab, { TabRenderElement } from "./tab";
import { tw } from "../../../util/tw";

type Props = {
  value: number;
  onChange: (value: number) => void;
  children:
    | React.ReactComponentElement<typeof Tab>
    | React.ReactComponentElement<typeof Tab>[];
  numbered?: boolean;
};

const Tabs: React.FC<Props> = ({
  value,
  onChange,
  children,
  numbered = false,
}) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const tabs = childrenArray.map((tab, index) => (
    <TabRenderElement
      key={index}
      index={index}
      value={value}
      onChange={onChange}
      tabLabel={tab}
      numbered={numbered}
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
