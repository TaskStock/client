import { useEffect, useState } from "react";
import { client } from "../services/api";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";

const useUser = () => {
  const { user, loading, error } = useAppSelect((state) => state.user);

  return { user, loading, error };
};

export default useUser;
