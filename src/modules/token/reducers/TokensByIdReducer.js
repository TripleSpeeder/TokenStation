import {
    ADD_TOKEN, CLEAR_TOKEN_BALANCES, CLEAR_TOKEN_LIST, IS_LOADING_SUPPLY, IS_LOADING_TOKEN, SET_TOKEN_BALANCE,
    SET_TOKEN_SUPPLY
} from '../tokenActions'

const TOKENS_BY_ID_INITIAL = {}

function clearTokensById(state, action) {
    return TOKENS_BY_ID_INITIAL
}

function addTokenEntry(state, action) {
    const {payload} = action
    const {tokenID, token} = payload
    // insert new token
    return {
        ...state,
        [tokenID]: token
    }
}

function loadingTokenChanged(state, action) {
    const {payload} = action
    const {tokenID, isLoading} = payload
    // Look up the correct token, to simplify the rest of the code
    const token = state[tokenID]
    return {
        ...state,
        // Update our Token object with a new supply value
        [tokenID]: {
            ...token,
            loading: isLoading
        }
    }
}

function setTokenSupply(state, action) {
    const {payload} = action
    const {tokenID, supply} = payload
    // Look up the correct token, to simplify the rest of the code
    const token = state[tokenID]

    return {
        ...state,
        // Update our Token object with a new supply value
        [tokenID]: {
            ...token,
            supply: {
                ...token.supply,
                supply
            }
        }
    }
}

function loadingSupplyChanged(state, action) {
    const {payload} = action
    const {tokenID, isLoading} = payload
    // Look up the correct token, to simplify the rest of the code
    const token = state[tokenID]
    return {
        ...state,
        // Update our Token object with a new supply value
        [tokenID]: {
            ...token,
            supply: {
                ...token.supply,
                loading: isLoading
            }
        }
    }
}

function setTokenBalance(state, action) {
    const {payload} = action
    const {tokenID, balance} = payload
    // Look up the correct token, to simplify the rest of the code
    const token = state[tokenID]

    return {
        ...state,
        // Update our Token object with a new balance value
        [tokenID]: {
            ...token,
            balance: balance
        }
    }
}

function clearTokenBalances(state, action) {
    // walk through all tokens and set their balance to null
    let newState = {...state}
    Object.keys(newState).forEach(key => {
        newState[key].balance = undefined
    })
    return newState
}

export const tokensByIdReducer = (state = TOKENS_BY_ID_INITIAL, action) => {
    switch (action.type) {
        case ADD_TOKEN: {
            return addTokenEntry(state, action)
        }
        case IS_LOADING_TOKEN: {
            return loadingTokenChanged(state, action)
        }
        case SET_TOKEN_SUPPLY: {
            return setTokenSupply(state, action)
        }
        case IS_LOADING_SUPPLY: {
            return loadingSupplyChanged(state, action)
        }
        case CLEAR_TOKEN_BALANCES: {
            return clearTokenBalances(state, action)
        }
        case SET_TOKEN_BALANCE: {
            return setTokenBalance(state, action)
        }
        case CLEAR_TOKEN_LIST: {
            return clearTokensById(state, action)
        }
        default:
            return state
    }
}
