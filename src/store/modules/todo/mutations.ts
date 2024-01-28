import { AddTodoForm, Todo } from "../../../@types/todo";
import { TodoApiBuilder, closeTodoModal, todoApi } from "./todo";
import {
  checkIsWithInCurrentCalcDay,
  checkIsSameLocalDay,
  checkIsWithInOneDay,
} from "../../../utils/checkIsSameLocalDay";
import {
  chartApi,
  useGetValuesQueryEndDate,
  useGetValuesQueryStartDate,
} from "../chart";
import { Value } from "../../../@types/chart";
import { IsoString } from "../../../@types/calendar";
import { useGetAllTodosQueryDate } from "./queries";
import dayjs from "dayjs";
import { updateCalendarItemTodoCountValue } from "../calendar";
import { saveValueUpdate, savedValueUpdate } from "../home";
import { projectApi } from "../project/project";
import { Project } from "../../../@types/project";

const upValue = 1000;
const downValue = 1000;

// export const addSimpleTodoMutation = (builder: TodoApiBuilder) =>
//   builder.mutation<
//     {
//       todo_id: number;
//     },
//     {
//       content: string;
//       add_date: string;
//       queryArgs: {
//         date: useGetAllTodosQueryDate;
//       };
//     }
//   >({
//     query: (body) => {
//       const simpleTodoForm: AddTodoForm = {
//         todo_id: null,
//         content: body.content,
//         level: 0,
//         project_id: null,
//         repeat_day: "0000000",
//         repeat_end_date: null,
//       };

//       return {
//         url: "/todo/new",
//         method: "POST",
//         body: { ...simpleTodoForm, nowUTC: body.add_date },
//       };
//     },

//     async onQueryStarted(body, { dispatch, queryFulfilled }) {
//       const temp_todo_id = Math.random();

//       const todo_replica: Todo = {
//         content: body.content,
//         todo_id: temp_todo_id,
//         check: false,
//         date: body.add_date,
//         index: 0,
//         project_id: null,
//         level: 0,
//         repeat_day: "0000000",
//         repeat_end_date: null,
//       };

//       const patchAddTodo = dispatch(
//         todoApi.util.updateQueryData(
//           "getAllTodos",
//           { date: body.queryArgs.date },
//           (draft: { todos: Todo[] }) => {
//             draft.todos.push(todo_replica);
//           }
//         )
//       );

//       try {
//         const result = await queryFulfilled;

//         const todo_id = result.data.todo_id;

//         // 임시 아이디를 실제 아이디로 바꿔준다.
//         dispatch(
//           todoApi.util.updateQueryData(
//             "getAllTodos",
//             { date: body.queryArgs.date },
//             (draft: { todos: Todo[] }) => {
//               const todoIndex = draft.todos.findIndex(
//                 (todo) => todo.todo_id === temp_todo_id
//               );
//               if (todoIndex === -1) return;
//               draft.todos[todoIndex].todo_id = todo_id;
//               // draft.todos[todoIndex].index = index;
//             }
//           )
//         );

//         // index랑 date의 경우.
//       } catch (error) {
//         console.log(error);
//         patchAddTodo.undo();
//       }
//     },
//   });

