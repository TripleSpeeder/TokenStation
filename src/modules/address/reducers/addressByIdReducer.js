import {
    ADD_ADDRESS, ADDRESS_BALANCES_STATES, CHANGE_ADDRESS_BALANCES_STATE, CHANGE_ADDRESS_TYPE,
    REMOVE_ADDRESS
} from '../addressActions'
import {ADD_EVENT} from '../../event/eventActions'

const ADDRESS_BY_ID_INITIAL = {}
/*
const ADDRESS_BY_ID_INITIAL = {
    '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0': {
        address: '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0',
        type: ADDRESS_TYPE_EXTERNAL
    },
    '0xa38da4974b594204b73581ac5fbc1ebee54ca4e0': {
        address: '0xa38da4974b594204b73581ac5fbc1ebee54ca4e0',
        type: ADDRESS_TYPE_EXTERNAL
    },
    '0xc44e4c49ffa5db98ca52770dff3e371ecb01f2d9': {
        address: '0xc44e4c49ffa5db98ca52770dff3e371ecb01f2d9',
        type: ADDRESS_TYPE_OWNED
    }
}
*/

function addAddressEntry(state, action) {
    const {payload} = action
    const {addressId, address, type} = payload
    if (Object.keys(state).indexOf(addressId) > -1)
    {
        console.warn("Ignoring duplicate address " + addressId)
        return state
    }
    return {
        ...state,
        [addressId]: {
            address,
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

function addTransferEvent(state, action) {
    // Attach the new event to the address, if it is "to" or "from"
    const {payload} = action
    const {eventId, tokenId, event} = payload
    const {_from, _to} = event.args

    // Find addresses matching _from or _to
    const matchedAddresses = Object.values(state).filter(addressEntry => {
        return ((addressEntry.address.toLowerCase() === _to) || (addressEntry.address.toLowerCase() === _from))
    })

    matchedAddresses.forEach(matchedAddressEntry => {
        state[matchedAddressEntry.address].eventIds = state[matchedAddressEntry.address].eventIds.concat(eventId)
    })

    // TODO
    return state

    // Look up the correct token, to simplify the rest of the code
    const token = state[tokenId]

    if (token.eventIds.includes(eventId))
    {
        console.warn("Ignoring duplicate event " + eventId)
        return state
    }

    let newEventIds = token.eventIds.concat(eventId)
    return {
        ...state,
        // Update our Token object with a new supply value
        [tokenId]: {
            ...token,
            eventIds: newEventIds
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
        case ADD_EVENT:
            return addTransferEvent(state, action)
        default:
    }
    return state;
}
