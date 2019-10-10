import {CHANGE_SELECTOR_TOKENID} from '../tokenActions'
import {SET_NETWORK} from '../../web3/web3Actions'

const SELECTOR_INITIAL = {
    selectedTokenId: undefined
}

function changeSelectorTokenId(state, action) {
    const {payload} = action
    const {selectedTokenId} = payload

    return {
        ...state,
        selectedTokenId,
    }
}

function setNetwork(state, action) {
    const {id, previousId} = action
    // if the existing network got changed, clear the selected token. If this
    // is the initial setNetwork event after page load (previousID is undefined)
    // keep the selectedTokenId
    // NOTE: This will only start working when Metamask stops the full page reload on network change.
    // See https://github.com/MetaMask/metamask-extension/issues/3599.
    if (previousId && (previousId !== id))
        return SELECTOR_INITIAL
    else
        return state
}

export const selectorReducer = (state=SELECTOR_INITIAL, action) => {
    switch (action.type) {
        case CHANGE_SELECTOR_TOKENID:
            return changeSelectorTokenId(state, action)
        case SET_NETWORK:
            return setNetwork(state, action)
        default:
            return state
    }
}

