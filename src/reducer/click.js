export function navIsOpen(state = false, action) {
    switch(action.type){
        case 'ITS_OPEN':
            return action.isOpen;
        default:
            return state;
    }
}

export function selectCat(state = '', action) {
    switch(action.type){
        case 'CATEGORY':
            return action.category;
        default:
            return state;
    }
}

export function isLoading(state = true, action){
    switch(action.type){
        case 'LOADING':
            return action.loading;
        default:
            return state;
    }
}

export function showFullPage(state = false, action){
    switch(action.type){
        case 'FULL_PAGE':
            return action.fullPage;
        default:
            return state;
    }
}

export function userIsLogged(state = false, action){
    switch(action.type){
        case 'IS_LOGGED':
            return action.isLogged;
        default:
            return state;
    }
}