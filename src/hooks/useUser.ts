import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import { getUserInfoThunk } from "../utils/UserUtils/getUserInfoThunk";

const useUser = () => {
  const { user, loading, error } = useAppSelect((state) => state.user);
  const dispatch = useAppDispatch();

  const refetch = () => {
    dispatch(getUserInfoThunk());
  };

  return { user, loading, error, refetch };
};

export default useUser;
