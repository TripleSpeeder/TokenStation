export const ADD_TOKEN = 'ADD_TOKEN'
export function addToken(tokenId, token) {
    return {
        type: ADD_TOKEN,
        payload: {
            tokenId: tokenId,
            token: token
        }
    }
}

export const SET_TOKEN_SUPPLY = 'SET_TOKEN_SUPPLY'
export function setTokenSupply(tokenID, supply) {
    return {
        type: SET_TOKEN_SUPPLY,
        payload: {
            tokenId: tokenID,
            supply: supply,
        }
    }
}

