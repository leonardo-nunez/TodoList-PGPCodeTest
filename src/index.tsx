import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DndProvider>
  </React.StrictMode>
);
