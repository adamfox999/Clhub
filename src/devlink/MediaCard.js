"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MediaCard.module.css";

export function MediaCard({
  as: _Component = _Builtin.Link,
  mediaCardImage = "",
  title = "Title",
  bodySmallText = "Small Summary",

  mediaCardLink = {
    href: "#",
  },
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "media-card")}
      button={false}
      block="inline"
      options={mediaCardLink}
    >
      <_Builtin.Image
        className={_utils.cx(_styles, "media-card-image")}
        loading="lazy"
        width="auto"
        height="auto"
        alt=""
        src={mediaCardImage}
      />
      <_Builtin.Block className={_utils.cx(_styles, "filter")} tag="div" />
      <_Builtin.Block
        className={_utils.cx(_styles, "headline-medium", "on-primary")}
        tag="div"
      >
        <_Builtin.Heading
          className={_utils.cx(
            _styles,
            "title-medium",
            "on-primary",
            "media-card-text"
          )}
          tag="h1"
        >
          {title}
        </_Builtin.Heading>
        <_Builtin.Paragraph className={_utils.cx(_styles, "body-small")}>
          {bodySmallText}
        </_Builtin.Paragraph>
      </_Builtin.Block>
    </_Component>
  );
}
