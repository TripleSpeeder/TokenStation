import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import EventLoader from './EventLoader'
import {buildAdressContractEventId} from './reducers/addressContractEventsByIdReducer'
import {loadTokenTransferEvents} from '../token/tokenActions'


class EventLoaderContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.loadMoreEvents = this.loadMoreEvents.bind(this)
    }

    componentDidMount() {
        this.checkEventsLoaded(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.checkEventsLoaded(newProps)
    }

    checkEventsLoaded(props) {
        if (props.currentBlock && props.aceId && (props.hasAceEntry === false)) {
            // I have an aceID, but no according entry. Better start loading...
            const rangeEnd = props.currentBlock
            const rangeStart = rangeEnd - 10000
            console.log("Loading events " + rangeStart + "-" + rangeEnd)
            props.loadTokenTransferEvents(
                rangeStart,
                rangeEnd,
                props.tokenId,
                props.addressId
            )
        }
    }

    loadMoreEvents() {
        // query the previous 1000 blocks for token transfers to/from my addresses
        const rangeEnd = this.props.resultFromBlock ? this.props.resultFromBlock : this.props.currentBlock
        const rangeStart = rangeEnd - 10000
        console.log("Loading events " + rangeStart + "-" + rangeEnd)
        this.props.loadTokenTransferEvents(
            rangeStart,
            rangeEnd,
            this.props.tokenId,
            this.props.addressId
        )
    }

    render() {
        const {
            loading, resultCount, resultFromBlock, resultFromBlockDate, resultToBlock,
            loadingFromBlock, loadingToBlock } = this.props
        return (
            <EventLoader
                loading={loading}
                resultCount={resultCount}
                resultFromBlock={resultFromBlock}
                resultFromBlockDate={resultFromBlockDate}
                resultToBlock={resultToBlock}
                onLoadMore={this.loadMoreEvents}
                loadingFromBlock={loadingFromBlock}
                loadingToBlock={loadingToBlock}
                loadingCurrentBlock={loadingFromBlock}
            />
        )
    }
}

EventLoaderContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
}

EventLoaderContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state) => {
    let resultCount = 0
    let loading = false
    let resultFromBlock = 0
    let resultToBlock = 0
    let resultFromBlockDate = 'XXX'
    let aceId = undefined
    let aceEntry = undefined
    let loadingFromBlock = 0
    let loadingToBlock = 0
    const tokenId = state.tokens.selector.selectedTokenId
    const addressId = state.addresses.selector.selectedAddressId
    const currentBlock = state.web3Instance.block.number
    if (tokenId && addressId) {
        aceId = buildAdressContractEventId(addressId, tokenId)
        aceEntry = state.events.aceById[aceId]
        if (aceEntry) {
            // okay, entry existing. Now look at checked block range
            resultFromBlock = aceEntry.firstBlock
            resultToBlock = aceEntry.lastBlock
            resultCount = aceEntry.eventIds.length
            // is aceEntry currently being loaded?
            loading = aceEntry.isLoading
            loadingFromBlock = aceEntry.loadingFromBlock
            loadingToBlock = aceEntry.loadingToBlock
        }
    }

    return {
        loading,
        resultCount,
        resultFromBlock,
        resultFromBlockDate,
        resultToBlock,
        currentBlock,
        tokenId,
        addressId,
        aceId,
        hasAceEntry: Boolean(aceEntry),
        loadingToBlock,
        loadingFromBlock
    }
}

const mapDispatchToProps = dispatch => ({
    loadTokenTransferEvents: (firstBlock, lastBlock, tokenId, addressId) => {
        dispatch(loadTokenTransferEvents(tokenId, firstBlock, lastBlock, [addressId]))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(EventLoaderContainer)
