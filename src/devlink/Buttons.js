"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { FilledButton } from "./FilledButton";
import { TonalButton } from "./TonalButton";
import { OutlinedButton } from "./OutlinedButton";
import { TextButton } from "./TextButton";
import * as _utils from "./utils";
import _styles from "./Buttons.module.css";

export function Buttons({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cj(_utils.cx(_styles, ""), "w-clearfix")}
      id={_utils.cx(
        _styles,
        "w-node-a9b89bce-9f70-9f21-d45a-060d5ee4c06b-5ee4c06b"
      )}
      tag="div"
    >
      <_Builtin.Grid
        className={_utils.cx(_styles, "button-component-grid")}
        tag="div"
      >
        <FilledButton />
        <TonalButton />
        <OutlinedButton />
        <TextButton />
      </_Builtin.Grid>
    </_Component>
  );
}
