import { useRef, UIEvent } from "react";

export const useReachedBottomScroll = (
  callback: () => void,
) => {
  const errorMargin = 5;
  const scrollBottomState = useRef({
    isFirstCall: true,
    lastScrollHeight: -1
  });

  const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
    const scrollableView = e.target as HTMLDivElement;
    const scrollLeftToView =
      scrollableView?.scrollHeight - scrollableView?.scrollTop;
    const viewHeight = scrollableView?.clientHeight;

    if (scrollLeftToView - errorMargin  > viewHeight) {
      return;
    }

    if(!scrollBottomState.current.isFirstCall
      && scrollBottomState.current.lastScrollHeight === scrollableView?.clientHeight
    ) {
      return;
    }

    scrollBottomState.current.isFirstCall = false;
    scrollBottomState.current.lastScrollHeight = scrollableView?.clientHeight;

    callback();
  };

  return {scrollHandler}
};
