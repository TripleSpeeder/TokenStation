import {ADD_ADDRESS, REMOVE_ADDRESS} from '../addressActions'

const ADDRESS_BY_ID_INITIAL = {}
/*const ADDRESS_BY_ID_INITIAL = {
    '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0': '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0',
    '0xa38da4974b594204b73581ac5fbc1ebee54ca4e0': '0xa38da4974b594204b73581ac5fbc1ebee54ca4e0',
    '0xc44e4c49ffa5db98ca52770dff3e371ecb01f2d9': '0xc44e4c49ffa5db98ca52770dff3e371ecb01f2d9'
}*/

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
            type
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

export const addressByIdReducer = (state=ADDRESS_BY_ID_INITIAL, action) => {
    switch (action.type) {
        case ADD_ADDRESS:
            return addAddressEntry(state, action)
        case REMOVE_ADDRESS:
            return removeAddressEntry(state, action)
        default:
    }
    return state;
}
