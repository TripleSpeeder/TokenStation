import {updateObject} from "../../utils/reducerUtils"
import {
    SET_CURRENT_BLOCK,
    SET_WEB3INSTANCE,
    SET_NETWORK,
    SET_API_VERSION,
    SET_NODE_VERSION,
} from "./web3Actions"

const WEB3_INITIAL = {
    web3: null,
    block: 0,
    id: -1,
    name: 'unknown'
}
export const web3Instance = (state=WEB3_INITIAL, action) => {
    switch (action.type) {
        case SET_WEB3INSTANCE:
            return updateObject(state, {web3: action.web3})
        case SET_CURRENT_BLOCK:
            return updateObject(state, {block: action.block})
        case SET_NETWORK:
            return updateObject(state, {id: action.id, name: action.name})
        case SET_API_VERSION:
            return updateObject(state, {apiVersion: action.apiVersion})
        case SET_NODE_VERSION:
            return updateObject(state, {nodeVersion: action.nodeVersion})
        default:
    }
    return state;
}
