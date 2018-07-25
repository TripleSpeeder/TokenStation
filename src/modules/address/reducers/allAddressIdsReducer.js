import {ADD_ADDRESS, CLEAR_ADDRESSES, REMOVE_ADDRESS} from '../addressActions'

const ALL_ADDRESSES_INITIAL = []
/*const ALL_ADDRESSES_INITIAL = [
    '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0',
    '0xa38da4974b594204b73581ac5fbc1ebee54ca4e0',
    '0xc44e4c49ffa5db98ca52770dff3e371ecb01f2d9',
]*/

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
        case CLEAR_ADDRESSES:
            return ALL_ADDRESSES_INITIAL
        default:
    }
    return state;
}
