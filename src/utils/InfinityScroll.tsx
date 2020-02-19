import React, { useEffect, useRef } from 'react';

const getParent = (ref: React.RefObject<HTMLDivElement>) =>
  ref.current && ref.current.parentElement;

const fillView = (
  parent: HTMLElement | null,
  hasMore: boolean,
  loadMore: LoadMoreFunc
) => {
  if (parent && hasMore && parent.clientHeight === parent.scrollHeight) {
    loadMore();
  }
};

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

  useEffect(() => {
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

    const parent = getParent(wrapperRef);

    parent && parent.addEventListener('scroll', scrollHandler);

    return () => {
      if (parent) {
        parent.removeEventListener('scroll', scrollHandler);
      }
    };
  }, [loadMore]);

  useEffect(() => {
    const parent = getParent(wrapperRef);
    if (parent) {
      fillView(parent, hasMore, loadMore);
    }
  }, [children, hasMore, loadMore]);

  return <div ref={wrapperRef}>{children}</div>;
};
