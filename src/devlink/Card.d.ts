import * as React from "react";
import * as Types from "./types";

declare function Card(props: {
  as?: React.ElementType;
  cardSummary?: React.ReactNode;
  heading?: React.ReactNode;
  label?: React.ReactNode;
  image?: Types.Asset.Image;
  cardLink?: Types.Basic.Link;
  _1stLabelMedium?: React.ReactNode;
  _2LabelMedium?: React.ReactNode;
}): React.JSX.Element;
