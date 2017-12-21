
export function addERC20ContractResult(erc20contract) {
    return {
        type: "ADD_ERC20ContractResult",
        erc20Contract: erc20contract
    }
}

export function setQueryAddress(address) {
    return {
        type: "SET_QUERYADDRESS",
        address: address
    }
}

export function setWeb3Instance(web3) {
    return {
        type: 'SET_WEB3INSTANCE',
        web3: web3
    }
}
