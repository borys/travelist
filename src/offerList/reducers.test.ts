import {
  FETCH_MORE_OFFERS,
  FETCH_MORE_OFFERS_FAIL,
  FETCH_MORE_OFFERS_SUCCESS,
} from './actions';
import offerListReducer, { OfferListState } from './reducers';

describe('OfferList reducers', () => {
  const initState: OfferListState = {
    loading: false,
    hasMore: true,
    offset: 0,
    limit: 5,
    data: [],
  };

  it('should set loading on fetch', () => {
    const result = offerListReducer(initState, { type: FETCH_MORE_OFFERS });

    expect(result.loading).toBe(true);
  });

  it('should update store on success', () => {
    const result = offerListReducer(initState, {
      type: FETCH_MORE_OFFERS_SUCCESS,
      offset: 10,
      limit: 20,
      hasMore: false,
      data: [{}],
    });

    expect(result.loading).toBe(false);
    expect(result.offset).toBe(10);
    expect(result.limit).toBe(20);
    expect(result.hasMore).toBe(false);
    expect(result.data).toEqual([{}]);
  });

  it('should set loading to false on fail', () => {
    const result = offerListReducer(initState, {
      type: FETCH_MORE_OFFERS_FAIL,
    });

    expect(result.loading).toBe(false);
  });
});
