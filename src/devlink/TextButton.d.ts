import * as React from "react";
import * as Types from "./types";

declare function TextButton(props: {
  as?: React.ElementType;
  textButtonLink?: Types.Basic.Link;
  textButtonText?: React.ReactNode;
}): React.JSX.Element;
