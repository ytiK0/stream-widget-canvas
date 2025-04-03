import {Widget} from "@/types/widget";

interface UpdateWidgetPayload {
  id: string,
  newProps: unknown
}

interface UpdateWidgetAction {
  type: "update_widget",
  payload: UpdateWidgetPayload
}

interface AddNewWidgetAction {
  type: "add_new",
  payload: Widget
}

interface DeleteWidgetPayload {
  id: string
}

interface DeleteWidgetAction {
  type: "delete",
  payload: DeleteWidgetPayload
}


type WidgetReducerAction = UpdateWidgetAction | AddNewWidgetAction | DeleteWidgetAction;