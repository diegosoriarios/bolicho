export function navIsOpen(bool){
    return {
        type: 'ITS_OPEN',
        isOpen: bool
    }
}

export function selectCat(cat){
    return {
        type: 'CATEGORY',
        category: cat,
    }
}

export function isLoading(bool){
    return {
        type: 'LOADING',
        loading: bool
    }
}

export function showFullPage(bool){
    return {
        type: 'FULL_PAGE',
        fullPage: bool
    }
}

export function userIsLogged(bool){
    return {
        type: 'IS_LOGGED',
        isLogged: bool
    }
}

export function addCart(item){
    return {
        type: 'ADD_ITEM',
        newItem: item
    }
}

export function showCart(bool){
    return {
        type: 'SHOW_CART',
        cartOpen: bool,
    }
}