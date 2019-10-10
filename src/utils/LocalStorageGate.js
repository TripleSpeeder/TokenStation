import {Component, Children} from 'react'
import {connect} from 'react-redux'
import {getLocalData, SELECTED_TOKEN_KEY, TRACKED_TOKEN_KEYS, WATCHED_ADDRESSES} from "./localStorageWrapper"
import {changeSelectorTokenId, changeTokenTracking, loadMultiTokenBalances} from "../modules/token/tokenActions"
import {addAddress, ADDRESS_TYPE_EXTERNAL} from "../modules/address/addressActions"

class LocalStorageGate extends Component {

    componentDidMount() {
        const {knownTokens} = this.props
        // Get tracked tokens from localstorage
        const storedTrackedTokens = getLocalData(TRACKED_TOKEN_KEYS, []);
        // remove tokenIDs that are not known
        const trackedTokens = storedTrackedTokens.filter(token => (knownTokens.indexOf(token) >= 0))
        trackedTokens.forEach((tokenId) => {
            this.props.changeTokenTracking(tokenId)
        })

        // get selected token from localstorage
        const selectedTokendId = getLocalData(SELECTED_TOKEN_KEY, null)
        if ((selectedTokendId) && (knownTokens.indexOf(selectedTokendId)>=0)) {
            this.props.changeSelectorTokenId(selectedTokendId)
        }

        // Get watched addresses from localstorage
        const watchedAddresses = getLocalData(WATCHED_ADDRESSES, [])
        watchedAddresses.forEach((addressEntry) => {
            this.props.addAddress(addressEntry.address, addressEntry.ensName)
            // load balance for all tracked tokens
            // TODO: This is the totally wrong place to trigger balance reloading!
            this.props.loadMultiTokenBalances(trackedTokens, addressEntry.address)
        })
    }

    render() {
        // Load the dapp.
        return Children.only(this.props.children)
    }
}

const mapStateToProps = (state) => ({
    knownTokens: state.tokens.allIds
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
