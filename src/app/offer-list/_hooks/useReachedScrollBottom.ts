import { useEffect, useRef } from "react";

export const useReachedBottomScroll = (
  callback: () => void,
) => {
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let lastScrollHeight = scrollableRef.current?.scrollHeight;
    let isFirstCall = true;

    const scrollHandler = (e: Event) => {
      const scrollContainer = e.target as HTMLDivElement;
      const scrollLeftToView =
        scrollContainer?.scrollHeight - scrollContainer?.scrollTop;
      const viewHeight = scrollContainer?.clientHeight;

      if (scrollLeftToView > viewHeight) {
        return;
      }

      if(!isFirstCall && lastScrollHeight === scrollContainer?.clientHeight) {
        return;
      }
      
      isFirstCall = false;
      lastScrollHeight = scrollContainer?.clientHeight;

      callback();
    };

    const scrollableElement = scrollableRef.current;
    scrollableElement?.addEventListener("scroll", scrollHandler);

    return () => {
      scrollableElement?.removeEventListener("scroll", scrollHandler);
    };
  }, [callback]);

  return {scrollableRef}
};
