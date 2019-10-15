import { Offer, OfferId } from 'core/models';
import React from 'react';
import { InfinityScroll } from 'utils/InfinityScroll';

import { Description, Image, Item, Price, Title, Wrapper } from './styled';

export interface OfferListViewProps {
  offers: Offer[];
  loadMore: () => void;
  hasMore: boolean;
  onItemClick: (id: OfferId) => void;
}

export const OfferListView: React.FC<OfferListViewProps> = ({
  offers,
  loadMore,
  hasMore,
  onItemClick,
}: React.PropsWithChildren<OfferListViewProps>) => {
  return (
    <Wrapper>
      <InfinityScroll loadMore={loadMore} hasMore={hasMore}>
        {offers.map(({ id, img_url, title, price, description }) => {
          return (
            <Item key={id} onClick={() => onItemClick(id)}>
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
