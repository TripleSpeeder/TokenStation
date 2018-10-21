import {ADD_TOKEN, CLEAR_TOKEN_LIST} from '../tokenActions'

const ALL_TOKENS_INITIAL = []

function addTokenId(state, action) {
    const {payload} = action
    const {tokenID} = payload
    // prevent duplicate token
    if (state.indexOf(tokenID) === -1) {
        // append the new token's ID to the list of all IDs
        return state.concat(tokenID);
    }
    else {
        // duplicate
        return state
    }
}

function clearAllTokens() {
    return ALL_TOKENS_INITIAL
}

export const allTokensReducer = (state=ALL_TOKENS_INITIAL, action) => {
    switch (action.type) {
        case ADD_TOKEN: {
            return addTokenId(state, action)
        }
        case CLEAR_TOKEN_LIST: {
            return clearAllTokens(state, action)
        }
        default:
            return state
    }
}

