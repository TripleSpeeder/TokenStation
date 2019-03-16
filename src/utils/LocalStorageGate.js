import {Component, Children} from 'react'
import {connect} from 'react-redux'
import {getLocalData, SELECTED_TOKEN_KEY, TRACKED_TOKEN_KEYS, WATCHED_ADDRESSES} from "./localStorageWrapper"
import {changeSelectorTokenId, changeTokenTracking, loadMultiTokenBalances} from "../modules/token/tokenActions"
import {addAddress, ADDRESS_TYPE_EXTERNAL} from "../modules/address/addressActions"

class LocalStorageGate extends Component {

    componentDidMount() {
        // Get tracked tokens from localstorage
        const trackedTokens = getLocalData(TRACKED_TOKEN_KEYS, []);
        trackedTokens.forEach((tokenId) => {
            this.props.changeTokenTracking(tokenId)
        })
        // get selected token from localstorage
        const selectedTokendId = getLocalData(SELECTED_TOKEN_KEY, null)
        if (selectedTokendId) {
            this.props.changeSelectorTokenId(selectedTokendId)
        }
        // Get addresses from localstorage
        const watchedAddresses = getLocalData(WATCHED_ADDRESSES, [])
        watchedAddresses.forEach((addressEntry) => {
            this.props.addAddress(addressEntry.address, addressEntry.ensName)
            // load balance for all tracked tokens
            this.props.loadMultiTokenBalances(trackedTokens, addressEntry.address)
        })
    }

    render() {
        // Load the dapp.
        return Children.only(this.props.children)
    }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
    changeTokenTracking: (tokenId) => {
        dispatch(changeTokenTracking(tokenId, true))
    },
    changeSelectorTokenId: (tokenId) => {
        dispatch(changeSelectorTokenId(tokenId))
    },
    addAddress: (address, ensName) => {
        dispatch(addAddress(address, ensName, ADDRESS_TYPE_EXTERNAL))
    },
    loadMultiTokenBalances: (trackedTokens, address) => {
        dispatch(loadMultiTokenBalances(trackedTokens, address))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LocalStorageGate)
