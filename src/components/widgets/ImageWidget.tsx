import Image from "next/image";
import {WidgetPropSchema, WidgetProps, WidgetObject} from "@/types/widget";
import {WidgetBase} from "@/components/widgets/WidgetBase/WidgetBase";


const imageWidgetPropsSchema: WidgetPropSchema[] = [
  {
    propName: "src",
    type: "string"
  }
];

function ImageWidgetView({src}: WidgetProps<ImageWidgetProps>) {
  return (
    <WidgetBase>
      <Image src={src} alt={"widget img"} width={100} height={100} draggable={false} />
    </WidgetBase>
  );
}

const ImageWidget: WidgetObject<"image"> = {
  component: ImageWidgetView,
  schema: imageWidgetPropsSchema
}

export default ImageWidget;