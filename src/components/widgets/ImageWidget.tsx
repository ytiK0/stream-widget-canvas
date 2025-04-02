import Image from "next/image";
import {WidgetPropSchema, WidgetProps, WidgetObject, WidgetPosition} from "@/types/widget";
import {WidgetBase} from "@/components/widgets/WidgetBase/WidgetBase";


const imageWidgetPropsSchema: WidgetPropSchema[] = [
  {
    propName: "src",
    type: "string"
  }
];

const DEFAULT_IMAGE_POSITION: WidgetPosition = {
  top: 0,
  left: 0,
  width: 100
}

function ImageWidgetView({src}: WidgetProps<ImageWidgetProps>) {
  const width = DEFAULT_IMAGE_POSITION.width

  return (
    <WidgetBase position={DEFAULT_IMAGE_POSITION}>
      <Image src={src} alt={"widget img"} width={width} height={width} draggable={false} />
    </WidgetBase>
  );
}

const ImageWidget: WidgetObject<"image"> = {
  component: ImageWidgetView,
  schema: imageWidgetPropsSchema,
  defaultProps: {
    src: "/photo.jpg"
  }
}

export default ImageWidget;