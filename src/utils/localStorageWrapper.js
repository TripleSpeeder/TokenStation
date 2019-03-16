
export const TRACKED_TOKEN_KEYS = 'TRACKED_TOKEN_KEYS'
export const SELECTED_TOKEN_KEY = 'SELECTED_TOKEN_KEY'

export function storeLocalData(key, data) {
    // console.log("Storing " + key + " -> " + data)
    localStorage.setItem(key, JSON.stringify(data))
}

export function getLocalData(key, defaultValue) {
    try {
        let data = JSON.parse(localStorage.getItem(key))
        if (data) {
            // console.log("Loaded data for key " + key + ": " + data)
            return data
        }
    }
    catch (e) {
        // console.log("Exception " + e + " looking for " + key)
    }
    // console.log("No data found for key " + key)
    return defaultValue
}
