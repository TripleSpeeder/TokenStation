export function addToken(tokenId, token) {
    return {
        type: "ADD_TOKEN",
        payload: {
            tokenId: tokenId,
            token: token
        }
    }
}

export function setTokenSupply(tokenID, supply) {
    return {
        type: "SET_TOKEN_SUPPLY",
        payload: {
            tokenId: tokenID,
            supply: supply,
        }
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
