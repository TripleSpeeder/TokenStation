import {SET_QUERYADDRESS} from './queryAddressActions'
import {updateObject} from '../../utils/reducerUtils'

const QUERYADDRESS_INITIAL = {
    address: '',
    valid: false,
}

function setQueryAddress(state, action) {
    const {payload} = action
    const {address, valid} = payload
    return {
        ...state,
        address,
        valid
    }
}

export const queryAddress = (state=QUERYADDRESS_INITIAL, action) => {
    switch (action.type) {
        case SET_QUERYADDRESS:
            return setQueryAddress(state, action)
        default:
    }
    return state;
}
