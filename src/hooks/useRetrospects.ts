import React, { useRef } from "react";
import {
  useGetAllProjectRetrospectQuery,
  useGetAllRetrospectQuery,
} from "../store/modules/retrospect/retrospect";
import { Retrospect } from "../@types/retrospect";
import _ from "lodash";

export const useProjectRetrospects = ({
  project_id,
}: {
  project_id: number;
}) => {
  const [selectedFilter, setSelectedFilter] = React.useState<
    "latest" | "earliest"
  >("latest");

  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [offset, setOffset] = React.useState(0);
  const [list, setList] = React.useState<Retrospect[]>([]);
  const limit = 10;

  const { data, isLoading, isError } = useGetAllProjectRetrospectQuery({
    project_id: project_id,
    offset: offset * limit,
    filter: selectedFilter,
    searchKeyword: searchKeyword,
    limit,
  });

  const setSearchKeywordDebounce = useRef<(value: string) => void>(
    _.debounce((value: string) => {
      setSearchKeyword(value);
    }, 500)
  ).current;

  const onScrollListBottom = () => {
    setOffset((prev) => prev + 1);
  };

  const onPressFilter = () => {
    if (selectedFilter === "latest") {
      setSelectedFilter("earliest");
    } else {
      setSelectedFilter("latest");
    }
  };

  React.useEffect(() => {
    setOffset(0);
    setList([]);
  }, [selectedFilter, searchKeyword]);

  React.useEffect(() => {
    if (data && data.retrospects && data.retrospects.length > 0) {
      setList((prev) => [...prev, ...data.retrospects]);
    }
  }, [data]);

  return {
    list,
    isError,
    isLoading,
    onPressFilter,
    selectedFilter,
    setSelectedFilter,
    searchKeyword,
    setSearchKeywordDebounce,
    onScrollListBottom,
  };
};

export const useRetrospects = () => {
  const [selectedFilter, setSelectedFilter] = React.useState<
    "latest" | "earliest"
  >("latest");

  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [offset, setOffset] = React.useState(0);
  const [list, setList] = React.useState<Retrospect[]>([]);
  const limit = 10;

  const { data, isLoading, isError, refetch } = useGetAllRetrospectQuery({
    offset: offset * limit,
    limit,
    filter: selectedFilter,
    searchKeyword: searchKeyword,
  });

  const setSearchKeywordDebounce = useRef<(value: string) => void>(
    _.debounce((value: string) => {
      setSearchKeyword(value);
    }, 500)
  ).current;

  const onScrollListBottom = () => {
    setOffset((prev) => prev + 1);
  };

  const onPressFilter = () => {
    if (selectedFilter === "latest") {
      setSelectedFilter("earliest");
    } else {
      setSelectedFilter("latest");
    }
  };

  const onFocus = () => {
    setOffset(0);
    setList([]);
    refetch();
  };

  React.useEffect(() => {
    setOffset(0);
    setList([]);
  }, [selectedFilter, searchKeyword]);

  React.useEffect(() => {
    if (data && data.retrospects && data.retrospects.length > 0) {
      setList((prev) => [...prev, ...data.retrospects]);
    }
  }, [data]);

  return {
    list,
    isError,
    isLoading,
    selectedFilter,
    setSelectedFilter,
    onPressFilter,
    onFocus,
    searchKeyword,
    setSearchKeywordDebounce,
    onScrollListBottom,
  };
};
