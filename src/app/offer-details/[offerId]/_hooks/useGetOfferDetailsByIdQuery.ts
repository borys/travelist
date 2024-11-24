import { useDispatch, useSelector } from "react-redux";
import { selectDataById, selectStatusById } from "../_store/reducers";
import { OfferId } from "@/app/_models/Offer";
import { AppDispatch, RootState } from "@/app/store";
import { useEffect } from "react";
import { fetchDetailsById } from "../_store/actions";

export function useGetOfferDetailsByIdQuery(offerId: OfferId) {
  const dispatch = useDispatch<AppDispatch>();

  const status = useSelector((state: RootState) =>
    selectStatusById(state, offerId),
  );
  const data = useSelector((state: RootState) =>
    selectDataById(state, offerId),
  );

  useEffect(() => {
    if (status === undefined) {
      dispatch(fetchDetailsById(offerId));
    }
  }, [dispatch, offerId, status]);

  const isUninitialized = status === undefined;
  const isLoading = status === 'pending' || status === undefined;
  const isError = status === 'rejected';
  const isSuccess = status === 'fulfilled';

  return {data, isUninitialized, isLoading, isError, isSuccess}
}
