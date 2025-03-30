import ImageWidget from "@/components/widgets/ImageWidget";
import TextWidget from "@/components/widgets/TextWidget";
import {WidgetObject, WidgetPropsByType} from "@/types/widget";

type CommonWidgets = {
  [I in keyof WidgetPropsByType]: WidgetObject<I>
}

const commonWidgets: CommonWidgets = {
  image: ImageWidget,
  text: TextWidget
} as const;

export default commonWidgets;