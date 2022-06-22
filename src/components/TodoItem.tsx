import type { Identifier, XYCoord } from 'dnd-core';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const ItemTypes = {
  CARD: 'card',
};

interface ITodoItemProps {
  key: number;
  id: number;
  index: number;
  todo: ITodo;
  text: string;
  view: string;
  toggleTodo: ToggleTodoType;
  deleteTodo: DeleteTodoType;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const TodoItem = ({
  todo,
  id,
  index,
  text,
  view,
  toggleTodo,
  deleteTodo,
  moveCard,
}: ITodoItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      className="item"
      ref={ref}
      style={{
        display:
          view === 'todo' && todo.complete
            ? 'none'
            : view === 'done' && !todo.complete
            ? 'none'
            : 'block',
        opacity,
      }}
      data-handler-id={handlerId}
    >
      <label
        className="item__content"
        style={{
          textDecoration: todo.complete ? 'line-through' : undefined,
        }}
      >
        <input
          className="item__checkbox"
          type="checkbox"
          checked={todo.complete}
          onChange={() => toggleTodo(todo)}
        />{' '}
        {text}{' '}
        <IconButton
          className="item__close"
          onClick={(e) => {
            e.preventDefault();
            deleteTodo(todo);
          }}
        >
          <CloseIcon />
        </IconButton>
      </label>
    </div>
  );
};

export default TodoItem;
