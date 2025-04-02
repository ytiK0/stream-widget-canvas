"use client";

import type { ComponentProps, PropsWithChildren } from "react";
import { useState, useCallback, useEffect, useContext, useRef } from "react";
import clsx from "clsx";

import styles from "./widgetBase.module.css"
import {CanvasContext} from "@/components/WidgetCanvas/WidegetCanvas";
import {WidgetBaseProps, WidgetPosition} from "@/types/widget";

const DEFAULT_WIDGET_POSITION: WidgetPosition = {
  top: 0,
  left: 0,
  width: 300
}

export function WidgetBaseView(props: ComponentProps<"div">) {
  return (
    <div {...props} className={clsx(styles.widgetWrapper, props.className)}></div>
  )
}

export function WidgetBase({children, position: initialPosition}: PropsWithChildren<WidgetBaseProps>) {
  const canvasContext = useContext(CanvasContext);
  const [position, setPosition] = useState(initialPosition || DEFAULT_WIDGET_POSITION);
  const [isDragging, setIsDragging] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const prevPositionRef = useRef<WidgetPosition|null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetRectRef = useRef<DOMRect>(null);

  if (!canvasContext) {
    throw new Error("Canvas context not provided!");
  }

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDbClick = useCallback(() => {
    setIsFocus(true);
  }, [])

  const stopDragging = useCallback(() => {
    setIsDragging(false);
    prevPositionRef.current = null;
  }, []);

  useEffect(() => {
    const { canvasEvents } = canvasContext;

    const onMouseUp = () => {
      stopDragging();
    }

    if (isDragging) {
      canvasEvents.addEventListener("mouseup", onMouseUp);

      return () => {
        canvasEvents.removeEventListener("mouseup", onMouseUp);
      }
    }
  }, [canvasContext, isDragging, stopDragging]);

  useEffect(() => {
    const { canvasEvents } = canvasContext;

    const onMouseMove = (event: MouseEvent) => {
      event.stopPropagation()
      if (!isDragging) {
        return;
      }

      const { clientX, clientY, target } = event;
      const dx = clientX - (prevPositionRef.current?.left || clientX);
      const dy = clientY - (prevPositionRef.current?.top || clientY);

      prevPositionRef.current = {
        top: event.clientY,
        left: event.clientX,
        width: initialPosition?.width || DEFAULT_WIDGET_POSITION.width
      }
      setPosition({
        top: position.top + dy >= 0 ? position.top + dy : 0,
        left: position.left + dx >= 0 ? position.left + dx : 0,
        width: initialPosition?.width || DEFAULT_WIDGET_POSITION.width
      });
    }

    canvasEvents.addEventListener("mousemove", onMouseMove as EventListener);

    return () => {
      canvasEvents.removeEventListener("mousemove", onMouseMove as EventListener);
    }
  }, [canvasContext, isDragging, position.left, position.top]);

  useEffect(() => {
    if (widgetRef.current) {
      widgetRectRef.current = widgetRef.current.getBoundingClientRect();
    }
  }, [children, widgetRef.current]);

  return (
    <WidgetBaseView
      style={position}
      onMouseDown={handleDragStart}
      onDoubleClick={handleDbClick}
      ref={widgetRef}
      data-is-dragging={isDragging}
      data-is-focus={isFocus}
    >
      {children}
    </WidgetBaseView>
  );
}


