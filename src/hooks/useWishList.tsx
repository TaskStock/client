import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import {
  resetWishList,
  updateWishList,
  useGetAllWishListQuery,
} from "../store/modules/market/market";

const limit = 10;

export const useWishList = () => {
  const { filterIndex, list, offset, refetchCount } = useAppSelect(
    (state) => state.market.wish
  );

  const dispatch = useAppDispatch();

  const timestamp = useRef<number>(new Date().getTime());

  const { data, isLoading, isError, refetch } = useGetAllWishListQuery(
    {
      filter: filterIndex === 0 ? "like" : "latest",
      offset: offset * limit,
      limit,
      count: refetchCount,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const incomingWishList = data?.wishlist;

  useEffect(() => {
    if (incomingWishList && incomingWishList.length > 0) {
      dispatch(
        updateWishList({
          wishlist: incomingWishList,
        })
      );
    }
  }, [dispatch, incomingWishList]);

  useEffect(() => {
    return () => {
      dispatch(resetWishList());
    };
  }, []);

  return { filterIndex, list, offset, isLoading, refetch };
};
