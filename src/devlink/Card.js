"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Card.module.css";

export function Card({
  as: _Component = _Builtin.Link,
  cardSummary = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
  heading = "Heading",
  label = "Little Label",
  image = "",

  cardLink = {
    href: "#",
  },

  _1stLabelMedium = "This is some text inside of a div block.",
  _2LabelMedium = "This is some text inside of a div block.",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "card")}
      button={false}
      block="inline"
      options={cardLink}
    >
      <_Builtin.Block className={_utils.cx(_styles, "card-image")} tag="div">
        <_Builtin.Image
          className={_utils.cx(_styles, "image-2")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src={image}
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "cardcontent")} tag="div">
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "label-small")}
            tag="div"
          >
            {label}
          </_Builtin.Block>
          <_Builtin.Heading
            className={_utils.cx(
              _styles,
              "title-medium",
              "on-primary-container"
            )}
            tag="h2"
          >
            {heading}
          </_Builtin.Heading>
        </_Builtin.Block>
        <_Builtin.Paragraph
          className={_utils.cx(_styles, "body-small", "on-primary-container")}
        >
          {cardSummary}
        </_Builtin.Paragraph>
      </_Builtin.Block>
    </_Component>
  );
}
