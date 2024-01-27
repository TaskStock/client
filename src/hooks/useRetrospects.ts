import React, { useRef } from "react";
import {
  addAllRetrospectListItem,
  addProjectRetrospectListItem,
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
      dispatch(addProjectRetrospectListItem(data.retrospects));
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

  const { selectedFilter, searchKeyword, offset, list, selectedProjectId } =
    useAppSelect((state) => state.retrospect.allRetrospectQueries);

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

  const onPressProjectItem = (project_id: number) => {
    dispatch(
      setAllRetrospectQueries({
        selectedProjectId: project_id,
      })
    );
  };

  const onPressSelectedProjectFilter = () => {
    dispatch(
      setAllRetrospectQueries({
        selectedProjectId: undefined,
      })
    );
    // dispatch(
    //   setAllRetrospectQueries({
    //     selectedProjectId: undefined,
    //     offset: 0,
    //     searchKeyword: "",
    //     selectedFilter: "latest",
    //     list: [],
    //   })
    // );
  };

  const onScrollListBottom = () => {
    console.log("onScrollListBottom");

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
      dispatch(addAllRetrospectListItem(data.retrospects));
    }
  }, [data]);

  // 문제점: 회고가 추가되면 -> list를 한번 reset해야함. offset도 그렇고.
  // 그렇게 안하면, list에 중복된 회고가 들어감.
  // 문제는 그렇게 reset하면, query가 다시 시작되는데,
  // 그 다음 invalidate tags를 통해서 또 data를 가져오게 됨.
  // 그래서, data가 두번 들어가게 됨.

  const filteredList = React.useMemo(() => {
    if (selectedProjectId) {
      return list.filter((retrospect) => {
        return retrospect.project_id === selectedProjectId;
      });
    }
    return list;
  }, [list, selectedProjectId]);

  return {
    list,
    filteredList,
    selectedProjectId,
    isError,
    isLoading,
    selectedFilter,
    searchKeyword,
    onPressProjectItem,
    onPressSelectedProjectFilter,
    onPressFilter,
    onChangeSearchKeyword,
    onScrollListBottom,
  };
};
