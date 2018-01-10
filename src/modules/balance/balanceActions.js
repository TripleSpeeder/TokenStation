export const SET_BALANCE = 'SET_BALANCE'
export function setTokenBalance(balanceId, balance) {
    return {
        type: SET_BALANCE,
        payload: {
            balanceId,
            balance,
        }
    }
}
