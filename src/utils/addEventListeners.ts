type AddListenersObj = {
  [eventType in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[eventType]) => void
};

/**
 * Function takes object where key is listening event and value is listener and add listeners to target element (default html body element).
 * Return clear function that remove all added listeners.
 * Useful in useEffect hook when you have many listeners, and you need to easily clear when component unmount;
 */
export function addEventListeners(listeners: AddListenersObj, target=document.body) {
  for (const eventType in listeners) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    target.addEventListener(eventType as keyof HTMLElementEventMap, listeners[eventType])
  }

  return () => {
    for (const eventType in listeners) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      target.removeEventListener(eventType as keyof HTMLElementEventMap, listeners[eventType])
    }
  }
}