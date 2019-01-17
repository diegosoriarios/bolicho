import { combineReducers } from 'redux';
import { 
    navIsOpen, 
    selectCat, 
    isLoading, 
    showFullPage, 
    userIsLogged,
    showCart,
    addCart
} from './click';

export default combineReducers({
    navIsOpen,
    selectCat,
    isLoading,
    showFullPage,
    userIsLogged,
    showCart,
    addCart
});