import './App.css';
import ListContainer from './components/ListContainer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <ListContainer />
      </DndProvider>
    </div>
  );
}

export default App;
