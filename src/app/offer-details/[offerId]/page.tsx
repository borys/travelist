'use client'

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DetailsView } from './_components/DetailsView';
import { useGetOfferDetailsByIdQuery } from './_hooks/useGetOfferDetailsByIdQuery';

export const Details: React.FC = () => {
  const params = useParams<{offerId: string}>();
  const router = useRouter();
  const offerId = parseInt(params.offerId ?? '0');
  const {data} = useGetOfferDetailsByIdQuery(offerId);
  
  return <>
    <DetailsView goBack={() => router.back()} offer={data ?? null} />
  </>
};

export default Details;