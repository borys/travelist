import { AppStore } from 'core/store';
import { fetchOfferDetails } from 'offerDetails/actions';
import { useCallback, useEffect } from 'react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useThunkDispatch } from 'utils/useThunkDispatch';

import { MemoizedDetailsView } from '../components/DetailsView';

export const Details: React.FC = () => {
  const { offerId } = useParams();
  const dispatch = useThunkDispatch();
  const offer = useSelector((state: AppStore) => state.offerDetails.data);
  let history = useHistory();
  const goBack = useCallback(() => history.goBack(), [history]);

  useEffect(() => {
    dispatch(fetchOfferDetails(parseInt(offerId || '')));
  }, [dispatch, offerId]);

  return <MemoizedDetailsView goBack={goBack} offer={offer} />;
};
