'use client'

import React from "react";
import {
  Description,
  Item,
  Image,
  Price,
  Title,
  ScrollableView,
} from "./_components/styled";
import { useReachedBottomScroll } from "./_hooks/useReachedScrollBottom";
import { useGetOfferListQuery } from "./_hooks/useGetOfferListQuery";
import { useDispatch } from "react-redux";
import { fetchOffers } from "./_store/actions";
import { AppDispatch } from "../store";

export const OfferList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: offers } = useGetOfferListQuery({offset: 0, limit: 50});
  const { scrollHandler }  = useReachedBottomScroll(() => {
    dispatch(fetchOffers({offset: offers.length, limit: 20}));
  });

  return (
    <ScrollableView onScroll={scrollHandler}>
      {offers.map(({ id, img_url, title, price, description }) => (
        <Item key={id}>
          <Image src={img_url} alt="offer" />
          <Title>{title}</Title>
          <Description>{description}</Description>
          <Price>{price}</Price>
        </Item>
      ))}
    </ScrollableView>
  );
};

export default OfferList;