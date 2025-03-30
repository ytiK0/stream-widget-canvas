"use client";

import { WidgetBase } from "@/components/widgets/WidgetBase/WidgetBase";
import {useEffect, useState} from "react";
import {WidgetPropSchema, WidgetProps, WidgetObject} from "@/types/widget";

const textWidgetSchema: WidgetPropSchema[] = [];

function TextWidgetView({ text: defaultText }: WidgetProps<TextWidgetProps>) {
  const [text, setText] = useState(defaultText);

  useEffect(() => {
    setTimeout(() => {
      setText("AnotherText very very very very very very very long")
    }, 3000)
  }, []);

  return (
    <WidgetBase>
      <span>{text}</span>
    </WidgetBase>
  );
}

const TextWidget: WidgetObject<"text"> = {
  component: TextWidgetView,
  schema: textWidgetSchema
}

export default TextWidget;