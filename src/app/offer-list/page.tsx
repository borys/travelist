'use client'

import React from "react";
import {
  Description,
  Item,
  Image,
  Price,
  Title,
  ScrollableContainer,
} from "./_components/styled";
import { useReachedBottomScroll } from "./_hooks/useReachedScrollBottom";
import { useGetOfferListQuery } from "./_hooks/useGetOfferListQuery";

export const OfferList: React.FC = () => {
  const { data: offers } = useGetOfferListQuery({offset: 0, limit: 10});
  const {scrollableRef} =  useReachedBottomScroll(() => {
    console.log('load more');
  });

  return (
    <ScrollableContainer ref={scrollableRef}>
      {offers.map(({ id, img_url, title, price, description }) => (
        <Item key={id}>
          <Image src={img_url} alt="offer" />
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Price>{price}</Price>
        </Item>
      ))}
    </ScrollableContainer>
  );
};

export default OfferList;