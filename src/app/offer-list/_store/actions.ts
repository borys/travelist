
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
      `${config.url}/offers?_start=${offset}&_limit=${limit}`
    );
    const data = await response.json()
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data)
    }
    return data
  },
)
