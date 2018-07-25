import {
    CHANGE_SELECTOR_TOKENID,
    CHANGE_TOKEN_SELECTOR_FILTER_PROPS,
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

function changeSelectorTokenId(state, action) {
    const {payload} = action
    const {selectedTokenId} = payload

    return {
        ...state,
        selectedTokenId,
    }
}


export const selectorReducer = (state=SELECTOR_INITIAL, action) => {
    switch (action.type) {
        case CHANGE_TOKEN_SELECTOR_FILTER_PROPS:
            return changeFilterProps(state, action)
        case CHANGE_SELECTOR_TOKENID:
            return changeSelectorTokenId(state, action)
        default:
            return state
    }
}

