import React, { useRef } from "react";
import {
  increateAllRetrospectQueriesOffset,
  increateProjectRetrospectQueriesOffset,
  setAllRetrospectQueries,
  setProjectRetrospectQueries,
  useGetAllProjectRetrospectQuery,
  useGetAllRetrospectQuery,
} from "../store/modules/retrospect/retrospect";
import _ from "lodash";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";

export const useProjectRetrospects = ({
  project_id,
}: {
  project_id: number;
}) => {
  const limit = 10;

  const dispatch = useAppDispatch();

  const { selectedFilter, searchKeyword, offset, list } = useAppSelect(
    (state) => state.retrospect.projectRetrospectQueries
  );

  const { data, isLoading, isError } = useGetAllProjectRetrospectQuery({
    offset: offset * limit,
    limit,
    filter: selectedFilter,
    searchKeyword: searchKeyword,
    project_id,
  });

  const setSearchKeywordDebounce = useRef<(value: string) => void>(
    _.debounce((value: string) => {
      dispatch(
        setProjectRetrospectQueries({
          searchKeyword: value,
        })
      );
    }, 500)
  ).current;

  const onChangeSearchKeyword = (value: string) => {
    dispatch(
      setProjectRetrospectQueries({
        list: [],
        offset: 0,
      })
    );
    setSearchKeywordDebounce(value);
  };

  const onScrollListBottom = () => {
    dispatch(increateProjectRetrospectQueriesOffset());
  };

  const onPressFilter = () => {
    dispatch(setProjectRetrospectQueries({ offset: 0, list: [] }));

    if (selectedFilter === "latest") {
      dispatch(
        setProjectRetrospectQueries({
          selectedFilter: "earliest",
        })
      );
    } else {
      dispatch(
        setProjectRetrospectQueries({
          selectedFilter: "latest",
        })
      );
    }
  };

  React.useEffect(() => {
    if (data && data.retrospects && data.retrospects.length > 0) {
      dispatch(
        setProjectRetrospectQueries({
          list: [...list, ...data.retrospects],
        })
      );
    }
  }, [data]);

  return {
    list,
    isError,
    isLoading,
    selectedFilter,
    searchKeyword,
    onPressFilter,
    onChangeSearchKeyword,
    onScrollListBottom,
  };
};

export const useRetrospects = () => {
  const limit = 10;

  const dispatch = useAppDispatch();

  const { selectedFilter, searchKeyword, offset, list } = useAppSelect(
    (state) => state.retrospect.allRetrospectQueries
  );

  const { data, isLoading, isError } = useGetAllRetrospectQuery({
    offset: offset * limit,
    limit,
    filter: selectedFilter,
    searchKeyword: searchKeyword,
  });

  const setSearchKeywordDebounce = useRef<(value: string) => void>(
    _.debounce((value: string) => {
      dispatch(
        setAllRetrospectQueries({
          searchKeyword: value,
        })
      );
    }, 500)
  ).current;

  const onChangeSearchKeyword = (value: string) => {
    dispatch(
      setAllRetrospectQueries({
        list: [],
        offset: 0,
      })
    );
    setSearchKeywordDebounce(value);
  };

  const onScrollListBottom = () => {
    dispatch(increateAllRetrospectQueriesOffset());
  };

  const onPressFilter = () => {
    dispatch(setAllRetrospectQueries({ offset: 0, list: [] }));

    if (selectedFilter === "latest") {
      dispatch(
        setAllRetrospectQueries({
          selectedFilter: "earliest",
        })
      );
    } else {
      dispatch(
        setAllRetrospectQueries({
          selectedFilter: "latest",
        })
      );
    }
  };

  React.useEffect(() => {
    if (data && data.retrospects && data.retrospects.length > 0) {
      dispatch(
        setAllRetrospectQueries({
          list: [...list, ...data.retrospects],
        })
      );
    }
  }, [data]);

  return {
    list,
    isError,
    isLoading,
    selectedFilter,
    onPressFilter,
    searchKeyword,
    onChangeSearchKeyword,
    onScrollListBottom,
  };
};
