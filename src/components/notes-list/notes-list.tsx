import React, {useMemo, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import { Note } from '../../store/types/notes';
import { deleteNoteAction } from '../../store/actions/notesActions';


const NotesList: React.FC = () => {
  const notes = useSelector((state: RootState) => Object.values(state.notes));
  const memoizedNotes = useMemo(() => notes, [notes]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const dispatch = useDispatch();

  const handleTagFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setSelectedTags((prevTags) =>
      checked ? [...prevTags, value] : prevTags.filter((tag) => tag !== value)
    );
  };

  const handleDeleteNote = (noteId: string) => {
    dispatch(deleteNoteAction(noteId));
  };

  const filteredNotes = selectedTags.length === 0
  ? notes
  : notes.filter((note) => note.tags && note.tags.some((tag: string) => selectedTags.includes(tag)));


  return (
    <div>
      <h2>Список заметок</h2>
      <div>
        {selectedTags.map((tag, index) => (
          <span key={`${index}-${tag}`} className="selected-tag">
            #{tag}
          </span>
        ))}
      </div>
      <div>
        {memoizedNotes.length === 0 ? (
          <p>Заметок пока нет</p>
        ) : (
          <>
            <div>
              <h3>Фильтр по тегам:</h3>
              {Array.from(new Set(memoizedNotes.flatMap((note) => note.tags))).map((tag) => (
                <label key={tag}>
                  <input
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={handleTagFilterChange}
                  />
                  #{tag}
                </label>
              ))}
            </div>
            <ul>
              {filteredNotes.map((note: Note) => (
                <li key={note.id}>
                  <p>{note.text}</p>
                  <Link to={`/edit/${note.id}`}>Редактировать</Link>
                  <button onClick={() => handleDeleteNote(note.id)}>Удалить</button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <Link to="/create">Создать заметку</Link>
    </div>
  );
};

export default NotesList;
