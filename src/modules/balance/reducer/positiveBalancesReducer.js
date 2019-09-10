import {DELETE_BALANCE_ENTRY, SET_BALANCE} from '../balanceActions'
import {CLEAR_TOKEN_LIST} from '../../token/tokenActions'

const POSITIVE_BALANCES_INITIAL = []

function clearPositiveBalances() {
    return POSITIVE_BALANCES_INITIAL
}

function setBalance(state, action) {
    const {payload} = action
    const {balanceId, balance} = payload
    const index = state.indexOf(balanceId)
    if (index > -1) {
        // this balance entry is currently marked as having a balance...
        if (balance.isZero()) {
            // no more balance. Remove from array
            const newState = state.filter(entry => entry !== balanceId)
            return newState
        } else {
            // all set, no need for action
            return state
        }
    } else {
        // this balance entry is currently marked as having NO balance...
        if (balance.gt(0)) {
            // ... but it has a balance now! Add it to list.
            return state.concat(balanceId)
        } else {
            // ... and it still has no balance. No need for action
            return state
        }
    }
}

function deleteBalanceEntry(state, action) {
    const {payload} = action
    const {balanceId} = payload
    const index = state.indexOf(balanceId)
    if (index > -1){
        state.splice(index, 1)
        return state
    }
    return state
}

export const positiveIds = (state=POSITIVE_BALANCES_INITIAL, action) => {
    switch (action.type) {
        case SET_BALANCE: {
            return setBalance(state, action)
        }
        case DELETE_BALANCE_ENTRY: {
            return deleteBalanceEntry(state, action)
        }
        case CLEAR_TOKEN_LIST:
            return clearPositiveBalances()
        default:
            return state;
    }
}
