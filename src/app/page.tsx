"use client";

import React from "react";
import {
  Description,
  Item,
  Price,
  Title,
  ScrollableList,
  Avatar,
  Wrapper,
} from "./_components/styled";
import { useGetOfferListQuery } from "./_hooks/useGetOfferListQuery";
import { useDispatch } from "react-redux";
import { fetchOffers } from "./_store/actions";
import { AppDispatch } from "./store";
import Link from "next/link";

const scrollHandlerFactory =
  (callback: () => void) => (e: React.UIEvent<HTMLUListElement>) => {
    const errorMargin = 1;
    const scrollableView = e.target as HTMLUListElement;
    const scrollHeight = scrollableView.scrollHeight;
    const scrollTop = scrollableView.scrollTop;
    const viewHeight = scrollableView.clientHeight;

    if (!(Math.abs(scrollHeight - scrollTop - viewHeight) <= errorMargin)) {
      return;
    }

    callback();
  };

export const OfferList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: offers, isLoading } = useGetOfferListQuery({
    offset: 0,
    limit: 50,
  });

  const scrollHandler = scrollHandlerFactory(() => {
    if (!isLoading) {
      dispatch(fetchOffers({ offset: offers.length, limit: 20 }));
    }
  });

  return (
    <>
      <h1>Infinity Scroll</h1>
      <Wrapper>
        <ScrollableList onScroll={scrollHandler} data-testid="scrollable-view">
          {offers.map(({ id, img_url, title, price, description }) => (
            <Item key={id}>
              <Avatar
                data-testid="item-image"
                src={img_url}
                alt="offer"
                width={100}
                height={75}
              />
              <Title data-testid="item-title">
                <Link href={`offer-details/${id}`}>
                  {title}
                </Link>
              </Title>
              <Description data-testid="item-description">
                {description}
              </Description>
              <Price data-testid="item-price">{price}</Price>
            </Item>
          ))}
        </ScrollableList>
      </Wrapper>
    </>
  );
};

export default OfferList;
