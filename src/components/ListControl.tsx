import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface IListControlProps {
  listName: string;
  addTodo: AddTodoType;
  todoView: TodoViewType;
  deleteList: DeleteListType;
}

const ListControl = ({
  listName,
  addTodo,
  todoView,
  deleteList,
}: IListControlProps) => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAgree = () => {
    deleteList(listName);
    setOpen(false);
  };

  return (
    <div className="control">
      <IconButton className="control__close" onClick={handleClickOpen}>
        <CloseIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'This list will be deleted'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleAgree} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <h1>{listName}</h1>
      <form>
        <input
          type="text"
          placeholder="Add Todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <IconButton
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addTodo(text);
            setText('');
          }}
        >
          <AddIcon />
        </IconButton>
      </form>
      <div
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          todoView(e.target.value)
        }
      >
        <input
          className="control__radiobutton"
          type="radio"
          value="all"
          name="view"
          defaultChecked
        />{' '}
        All
        <input
          className="control__radiobutton"
          type="radio"
          value="todo"
          name="view"
        />{' '}
        To Do
        <input
          className="control__radiobutton"
          type="radio"
          value="done"
          name="view"
        />{' '}
        Done
      </div>
    </div>
  );
};

export default ListControl;
