import * as React from 'react';

type LoadMoreFunc = () => void;

export interface InfinityScrollProps {
  loadMore: LoadMoreFunc;
  hasMore: boolean;
}

export const InfinityScroll: React.FC<InfinityScrollProps> = (
  props: React.PropsWithChildren<InfinityScrollProps>
) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const { hasMore, loadMore } = props;

  React.useEffect(() => {
    const getParent = (ref: React.RefObject<HTMLDivElement>) =>
      ref.current && ref.current.parentElement;

    const scrollHandler = (e: Event) => {
      const wrapper = e.target as HTMLDivElement;

      if (
        wrapper &&
        wrapper.scrollHeight ===
          Math.ceil(wrapper.scrollTop + wrapper.clientHeight)
      ) {
        loadMore();
      }
    };

    const fillView = (
      parent: HTMLElement | null,
      hasMore: boolean,
      loadMore: LoadMoreFunc
    ) => {
      if (parent && hasMore && parent.clientHeight === parent.scrollHeight) {
        loadMore();
      }
    };

    const parent = getParent(wrapperRef);
    if (!parent) {
      return;
    }

    parent.addEventListener('scroll', scrollHandler);
    fillView(parent, hasMore, loadMore);

    return () => {
      if (parent) {
        parent.removeEventListener('scroll', scrollHandler);
      }
    };
  }, [wrapperRef, loadMore, hasMore]);

  return <div ref={wrapperRef}>{props.children}</div>;
};
