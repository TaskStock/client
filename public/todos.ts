// key는 project_id

export const todosData = {
  0: {
    name: "전체",
    project_id: 0, // 전체는 프로젝트가 아니지만 프로젝트와 같은 형식으로 데이터를 관리하기 위해 임의로 0을 부여
    todos: [
      {
        todo_id: 1,
        text: "단어 암기",
        check: false,
        level: 1,
      },
      {
        todo_id: 10,
        text: "세션 준비",
        check: true,
        level: 4,
      },
    ],
  },
  5: {
    name: "TOEIC",
    project_id: 5,
    todos: [
      {
        todo_id: 1,
        text: "단어 암기",
        check: false,
        level: 1,
      },
    ],
  },
  6: {
    name: "피로그래밍",
    project_id: 6,
    todos: [
      {
        todo_id: 10,
        text: "세션 준비",
        check: true,
        level: 4,
      },
    ],
  },
};
