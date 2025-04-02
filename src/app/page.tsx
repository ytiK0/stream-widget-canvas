"use client";

import WidgetCanvas from "@/components/WidgetCanvas/WidegetCanvas";
import {useCallback, useReducer} from "react";
import styles from "@/app/page.module.css";
import {Widget} from "@/types/widget";
import WidgetController from "@/components/WidgetsController/WidgetsController";



function widgetReducer(state: Widget[], action: WidgetReducerAction) {
  const { payload, type } = action;
  switch (type) {
    case "update_widget":
      const target = state.find((widget) => widget.id === payload.id);
      if (target) {
        target.props = payload.newProps as typeof target.props;
      }
      return [...state];
      break;
  }
  return state
}

export default function Home() {
  const [widgets, dispatch] = useReducer<Widget[], [WidgetReducerAction]>(widgetReducer, [
    {type: "image", props: { src: "/photo.jpg"}, id: "firstt", name: "img widg"},
    {type: "text", props: {text: "TEEEEEEEEEEEEEEEEEEEEEx"}, id: "seccocn", name: "text widget"}
  ]);

  const updateWidget = useCallback((payload: UpdateWidgetAction["payload"]) => {
    dispatch({ type: "update_widget", payload })
  }, [])

  return (
    <div className={styles.pageWrapper}>
      <WidgetCanvas widgets={widgets} />
      <WidgetController widgets={widgets} update={updateWidget} />
    </div>
  );
}
