export function buildEtherscanLink(address, networkId=1) {
    let protocol='https'
    let host=''
    switch(networkId) {
        case 1:
            host='etherscan.io'
            break
        case 3:
            host='ropsten.etherscan.io'
            break
        case 4:
            host='rinkeby.etherscan.io'
            break
        case 42:
            host='kovan.etherscan.io'
            break
        default:
            host='etherscan.io'
    }
    return protocol + '://' + host + '/address/' + address
}