export const addTodoMutation = (builder: TodoApiBuilder) =>
  builder.mutation<
    {
      todo_id: number;
      index: number;
    },
    {
      form: AddTodoForm;
      add_date: IsoString;
      isHomeDrawerOpen: boolean;
      queryArgs: {
        date: useGetAllTodosQueryDate;
        graph_before_date: useGetValuesQueryStartDate;
        graph_today_date: useGetValuesQueryEndDate;
      };
    }
  >({
    query: (body) => {
      return {
        url: "/todo/new",
        method: "POST",
        body: { ...body.form, nowUTC: body.add_date },
      };
    },

    async onQueryStarted(body, { dispatch, queryFulfilled }) {
      const temp_todo_id = Math.random();

      const todo_replica = {
        ...body.form,
        todo_id: temp_todo_id,
        check: false,
        date: body.add_date,
        index: 0,
      };

      const patchAddTodo = dispatch(
        todoApi.util.updateQueryData(
          "getAllTodos",
          { date: body.queryArgs.date },
          (draft: { todos: Todo[] }) => {
            draft.todos.push(todo_replica);
          }
        )
      );

      // 오늘 날짜라면, 그래프값에도 반영해준다.

      let patchUpdateHighLowValue;
      let patchSaveValueUpdate;
      let patchUpdateCalendarItemTodoCount;
      let patchUpdateProjectTodoCount;

      if (checkIsWithInCurrentCalcDay(body.add_date)) {
        if (body.isHomeDrawerOpen === false) {
          patchUpdateHighLowValue = dispatch(
            chartApi.util.updateQueryData(
              "getValues",
              {
                startDate: body.queryArgs.graph_before_date,
                endDate: body.queryArgs.graph_today_date,
              },
              ({ values }) => {
                const index = values.findIndex((value) => {
                  return checkIsWithInOneDay(value.date, body.add_date);
                });

                if (index === -1) {
                  console.log("no value matches on add todo");
                  return;
                }

                values[index].high += body.form.level * upValue;
                values[index].low -= body.form.level * downValue;
              }
            )
          );
        } else {
          console.log("save value");

          patchSaveValueUpdate = dispatch(
            saveValueUpdate([
              {
                key: "dhigh",
                value: body.form.level * upValue,
              },
              {
                key: "dlow",
                value: body.form.level * downValue,
              },
            ])
          );
        }
      }

      dispatch(closeTodoModal());

      patchUpdateCalendarItemTodoCount = dispatch(
        updateCalendarItemTodoCountValue({ date: body.add_date, value: 1 })
      );

      if (body.form.project_id !== null)
        patchUpdateProjectTodoCount = dispatch(
          projectApi.util.updateQueryData(
            "getAllProjects",
            undefined,
            (draft: { projects: Project[] }) => {
              const index = draft.projects.findIndex(
                (project) => project.project_id === body.form.project_id
              );

              if (index === -1) return;

              draft.projects[index].todo_count += 1;
            }
          )
        );

      try {
        const result = await queryFulfilled;
        const { todo_id, index } = result.data;

        // 임시 아이디를 실제 아이디로 바꿔준다.

        dispatch(
          todoApi.util.updateQueryData(
            "getAllTodos",
            { date: body.queryArgs.date },
            (draft: { todos: Todo[] }) => {
              const todoIndex = draft.todos.findIndex(
                (todo) => todo.todo_id === temp_todo_id
              );
              if (todoIndex === -1) return;
              draft.todos[todoIndex].todo_id = todo_id;
              draft.todos[todoIndex].index = index;
            }
          )
        );
      } catch (error) {
        console.log(error);
        patchAddTodo.undo();
        if (patchUpdateHighLowValue) patchUpdateHighLowValue.undo();
        if (patchSaveValueUpdate) patchSaveValueUpdate.undo();
        if (patchUpdateCalendarItemTodoCount)
          patchUpdateCalendarItemTodoCount.undo();
        if (patchUpdateProjectTodoCount) patchUpdateProjectTodoCount.undo();
      }
    },

    // 만약에 todo add시에 반복이 있는경우에는, 캐싱을 다 지워주어야 한다.
    // invalidatesTags: (result, error, body) => {
    //   if (!error && body.form.repeat_day !== "0000000") {
    //     return ["Todos"];
    //   } else {
    //     return [];
    //   }
    // },
  });

