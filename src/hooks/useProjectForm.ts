import { useAppDispatch, useAppSelect } from "../store/configureStore.hooks";
import {
  setProjectForm,
  useAddProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from "../store/modules/project/project";

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
        name: "progress",
        value: value,
      })
    );
  };

  const onSubmit = () => {
    console.log(form.project_id);

    if (isEditMode) {
      updateProject({
        project_id: form.project_id!,
        name: form.name,
        public_range: form.public_range,
      });
    } else {
      addProject({
        name: form.name,
        public_range: form.public_range,
      });
    }
  };

  const onRemove = () => {
    deleteProject({
      project_id: form.project_id!,
    });
  };

  return {
    form,
    isEditMode,
    onChangeProjectPublic,
    onChangeProjectName,
    onChangeProjectProgress,
    onSubmit,
    onRemove,
  };
};
