import { combineReducers } from 'redux';
import notesReducer from './notesReducer';

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  notes: notesReducer,
});

export default rootReducer;
