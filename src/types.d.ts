interface ITodo {
  id: number;
  text: string;
  complete: boolean;
}

interface IList {
  id: number;
  name: string;
  todos: ITodo[];
}

type ToggleTodoType = (selectedTodo: ITodo) => void;

type AddTodoType = (text: string) => void;

type DeleteTodoType = (todo: ITodo) => void;

type TodoViewType = (todoView: string) => void;

type AddListType = (name: string) => void;

type DeleteListType = (name: string) => void;

type UpdateListTodosType = (listID: number, todos: ITodo[]) => void;
