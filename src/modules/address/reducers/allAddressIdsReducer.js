import {ADD_ADDRESS, REMOVE_ADDRESS} from '../addressActions'

const ALL_ADDRESSES_INITIAL = []

function addAddressId(state, action) {
    const {payload} = action
    const {addressId} = payload
    // prevent duplicate entries
    const existingIndex = state.indexOf(addressId)
    if (existingIndex > -1) {
        console.warn("Ignoring duplicate address " + addressId)
        return state
    }
    return state.concat(addressId)
}

function removeAddressId(state, action) {
    const {payload} = action
    const {addressId} = payload
    return state.filter(entryId => (entryId !== addressId))
}

export const allAddressIdsReducer = (state=ALL_ADDRESSES_INITIAL, action) => {
    switch (action.type) {
        case ADD_ADDRESS:
            return addAddressId(state, action)
        case REMOVE_ADDRESS:
            return removeAddressId(state, action)
        default:
    }
    return state;
}
