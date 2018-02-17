import {
    ADD_TOKEN, CLEAR_TOKEN_BALANCES, CLEAR_TOKEN_LIST, IS_LOADING_SUPPLY, IS_LOADING_TOKEN,
    SET_TOKEN_SUPPLY
} from '../tokenActions'
import {ADD_EVENT} from '../../event/eventActions'

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

function clearTokenBalances(state, action) {
    // walk through all tokens and set their balance to null
    let newState = {...state}
    Object.keys(newState).forEach(key => {
        newState[key].balance = undefined
    })
    return newState
}

function addTransferEvent(state, action) {
    // Attach the new event to the according token contract
    const {payload} = action
    const {eventId, tokenId, event} = payload

    // Look up the correct token, to simplify the rest of the code
    const token = state[tokenId]

    if (token.eventIds.includes(eventId))
    {
        console.warn("Ignoring duplicate event " + eventId)
        return state
    }

    let newEventIds = token.eventIds.concat(eventId)
    return {
        ...state,
        // Update our Token object with a new supply value
        [tokenId]: {
            ...token,
            eventIds: newEventIds
        }
    }
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
        case CLEAR_TOKEN_LIST: {
            return clearTokensById(state, action)
        }
        case ADD_EVENT: {
            return addTransferEvent(state, action)
        }
        default:
            return state
    }
}
