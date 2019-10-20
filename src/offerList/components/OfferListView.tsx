import { Offer, OfferId } from 'core/models';
import React, { useEffect, useRef } from 'react';
import { InfinityScroll } from 'utils/InfinityScroll';

import { Description, Image, Item, Price, Title, Wrapper } from './styled';

export interface OfferListViewProps {
  offers: Offer[];
  loadMore: () => void;
  hasMore: boolean;
  onItemClick: (id: OfferId, position: number) => void;
  scrollPosition: number | null;
}

export const OfferListView: React.FC<OfferListViewProps> = ({
  offers,
  loadMore,
  hasMore,
  onItemClick,
  scrollPosition,
}: React.PropsWithChildren<OfferListViewProps>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const getScrollTop = () =>
    wrapperRef.current ? wrapperRef.current.scrollTop : 0;

  useEffect(() => {
    scrollPosition &&
      wrapperRef.current &&
      wrapperRef.current.scrollTo &&
      wrapperRef.current.scrollTo(0, scrollPosition);
  });

  return (
    <Wrapper ref={wrapperRef}>
      <InfinityScroll loadMore={loadMore} hasMore={hasMore}>
        {offers.map(({ id, img_url, title, price, description }) => {
          return (
            <Item key={id} onClick={() => onItemClick(id, getScrollTop())}>
              <Image src={img_url} alt='offer' />
              <Title>{title}</Title>
              <Description>{description}</Description>
              <Price>{price}</Price>
            </Item>
          );
        })}
      </InfinityScroll>
    </Wrapper>
  );
};
