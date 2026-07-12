import { useCallback, useRef } from "react";
import { TYPING_TIMEOUT_MS } from "../lib/constants";

export function useTypingIndicator(sendTyping) {
  const timeoutRef = useRef(null);
  const isTypingRef = useRef(false);

  const notifyTyping = useCallback(() => {
    if (!isTypingRef.current) {
      isTypingRef.current = true;
      sendTyping(true);
    }

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isTypingRef.current = false;
      sendTyping(false);
    }, TYPING_TIMEOUT_MS);
  }, [sendTyping]);

  const notifyStoppedTyping = useCallback(() => {
    clearTimeout(timeoutRef.current);
    if (isTypingRef.current) {
      isTypingRef.current = false;
      sendTyping(false);
    }
  }, [sendTyping]);

  return { notifyTyping, notifyStoppedTyping };
}