import React from "react";
import { HtmlElement } from "../../../../dumpComponents/elements";

export function SideBar(props) {
  return (
    <div className="flex h-full">
      <div
        style={props.prevWid}
        className="flex-shrink-0 w-40 h-full shadow-md relative z-10"
      >
        <div className="flex-grow p-0 border-r border-gray-200 shadow-md">
          <HtmlElement />
        </div>
      </div>
    </div>
  );
}
