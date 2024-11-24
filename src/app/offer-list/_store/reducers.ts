// import config from 'config';
// import { Offer } from 'core/models';
// import { AnyAction, Reducer } from 'redux';

import { Offer } from "@/app/_models/Offer";
import { createSlice } from "@reduxjs/toolkit";
import { fetchOffers } from "./actions";
import { RootState } from "@/app/store";

type FetchStatus = 'pending' | 'fulfilled' | 'rejected';

export const offerListSlice = createSlice({
  name: 'offerList',
  initialState: {
    data: [] as Offer[],
    status: undefined as FetchStatus | undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOffers.pending, (state) => {
      state.status = 'pending';
    })
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.data = [...state.data, ...action.payload];
    })
    builder.addCase(fetchOffers.rejected, (state) => {
      state.status = 'rejected';
    })
  }
});

export const selectData = (state: RootState) => {
  return state.offerList.data;
}

export const selectStatus = (state: RootState) => {
  return state.offerList.status;
}



// import {
//   FETCH_MORE_OFFERS,
//   FETCH_MORE_OFFERS_FAIL,
//   FETCH_MORE_OFFERS_SUCCESS,
// } from './actions';

// export interface OfferListState {
//   loading: boolean;
//   hasMore: boolean;
//   nextOffset: number;
//   limit: number;
//   data: Offer[];
// }

// export const initState: OfferListState = {
//   loading: false,
//   hasMore: true,
//   nextOffset: 0,
//   limit: config.perPage,
//   data: [],
// };

// const offerListReducer: Reducer<OfferListState, AnyAction> = (
//   state: OfferListState | undefined,
//   action: AnyAction
// ) => {
//   if (state === undefined) {
//     return initState;
//   }

//   switch (action.type) {
//     case FETCH_MORE_OFFERS:
//       return {
//         ...state,
//         loading: true,
//       };
//     case FETCH_MORE_OFFERS_FAIL:
//       return {
//         ...state,
//         loading: false,
//       };
//     case FETCH_MORE_OFFERS_SUCCESS:
//       return {
//         ...state,
//         nextOffset: action.offset,
//         limit: action.limit,
//         hasMore: action.hasMore,
//         data: [...state.data, ...action.data],
//         loading: false,
//       };
//     default:
//       return state;
//   }
// };

// export default offerListReducer;
