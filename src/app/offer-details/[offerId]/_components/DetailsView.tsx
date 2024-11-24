import { Offer } from '@/app/_models/Offer';
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
      <button onClick={() => goBack()}>Go back</button>
      <Title>{offer.title}</Title>
      <Image src={offer.img_url} alt='offer image' />
      <Description>{offer.description}</Description>
      <Summary>
        <Price>
          Price: {offer.price}
        </Price>
      </Summary>
    </div>
  );
};
