import config from 'config';
import { Offer } from 'core/models';
import { AppStore } from 'core/store';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const FETCH_MORE_OFFERS = 'FETCH_OFFER_LIST';
export const FETCH_MORE_OFFERS_SUCCESS = 'FETCH_MORE_OFFERS_SUCCESS';
export const FETCH_MORE_OFFERS_FAIL = 'FETCH_MORE_OFFERS_FAIL';

export const SAVE_OFFER_LIST_SCROLL = 'SAVE_OFFER_LIST_SCROLL';

export const fetchMoreOffersSuccess = (
  data: Offer[],
  offset: number,
  limit: number,
  hasMore: boolean
) => ({
  type: FETCH_MORE_OFFERS_SUCCESS,
  data,
  offset,
  limit,
  hasMore,
});
export const fetchMoreOffersFail = () => ({
  type: FETCH_MORE_OFFERS_FAIL,
});

export const fetchMoreOffers = (): ThunkAction<
  Promise<void>,
  AppStore,
  {},
  AnyAction
> => {
  return async (dispatch, getState) => {
    const state = getState();
    const { limit, offset, loading } = state.offerList;

    if (loading) {
      return;
    }

    dispatch({ type: FETCH_MORE_OFFERS });

    try {
      const res = await fetch(
        `${config.url}/offers?status=published&offset=${offset}&limit=${limit}`
      );

      if (res.ok) {
        const data = await res.json();
        const totalCount = parseInt(res.headers.get('x-total-count') || '');
        let hasMore = true;

        if (process.env.NODE_ENV === 'production') {
          hasMore = offset + limit < totalCount ? true : false;
        }

        dispatch(fetchMoreOffersSuccess(data, offset + limit, limit, hasMore));
      } else {
        dispatch(fetchMoreOffersFail());
      }
    } catch {
      dispatch(fetchMoreOffersFail());
    }
  };
};

export const saveOfferListScroll = (scrollTop: number) => ({
  type: SAVE_OFFER_LIST_SCROLL,
  scrollTop,
});
