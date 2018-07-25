import {
    CHANGE_SELECTOR_TOKENID,
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


export const selectorReducer = (state=SELECTOR_INITIAL, action) => {
    switch (action.type) {
        case CHANGE_SELECTOR_TOKENID:
            return changeSelectorTokenId(state, action)
        default:
            return state
    }
}

