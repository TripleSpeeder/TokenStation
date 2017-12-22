export function setTokenBalance(tokenID, balance) {
    return {
        type: "SET_TOKEN_BALANCE",
        payload: {
            tokenId: tokenID,
            balance: balance,
        }
    }
}

