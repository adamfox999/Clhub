"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Elevation.module.css";

export function Elevation({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "section-2")} tag="section">
      <_Builtin.Block className={_utils.cx(_styles, "container-2")} tag="div">
        <_Builtin.Heading tag="h2">{"Elevation"}</_Builtin.Heading>
        <_Builtin.Paragraph>
          {
            "The colour system is based on Material Design 3. For more information "
          }
          <_Builtin.Link
            button={false}
            block=""
            options={{
              href: "#",
              target: "_blank",
            }}
          >
            {"see here"}
          </_Builtin.Link>
          {"."}
        </_Builtin.Paragraph>
        <_Builtin.Grid
          className={_utils.cx(_styles, "colour-swatch-grid")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "elevation-1", "card")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "colour-card-label")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Elevation 1"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "elevation-2", "card")}
            id={_utils.cx(
              _styles,
              "w-node-_814259e5-e15b-9466-30e5-6c14f49994d8-f49994ca"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "colour-card-label")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Elevation 2"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "elevation-3", "card")}
            id={_utils.cx(
              _styles,
              "w-node-_814259e5-e15b-9466-30e5-6c14f49994dc-f49994ca"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "colour-card-label")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Elevation 3"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "elevation-4", "card")}
            id={_utils.cx(
              _styles,
              "w-node-_814259e5-e15b-9466-30e5-6c14f49994e0-f49994ca"
            )}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "colour-card-label")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Elevation 4"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "elevation-5", "card")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "colour-card-label")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Elevation 5"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Grid>
      </_Builtin.Block>
    </_Component>
  );
}
