import {combineReducers} from "redux"
import {SET_TOKEN_BALANCE} from "./tokenBalanceActions"

/*
State tree:
{
    byToken: {
        [1]: {
            tokenId: 1
            balance: 22.45
        },
        [6]: {
            tokenId: 6
            balance: 0.005
        }
    },
    allBalances: [1, 6]
}
*/

function setTokenBalance(state, action) {
    const {payload} = action
    const {tokenId} = payload

    return {
        ...state,
        // Update our Token object with a new balance value
        [tokenId] : payload
    };
}

const balanceByToken = (state={}, action) => {
    switch (action.type) {
        case SET_TOKEN_BALANCE: {
            return setTokenBalance(state, action)
        }
        default:
            return state;
    }
}

function addTokenId(state, action) {
    const {payload} = action
    const {tokenId} = payload
    // If the tokenID is not yet in the list, append the new token's ID
    if (!state.includes(tokenId)) {
        return state.concat(tokenId);
    }
    return state
}

const allBalances = (state=[], action) => {
    switch (action.type) {
        case SET_TOKEN_BALANCE: {
            return addTokenId(state, action)
        }
        default:
            return state
    }
}

export const balances = combineReducers({
    byToken : balanceByToken,
    allBalances : allBalances
});
