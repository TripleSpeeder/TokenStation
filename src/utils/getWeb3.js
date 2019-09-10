import Web3 from 'web3'
/*
 Obtain web3 instance. Based on code from
 https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
 */
let getWeb3 = new Promise(function (resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', async () => {
        let myWeb3

        // Modern dapp browsers...
        if (window.ethereum) {
            myWeb3 = new Web3(window.ethereum)
        }

        if (myWeb3) {
            console.log('Injected web3 detected.')
            let results = {
                web3: myWeb3
            }
            resolve(results)
        } else {
            let results = {
                error: 'No web3 injected'
            }
            reject(results)
        }
    })
})

export default getWeb3
