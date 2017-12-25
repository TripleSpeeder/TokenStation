export const SET_QUERYADDRESS = 'SET_QUERYADDRESS'
export function setQueryAddress(address) {
    return {
        type: SET_QUERYADDRESS,
        address: address
    }
}
