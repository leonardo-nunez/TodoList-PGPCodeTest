interface ITodo {
  id: number;
  text: string;
  complete: boolean;
}

interface IList {
  cards: Item[];
}

type ToggleTodoType = (selectedTodo: ITodo) => void;

type AddTodoType = (text: string) => void;

type DeleteTodoType = (todo: ITodo) => void;

type TodoViewType = (todoView: string) => void;

// interface IList {
//   todo: {
//     text: string;
//     complete: boolean;
//   };
// }
