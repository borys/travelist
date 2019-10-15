import { OfferId } from 'core/models';
import { AppStore } from 'core/store';
import { fetchMoreOffers } from 'offerList/actions';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useThunkDispatch } from 'utils/useThunkDispatch';

import { OfferListView } from '../components/OfferListView';

export const OfferList: React.FC = () => {
  const history = useHistory();
  const offers = useSelector((state: AppStore) => state.offerList.data);
  const hasMore = useSelector((state: AppStore) => state.offerList.hasMore);
  const dispatch = useThunkDispatch();

  const showDetails = (id: OfferId) => {
    history.push(`/details/${id}`);
  };

  const loadMore = () => {
    dispatch(fetchMoreOffers());
  };

  return (
    <OfferListView
      offers={offers}
      onItemClick={showDetails}
      hasMore={hasMore}
      loadMore={loadMore}
    />
  );
};
