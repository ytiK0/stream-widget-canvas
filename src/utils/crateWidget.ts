import {WidgetBase, WidgetPropsByType, WidgetType} from "@/types/widget";
import {generateRandomString} from "@/utils/generateRandomString";
import commonWidgets from "@/components/widgets";

export function crateWidget<T extends WidgetType>(type: T, name?: string, initialProps?: WidgetPropsByType[`${T}`]) {
  const widgetId = generateRandomString(8)

  const widget: WidgetBase<T> = {
    id: widgetId,
    type: type,
    name: name || type,
    props: initialProps || commonWidgets[type].defaultProps
  }

  return widget;
}