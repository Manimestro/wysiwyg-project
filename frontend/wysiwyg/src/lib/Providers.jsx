import React from "react";
import { ProvidePageDesign } from "./context/";
import { Outlet } from "react-router-dom";
import { ProvideUser } from "./context";
export default function ContextProvider() {
  return (
    <>
      <ProvideUser>
        <ProvidePageDesign>
          <Outlet />
        </ProvidePageDesign>
      </ProvideUser>
    </>
  );
}
