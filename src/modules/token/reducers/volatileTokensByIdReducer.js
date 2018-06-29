import {
    ADD_TOKEN, ADD_VOLATILE_TOKEN, CLEAR_TOKEN_LIST,
    SET_TOKEN_CONTRACT_INSTANCE,
    SET_TOKEN_LOADING_PROMISE,
} from '../tokenActions'

const VOLATILE_TOKENS_BY_ID_INITIAL = {}

function clearTokens() {
    return VOLATILE_TOKENS_BY_ID_INITIAL
}

function setTokenContractInstance(state, action) {
    const {payload} = action
    const {tokenID, contractInstance} = payload
    // Look up the correct token, to simplify the rest of the code
    const token = state[tokenID]
    return {
        ...state,
        [tokenID]: {
            ...token,
            contractInstance: contractInstance
        }
    }
}

function addTokenId(state, action) {
    const {payload} = action
    const {tokenID} = payload
    // prevent duplicate entries
    if (state[tokenID] === undefined) {
        // insert new token
        return {
            ...state,
            [tokenID]: {
                tokenID,
            }
        }
    } else {
        // ignore duplicate...
        return state
    }
}


function setTokenLoadingPromise(state, action) {
    const {payload} = action
    const {tokenID, loadingPromise} = payload
    // Look up the correct token, to simplify the rest of the code
    const token = state[tokenID]
    return {
        ...state,
        // Update our Token object with a new supply value
        [tokenID]: {
            ...token,
            loadingPromise
        }
    }
}

export const volatileTokensByIdReducer = (state = VOLATILE_TOKENS_BY_ID_INITIAL, action) => {
    switch (action.type) {
        case ADD_TOKEN: {
            return addTokenId(state, action)
        }
        case ADD_VOLATILE_TOKEN: {
            return addTokenId(state, action)
        }
        case SET_TOKEN_LOADING_PROMISE: {
            return setTokenLoadingPromise(state, action)
        }
        case SET_TOKEN_CONTRACT_INSTANCE: {
            return setTokenContractInstance(state, action)
        }
        case CLEAR_TOKEN_LIST: {
            return clearTokens()
        }
        default:
            return state
    }
}

