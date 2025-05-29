import * as React from "react";
import * as Types from "./types";

declare function MediaCard(props: {
  as?: React.ElementType;
  mediaCardImage?: Types.Asset.Image;
  title?: React.ReactNode;
  bodySmallText?: React.ReactNode;
  mediaCardLink?: Types.Basic.Link;
}): React.JSX.Element;
