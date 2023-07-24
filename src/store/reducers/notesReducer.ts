import { NoteState, NoteActionTypes, NoteAction } from '../types/notes';

const initialState: NoteState = {
  notes: [],
};

const notesReducer = (state = initialState, action: NoteAction): NoteState => {
  switch (action.type) {
    case NoteActionTypes.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case NoteActionTypes.EDIT_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case NoteActionTypes.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    default:
      return state;
  }
};

export default notesReducer;
