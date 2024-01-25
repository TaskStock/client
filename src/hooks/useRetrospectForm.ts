import dayjs from "dayjs";
import { RootState } from "../store/configureStore";
import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import {
  resetAllRetrospectQueries,
  setRetrospectForm,
  useAddRetrospectMutation,
  useDelteRetrospectMutation,
  useUpdateRetrospectMutation,
} from "../store/modules/retrospect/retrospect";

export const useRetrospectForm = () => {
  const dispatch = useAppDispatch();
  const retrospectForm = useAppSelect(
    (state: RootState) => state.retrospect.retrospectForm
  );

  const retrospectDate = dayjs(retrospectForm.date).toDate();

  const [addRetrospect] = useAddRetrospectMutation();
  const [updateRetrospect] = useUpdateRetrospectMutation();
  const [deleteRetrospect] = useDelteRetrospectMutation();

  const isEdit = retrospectForm.retrospect_id !== undefined;

  const onChangeDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    const formattedDate = dayjs(currentDate).format("YYYY-MM-DD");

    dispatch(
      setRetrospectForm({
        name: "date",
        value: formattedDate,
      })
    );
  };

  const onChangeRetrospectContent = (text: string) => {
    dispatch(
      setRetrospectForm({
        name: "content",
        value: text,
      })
    );
  };

  const onAddRetrospect = () => {
    if (!retrospectForm.project_id) {
      console.log("project_id is undefined");
      return;
    }

    dispatch(resetAllRetrospectQueries());

    // add, update, delete mutation이 실행되면
    // offset과 list, searchKeyword, selectedFilter가 초기화되어야 한다.

    addRetrospect({
      form: retrospectForm,
    });
  };

  const onChangeProjectId = (project_id: number) => {
    dispatch(
      setRetrospectForm({
        name: "project_id",
        value: project_id,
      })
    );
  };

  const onDeleteRetrospect = () => {
    if (!retrospectForm.retrospect_id) return;

    dispatch(resetAllRetrospectQueries());

    deleteRetrospect({
      retrospect_id: retrospectForm.retrospect_id,
      project_id: retrospectForm.project_id,
    });
  };

  const onUpdateRetrospect = () => {
    if (!retrospectForm.retrospect_id) {
      console.log("retrospect_id is undefined");
      return;
    }

    if (!retrospectForm.project_id) {
      console.log("project_id is undefined");
      return;
    }

    dispatch(resetAllRetrospectQueries());

    updateRetrospect({
      retrospect_id: retrospectForm.retrospect_id,
      content: retrospectForm.content,
    });
  };

  return {
    retrospectForm,
    retrospectDate,
    isEdit,
    onChangeDate,
    onChangeProjectId,
    onAddRetrospect,
    onChangeRetrospectContent,
    onDeleteRetrospect,
    onUpdateRetrospect,
  };
};
