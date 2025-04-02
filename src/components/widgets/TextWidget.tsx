"use client";

import { WidgetBase } from "@/components/widgets/WidgetBase/WidgetBase";
import {WidgetPropSchema, WidgetProps, WidgetObject} from "@/types/widget";

const textWidgetSchema: WidgetPropSchema[] = [
  {
    type: "string",
    propName: "text",
  },
  {
    type: "color",
    propName: "color"
  }
];

function TextWidgetView({ text, color }: WidgetProps<TextWidgetProps>) {
  return (
    <WidgetBase>
      <span style={{color}}>{text}</span>
    </WidgetBase>
  );
}

const TextWidget: WidgetObject<"text"> = {
  component: TextWidgetView,
  schema: textWidgetSchema,
  defaultProps: {
    text: "Text widget!"
  }
}

export default TextWidget;