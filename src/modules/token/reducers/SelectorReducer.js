import {
    CHANGE_FILTER_PROPS,
    CHANGE_TOKEN_LIST_PAGE,
    CHANGE_TOKEN_LIST_STATE, CHANGE_TOKEN_SELECTOR_FILTER_PROPS,
    CHANGE_VALID_TOKEN_COUNT, CLEAR_TOKEN_LIST,
    RESET_DISPLAY_COUNT,
    SHOW_MORE_ITEMS,
    TOKEN_LIST_STATES
} from '../tokenActions'

const SELECTOR_INITIAL = {
    filter: '',
    matchedTokenIds: [],
}

function changeFilterProps(state, action){
    const {payload} = action
    const {filter, matchedTokenIds} = payload

    return {
        ...state,
        filter,
        matchedTokenIds,
    }
}


export const selectorReducer = (state=SELECTOR_INITIAL, action) => {
    switch (action.type) {
        case CHANGE_TOKEN_SELECTOR_FILTER_PROPS:
            return changeFilterProps(state, action)
        default:
            return state
    }
}

