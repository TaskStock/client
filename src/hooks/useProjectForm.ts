import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import {
  setProjectForm,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from "../store/modules/project/project";
import { useGetAllTodosQuery } from "../store/modules/todo/todo";
import { useGetAllTodoArgs } from "./useGetAllTodoArgs";

export const useProjectForm = () => {
  const form = useAppSelect((state) => state.project.projectForm);
  const dispatch = useAppDispatch();

  const isEditMode = form.project_id !== undefined;

  const [addProject] = useAddProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();

  const onChangeProjectPublic = (value) => {
    dispatch(
      setProjectForm({
        name: "public_range",
        value: value,
      })
    );
  };

  const onChangeProjectName = (value) => {
    dispatch(
      setProjectForm({
        name: "name",
        value: value,
      })
    );
  };

  const onChangeProjectProgress = (value) => {
    dispatch(
      setProjectForm({
        name: "finished",
        value: value,
      })
    );
  };

  const onChangeProjectEmoji = (value) => {
    dispatch(
      setProjectForm({
        name: "project_emoji",
        value: value,
      })
    );
  };

  const onSubmit = () => {
    console.log(form);

    if (isEditMode) {
      updateProject({
        project_id: form.project_id!,
        name: form.name,
        public_range: form.public_range,
        finished: form.finished,
        project_emoji: form.project_emoji,
      });
    } else {
      addProject({
        name: form.name,
        public_range: form.public_range,
        project_emoji: form.project_emoji,
      });
    }
  };

  const { date } = useGetAllTodoArgs();

  const onRemove = () => {
    deleteProject({
      project_id: form.project_id!,
      todo_query_arg: date,
    });
  };

  return {
    form,
    isEditMode,
    onChangeProjectPublic,
    onChangeProjectName,
    onChangeProjectProgress,
    onChangeProjectEmoji,
    onSubmit,
    onRemove,
  };
};
