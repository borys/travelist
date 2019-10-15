import { Offer } from 'core/models';
import React from 'react';

import {
  Description,
  EmptyState,
  Image,
  Price,
  Summary,
  Title,
} from './styled';

export interface DetailsViewProps {
  offer: Offer | null;
}

export function DetailsView({ offer }: DetailsViewProps) {
  if (!offer) {
    return <EmptyState>Select offer to view</EmptyState>;
  }

  return (
    <div>
      <Title>{offer.title}</Title>
      <Image src={offer.img_url} />
      <Description>{offer.description}</Description>
      <Summary>
        <Price>
          Cena:
          {offer.price}
        </Price>
      </Summary>
    </div>
  );
}
