export const SET_WEB3INSTANCE = 'SET_WEB3INSTANCE'
export function setWeb3Instance(web3) {
    return {
        type: SET_WEB3INSTANCE,
        web3: web3
    }
}

export const SET_CURRENT_BLOCK = 'SET_CURRENT_BLOCK'
export function setCurrentBlock(block) {
    return {
        type: SET_CURRENT_BLOCK,
        block: block
    }
}

export const SET_NETWORK = 'SET_NETWORK'
export function setNetwork(id, name) {
    return {
        type: SET_NETWORK,
        id: id,
        name: name
    }
}

export const SET_API_VERSION = 'SET_API_VERSION'
export function setAPIVersion(apiVersion) {
    return {
        type: SET_API_VERSION,
        apiVersion: apiVersion
    }
}

export const SET_NODE_VERSION = 'SET_NODE_VERSION'
export function setNodeVersion(nodeVersion) {
    return {
        type: SET_NODE_VERSION,
        nodeVersion: nodeVersion
    }
}
