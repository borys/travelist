import React, { useCallback, useEffect, useRef } from 'react';

type LoadMoreFunc = () => void;

export interface InfinityScrollProps {
  loadMore: LoadMoreFunc;
  hasMore: boolean;
}

export const InfinityScroll: React.FC<InfinityScrollProps> = ({
  hasMore,
  loadMore,
  children,
}: React.PropsWithChildren<InfinityScrollProps>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const scrollHandler = useCallback(
    (e: Event) => {
      const wrapper = e.target as HTMLDivElement;

      if (
        wrapper &&
        wrapper.scrollHeight ===
          Math.ceil(wrapper.scrollTop + wrapper.clientHeight)
      ) {
        loadMore();
      }
    },
    [loadMore]
  );

  const getParent = useCallback(
    (ref: React.RefObject<HTMLDivElement>) =>
      ref.current && ref.current.parentElement,
    []
  );

  const fillView = useCallback(
    (parent: HTMLElement | null, hasMore: boolean, loadMore: LoadMoreFunc) => {
      if (parent && hasMore && parent.clientHeight === parent.scrollHeight) {
        loadMore();
      }
    },
    []
  );

  useEffect(() => {
    const parent = getParent(wrapperRef);

    if (hasMore && loadMore && parent) {
      parent.addEventListener('scroll', scrollHandler);
    }

    return () => {
      if (parent) {
        parent.removeEventListener('scroll', scrollHandler);
      }
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const parent = getParent(wrapperRef);
    if (parent) {
      fillView(parent, hasMore, loadMore);
    }
  });

  return <div ref={wrapperRef}>{children}</div>;
};
