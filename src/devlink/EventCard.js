"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./EventCard.module.css";

export function EventCard({
  as: _Component = _Builtin.Block,
  startDate = "This is some text inside of a div block.",
  startTime = "This is some text inside of a div block.",
  endDate = "This is some text inside of a div block.",
  eventImage = "",
  labelSmallText = "Little Label",
  titleMediumText = "Heading",
  bodySmallText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",

  cardLink = {
    href: "#",
  },

  labelMediumVisibility = true,
  endTimeVisibible = true,
  slotContent,
}) {
  return (
    <_Component className={_utils.cx(_styles, "card")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "card-image")} tag="div">
        <_Builtin.Image
          className={_utils.cx(_styles, "image-2")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "cardcontent")} tag="div">
        <_Builtin.NotSupported _atom="Slot" />
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "label-small")}
            tag="div"
          >
            {labelSmallText}
          </_Builtin.Block>
          <_Builtin.Heading
            className={_utils.cx(
              _styles,
              "title-medium",
              "on-primary-container"
            )}
            tag="h2"
          >
            {titleMediumText}
          </_Builtin.Heading>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "label-medium", "time")}
              tag="div"
            >
              {startDate}
            </_Builtin.Block>
            {endTimeVisibible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "label-medium", "dash", "time")}
                tag="div"
              >
                {"-"}
              </_Builtin.Block>
            ) : null}
            {endTimeVisibible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "label-medium", "time")}
                tag="div"
              >
                {endDate}
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "label-medium")}
            tag="div"
          >
            {startTime}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Paragraph
          className={_utils.cx(_styles, "body-small", "on-primary-container")}
        >
          {bodySmallText}
        </_Builtin.Paragraph>
        <_Builtin.NotSupported _atom="DynamoWrapper" />
      </_Builtin.Block>
    </_Component>
  );
}
