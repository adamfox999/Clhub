import * as React from "react";
import * as Types from "./types";

declare function EventCard(props: {
  as?: React.ElementType;
  startDate?: React.ReactNode;
  startTime?: React.ReactNode;
  endDate?: React.ReactNode;
  eventImage?: Types.Asset.Image;
  labelSmallText?: React.ReactNode;
  titleMediumText?: React.ReactNode;
  bodySmallText?: React.ReactNode;
  cardLink?: Types.Basic.Link;
  labelMediumVisibility?: Types.Visibility.VisibilityConditions;
  endTimeVisibible?: Types.Visibility.VisibilityConditions;
  slotContent?: Types.Slots.SlotContent;
}): React.JSX.Element;
