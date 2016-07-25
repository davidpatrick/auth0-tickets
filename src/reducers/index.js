import { combineReducers } from 'redux';
import authentication from './authentication';
import form from './form';

const reducers = combineReducers({
  authentication,
  form
});

export default reducers;
