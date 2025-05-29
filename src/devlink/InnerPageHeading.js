"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InnerPageHeading.module.css";

export function InnerPageHeading({
  as: _Component = _Builtin.Block,
  displayLargeText = "Contact",
  bodyLargeText = "This is a inner page heading.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "section")} tag="section">
      <_Builtin.Block className={_utils.cx(_styles, "container")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "title-wrap")} tag="div">
          <_Builtin.Heading
            className={_utils.cx(_styles, "display-large")}
            tag="h1"
          >
            {displayLargeText}
          </_Builtin.Heading>
          <_Builtin.Paragraph
            className={_utils.cx(_styles, "body-large", "title-summary")}
          >
            {bodyLargeText}
          </_Builtin.Paragraph>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
