import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
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

const Root: React.FC = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

export default Root;
