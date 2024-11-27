import { Offer, OfferId } from "@/app/_models/Offer";

import { fetchDetailsById } from "./actions";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

type FetchStatus = "pending" | "fulfilled" | "rejected";

export const offerDetailsSlice = createSlice({
  name: "offerDetails",
  initialState: {
    dataById: {} as Record<OfferId, Offer | undefined>,
    statusById: {} as Record<OfferId, FetchStatus | undefined>,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDetailsById.pending, (state, action) => {
      state.statusById[action.meta.arg] = "pending";
    });
    builder.addCase(fetchDetailsById.fulfilled, (state, action) => {
      state.statusById[action.meta.arg] = "fulfilled";
      state.dataById[action.meta.arg] = action.payload;
    });
    builder.addCase(fetchDetailsById.rejected, (state, action) => {
      state.statusById[action.meta.arg] = "rejected";
    });
  },
});

export const selectDataById = (state: RootState, offerId: OfferId) => {
  return state.offerDetails.dataById[offerId];
};

export const selectStatusById = (state: RootState, offerId: OfferId) => {
  return state.offerDetails.statusById[offerId];
};
