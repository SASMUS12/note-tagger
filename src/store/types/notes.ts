export interface Note {
    id: string;
    text: string;
    tags: string[];
  }
  
  export interface NoteState {
    notes: Note[];
  }
  
  export enum NoteActionTypes {
    ADD_NOTE = 'ADD_NOTE',
    EDIT_NOTE = 'EDIT_NOTE',
    DELETE_NOTE = 'DELETE_NOTE',
  }
  
  export interface AddNoteAction {
    type: NoteActionTypes.ADD_NOTE;
    payload: Note;
  }
  
  export interface EditNoteAction {
    type: NoteActionTypes.EDIT_NOTE;
    payload: Note;
  }
  
  export interface DeleteNoteAction {
    type: NoteActionTypes.DELETE_NOTE;
    payload: string;
  }
  
  export type NoteAction = AddNoteAction | EditNoteAction | DeleteNoteAction;