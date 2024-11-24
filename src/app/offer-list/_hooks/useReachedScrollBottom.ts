import { useRef, UIEvent } from "react";

export const useReachedBottomScroll = (
  callback: () => void,
) => {
  const errorMargin = 1;
  const scrollBottomState = useRef({
    prevScrollHeight: -1
  });

  const scrollHandler = (e: UIEvent<HTMLDivElement>) => {
    const scrollableView = e.target as HTMLDivElement;
    const scrollHeight = scrollableView.scrollHeight;
    const scrollTop = scrollableView.scrollTop;
    const viewHeight = scrollableView.clientHeight;

    if (!(Math.abs(scrollHeight - scrollTop - viewHeight) <= errorMargin)) {
      return;
    }

    if(scrollBottomState.current.prevScrollHeight === scrollHeight) {
      return;
    }
    scrollBottomState.current.prevScrollHeight = scrollHeight;

    callback();
  };

  return {scrollHandler}
};
