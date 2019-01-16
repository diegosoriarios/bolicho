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