export const editTodoMutation = (builder: TodoApiBuilder) =>
  builder.mutation<
    {},
    {
      form: AddTodoForm;
      todo_date: string;
      todo_checked: boolean;
      original_level?: number;
      isHomeDrawerOpen: boolean;
      queryArgs: {
        date: useGetAllTodosQueryDate;
        graph_before_date: useGetValuesQueryStartDate;
        graph_today_date: useGetValuesQueryEndDate;
      };
    }
  >({
    query: (body) => {
      return {
        url: "/todo/update",
        method: "PUT",
        body: body.form,
      };
    },

    async onQueryStarted(body, { dispatch, queryFulfilled }) {
      const patchUpdateTodo = dispatch(
        todoApi.util.updateQueryData(
          "getAllTodos",
          { date: body.queryArgs.date },
          (draft: { todos: Todo[] }) => {
            if (body.form.todo_id === null) return;

            const index = draft.todos.findIndex(
              (todo) => todo.todo_id === body.form.todo_id
            );

            if (index === -1) return;

            draft.todos[index] = {
              ...draft.todos[index],
              ...body.form,
              todo_id: draft.todos[index].todo_id,
            };
          }
        )
      );

      let patchUpdateGraphValue;

      if (body.todo_date && checkIsWithInCurrentCalcDay(body.todo_date)) {
        if (body.original_level === undefined) {
          console.log("original level is undefined");
          return;
        }

        const diffLevel = body.form.level - body.original_level;

        if (body.isHomeDrawerOpen === false) {
          patchUpdateGraphValue = dispatch(
            chartApi.util.updateQueryData(
              "getValues",
              {
                startDate: body.queryArgs.graph_before_date,
                endDate: body.queryArgs.graph_today_date,
              },
              (draft: { values: Value[] }) => {
                console.log("editTodo update graph value");

                const index = draft.values.findIndex((value) => {
                  return checkIsWithInOneDay(value.date, body.todo_date);
                });

                if (index === -1) {
                  console.log("editTodo : no value matches on todo");
                  return;
                }

                if (
                  body.todo_checked != undefined &&
                  body.todo_checked == true
                ) {
                  draft.values[index].end += diffLevel * upValue;
                }

                draft.values[index].high += diffLevel * upValue;
                draft.values[index].low -= diffLevel * downValue;
              }
            )
          );
        } else {
          console.log("save value");

          let updates: {
            key: keyof savedValueUpdate;
            value: number;
          }[] = [
            {
              key: "dhigh",
              value: diffLevel * upValue,
            },
            {
              key: "dlow",
              value: diffLevel * downValue,
            },
          ];

          if (body.todo_checked != undefined && body.todo_checked == true) {
            updates.push({
              key: "dend",
              value: diffLevel * upValue,
            });
          }

          patchUpdateGraphValue = dispatch(saveValueUpdate(updates));
        }
      }

      dispatch(closeTodoModal());

      try {
        const result = await queryFulfilled;
      } catch (error) {
        console.log(error);
        patchUpdateTodo.undo();
        if (patchUpdateGraphValue) patchUpdateGraphValue.undo();
      }
    },
  });

export const toggleTodoMutation = (builder: TodoApiBuilder) =>
  builder.mutation({
    query: (body: {
      todo_id: number;
      check: boolean;
      todo_date: string;
      level: number;
      isHomeDrawerOpen: boolean;
      queryArgs: {
        current_date: useGetAllTodosQueryDate;
        graph_before_date: useGetValuesQueryStartDate;
        graph_today_date: useGetValuesQueryEndDate;
      };
    }) => {
      return {
        url: "/todo/checktoggle",
        method: "POST",
        body,
      };
    },

    async onQueryStarted(body, { dispatch, queryFulfilled }) {
      const patchResult = dispatch(
        todoApi.util.updateQueryData(
          "getAllTodos",
          { date: body.queryArgs.current_date },
          (draft: { todos: Todo[] }) => {
            const index = draft.todos.findIndex(
              (todo) => todo.todo_id === body.todo_id
            );
            draft.todos[index].check = !draft.todos[index].check;
          }
        )
      );

      let patchUpdateGraphValue;

      // 오늘 날짜라면, 토글해서 check 했을때, 그래프값에도 반영해준다.
      if (checkIsWithInCurrentCalcDay(body.todo_date)) {
        let updateValue = body.check
          ? body.level * upValue
          : -body.level * downValue;

        console.log("isHomeDrawerOpen", body.isHomeDrawerOpen);

        if (body.isHomeDrawerOpen === false) {
          patchUpdateGraphValue = dispatch(
            chartApi.util.updateQueryData(
              "getValues",
              {
                startDate: body.queryArgs.graph_before_date,
                endDate: body.queryArgs.graph_today_date,
              },
              (draft: { values: Value[] }) => {
                const index = draft.values.findIndex((value) => {
                  return checkIsWithInOneDay(value.date, body.todo_date);
                });
                if (index === -1) {
                  console.log("no value matches on todo");
                  return;
                }

                draft.values[index].end += updateValue;
              }
            )
          );
        } else {
          console.log("save value", updateValue, body.check);

          let updates: {
            key: keyof savedValueUpdate;
            value: number;
          }[] = [
            {
              key: "dend",
              value: updateValue,
            },
          ];

          patchUpdateGraphValue = dispatch(saveValueUpdate(updates));
        }
      } else {
        console.log("not today todo");
      }

      try {
        const result = await queryFulfilled;
      } catch (error) {
        console.log(error);
        patchResult.undo();
        if (patchUpdateGraphValue) patchUpdateGraphValue.undo();
      }
    },
  });

