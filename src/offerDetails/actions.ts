import config from 'config';
import { Offer, OfferId } from 'core/models';
import { AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export const FETCH_OFFER_DETAILS = 'FETCH_OFFER_DETAILS';
export const FETCH_OFFER_DETAILS_SUCCESS = 'FETCH_OFFER_DETAILS_SUCCESS';
export const FETCH_OFFER_DETAILS_FAIL = 'FETCH_OFFER_DETAILS_FAIL';

export const fetchOfferDetailsSuccess = (data: Offer[]) => ({
  type: FETCH_OFFER_DETAILS_SUCCESS,
  data,
});
export const fetchOfferDetailsFail = () => ({
  type: FETCH_OFFER_DETAILS_FAIL,
});

export const fetchOfferDetails = (
  offerId: OfferId
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, any>) => {
    dispatch({ type: FETCH_OFFER_DETAILS });

    try {
      const res = await fetch(`${config.url}/offers/${offerId}`);

      if (res.ok) {
        const data = await res.json();
        dispatch(fetchOfferDetailsSuccess(data));
      } else {
        dispatch(fetchOfferDetailsFail());
      }
    } catch {
      dispatch(fetchOfferDetailsFail());
    }
  };
};
