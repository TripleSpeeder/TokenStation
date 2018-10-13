import {updateObject} from "../../utils/reducerUtils"
import {
    SET_CURRENT_BLOCK,
    SET_WEB3INSTANCE,
    SET_NETWORK,
    SET_NODE_VERSION, SET_BLOCK_FILTER, WEB3_STATES, SET_WEB3_STATE,
} from './web3Actions'

const WEB3_INITIAL = {
    web3: null,
    state: WEB3_STATES.UNINITIALIZED,
    block: {
        number: 0,
        timestamp: 0
    },
    id: -1,
    name: 'unknown',
    blockFilter: null,
}

export const web3Instance = (state=WEB3_INITIAL, action) => {
    switch (action.type) {
        case SET_WEB3_STATE:
            return updateObject(state, {state: action.state})
        case SET_WEB3INSTANCE:
            return updateObject(state, {web3: action.web3})
        case SET_CURRENT_BLOCK:
            return updateObject(state, {block: action.block})
        case SET_NETWORK:
            return updateObject(state, {id: action.id, name: action.name})
        case SET_NODE_VERSION:
            return updateObject(state, {nodeVersion: action.nodeVersion})
        case SET_BLOCK_FILTER:
            return updateObject(state, {blockFilter: action.blockFilter})
        default:
    }
    return state;
}
