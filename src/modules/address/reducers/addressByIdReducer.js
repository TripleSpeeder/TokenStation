import {
    ADD_ADDRESS, ADDRESS_BALANCES_STATES, CHANGE_ADDRESS_BALANCES_STATE, CHANGE_ADDRESS_TYPE,
    REMOVE_ADDRESS
} from '../addressActions'

const ADDRESS_BY_ID_INITIAL = {}

function addAddressEntry(state, action) {
    const {payload} = action
    const {addressId, address, ensName, type} = payload
    if (Object.keys(state).indexOf(addressId) > -1)
    {
        console.warn("Ignoring duplicate address " + addressId)
        return state
    }
    return {
        ...state,
        [addressId]: {
            address,
            ensName,
            type,
            balancesState: ADDRESS_BALANCES_STATES.VIRGIN,
            eventIds: []
        },
    }
}

function removeAddressEntry(state, action) {
    const {payload} = action
    const {addressId} = payload
    let newState = Object.assign({}, state)
    delete newState[addressId]
    return newState
}

function changeAddressType(state, action) {
    const {payload} = action
    const {addressId, newType} = payload
    const addressEntry = state[addressId]
    return {
        ...state,
        [addressId] : {
            ...addressEntry,
            type: newType
        }
    }
}

function changeAddressBalancesState(state, action) {
    const {payload} = action
    const {addressBalancesState, addressId} = payload
    const addressEntry = state[addressId]
    return {
        ...state,
        [addressId] : {
            ...addressEntry,
            balancesState: addressBalancesState
        }
    }
}

export const addressByIdReducer = (state=ADDRESS_BY_ID_INITIAL, action) => {
    switch (action.type) {
        case ADD_ADDRESS:
            return addAddressEntry(state, action)
        case REMOVE_ADDRESS:
            return removeAddressEntry(state, action)
        case CHANGE_ADDRESS_TYPE:
            return changeAddressType(state, action)
        case CHANGE_ADDRESS_BALANCES_STATE:
            return changeAddressBalancesState(state, action)
        default:
    }
    return state;
}
