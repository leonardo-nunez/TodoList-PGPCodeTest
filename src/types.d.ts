interface ITodo {
  id: number;
  text: string;
  complete: boolean;
}

type ToggleTodoType = (selectedTodo: ITodo) => void;

type AddTodo = (text: string) => void;

type DeleteTodo = (todo) => void;

// interface IList {
//   todo: {
//     text: string;
//     complete: boolean;
//   };
// }
