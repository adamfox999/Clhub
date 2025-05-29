"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ProfileCard.module.css";

export function ProfileCard({
  as: _Component = _Builtin.Block,
  profileImageImage = "",
  titleMediumText = "Heading",
  bodyMediumText = "This is some text inside of a div block.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "profile-card")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-image-frame")}
        id={_utils.cx(
          _styles,
          "w-node-e511ed4d-d1e9-523e-054c-293590be38ae-90be38ad"
        )}
        tag="div"
      >
        <_Builtin.Image
          className={_utils.cx(_styles, "profile-image")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src={profileImageImage}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-details")}
        tag="div"
      >
        <_Builtin.Heading
          className={_utils.cx(_styles, "title-medium")}
          tag="h3"
        >
          {titleMediumText}
        </_Builtin.Heading>
        <_Builtin.Block className={_utils.cx(_styles, "body-medium")} tag="div">
          {bodyMediumText}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
