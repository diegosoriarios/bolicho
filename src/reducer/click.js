const initialUserState = {
    cart: []
}

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

export function addCart(state = initialUserState, action){
    switch(action.type){
        case 'ADD_ITEM':
            console.log(action.newItem)
            return {
                ...state,
                cart: state.cart.concat(action.newItem)
            }
        default:
            return state;
    }
}

export function showCart(state = false, action){
    switch(action.type){
        case 'SHOW_CART':
            return action.cartOpen;
        default: 
            return state;
    }
}