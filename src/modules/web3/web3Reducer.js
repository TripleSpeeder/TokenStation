import {updateObject} from "../../utils/reducerUtils"
import {SET_WEB3INSTANCE} from "./web3Actions"

const WEB3_INITIAL = {
    web3: null
}
export const web3Instance = (state=WEB3_INITIAL, action) => {
    switch (action.type) {
        case SET_WEB3INSTANCE:
            return updateObject(state, {web3: action.web3})
        default:
    }
    return state;
}