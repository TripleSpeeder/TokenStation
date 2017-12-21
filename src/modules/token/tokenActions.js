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

