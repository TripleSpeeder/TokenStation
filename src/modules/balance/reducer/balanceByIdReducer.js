import {CREATE_BALANCE_ENTRY, SET_BALANCE, SET_BALANCE_LOADING} from '../balanceActions'

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
            isLoading: false,
        }
    }
}

function loadingBalanceChanged(state, action){
    const {payload} = action
    const {balanceId, isLoading} = payload
    const balanceEntry = state[balanceId]
    return {
        ...state,
        [balanceId] : {
            ...balanceEntry,
            isLoading,
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
        case SET_BALANCE_LOADING:
            return loadingBalanceChanged(state, action)
        default:
            return state;
    }
}
