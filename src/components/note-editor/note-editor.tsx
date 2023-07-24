import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/reducers/rootReducer';
import { Note } from '../../store/types/notes';
import { v4 as uuidv4 } from 'uuid';
import { addNote, editNote } from '../../store/notes/notesSlice';
import { openDB, IDBPDatabase } from 'idb';

const DB_NAME = 'notesDB';
const STORE_NAME = 'notes';

const NoteEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [db, setDB] = useState<IDBPDatabase | null>(null);
  const notes = useSelector((state: RootState) => Object.values(state.notes) as Note[]);
  const noteToEdit = id ? notes.find((note: Note) => note.id === id) : null;
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState(noteToEdit ? noteToEdit.text : '');
  const [tags, setTags] = useState<string[]>(noteToEdit ? noteToEdit.tags : []);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    openDB(DB_NAME, 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    }).then((db) => setDB(db));
  }, []);

  useEffect(() => {
    if (noteToEdit) {
      setText(noteToEdit.text);
      setTags(noteToEdit.tags);
    }
  }, [noteToEdit]);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleTagInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const newTag = tagInputRef.current?.value.trim();
    if (newTag && newTag !== '') {
      setTags((prevTags) => [...new Set([...prevTags, newTag])]);
      setTagInput('');
    }
  };

  const handleTagInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newTag = tagInputRef.current?.value.trim();
      if (newTag && newTag !== '') {
        setTags((prevTags) => [...new Set([...prevTags, newTag])]);
        setTagInput('');
      }
    }
  };

  const handleSaveNote = async () => {
    const note: Note = {
      id: id || uuidv4(),
      text,
      tags,
    };

    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      if (id) {
        await store.put(note);
      } else {
        await store.add(note);
      }

      await tx.done;
    }

    if (id) {
      dispatch(editNote(note));
    } else {
      dispatch(addNote(note));
    }

    navigate('/');
  };

  return (
    <div>
      <h2>{id ? 'Редактировать заметку' : 'Создать заметку'}</h2>
      <textarea value={text} onChange={handleTextChange} />
      <div>
        {tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
      <input
        type="text"
        ref={tagInputRef}
        placeholder="Введите теги с использованием символа #"
        value={tagInput}
        onChange={handleTagInputChange}
        onKeyDown={handleTagInputKeyDown}
      />
      <button onClick={handleAddTag}>Добавить тег</button>
      <button onClick={handleSaveNote}>Создать</button>
      <button onClick={() => navigate('/')}>Отмена</button>
    </div>
  );
};

export default NoteEditor;
