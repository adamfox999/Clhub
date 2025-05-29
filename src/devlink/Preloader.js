"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./Preloader.module.css";

export function Preloader({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "preloader")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "preloader-content-wrap")}
        tag="div"
      >
        <_Builtin.Image
          className={_utils.cx(_styles, "preloader-image")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src="https://cdn.prod.website-files.com/6665c80fd12b155dd460e2c8/66683d4a0c14d15c2a5f7e1c_SWSCLogo.png"
        />
      </_Builtin.Block>
    </_Component>
  );
}
