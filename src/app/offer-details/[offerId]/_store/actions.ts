import { createAsyncThunk } from "@reduxjs/toolkit";
import config from "@/config";
import { Offer, OfferId } from "@/app/_models/offer";

export const fetchDetailsById = createAsyncThunk<Offer, OfferId>(
  "offerDetails/fetchDetailsById",
  async (offerId, { rejectWithValue }) => {
    const response = await fetch(`${config.url}/offers/${offerId}`);
    const data = await response.json();
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  },
);
