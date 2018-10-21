import {CHANGE_SELECTOR_ADDRESSID} from '../addressActions'

const SELECTOR_INITIAL = {
    selectedAddressId: '',
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
        case CHANGE_SELECTOR_ADDRESSID:
            return changeSelectorAddressId(state, action)
        default:
            return state
    }
}

