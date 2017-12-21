import {updateObject} from "./utils"

const QUERYADDRESS_INITIAL = {
    address: ''
}
export const queryAddress = (state=QUERYADDRESS_INITIAL, action) => {
    switch (action.type) {
        case 'SET_QUERYADDRESS':
            return updateObject(state, {address: action.address})
        default:
    }
    return state;
}