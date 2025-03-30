import {FC} from "react";

type WidgetPropType = "number" | "string";

interface WidgetPropTypeMap {
  "number": number,
  "string": string
}

interface WidgetPropSchema {
  propName: string,
  type: WidgetPropType,
  optional?: boolean
}

type WidgetPosition = {
  top: number,
  left: number
}

interface WidgetBaseProps {
  position?: WidgetPosition
}

type WidgetProps<props> = WidgetBaseProps & props;

type WidgetPropsByType = {
  "text": TextWidgetProps;
  "image": ImageWidgetProps;
};

type WidgetType = keyof WidgetPropsByType;

interface WidgetBase<T extends keyof WidgetPropsByType> {
  type: `${T}`
}

interface TextWidget extends WidgetBase<"text"> {
  type: "text"
  props: TextWidgetProps
}

interface ImageWidget extends WidgetBase<"image"> {
  type: "image"
  props: ImageWidgetProps
}

type Widget = TextWidget | ImageWidget;

type WidgetObject<P extends WidgetType> = {
  component: FC<WidgetProps<WidgetPropsByType[`${P}`]>>,
  schema: WidgetPropSchema[]
}