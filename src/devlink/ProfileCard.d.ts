import * as React from "react";
import * as Types from "./types";

declare function ProfileCard(props: {
  as?: React.ElementType;
  profileImageImage?: Types.Asset.Image;
  titleMediumText?: React.ReactNode;
  bodyMediumText?: React.ReactNode;
}): React.JSX.Element;
