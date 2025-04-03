import {Widget} from "@/types/widget";
import styles from "@/components/WidgetsController/widgetController.module.css"
import commonWidgets from "@/components/widgets";
import {DeleteWidgetPayload, UpdateWidgetPayload} from "@/types/reducer";
import {crateWidget} from "@/utils/crateWidget";
import {useDebounceCallback} from "usehooks-ts";
import React, {useCallback} from "react";

interface WidgetControllerProps {
  widgets: Widget[],
  update: (payload: UpdateWidgetPayload) => void,
  addNew: (widget: Widget) => void,
  remove: (payload: DeleteWidgetPayload) => void
}

export default function WidgetController({ widgets, update, addNew, remove }: WidgetControllerProps) {
  const handleChange = useDebounceCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const target = ev.target;
    const id = target.id;
    const propName = target.dataset["propName"];
    if (!propName) {
      throw new Error("Input element does not gas prop name data attribute");
    }
    const props = widgets.find(({id}) => id === target.id)?.props;
    update({id, newProps: {...props, [propName]: ev.target.value}})
  }, 20);

  const handleRemoveButton = useCallback((ev: React.MouseEvent) => {
    const target = ev.target as HTMLButtonElement;
    const removeId = target.dataset["bindId"];
    if (removeId === undefined) {
      throw new Error("Remove button does not have bind id data attribute");
    }
    remove({id: removeId})
  }, [remove]);

  return (
    <div className={styles.controllerWrapper}>
      Widget controller
      <div className={styles.widgetList}>
        {
          widgets.map(({type, props, id, name}, i) =>
            <div key={`${i}-${type}`}>
              <div className={styles.headerWrapper}>
                <h4 className={styles.widgetHeader}>{name}</h4>
                <button onClick={handleRemoveButton} style={{color: "red", cursor: "pointer"}} data-bind-id={id}>X</button>
              </div>
              <div>
                {
                  commonWidgets[type].schema.map(({type, propName}) => (
                    <div key={`${i}-${type}-${propName}`}>
                      <label htmlFor={`${i}-${type}-${propName}`}>{propName}</label>
                      <br />
                      <input onChange={handleChange}
                             type={type}
                             id={id}
                             defaultValue={props[propName as keyof typeof props]}
                             data-prop-name={propName}/>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        }
      </div>
      <button className={styles.addNewButton} onClick={() => addNew(crateWidget("text", "created text", {text: "i was created"}))}>Add new widget</button>
    </div>
  );
}
