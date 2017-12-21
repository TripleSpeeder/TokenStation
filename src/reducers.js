const ERC20Contracts_INITIAL = {
    ERC20Contracts: []
}

export const ERC20Contracts = (state=ERC20Contracts_INITIAL, action) => {
    switch (action.type) {
        case 'ADD_ERC20ContractResult':
            return Object.assign({}, state, {
                ERC20Contracts: [
                    ...state.ERC20Contracts,
                    action.erc20Contract
                ]
            })
        default:
            console.warn("unknown action in ERC20Contracts: " + action.type)
    }
    return state;
}

const QUERYADDRESS_INITIAL = {
    address: ''
}
export const queryAddress = (state=QUERYADDRESS_INITIAL, action) => {
    switch (action.type) {
        case 'SET_QUERYADDRESS':
            return Object.assign({}, state, {
                address: action.address
            })
        default:
            console.warn("unknown action in queryAddress: " + action.type)
    }
    return state;
}

const WEB3_INITIAL = {
    web3: null
}
export const web3Instance = (state=WEB3_INITIAL, action) => {
    switch (action.type) {
        case 'SET_WEB3INSTANCE':
            return Object.assign({}, state, {
                web3: action.web3
            })
        default:
            console.warn("unknown action in web3Instance: " + action.type)
    }
    return state;
}