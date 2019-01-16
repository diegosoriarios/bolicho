import { combineReducers } from 'redux';
import { navIsOpen, selectCat, isLoading } from './click';

export default combineReducers({
    navIsOpen,
    selectCat,
    isLoading
});