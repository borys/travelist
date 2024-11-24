
import { Offer } from "@/app/_models/Offer";
import config from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

type FetchOffersPage = {
  offset: number,
  limit: number,
}

export const fetchOffers = createAsyncThunk<Offer[], FetchOffersPage>(
  'offerList/fetchOffers',
  async ({offset, limit}, { rejectWithValue }) => {
    const response = await fetch(
      `${config.url}/offers?status=published&offset=${offset}&limit=${limit}`
    );
    const data = await response.json()
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data)
    }
    return data
  },
)

// import config from 'config';
// import { Offer } from 'core/models';
// import { AppStore } from 'core/store';
// import { AnyAction } from 'redux';
// import { ThunkAction } from 'redux-thunk';

// export const FETCH_MORE_OFFERS = 'FETCH_OFFER_LIST';
// export const FETCH_MORE_OFFERS_SUCCESS = 'FETCH_MORE_OFFERS_SUCCESS';
// export const FETCH_MORE_OFFERS_FAIL = 'FETCH_MORE_OFFERS_FAIL';

// export const fetchMoreOffersSuccess = (
//   data: Offer[],
//   offset: number,
//   limit: number,
//   hasMore: boolean
// ) => ({
//   type: FETCH_MORE_OFFERS_SUCCESS,
//   data,
//   offset,
//   limit,
//   hasMore,
// });
// export const fetchMoreOffersFail = () => ({
//   type: FETCH_MORE_OFFERS_FAIL,
// });

// export const fetchMoreOffers = (): ThunkAction<
//   Promise<void>,
//   AppStore,
//   {},
//   AnyAction
// > => {
//   return async (dispatch, getState) => {
//     const state = getState();
//     const { limit, loading } = state.offerList;
//     let nextOffset = state.offerList.nextOffset;

//     if (loading) {
//       return;
//     }

//     dispatch({ type: FETCH_MORE_OFFERS });

//     try {
//       const res = await fetch(
//         `${config.url}/offers?status=published&offset=${nextOffset}&limit=${limit}`
//       );

//       if (res.ok) {
//         const data = await res.json();
//         const totalCount = parseInt(res.headers.get('x-total-count') || '');
//         let hasMore = true;

//         nextOffset = nextOffset + limit;

//         if (process.env.NODE_ENV === 'production') {
//           hasMore = nextOffset < totalCount ? true : false;
//         }

//         dispatch(fetchMoreOffersSuccess(data, nextOffset, limit, hasMore));
//       } else {
//         dispatch(fetchMoreOffersFail());
//       }
//     } catch {
//       dispatch(fetchMoreOffersFail());
//     }
//   };
// };
