interface ITodo {
  id: number;
  text: string;
  complete: boolean;
}

interface IList1 {
  id: number;
  name: string;
}

interface IList {
  cards: Item[];
}

type ToggleTodoType = (selectedTodo: ITodo) => void;

type AddTodoType = (text: string) => void;

type DeleteTodoType = (todo: ITodo) => void;

type TodoViewType = (todoView: string) => void;

type AddListType = (name: string) => void;

type DeleteListType = (name: string) => void;
