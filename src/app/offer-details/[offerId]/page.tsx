'use client'

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DetailsView } from './_components/DetailsView';
import { useGetOfferDetailsByIdQuery } from './_hooks/useGetOfferDetailsByIdQuery';

export const Details: React.FC = () => {
  const params = useSearchParams();
  const router = useRouter();
  const offerId = parseInt(params.get('offerId') ?? '0');
  const {data} = useGetOfferDetailsByIdQuery(offerId);
  
  return <>
    <DetailsView goBack={() => router.back()} offer={data ?? null} />;
  </>
};

export default Details;