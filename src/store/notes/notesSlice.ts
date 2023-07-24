import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../../store/types/notes';

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    },
    editNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

export const { addNote, editNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;
