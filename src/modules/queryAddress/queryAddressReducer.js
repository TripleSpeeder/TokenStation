import {updateObject} from "../../utils/reducerUtils"
import {SET_QUERYADDRESS} from "./queryAddressActions"

const QUERYADDRESS_INITIAL = {
    address: null
}
export const queryAddress = (state=QUERYADDRESS_INITIAL, action) => {
    switch (action.type) {
        case SET_QUERYADDRESS:
            return updateObject(state, {address: action.address})
        default:
    }
    return state;
}