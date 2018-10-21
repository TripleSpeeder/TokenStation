import {
    CHANGE_SELECTOR_TOKENID, CLEAR_TOKEN_LIST,
} from '../tokenActions'

const SELECTOR_INITIAL = {
    selctedTokenId: undefined
}

function changeSelectorTokenId(state, action) {
    const {payload} = action
    const {selectedTokenId} = payload

    return {
        ...state,
        selectedTokenId,
    }
}

function clearSelectorTokenId() {
    return SELECTOR_INITIAL
}

export const selectorReducer = (state=SELECTOR_INITIAL, action) => {
    switch (action.type) {
        case CHANGE_SELECTOR_TOKENID:
            return changeSelectorTokenId(state, action)
        case CLEAR_TOKEN_LIST:
            return clearSelectorTokenId()
        default:
            return state
    }
}

