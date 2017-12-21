import {combineReducers} from "redux"

function addTokenEntry(state, action) {
    const {payload} = action
    const {tokenId, token} = payload
    // insert new token
    return {
        ...state,
        [tokenId] : token
    }
}

function setTokenSupply(state, action) {
    const {payload} = action
    const {tokenId, supply} = payload

    // Look up the correct token, to simplify the rest of the code
    const token = state[tokenId];

    return {
        ...state,
        // Update our Token object with a new supply value
        [tokenId] : {
            ...token,
            supply : supply
        }
    };
}

export const tokensById = (state={}, action) => {
    switch (action.type) {
        case 'ADD_TOKEN': {
            return addTokenEntry(state, action)
        }
        case 'SET_TOKEN_SUPPLY': {
            return setTokenSupply(state, action)
            /*
            // first create a new tokens array, including the changed one
            const newTokens = updateItemInArray(state.tokens, action.id, token => {
                return updateObject(token, {supply: action.supply})
            })
            // now replace the current state's array with the new array
            return updateObject(state, { tokens: newTokens })
            */
        }
        default:
            return state;
    }
}

function addTokenId(state, action) {
    const {payload} = action
    const {tokenId} = payload
    // Just append the new token's ID to the list of all IDs
    return state.concat(tokenId);}

const allTokens = (state=[], action) => {
    switch (action.type) {
        case 'ADD_TOKEN': {
            return addTokenId(state, action)
        }
        default:
            return state
    }
}

export const tokens = combineReducers({
    byId : tokensById,
    allIds : allTokens
});