export const deleteTodoMutation = (builder: TodoApiBuilder) =>
  builder.mutation<
    {},
    {
      todo_id: number;
      todo_date: IsoString;
      value: number;
      checked: boolean;
      project_id: number | null;
      isHomeDrawerOpen: boolean;
      queryArgs: {
        date: useGetAllTodosQueryDate;
        graph_before_date: useGetValuesQueryStartDate;
        graph_today_date: useGetValuesQueryEndDate;
      };
    }
  >({
    query: (body) => {
      return {
        url: "/todo/delete",
        method: "DELETE",
        body,
      };
    },

    async onQueryStarted(body, { dispatch, queryFulfilled }) {
      const patchResult = dispatch(
        todoApi.util.updateQueryData(
          "getAllTodos",
          { date: body.queryArgs.date },
          (draft: { todos: Todo[] }) => {
            const index = draft.todos.findIndex(
              (todo) => todo.todo_id === body.todo_id
            );
            draft.todos.splice(index, 1);
          }
        )
      );

      let patchUpdateGraphEndValue;
      let patchUpdateProjectTodoCount;
      let patchUpdateCalendarItemTodoCount;

      if (checkIsWithInCurrentCalcDay(body.todo_date)) {
        if (body.isHomeDrawerOpen === false) {
          patchUpdateGraphEndValue = dispatch(
            chartApi.util.updateQueryData(
              "getValues",
              {
                startDate: body.queryArgs.graph_before_date,
                endDate: body.queryArgs.graph_today_date,
              },
              (draft: { values: Value[] }) => {
                const index = draft.values.findIndex((value) => {
                  return checkIsWithInOneDay(value.date, body.todo_date);
                });

                if (index === -1) {
                  console.log("deleteTodo: no value matches on todo");
                  return;
                }

                if (body.checked) {
                  draft.values[index].end -= body.value;
                }

                draft.values[index].high -= body.value;
                draft.values[index].low += body.value;
              }
            )
          );
        } else {
          console.log("save value");

          let updates: {
            key: keyof savedValueUpdate;
            value: number;
          }[] = [
            {
              key: "dhigh",
              value: -body.value,
            },
            {
              key: "dlow",
              value: body.value,
            },
          ];

          if (body.checked) {
            updates.push({
              key: "dend",
              value: -body.value,
            });
          }

          patchUpdateGraphEndValue = dispatch(saveValueUpdate(updates));
        }
      }

      patchUpdateCalendarItemTodoCount = dispatch(
        updateCalendarItemTodoCountValue({ date: body.todo_date, value: -1 })
      );

      if (body.project_id !== null)
        patchUpdateProjectTodoCount = dispatch(
          projectApi.util.updateQueryData(
            "getAllProjects",
            undefined,
            (draft: { projects: Project[] }) => {
              const index = draft.projects.findIndex(
                (project) => project.project_id === body.project_id
              );

              if (index === -1) return;

              draft.projects[index].todo_count -= 1;
            }
          )
        );

      try {
        await queryFulfilled;
      } catch (error) {
        console.log(error);
        patchResult.undo();
        if (patchUpdateGraphEndValue) patchUpdateGraphEndValue.undo();
        if (patchUpdateProjectTodoCount) patchUpdateProjectTodoCount.undo();
        if (patchUpdateCalendarItemTodoCount)
          patchUpdateCalendarItemTodoCount.undo();
      }
    },
  });

