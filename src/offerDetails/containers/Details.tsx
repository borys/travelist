import { AppStore, WithAsync } from 'core/store';
import { fetchOfferDetails } from 'offerDetails/actions';
import offerDetailsReducer, { OfferDetailsState } from 'offerDetails/reducers';
import { useCallback, useEffect } from 'react';
import React from 'react';
import { useSelector, useStore } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Store } from 'redux';
import { useThunkDispatch } from 'utils/useThunkDispatch';

import { MemoizedDetailsView } from '../components/DetailsView';

export const Details: React.FC = () => {
  const { offerId } = useParams();
  const dispatch = useThunkDispatch();
  const offer = useSelector(
    (state: AppStore & { offerDetails: OfferDetailsState }) =>
      state.offerDetails && state.offerDetails.data
  );
  let history = useHistory();
  const goBack = useCallback(() => history.goBack(), [history]);
  const store = useStore() as Store & WithAsync;

  useEffect(() => {
    store.injectReducer('offerDetails', offerDetailsReducer);
  }, [store]);

  useEffect(() => {
    dispatch(fetchOfferDetails(parseInt(offerId || '')));
  }, [dispatch, offerId]);

  return <MemoizedDetailsView goBack={goBack} offer={offer} />;
};
