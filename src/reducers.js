import {combineReducers} from "redux"

function updateObject(oldObject, newValues) {
    // Encapsulate the idea of passing a new object as the first parameter
    // to Object.assign to ensure we correctly copy data instead of mutating
    return Object.assign({}, oldObject, newValues);
}

function updateItemInArray(array, itemId, updateItemCallback) {
    const updatedItems = array.map(item => {
        if(item.id !== itemId) {
            // Since we only want to update one item, preserve all others as they are now
            return item;
        }

        // Use the provided callback to create an updated item
        return updateItemCallback(item);
    });
    return updatedItems;
}


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

export const tokensReducer = combineReducers({
    byId : tokensById,
    allIds : allTokens
});

const QUERYADDRESS_INITIAL = {
    address: ''
}
export const queryAddress = (state=QUERYADDRESS_INITIAL, action) => {
    switch (action.type) {
        case 'SET_QUERYADDRESS':
            return updateObject(state, {address: action.address})
        default:
    }
    return state;
}

const WEB3_INITIAL = {
    web3: null
}
export const web3Instance = (state=WEB3_INITIAL, action) => {
    switch (action.type) {
        case 'SET_WEB3INSTANCE':
            return updateObject(state, {web3: action.web3})
        default:
    }
    return state;
}