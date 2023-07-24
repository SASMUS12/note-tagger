import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import store from './store';
import NotesList from './components/notes-list/notes-list';
import NoteEditor from './components/note-editor/note-editor';
import CreateNotePage from './components/create-note-page/create-note-page';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotesList />} />
        <Route path="/create" element={<CreateNotePage />} />
        <Route path="/edit/:id" element={<NoteEditor />} />
      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