export const changeTodoOrderMutation = (builder: TodoApiBuilder) =>
  builder.mutation<
    {},
    {
      selectedProjectId: number | null;
      current_day_todos: Todo[];
      changed_todos_item: {
        todo_id: number;
        changed_index: number;
      }[];
      requested_date_full: IsoString;
      queryArgs: {
        requested_date: useGetAllTodosQueryDate;
      };
    }
  >({
    query: (body) => {
      return {
        url: "/todo/index",
        method: "PUT",
        body: {
          changed_todos: body.changed_todos_item,
        },
      };
    },

    async onQueryStarted(body, { dispatch, queryFulfilled }) {
      const { changed_todos_item, current_day_todos } = body;

      let order_and_index_changed_todos: Todo[] = current_day_todos.map(
        (todo) => {
          const index = changed_todos_item.findIndex(
            (item) => item.todo_id === todo.todo_id
          );

          if (index === -1) {
            return todo;
          }

          return {
            ...todo,
            index: changed_todos_item[index].changed_index,
          };
        }
      );

      order_and_index_changed_todos.sort((a, b) => {
        return a.index - b.index;
      });

      const dispatchChangeTodoIndex = dispatch(
        todoApi.util.updateQueryData(
          "getAllTodos",
          { date: body.queryArgs.requested_date },
          (draft: { todos: Todo[] }) => {
            const { selectedProjectId } = body;

            if (selectedProjectId === null) {
              draft.todos = [
                ...draft.todos.filter(
                  (todo) =>
                    !checkIsSameLocalDay(todo.date, body.requested_date_full)
                ),
                ...order_and_index_changed_todos,
              ];
            } else {
              draft.todos = [
                ...draft.todos.filter(
                  (todo) =>
                    !checkIsSameLocalDay(todo.date, body.requested_date_full)
                ),
                ...order_and_index_changed_todos,
              ];
            }
          }
        )
      );

      try {
        await queryFulfilled;
      } catch (error) {
        console.log(error);
        dispatchChangeTodoIndex.undo();
      }
    },
  });

export const changeToNextDayTodoMutation = (builder: TodoApiBuilder) =>
  builder.mutation<
    {},
    {
      todo_id: number;
      todo_date: IsoString;
      todo_level: number;
      todo_checked: boolean;
      isHomeDrawerOpen: boolean;
      queryArgs: {
        current_date: useGetAllTodosQueryDate;
        graph_before_date: useGetValuesQueryStartDate;
        graph_today_date: useGetValuesQueryEndDate;
      };
    }
  >({
    query: (body) => {
      return {
        url: "/todo/tomorrow",
        method: "POST",
        body: {
          todo_id: body.todo_id,
        },
      };
    },

    async onQueryStarted(body, { dispatch, queryFulfilled }) {
      const patchResult = dispatch(
        todoApi.util.updateQueryData(
          "getAllTodos",
          { date: body.queryArgs.current_date },
          (draft: { todos: Todo[] }) => {
            const index = draft.todos.findIndex(
              (todo) => todo.todo_id === body.todo_id
            );

            const nextDate = dayjs(body.todo_date).add(1, "day");

            draft.todos[index].date = nextDate.toISOString() as IsoString;
          }
        )
      );

      let patchUpdateGraphValue;

      if (checkIsWithInCurrentCalcDay(body.todo_date)) {
        if (body.isHomeDrawerOpen === false) {
          patchUpdateGraphValue = dispatch(
            chartApi.util.updateQueryData(
              "getValues",
              {
                startDate: body.queryArgs.graph_before_date,
                endDate: body.queryArgs.graph_today_date,
              },
              (draft: { values: Value[] }) => {
                const index = draft.values.findIndex((value) => {
                  return checkIsWithInOneDay(value.date, body.todo_date);
                });

                if (index === -1) {
                  console.log("changeToNextDayTodo: no value matches on todo");
                  return;
                }

                draft.values[index].high -= body.todo_level * upValue;
                draft.values[index].low += body.todo_level * downValue;

                if (body.todo_checked) {
                  draft.values[index].end -= body.todo_level * upValue;
                }
              }
            )
          );
        } else {
          console.log("save value");

          let updates: {
            key: keyof savedValueUpdate;
            value: number;
          }[] = [
            {
              key: "dhigh",
              value: -body.todo_level * upValue,
            },
            {
              key: "dlow",
              value: body.todo_level * downValue,
            },
          ];

          if (body.todo_checked) {
            updates.push({
              key: "dend",
              value: -body.todo_level * upValue,
            });
          }

          patchUpdateGraphValue = dispatch(saveValueUpdate(updates));
        }
      }

      dispatch(
        updateCalendarItemTodoCountValue({ date: body.todo_date, value: -1 })
      );

      dispatch(
        updateCalendarItemTodoCountValue({
          date: dayjs(body.todo_date).add(1, "day").toISOString() as IsoString,
          value: +1,
        })
      );

      try {
        await queryFulfilled;
      } catch (error) {
        console.log(error);
        patchResult.undo();
        if (patchUpdateGraphValue) patchUpdateGraphValue.undo();
      }
    },
  });
