import {
  FETCH_OFFER_DETAILS,
  FETCH_OFFER_DETAILS_FAIL,
  FETCH_OFFER_DETAILS_SUCCESS,
} from './actions';
import offerDetailsReducer, { OfferDetailsState } from './reducers';

describe('OfferList reducers', () => {
  const initState: OfferDetailsState = {
    loading: false,
    data: null,
  };

  it('should set loading on fetch', () => {
    const result = offerDetailsReducer(initState, {
      type: FETCH_OFFER_DETAILS,
    });

    expect(result.loading).toBe(true);
  });

  it('should set data and loading to false on fetch success', () => {
    const result = offerDetailsReducer(initState, {
      type: FETCH_OFFER_DETAILS_SUCCESS,
      data: {},
    });

    expect(result.loading).toBe(false);
    expect(result.data).toEqual({});
  });

  it('should set loading to false on fail', () => {
    const result = offerDetailsReducer(initState, {
      type: FETCH_OFFER_DETAILS_FAIL,
    });

    expect(result.loading).toBe(false);
  });
});
