import { AppStore } from 'core/store';
import { fetchOfferDetails } from 'offerDetails/actions';
import { useEffect } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useThunkDispatch } from 'utils/useThunkDispatch';

import { DetailsView } from '../components/DetailsView';

export function Details() {
  const { offerId } = useParams();
  const dispatch = useThunkDispatch();
  const offer = useSelector((state: AppStore) => state.offerDetails.data);

  useEffect(() => {
    dispatch(fetchOfferDetails(parseInt(offerId || '')));
  }, [dispatch, offerId]);

  return <DetailsView offer={offer} />;
}
