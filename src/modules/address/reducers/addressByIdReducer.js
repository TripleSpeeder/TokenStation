import {ADD_ADDRESS, REMOVE_ADDRESS} from '../addressActions'

const ADDRESS_BY_ID_INITIAL = {}

function addAddressEntry(state, action) {
    const {payload} = action
    const {addressId, address} = payload
    return {
        ...state,
        [addressId]: address,
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
