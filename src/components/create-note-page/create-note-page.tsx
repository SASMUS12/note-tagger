import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Note } from '../../store/types/notes';
import { addNoteAction } from '../../store/actions/notesActions';

const CreateNotePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [text, setText] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleTagInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag !== '') {
      setTags((prevTags) => [...new Set([...prevTags, newTag])]);
      setTagInput('');
    }
  };

  const handleTagInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTag();
    }
  };

  const handleSaveNote = () => {
    const note: Note = {
      id: uuidv4(),
      text,
      tags,
    };

    dispatch(addNoteAction(note));
    navigate('/');
  };

  return (
    <div>
      <h2>Создать заметку</h2>
      <textarea value={text} onChange={handleTextChange} />
      <div>
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            #{tag}
          </span>
        ))}
      </div>
      <input
        type="text"
        placeholder="Введите теги с использованием символа #"
        value={tagInput}
        onChange={handleTagInputChange}
        onKeyDown={handleTagInputKeyDown}
      />
      <button onClick={handleAddTag}>Добавить тег</button>
      <button onClick={handleSaveNote}>Создать</button>
    </div>
  );
};

export default CreateNotePage;
