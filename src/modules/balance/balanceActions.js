
let nextBalanceId = 0

export const SET_BALANCE = 'SET_BALANCE'
export function setBalance(balanceId, balance) {
    return {
        type: SET_BALANCE,
        payload: {
            balanceId,
            balance,
        }
    }
}

export const CREATE_BALANCE_ENTRY = 'CREATE_BALANCE_ENTRY'
export function createBalanceEntry(balanceId, addressId, tokenId) {
    return {
        type: CREATE_BALANCE_ENTRY,
        payload: {
            balanceId,
            addressId,
            tokenId
        }
    }
}

export function setBalanceByAddressAndToken(addressId, tokenId, balance) {
    return(dispatch, getState) => {
        // obtain balanceID
        const [balanceId, newEntry] = determineBalanceId(getState().balance.byId, addressId, tokenId)
        if (newEntry) {
            // first create a new balance entry
            dispatch(createBalanceEntry(balanceId, addressId, tokenId))
        }
        // set balance
        dispatch(setBalance(balanceId, balance))
    }
}

function determineBalanceId(balancesById, addressId, tokenId) {
    let candidates = Object.values(balancesById).filter(entry => (
        entry.addressId===addressId
        && entry.tokenId===tokenId)
    )
    let newEntry = false
    if (candidates.length === 0) {
        // combination not yet existing. Create new ID
        newEntry = true
        return [nextBalanceId++, newEntry]
    } else if (candidates.length ===1) {
        // found existing entry
        return [candidates[0], newEntry]
    } else {
        // more than one entry! Impossible :-(
        console.error("Found " + candidates.length + " matching balanceIds.")
        return null
    }
}
