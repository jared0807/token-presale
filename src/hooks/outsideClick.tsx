import { useEffect, RefObject } from "react";

type EventListener = (event: MouseEvent) => void;

function useOutsideClick(ref: RefObject<HTMLElement>, callback: EventListener) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    }

    const handleDocumentClick: EventListener = (event) => {
      handleClickOutside(event);
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [ref, callback]);
}

export default useOutsideClick;
