"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./OutlinedButton.module.css";

export function OutlinedButton({
  as: _Component = _Builtin.Link,

  onlineButtonLink = {
    href: "#",
  },

  onlineButtonText = "Outlined Button",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "online-button")}
      id={_utils.cx(
        _styles,
        "w-node-bc5a0e40-b116-c501-44c9-ec5c38125610-38125610"
      )}
      button={true}
      block=""
      options={onlineButtonLink}
    >
      {onlineButtonText}
    </_Component>
  );
}
