import {combineReducers} from "redux"
import {
    ADD_TOKEN, CHANGE_TOKEN_LIST_STATE, CHANGE_VALID_TOKEN_COUNT, CLEAR_TOKEN_LIST,
    IS_LOADING_SUPPLY,
    IS_LOADING_TOKEN, CHANGE_FILTER_PROPS,
    SET_TOKEN_BALANCE,
    SET_TOKEN_CONTRACT_INSTANCE,
    SET_TOKEN_SUPPLY, TOKEN_LIST_STATES, SHOW_MORE_ITEMS, RESET_DISPLAY_COUNT
} from './tokenActions'

/*
State tree:
{
    listState: {
        listState: 'loading'
        filter: 'Dumb'
        matchedTokenIds: [6]
        total: 2
    }
    byId: {
        [1]: {
            loading: true
            tokenID: 1
            name: 'GAVCoin'
            address: '0x123456678'
            contractInstance: null
            supply: {
                loading: true
                supply: 0
            }
            balance: {
                loading: false
                supply: 0
            }
            ...
        },
        [6]: {
            loading: false
            tokenID: 6
            name: 'DumbCoin'
            address: '0x123456678'
            contractInstance: <truffle-contract instance>
            supply: {
                loading: false
                supply: 200000
            }
            balance: {
                loading: false
                supply: 0
            }
            ...
        }
    },
    allIds: [1, 6]
}
*/


function addTokenEntry(state, action) {
    const {payload} = action
    const {tokenID, token} = payload
    // insert new token
    return {
        ...state,
        [tokenID] : token
    }
}

function loadingTokenChanged(state, action) {
    const {payload} = action
    const {tokenID, isLoading} = payload
    // Look up the correct token, to simplify the rest of the code
    const token = state[tokenID];
    return {
        ...state,
        // Update our Token object with a new supply value
        [tokenID] : {
            ...token,
            loading: isLoading
        }
    };
}

function setTokenContractInstance(state, action) {
    const {payload} = action
    const {tokenID, contractInstance} = payload
    // Look up the correct token, to simplify the rest of the code
    const token = state[tokenID];
    return {
        ...state,
        // Update our Token object with a new supply value
        [tokenID] : {
            ...token,
            contractInstance : contractInstance
        }
    };
}

function setTokenSupply(state, action) {
    const {payload} = action
    const {tokenID, supply} = payload
    // Look up the correct token, to simplify the rest of the code
    const token = state[tokenID];

    return {
        ...state,
        // Update our Token object with a new supply value
        [tokenID] : {
            ...token,
            supply : {
                ...token.supply,
                supply
            }
        }
    };
}

function loadingSupplyChanged(state, action) {
    const {payload} = action
    const {tokenID, isLoading} = payload
    // Look up the correct token, to simplify the rest of the code
    const token = state[tokenID];
    return {
        ...state,
        // Update our Token object with a new supply value
        [tokenID] : {
            ...token,
            supply : {
                ...token.supply,
                loading: isLoading
            }
        }
    };
}

function setTokenBalance(state, action){
    const {payload} = action
    const {tokenID, balance} = payload
    // Look up the correct token, to simplify the rest of the code
    const token = state[tokenID];

    return {
        ...state,
        // Update our Token object with a new balance value
        [tokenID] : {
            ...token,
            balance : balance
        }
    };
}

function clearTokenBalances(state, action){
    // walk through all tokens and set their balance to null
    let newState = {...state}
    newState.allIds.forEach(id => {
        newState.byId[id].balance = null
    })
}

const TOKENS_BY_ID_INITIAL = {}

function clearTokensById(state, action) {
    return TOKENS_BY_ID_INITIAL
}

const tokensById = (state=TOKENS_BY_ID_INITIAL, action) => {
    switch (action.type) {
        case ADD_TOKEN: {
            return addTokenEntry(state, action)
        }
        case IS_LOADING_TOKEN: {
            return loadingTokenChanged(state, action)
        }
        case SET_TOKEN_CONTRACT_INSTANCE: {
            return setTokenContractInstance(state, action)
        }
        case SET_TOKEN_SUPPLY: {
            return setTokenSupply(state, action)
        }
        case IS_LOADING_SUPPLY: {
            return loadingSupplyChanged(state, action)
        }
        case SET_TOKEN_BALANCE: {
            return setTokenBalance(state, action)
        }
        case CLEAR_TOKEN_LIST: {
            return clearTokensById(state, action)
        }
        default:
            return state;
    }
}

function addTokenId(state, action) {
    const {payload} = action
    const {tokenID} = payload
    // Just append the new token's ID to the list of all IDs
    return state.concat(tokenID);
}

const ALL_TOKENS_INITIAL = []

function clearAllTokens(state, action) {
    return ALL_TOKENS_INITIAL
}

const allTokens = (state=ALL_TOKENS_INITIAL, action) => {
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

function tokenListStateChanged(state, action) {
    // very simple reducer, just set a new state
    const {payload} = action
    const {listState} = payload
    return {
        ...state,
        listState
    }
}

function changeValidTokenCount(state, action){
    const {payload} = action
    const {count} = payload
    return {
        ...state,
        total: count
    }
}

function changeFilterProps(state, action){
    const {payload} = action
    const {filter, matchedTokenIds} = payload
    return {
        ...state,
        filter,
        matchedTokenIds
    }
}

function showMoreItems(state) {
    const stepSize = 3
    const filterIsActive = (state.filter.length > 0)
    if (filterIsActive)
    {
        // check filtered numbers
        if (state.displayCount >= state.matchedTokenIds.length) {
            // already displaying all tokens.
            return state
        }
    } else {
        // check total numbers
        if (state.displayCount >= state.total) {
            // already displaying all tokens.
            return state
        }
    }
    let requestedCount = state.displayCount+=stepSize

    // don't try to display more tokens than available
    if (requestedCount > state.total) {
        requestedCount = state.total
    }

    return {
        ...state,
        displayCount: requestedCount
    }
}

const LISTSTATE_INITIAL = {
    listState: TOKEN_LIST_STATES.VIRGIN,
    total: 0,
    filter: '',
    matchedTokenIds: [],
    displayCount: 10,
}

function resetDisplayCount(state) {
    return {
        ...state,
        displayCount: LISTSTATE_INITIAL.displayCount
    }
}

const listState = (state=LISTSTATE_INITIAL, action) => {
    switch (action.type) {
        case CHANGE_TOKEN_LIST_STATE:
            return tokenListStateChanged(state, action)
        case CHANGE_VALID_TOKEN_COUNT:
            return changeValidTokenCount(state, action)
        case CHANGE_FILTER_PROPS:
            return changeFilterProps(state, action)
        case SHOW_MORE_ITEMS:
            return showMoreItems(state)
        case RESET_DISPLAY_COUNT:
            return resetDisplayCount()
        default:
            return state
    }
}

export const tokens = combineReducers({
    listState: listState,
    byId : tokensById,
    allIds : allTokens
});
