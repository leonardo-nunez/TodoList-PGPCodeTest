import type { Identifier, XYCoord } from 'dnd-core';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

const ItemTypes = {
  CARD: 'card',
};

interface ITodoItemProps {
  key: number;
  id: number;
  index: number;
  todo: ITodo;
  complete: boolean;
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
  complete,
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
      ref={ref}
      style={{
        ...style,
        display:
          view === 'todo' && complete
            ? 'none'
            : view === 'done' && !complete
            ? 'none'
            : 'block',
        opacity,
      }}
      data-handler-id={handlerId}
    >
      <label
        style={{
          textDecoration: complete ? 'line-through' : undefined,
        }}
      >
        <input
          type="checkbox"
          checked={complete}
          onChange={() => toggleTodo(todo)}
        />{' '}
        {text}
        <button
          onClick={(e) => {
            e.preventDefault();
            deleteTodo(todo);
          }}
        >
          X
        </button>
      </label>
    </div>
  );
};

export default TodoItem;
