import {  useContext, useRef, useState } from "react";

import { SideBar } from "./components";

export function DesignPage() {

  const resizer = useRef({ currentWidth: "300px", isDragStarted: false });

  const [sideWid, setSideWid] = useState({ width: "300px" });
  const [prevWid, prevContWid] = useState({ width: "240px" });

  const updateSettingsWidth = (e) => {
    if (e.pageX > 239 && e.pageX < window.innerWidth * 0.4) {
      setSideWid({ width: e.pageX + "px" });
      prevContWid({ width: e.pageX - 60 + "px" });
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        <aside
          style={{ width: sideWid.width }}
          className="min-h-[calc(100vh-40px)] flex box-shadow:shadow-lg relative z-10"
        >
          <div className="flex-1">
            <SideBar prevWid={prevWid} key="sideCol" />
          </div>
          <div
            draggable
            ref={resizer}
            onDragStart={() => (resizer.current.isDragStarted = true)}
            onDrag={updateSettingsWidth}
            onDragEnd={() => (resizer.current.isDragStarted = false)}
            className="w-10 bg-gray-100 flex-shrink-0 relative border-r border-gray-200 cursor-w-resize"
          >
            <i className="las la-grip-lines-vertical absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
          </div>
        </aside>
      </div>
    </div>
  );
}
