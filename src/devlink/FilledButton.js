"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./FilledButton.module.css";

export function FilledButton({
  as: _Component = _Builtin.Link,

  link = {
    href: "#",
  },

  text = "Filled Button",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "filled-button")}
      button={true}
      block=""
      options={link}
    >
      {text}
    </_Component>
  );
}
