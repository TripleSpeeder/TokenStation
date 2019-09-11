import {
    BALANCE_STATES,
    CREATE_BALANCE_ENTRY,
    DELETE_BALANCE_ENTRY,
    SET_BALANCE,
    SET_BALANCE_STATE
} from '../balanceActions'
import {CLEAR_TOKEN_LIST} from '../../token/tokenActions'
import BN from 'bn.js'

const BALANCE_BY_ID_INITIAL = {}

function clearAllBalances() {
    return BALANCE_BY_ID_INITIAL;
}

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
            balance: new BN(0),
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

function deleteBalanceEntry(state, action) {
    const {payload} = action
    const {balanceId} = payload
    delete state[balanceId]
    return state
}


export const byId = (state=BALANCE_BY_ID_INITIAL, action) => {
    switch (action.type) {
        case CREATE_BALANCE_ENTRY: {
            return createBalanceEntry(state, action)
        }
        case SET_BALANCE: {
            return setBalance(state, action)
        }
        case SET_BALANCE_STATE: {
            return balanceStateChanged(state, action)
        }
        case DELETE_BALANCE_ENTRY: {
            return deleteBalanceEntry(state, action)
        }
        case CLEAR_TOKEN_LIST: {
            return clearAllBalances()
        }
        default:
            return state;
    }
}
