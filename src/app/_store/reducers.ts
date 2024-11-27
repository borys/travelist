import { Offer } from "@/app/_models/offer";
import { createSlice } from "@reduxjs/toolkit";
import { fetchOffers } from "./actions";
import { RootState } from "@/app/store";

type FetchStatus = "pending" | "fulfilled" | "rejected";

export const offerListSlice = createSlice({
  name: "offerList",
  initialState: {
    data: [] as Offer[],
    status: undefined as FetchStatus | undefined,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOffers.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.data = [...state.data, ...action.payload];
    });
    builder.addCase(fetchOffers.rejected, (state) => {
      state.status = "rejected";
    });
  },
});

export const selectData = (state: RootState) => {
  return state.offerList.data;
};

export const selectStatus = (state: RootState) => {
  return state.offerList.status;
};
