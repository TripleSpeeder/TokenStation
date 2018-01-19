import {CREATE_BALANCE_ENTRY, SET_BALANCE} from '../balanceActions'

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
            balance: window.web3.toBigNumber(0)
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
        default:
            return state;
    }
}
