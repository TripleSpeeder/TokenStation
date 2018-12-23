// const lookup = jest.fn(() => Promise.resolve('0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0'))
const lookup = jest.fn((ensName) => {
    return Promise((resolve, reject) => {
        process.nextTick(() => {
            if (ensName == 'michael.eth') {
                // valid name
                console.log("mock valid)")
                resolve('0x1000000000000000000000000000000000000001')
            } else {
                // invalid name
                console.log("mock invalid)")
                reject({
                    error: 'could not resolve name'
                })
            }
        })
    })
})

module.exports = {
    lookup
}
