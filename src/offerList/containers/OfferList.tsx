import { OfferId } from 'core/models';
import { AppStore } from 'core/store';
import { fetchMoreOffers, saveOfferListScroll } from 'offerList/actions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useThunkDispatch } from 'utils/useThunkDispatch';

import { OfferListView } from '../components/OfferListView';

export const OfferList: React.FC = () => {
  const history = useHistory();
  const offers = useSelector((state: AppStore) => state.offerList.data);
  const hasMore = useSelector((state: AppStore) => state.offerList.hasMore);
  const scrollTop = useSelector((state: AppStore) => state.offerList.scrollTop);
  const thunkDispatch = useThunkDispatch();
  const dispatch = useDispatch();

  const showDetails = (id: OfferId, scrollTop: number) => {
    dispatch(saveOfferListScroll(scrollTop));
    history.push(`/details/${id}`);
  };

  const loadMore = () => {
    thunkDispatch(fetchMoreOffers());
  };

  return (
    <OfferListView
      offers={offers}
      onItemClick={showDetails}
      hasMore={hasMore}
      loadMore={loadMore}
      scrollTop={scrollTop}
    />
  );
};
