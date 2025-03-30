"use client";

import styles from "./widgetCanvas.module.css"
import {createContext, Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import { addEventListeners } from "@/utils/addEventListeners";
import {Widget,} from "@/types/widget";
import commonWidgets from "@/components/widgets";

interface WidgetCanvasProps {
  widgets: Widget[]
}

interface CanvasContext {
  canvasEvents: EventTarget,
  focusedWidget: HTMLElement | null,
  setFocusedWidget:  Dispatch<SetStateAction<HTMLElement | null>>
}

export const CanvasContext = createContext<CanvasContext|null>(null);

export default function WidgetCanvas({widgets}: WidgetCanvasProps) {
  const [focusedWidget, setFocusedWidget] = useState<HTMLElement|null>(null);

  const eventEmitterRef = useRef(new EventTarget());

  useEffect(() => {
    const eventEmitter = eventEmitterRef.current;

    let lastMoveEvent: MouseEvent | null = null;
    let currentTimer: NodeJS.Timer | null = null;

    const onMouseMove = (event: MouseEvent) => {
      lastMoveEvent = event;

      if (currentTimer)
        return;

      currentTimer = setTimeout(() => {
        if (lastMoveEvent) {
          const newEvent = new MouseEvent("mousemove", {
            bubbles: lastMoveEvent.bubbles,
            cancelable: lastMoveEvent.cancelable,
            clientX: lastMoveEvent.clientX,
            clientY: lastMoveEvent.clientY,
          });

          eventEmitter.dispatchEvent(newEvent);
        }

        currentTimer = null;
      }, 10);
    };

    const onMouseUp = (event: MouseEvent) => {
      if (event.button === 2) {
        return;
      }

      eventEmitter.dispatchEvent(new MouseEvent("mouseup"))
    }

    const onKeyDown = (event: KeyboardEvent) => {
      console.log(event.key)
    }

    return addEventListeners({
      "mousemove": onMouseMove,
      "mouseup": onMouseUp,
      "keydown": onKeyDown,
    })
  }, []);

  const contextProviderData = {
    canvasEvents: eventEmitterRef.current,
    focusedWidget, setFocusedWidget
  }

  return (
    <CanvasContext.Provider value={contextProviderData}>
      <div className={styles.canvas} onDragOver={(event) => event.preventDefault()}>
        {
          widgets.map(({ type, props }, i) => {
            const Widget = commonWidgets[type].component;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return <Widget key={i} {...props} />
          })
        }
      </div>
    </CanvasContext.Provider>
  );
}
