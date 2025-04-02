interface UpdateWidgetAction {
  type: "update_widget",
  payload: {
    id: string,
    newProps: unknown
  }
}


type WidgetReducerAction = UpdateWidgetAction