import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import { EndpointBuilder } from "@reduxjs/toolkit/query";
import { AddTodoForm, Todo } from "../../../@types/todo";
import { TodoApiBuilder, closeTodoModal, todoApi } from "./todo";
import {
  checkIsLocalToday,
  checkIsSameLocalDay,
} from "../../../utils/checkIsSameLocalDay";
import { chartApi } from "../chart";
import { Value } from "../../../@types/chart";
import { DateString } from "../../../@types/calendar";

export const addSimpleTodoMutation = (builder: TodoApiBuilder) =>
  builder.mutation<
    {
      todo_id: number;
    },
    {
      content: string;
      add_date: string;
      queryArgs: {
        date: DateString;
      };
    }
  >({
    query: (body: { content: string; add_date: string }) => {
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
        body: simpleTodoForm,
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
              const index = draft.todos.findIndex(
                (todo) => todo.todo_id === temp_todo_id
              );
              if (index === -1) return;
              draft.todos[index].todo_id = todo_id;
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
      add_date: string;
      queryArgs: {
        date: DateString;
        graph_before_date: DateString;
        graph_today_date: DateString;
      };
    }
  >({
    query: (body: { form: AddTodoForm }) => {
      return {
        url: "/todo/new",
        method: "POST",
        body: body.form,
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

      if (checkIsLocalToday(body.add_date)) {
        patchUpdateHighLowValue = dispatch(
          chartApi.util.updateQueryData(
            "getValues",
            {
              startDate: body.queryArgs.graph_before_date,
              endDate: body.queryArgs.graph_today_date,
            },
            ({ values }) => {
              const index = values.findIndex((value) => {
                return checkIsSameLocalDay(value.date, body.add_date);
              });

              if (index === -1) {
                console.log("no value matches on add todo");
                return;
              }

              const value = body.form.level * 1000;

              values[index].high += value;
              values[index].low -= value;
            }
          )
        );
      }
      try {
        const result = await queryFulfilled;

        const todo_id = result.data.todo_id;

        // 임시 아이디를 실제 아이디로 바꿔준다.
        dispatch(
          todoApi.util.updateQueryData(
            "getAllTodos",
            { date: body.queryArgs.date },
            (draft: { todos: Todo[] }) => {
              const index = draft.todos.findIndex(
                (todo) => todo.todo_id === temp_todo_id
              );
              if (index === -1) return;
              draft.todos[index].todo_id = todo_id;
            }
          )
        );

        dispatch(closeTodoModal());
      } catch (error) {
        console.log(error);
        patchAddTodo.undo();
        if (patchUpdateHighLowValue) patchUpdateHighLowValue.undo();
      }
    },

    // 만약에 todo add시에 반복이 있는경우에는, 캐싱을 다 지워주어야 한다.
    invalidatesTags: (result, error, body) => {
      if (!error && body.form.repeat_day !== "0000000") {
        return ["Todos"];
      } else {
        return [];
      }
    },
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
        date: DateString;
        graph_before_date: DateString;
        graph_today_date: DateString;
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

      if (body.todo_date && checkIsLocalToday(body.todo_date)) {
        patchUpdateGraphValue = dispatch(
          chartApi.util.updateQueryData(
            "getValues",
            {
              startDate: body.queryArgs.graph_before_date,
              endDate: body.queryArgs.graph_today_date,
            },
            (draft: { values: Value[] }) => {
              console.log("editTodo update graph value");

              console.log(body.original_level);

              const index = draft.values.findIndex((value) => {
                return checkIsSameLocalDay(value.date, body.todo_date);
              });

              if (index === -1) {
                console.log("editTodo : no value matches on todo");
                return;
              }

              // if (!body.original_level) {
              //   console.log("no original level");
              //   return;
              // }

              if (body.original_level === undefined) {
                console.log("original level is undefined");
                return;
              }

              const diffLevel = body.form.level - body.original_level;

              if (body.todo_checked != undefined && body.todo_checked == true) {
                draft.values[index].end += diffLevel * 1000;
              }

              draft.values[index].high += diffLevel * 1000;
              draft.values[index].low -= diffLevel * 1000;
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

    invalidatesTags: (result, error, body) => {
      if (!error && body.form.repeat_day !== "0000000") {
        return ["Todos"];
      } else {
        return [];
      }
    },
  });

export const toggleTodoMutation = (builder: TodoApiBuilder) =>
  builder.mutation({
    query: (body: {
      todo_id: number;
      check: boolean;
      todo_date: string;
      value: number;
      queryArgs: {
        current_date: DateString;
        graph_before_date: DateString;
        graph_today_date: DateString;
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
      if (checkIsLocalToday(body.todo_date)) {
        patchUpdateGraphValue = dispatch(
          chartApi.util.updateQueryData(
            "getValues",
            {
              startDate: body.queryArgs.graph_before_date,
              endDate: body.queryArgs.graph_today_date,
            },
            (draft: { values: Value[] }) => {
              const index = draft.values.findIndex((value) => {
                return checkIsSameLocalDay(value.date, body.todo_date);
              });

              if (index === -1) {
                console.log("no value matches on todo");
                return;
              }

              if (body.check) {
                draft.values[index].end += body.value;
              } else {
                draft.values[index].end -= body.value;
              }
            }
          )
        );
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
      todo_date: string;
      value: number;
      checked: boolean;
      queryArgs: {
        date: DateString;
        graph_before_date: DateString;
        graph_today_date: DateString;
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

      if (checkIsLocalToday(body.todo_date)) {
        patchUpdateGraphEndValue = dispatch(
          chartApi.util.updateQueryData(
            "getValues",
            {
              startDate: body.queryArgs.graph_before_date,
              endDate: body.queryArgs.graph_today_date,
            },
            (draft: { values: Value[] }) => {
              const index = draft.values.findIndex((value) => {
                return checkIsSameLocalDay(value.date, body.queryArgs.date);
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
      todo_id: number;
      changed_index: number;
      changed_todos: Todo[];
      queryArgs: {
        requested_date: DateString;
      };
    }
  >({
    query: (body) => {
      return {
        url: "/todo/changeorder",
        method: "POST",
        body,
      };
    },

    async onQueryStarted(body, { dispatch, queryFulfilled }) {
      const dispatchChangeTodoIndex = dispatch(
        todoApi.util.updateQueryData(
          "getAllTodos",
          { date: body.queryArgs.requested_date },
          (draft: { todos: Todo[] }) => {
            draft.todos = body.changed_todos;
            // const changed_index = body.changed_index;

            // const index = draft.todos.findIndex(
            //   (todo) => todo.todo_id === body.todo_id
            // );

            // if (index === -1) return;

            // const change_item = draft.todos[index];

            // // 바꾸려는 index가 이전 index와 같을때는 아무것도 안함.
            // if (change_item.index === changed_index) {
            //   console.log("same index");
            //   return;
            // }

            // // 바꾸려는 index가 이전 index보다 클때는, 그 사이에 있는 index들을 전부 +1 해준다.
            // if (draft.todos[index].index < changed_index) {
            //   for (let i = draft.todos[index].index; i < changed_index; i++) {
            //     draft.todos[i].index -= 1;
            //   }

            //   console.log("아래로 내리기");
            // } else if (draft.todos[index].index > changed_index) {
            //   // 바꾸려는 index가 이전 index보다 작을때는, 그 사이에 있는 index들을 전부 -1 해준다.

            //   console.log("위로 올리기");

            //   for (let i = changed_index; i < draft.todos[index].index; i++) {
            //     draft.todos[i].index += 1;
            //   }
            // }

            // draft.todos[index].index = changed_index;

            // 어차피 todoContainer에서 정렬해줌.
            // draft.todos.sort((a, b) => {
            //   return a.index - b.index;
            // });
          }
        )
      );

      try {
        await queryFulfilled;
      } catch (error) {
        console.log(error);
        // dispatchChangeTodoIndex.undo();
      }
    },
  });
