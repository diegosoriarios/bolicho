import { combineReducers } from 'redux';
import { navIsOpen, selectCat, isLoading, showFullPage } from './click';

export default combineReducers({
    navIsOpen,
    selectCat,
    isLoading,
    showFullPage
});