import {SET_BALANCE} from '../balanceActions'

const BALANCE_BY_ID_INITIAL = {}

function setBalance(state, action) {
    const {payload} = action
    const {balanceId, balance} = payload

    return {
        ...state,
        // Update our Token object with a new balance value
        [balanceId] : balance
    };
}

export const balanceById = (state=BALANCE_BY_ID_INITIAL, action) => {
    switch (action.type) {
        case SET_BALANCE: {
            return setBalance(state, action)
        }
        default:
            return state;
    }
}
