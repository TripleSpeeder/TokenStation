import {BALANCE_STATES, CREATE_BALANCE_ENTRY, SET_BALANCE, SET_BALANCE_STATE} from '../balanceActions'

const BALANCE_BY_ID_INITIAL = {}

function setBalance(state, action) {
    const {payload} = action
    const {balanceId, balance} = payload
    const balanceEntry = state[balanceId]
    return {
        ...state,
        [balanceId] : {
            ...balanceEntry,
            balance
        }
    };
}

function createBalanceEntry(state, action) {
    const {payload} = action
    const {balanceId, addressId, tokenId} = payload
    return {
        ...state,
        [balanceId] : {
            balanceId,
            addressId,
            tokenId,
            balance: window.web3.toBigNumber(0),
            balanceState: BALANCE_STATES.VIRGIN,
        }
    }
}

function balanceStateChanged(state, action){
    const {payload} = action
    const {balanceId, balanceState} = payload
    const balanceEntry = state[balanceId]
    return {
        ...state,
        [balanceId] : {
            ...balanceEntry,
            balanceState,
        }
    }

}

export const byId = (state=BALANCE_BY_ID_INITIAL, action) => {
    switch (action.type) {
        case CREATE_BALANCE_ENTRY: {
            return createBalanceEntry(state, action)
        }
        case SET_BALANCE: {
            return setBalance(state, action)
        }
        case SET_BALANCE_STATE:
            return balanceStateChanged(state, action)
        default:
            return state;
    }
}
