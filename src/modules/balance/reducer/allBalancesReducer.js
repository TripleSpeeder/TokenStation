import {SET_TOKEN_BALANCE} from '../balanceActions'

const ALL_BALANCES_INITIAL = []

function setBalance(state, action) {
    const {payload} = action
    const {balanceId} = payload
    // prevent duplicate entries
    const existingIndex = state.indexOf(balanceId)
    if (existingIndex > -1) {
        console.warn("Ignoring duplicate balance " + balanceId)
        return state
    }
    return state.concat(balanceId)
}

export const allBalances = (state=[], action) => {
    switch (action.type) {
        case SET_TOKEN_BALANCE: {
            return setBalance(state, action)
        }
        default:
            return state
    }
}
