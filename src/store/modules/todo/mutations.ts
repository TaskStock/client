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

const upValue = 1000;
const downValue = 1000;

export const addSimpleTodoMutation = (builder: TodoApiBuilder) =>
  builder.mutation<
    {
      todo_id: number;
    },
    {
      content: string;
      add_date: string;
      queryArgs: {
        date: useGetAllTodosQueryDate;
      };
    }
  >({
    query: (body) => {
      const simpleTodoForm: AddTodoForm = {
        todo_id: null,
        content: body.content,
        level: 0,
        project_id: null,
        repeat_day: "0000000",
        repeat_end_date: null,
      };

      return {
        url: "/todo/new",
        method: "POST",
        body: { ...simpleTodoForm, nowUTC: body.add_date },
      };
    },

    async onQueryStarted(body, { dispatch, queryFulfilled }) {
      const temp_todo_id = Math.random();

      const todo_replica: Todo = {
        content: body.content,
        todo_id: temp_todo_id,
        check: false,
        date: body.add_date,
        index: 0,
        project_id: null,
        level: 0,
        repeat_day: "0000000",
        repeat_end_date: null,
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

      try {
        const result = await queryFulfilled;

        const todo_id = result.data.todo_id;

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
              // draft.todos[todoIndex].index = index;
            }
          )
        );

        // index랑 date의 경우.
      } catch (error) {
        console.log(error);
        patchAddTodo.undo();
      }
    },
  });

export const addTodoMutation = (builder: TodoApiBuilder) =>
  builder.mutation<
    {
      todo_id: number;
    },
    {
      form: AddTodoForm;
      add_date: IsoString;
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

      // todo를 추가한 날짜가. 로컬기준 오늘의 오전 6시부터, 내일의 오전 6시 사이인지.
      // 만약에 그렇다면, 그래프값에도 반영해준다.
      if (checkIsWithInCurrentCalcDay(body.add_date)) {
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
      }

      dispatch(closeTodoModal());

      dispatch(
        updateCalendarItemTodoCountValue({ date: body.add_date, value: 1 })
      );

      try {
        const result = await queryFulfilled;
        const todo_id = result.data.todo_id;

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
              // draft.todos[todoIndex].index = index;
            }
          )
        );
      } catch (error) {
        console.log(error);
        patchAddTodo.undo();
        if (patchUpdateHighLowValue) patchUpdateHighLowValue.undo();
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

              if (body.original_level === undefined) {
                console.log("original level is undefined");
                return;
              }

              const diffLevel = body.form.level - body.original_level;

              if (body.todo_checked != undefined && body.todo_checked == true) {
                draft.values[index].end += diffLevel * upValue;
              }

              draft.values[index].high += diffLevel * upValue;
              draft.values[index].low -= diffLevel * downValue;
            }
          )
        );
      }

      dispatch(closeTodoModal());

      try {
        const result = await queryFulfilled;
      } catch (error) {
        console.log(error);
        patchUpdateTodo.undo();
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
              if (body.check) {
                draft.values[index].end += body.level * upValue;
              } else {
                draft.values[index].end -= body.level * downValue;
              }
            }
          )
        );
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

      if (checkIsWithInCurrentCalcDay(body.todo_date)) {
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
      }

      dispatch(
        updateCalendarItemTodoCountValue({ date: body.todo_date, value: -1 })
      );

      try {
        await queryFulfilled;
      } catch (error) {
        console.log(error);
        patchResult.undo();
        if (patchUpdateGraphEndValue) patchUpdateGraphEndValue.undo();
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

            draft.todos[index].date = nextDate.toISOString();
          }
        )
      );

      let patchUpdateGraphValue;

      if (checkIsWithInCurrentCalcDay(body.todo_date)) {
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
