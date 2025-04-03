"use client";

import WidgetCanvas from "@/components/WidgetCanvas/WidegetCanvas";
import {useCallback, useReducer} from "react";
import styles from "@/app/page.module.css";
import {Widget} from "@/types/widget";
import WidgetController from "@/components/WidgetsController/WidgetsController";
import {DeleteWidgetPayload, UpdateWidgetPayload, WidgetReducerAction} from "@/types/reducer";



function widgetReducer(state: Widget[], action: WidgetReducerAction) {
  const { payload, type } = action;
  switch (type) {
    case "update_widget":
      const target = state.find((widget) => widget.id === payload.id);
      if (target) {
        target.props = payload.newProps as typeof target.props;
      }
      return [...state];
    case "add_new":
      return [...state, payload];
    case "delete":
      return [...state.filter(({id}) => id !== payload.id)];
  }
}

export default function Home() {
  const [widgets, dispatch] = useReducer<Widget[], [WidgetReducerAction]>(widgetReducer, [
    {type: "image", props: { src: "/photo.jpg"}, id: "firstt", name: "img widg"},
    {type: "text", props: {text: "TEEEEEEEEEEEEEEEEEEEEEx"}, id: "seccocn", name: "text widget"}
  ]);

  const updateWidget = useCallback((payload: UpdateWidgetPayload) => {
    dispatch({ type: "update_widget", payload })
  }, []);

  const addNew = useCallback((widget: Widget) => {
    dispatch({type: "add_new", payload: widget})
  }, []);

  const remove = useCallback((payload: DeleteWidgetPayload) => {
    dispatch({type: "delete", payload})
  }, [])

  return (
    <div className={styles.pageWrapper}>
      <WidgetCanvas widgets={widgets} />
      <WidgetController widgets={widgets} update={updateWidget} addNew={addNew} remove={remove} />
    </div>
  );
}
