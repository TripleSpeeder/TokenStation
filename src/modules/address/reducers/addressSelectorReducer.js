import {CHANGE_ADDRESS_SELECTOR_FILTER_PROPS, CHANGE_SELECTOR_ADDRESSID, CLEAR_ADDRESSES} from '../addressActions'

const SELECTOR_INITIAL = {
    filter: '',
    matchedAddressIds: [],
    selectedAddressId: '',
}

function changeFilterProps(state, action){
    const {payload} = action
    const {filter, matchedAddressIds} = payload

    return {
        ...state,
        filter,
        matchedAddressIds,
    }
}

function changeSelectorAddressId(state, action){
    const {payload} = action
    const {selectedAddressId} = payload

    return {
        ...state,
        selectedAddressId,
    }
}

export const addressSelectorReducer = (state=SELECTOR_INITIAL, action) => {
    switch (action.type) {
        case CHANGE_ADDRESS_SELECTOR_FILTER_PROPS:
            return changeFilterProps(state, action)
        case CHANGE_SELECTOR_ADDRESSID:
            return changeSelectorAddressId(state, action)
        case CLEAR_ADDRESSES:
            return SELECTOR_INITIAL
        default:
            return state
    }
}

