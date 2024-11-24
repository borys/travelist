import React, { useEffect, useRef, PropsWithChildren, FC } from "react";

import { Offer, OfferId } from "@/app/_models/Offer";
import { Description, Image, Item, Price, Title, ScrollableView } from "./styled";

export interface OfferListViewProps {
  offers: Offer[];
  hasMore: boolean;
  initScrollPosition: number | null;
  loadMore: () => void;
  onItemClick: (id: OfferId, position: number) => void;
}

export const OfferListView: FC<OfferListViewProps> = ({
  offers,
  initScrollPosition,
  onItemClick,
}: PropsWithChildren<OfferListViewProps>) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const getScrollTop = () =>
    wrapperRef.current ? wrapperRef.current.scrollTop : 0;

  useEffect(() => {
    wrapperRef?.current?.scrollTo?.(0, initScrollPosition ?? 0);
  }, [initScrollPosition]);

  return (
    <ScrollableView ref={wrapperRef}>
      {offers.map(({ id, img_url, title, price, description }) => (
          <Item key={id} onClick={() => onItemClick(id, getScrollTop())}>
            <Image src={img_url} alt="offer" />
            <Title>{title}</Title>
            <Description>{description}</Description>
            <Price>{price}</Price>
          </Item>
        ))
      }
    </ScrollableView>
  );
};
