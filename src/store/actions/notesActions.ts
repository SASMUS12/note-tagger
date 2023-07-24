import { NoteActionTypes, Note, NoteAction } from '../types/notes';

export const addNoteAction = (note: Note): NoteAction => ({
  type: NoteActionTypes.ADD_NOTE,
  payload: note,
});

export const editNoteAction = (note: Note): NoteAction => ({
  type: NoteActionTypes.EDIT_NOTE,
  payload: note,
});

export const deleteNoteAction = (id: string): NoteAction => ({
  type: NoteActionTypes.DELETE_NOTE,
  payload: id,
});
