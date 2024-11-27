"use client";

import React from "react";
import Image from 'next/image';
import { useParams, useRouter } from "next/navigation";
import { useGetOfferDetailsByIdQuery } from "./_hooks/useGetOfferDetailsByIdQuery";
import {
  Description,
  EmptyState,
  Price,
  Summary,
  Title,
} from "./_components/styled";

export const Details: React.FC = () => {
  const params = useParams<{ offerId: string }>();
  const router = useRouter();
  const offerId = parseInt(params.offerId ?? "0");
  const { data: offer } = useGetOfferDetailsByIdQuery(offerId);

  if (!offer) {
    return <EmptyState>Select offer to view</EmptyState>;
  }

  return (
    <div>
      <button onClick={() => router.back()}>Go back</button>
      <Title data-testid='title'>{offer.title}</Title>
      <Image src={offer.img_url} alt="offer image" width={100} height={100} />
      <Description data-testid='description'>{offer.description}</Description>
      <Summary>
        <Price  data-testid='price'>Price: {offer.price}</Price>
      </Summary>
    </div>
  );
};

export default Details;
