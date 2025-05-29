"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TextButton.module.css";

export function TextButton({
  as: _Component = _Builtin.Link,

  textButtonLink = {
    href: "#",
  },

  textButtonText = "Text Button",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "text-button")}
      id={_utils.cx(
        _styles,
        "w-node-_86559608-f16b-becd-1fb4-b1ddf0152332-f0152332"
      )}
      button={true}
      block=""
      options={textButtonLink}
    >
      {textButtonText}
    </_Component>
  );
}
