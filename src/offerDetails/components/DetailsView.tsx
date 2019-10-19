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
  goBack: () => void;
}

export const DetailsView: React.FC<DetailsViewProps> = ({
  offer,
  goBack,
}: DetailsViewProps) => {
  if (!offer) {
    return <EmptyState>Select offer to view</EmptyState>;
  }

  return (
    <div>
      <button onClick={(e) => goBack()}>Go back</button>
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
};
