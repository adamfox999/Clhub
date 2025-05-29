"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SectionContainer.module.css";

export function SectionContainer({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "section")} tag="section">
      <_Builtin.Block className={_utils.cx(_styles, "container")} tag="div" />
    </_Component>
  );
}
