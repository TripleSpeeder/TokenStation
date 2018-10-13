import getWeb3 from '../../utils/getWeb3'
import {clearTokenList} from '../token/tokenActions'
const PromisifyWeb3 = require("../../utils/promisifyWeb3.js")

export const WEB3_STATES = {
    UNINITIALIZED: 'uninitialized',
    LOADING: 'loading',
    INITIALIZED: 'initialized',
    ERROR: 'error'
}

export const SET_WEB3_STATE = 'SET_WEB3_STATE'
export function setWeb3State(state) {
    return {
        type: SET_WEB3_STATE,
        state
    }
}

export const SET_WEB3INSTANCE = 'SET_WEB3INSTANCE'
export function setWeb3Instance(web3) {
    return {
        type: SET_WEB3INSTANCE,
        web3
    }
}

export const SET_CURRENT_BLOCK = 'SET_CURRENT_BLOCK'
export function setCurrentBlock(block) {
    return {
        type: SET_CURRENT_BLOCK,
        block
    }
}

export const SET_NETWORK = 'SET_NETWORK'
export function setNetwork(id, name) {
    return {
        type: SET_NETWORK,
        id,
        name
    }
}

export const SET_NODE_VERSION = 'SET_NODE_VERSION'
export function setNodeVersion(nodeVersion) {
    return {
        type: SET_NODE_VERSION,
        nodeVersion
    }
}

export const IS_LOADING = 'IS_LOADING'
export function loadingChanged(isLoading) {
    return {
        type: IS_LOADING,
        isLoading
    }
}

export const SET_BLOCK_FILTER = 'SET_BLOCK_FILTER'
export function setBlockFilter(blockFilter) {
    return {
        type: SET_BLOCK_FILTER,
        blockFilter
    }
}

export function stopBlockFilter() {
    return (dispatch, getState) => {
        // Clean up any blockfilter that might be active
        const {blockFilter} = getState().web3Instance
        if (blockFilter) {
            blockFilter.stopWatching((error, result) => {
                if (error) {
                    console.log("Error stopping blockfilter: " + error)
                }
            })
            dispatch(setBlockFilter(null))
        }
    }
}

export function initialize() {
    return async (dispatch, getState) => {
        // stop any running block filter, just in case...
        dispatch(stopBlockFilter())

        // signal that web3 is being initialized
        dispatch(loadingChanged(true))
        dispatch(setWeb3State(WEB3_STATES.LOADING))

        // set web3 instance
        try {
            var {web3} = await getWeb3
            // stop loading
            dispatch(loadingChanged(false))
            dispatch(setWeb3State(WEB3_STATES.INITIALIZED))
        }
        catch(e) {
            console.log("Error getting web3: " + e)
            dispatch(loadingChanged(false))
            dispatch(setWeb3State(WEB3_STATES.ERROR))
            return;
        }

        // FIXME - Promisify can be removed once web3.js 1.0 is released
        PromisifyWeb3.promisify(web3)
        dispatch(setWeb3Instance(web3))

        // set node info
        const nodeVersion = await web3.version.getNodePromise()
        dispatch(setNodeVersion(nodeVersion))

        // set network info
        const networkIdString = await web3.version.getNetworkPromise()
        let networkID = parseInt(networkIdString, 10)
        const network = getNetworkName(networkID)
        dispatch(setNetwork(networkID, network))

        // set current block
        const block = await web3.eth.getBlockPromise('latest')
        dispatch(setCurrentBlock(block))

        // start listening for new block events
        const filter = web3.eth.filter('latest')
        filter.watch(async (error, blockHash) => {
            if (error) {
                console.log("Error watching for block events: " + error)
            } else {
                const block = await web3.eth.getBlockPromise(blockHash)
                if (block) {
                    dispatch(setCurrentBlock(block))
                }
                else {
                    console.log("Ignoring null-block!")
                    console.log(block)
                }
            }
        })
        dispatch(setBlockFilter(filter))

        // start watching for network change events
        setInterval(async function () {
            const networkIdString = await web3.version.getNetworkPromise()
            let networkID = parseInt(networkIdString, 10)
            const oldNetworkId = getState().web3Instance.id
            if (oldNetworkId !== networkID) {
                const network = getNetworkName(networkID)
                dispatch(setNetwork(networkID, network))
                dispatch(clearTokenList())
            }
        }, 1000)
    }
}

function getNetworkName(networkId) {
    let network = 'unknown'
    switch (networkId) {
        case 4447:
            network = 'truffle test'
            break
        case 1:
            network = 'mainnet'
            break
        case 2:
            network = 'Morden (deprecated!)'
            break
        case 3:
            network = 'Ropsten'
            break
        case 4:
            network = 'Rinkeby'
            break
        case 42:
            network = 'Kovan'
            break
        case 61:
            network = 'ETC'
            break
        case 62:
            network = 'ETC Testnet'
            break
        default:
            network = 'Unknown'
    }
    return network
}
