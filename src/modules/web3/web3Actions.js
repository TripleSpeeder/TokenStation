export const SET_WEB3INSTANCE = 'SET_WEB3INSTANCE'
export function setWeb3Instance(web3) {
    return {
        type: SET_WEB3INSTANCE,
        web3: web3
    }
}
