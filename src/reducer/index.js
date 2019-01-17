import { combineReducers } from 'redux';
import { 
    navIsOpen, 
    selectCat, 
    isLoading, 
    showFullPage, 
    userIsLogged 
} from './click';

export default combineReducers({
    navIsOpen,
    selectCat,
    isLoading,
    showFullPage,
    userIsLogged
});