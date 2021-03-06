import getWeb3 from '../../utils/getWeb3'
import {clearTokenList} from '../token/tokenActions'

export const WEB3_STATES = {
    UNINITIALIZED: 'uninitialized',
    LOADING: 'loading',
    INITIALIZED: 'initialized',
    ERROR: 'error'
}

export const ETH_ENABLE_STATES = {
    REJECTED: 'rejected', // no access to eth.accounts
    WAITING: 'waiting', // waiting for user confirmation in UI (e.g. metamask)
    GRANTED: 'granted', // user has granted access to eth.accounts
}

export const SET_WEB3_STATE = 'SET_WEB3_STATE'
export function setWeb3State(state) {
    return {
        type: SET_WEB3_STATE,
        state
    }
}

export const SET_ETH_ENABLE_STATE = 'SET_ETH_ENABLE_STATE'
export function setEthEnableState(ethEnableState) {
    return {
        type: SET_ETH_ENABLE_STATE,
        ethEnableState
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
export function setNetwork(id, name, previousId) {
    return {
        type: SET_NETWORK,
        id,
        name,
        previousId,
    }
}

export const SET_NODE_VERSION = 'SET_NODE_VERSION'
export function setNodeVersion(nodeVersion) {
    return {
        type: SET_NODE_VERSION,
        nodeVersion
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
            blockFilter.unsubscribe((error, success) => {
                if (error) {
                    console.log("Error stopping blockfilter: " + error)
                } else {
                    console.log("Success stopping blockfilter: " + success)
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
        dispatch(setWeb3State(WEB3_STATES.LOADING))

        // set web3 instance
        try {
            var {web3} = await getWeb3
            // stop loading
            dispatch(setWeb3State(WEB3_STATES.INITIALIZED))
        }
        catch(e) {
            console.log("Error getting web3: " + e)
            dispatch(setWeb3State(WEB3_STATES.ERROR))
            return;
        }

        dispatch(setWeb3Instance(web3))

        // start watching for network change events
        if (window.ethereum) {
            // disable page reload on network change
            window.ethereum.autoRefreshOnNetworkChange = false;
            // register callback to handle network change
            window.ethereum.on('networkChanged', (networkID) => {
                networkID = parseInt(networkID)
                console.log("Network changed to " + networkID)
                const network = getNetworkName(networkID)
                const oldNetworkId = getState().web3Instance.id
                dispatch(setNetwork(networkID, network, oldNetworkId))
                dispatch(clearTokenList())
            } )
        } else {
            // legacy browser
            setInterval(async function () {
                const networkID = await web3.eth.net.getId()
                const oldNetworkId = getState().web3Instance.id
                if (oldNetworkId !== networkID) {
                    const network = getNetworkName(networkID)
                    dispatch(setNetwork(networkID, network, oldNetworkId))
                    dispatch(clearTokenList())
                }
            }, 1000)
        }

        // set node info
        const nodeVersion = await web3.eth.getNodeInfo()
        dispatch(setNodeVersion(nodeVersion))

        // set network info
        const networkID = await web3.eth.net.getId()
        const network = getNetworkName(networkID)
        dispatch(setNetwork(networkID, network, undefined))

        // set current block
        const block = await web3.eth.getBlock('latest')
        dispatch(setCurrentBlock(block))

        // start listening for new block events
        const filter = web3.eth.subscribe('newBlockHeaders')
        .on("data", function (blockHeader) {
            dispatch(setCurrentBlock(blockHeader))
        })
        .on("error", function (error) {
            console.log(error)
        })
        dispatch(setBlockFilter(filter))

    }
}

export function requestEthEnable() {
    return async (dispatch, getState) => {
        if (window.ethereum) {
            // request access to user accounts as described in EIP-1102
            try {
                // signal that app is waiting for user action
                dispatch(setEthEnableState(ETH_ENABLE_STATES.WAITING))
                // request access
                await window.ethereum.enable()
                // signal success
                dispatch(setEthEnableState(ETH_ENABLE_STATES.GRANTED))
            } catch(error) {
                // user rejected access
                dispatch(setEthEnableState(ETH_ENABLE_STATES.REJECTED))
            }
        } else {
            // must be a legacy browser, which should grant access by default.
            dispatch(setEthEnableState(ETH_ENABLE_STATES.GRANTED))
        }
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
