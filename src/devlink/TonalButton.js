"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TonalButton.module.css";

export function TonalButton({
  as: _Component = _Builtin.Link,

  tonalButtonLink = {
    href: "#",
  },

  tonalButtonText = "Tonal Button",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "tonal-button")}
      button={true}
      block=""
      options={tonalButtonLink}
    >
      {tonalButtonText}
    </_Component>
  );
}
