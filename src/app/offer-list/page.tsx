'use client'

import React from "react";
import {
  Description,
  Item,
  Price,
  Title,
  ScrollableView,
  PhotoPlaceholder,
  Wrapper,
} from "./_components/styled";
import { useReachedBottomScroll } from "./_hooks/useReachedScrollBottom";
import { useGetOfferListQuery } from "./_hooks/useGetOfferListQuery";
import { useDispatch } from "react-redux";
import { fetchOffers } from "./_store/actions";
import { AppDispatch } from "../store";
import Image from 'next/image';


export const OfferList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: offers } = useGetOfferListQuery({offset: 0, limit: 50});
  const { scrollHandler }  = useReachedBottomScroll(() => {
    dispatch(fetchOffers({offset: offers.length, limit: 20}));
  });

  return (
    <>
      <h1>Infinity Scroll</h1>
      <Wrapper>
        <ScrollableView onScroll={scrollHandler}>
          {offers.map(({ id, img_url, title, price, description }) => (
            <Item key={id}>
              <PhotoPlaceholder>
                <Image src={img_url} alt="offer" width={100} height={75} />
              </PhotoPlaceholder>
              <Title>{title}</Title>
              <Description>{description}</Description>
              <Price>{price}</Price>
            </Item>
          ))}
        </ScrollableView>
      </Wrapper>
    </>
  );
};

export default OfferList;