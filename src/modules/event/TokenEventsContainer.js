import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {buildEtherscanLink} from '../../utils/etherscanUtils'
import {connect} from 'react-redux'
import {loadTokenTransferEvents} from '../token/tokenActions'
import {Button, Header} from 'semantic-ui-react'
import {buildAdressContractEventId} from './reducers/addressContractEventsByIdReducer'
import AddressEventsList from './AddressEventsList'

class TokenEventsContainer extends Component {
    componentDidMount() {
        this.checkEventsLoaded(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.checkEventsLoaded(newProps)
    }

    loadMoreEvents = () => {
        // query the next 10000 blocks for token transfers to/from my address
        this.props.loadTokenTransferEvents(
            this.props.firstBlock - 10000,
            this.props.firstBlock,
            this.props.tokenId,
            this.props.address
        )
    }

    checkEventsLoaded(props) {
        if (props.missingAceEntryAddresses.length) {
            const firstBlock = props.minStart === Number.MAX_SAFE_INTEGER ? 0
                : props.minStart
            const lastBlock = props.maxEnd
            props.loadTokenTransferEvents(firstBlock, lastBlock, props.token.id, props.missingAceEntryAddresses)
        }

    }

    loadMoreEvents = () => {
        // query the next 10000 blocks for token transfers to/from my addresses
        const rangeStart = this.props.minStart - 10000
        const rangeEnd = this.props.minStart
        console.log("Loading events " + rangeStart + "-" + rangeEnd)
        this.props.loadTokenTransferEvents(
            rangeStart,
            rangeEnd,
            this.props.token.id,
            this.props.addresses
        )
    }

    render() {
        return (
            <div>
                <Header block as='h2'>
                    {this.props.token.name} token transfers
                </Header>
                <Header as='h3'>
                    Queried block {this.props.minStart} to {this.props.maxEnd}. <Button loading={this.props.eventsAreLoading} disabled={this.props.eventsAreLoading} onClick={this.loadMoreEvents}>Load more!</Button>
                </Header>
                <AddressEventsList transferEventIds={this.props.transferEventIds}
                    address={''}
                />
            </div>
        )
    }
}

TokenEventsContainer.propTypes = {
    token: PropTypes.object.isRequired
}

TokenEventsContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const tokenId = parseInt(ownProps.match.params.tokenId, 10)
    const token = state.tokens.byId[tokenId]
    const transferEventIds = token.eventIds
    const etherscanUrl = buildEtherscanLink(token.address)

    // Align the checked block range for each existing ace entry
    // To do this, first determine the maximum values of all ace entries
    let minStart = Number.MAX_SAFE_INTEGER
    let maxEnd = 0
    state.addresses.allIds.forEach(addressId => {
        const aceId = buildAdressContractEventId(addressId, tokenId)
        const aceEntry = state.events.aceById[aceId]
        if (aceEntry && (aceEntry.firstBlock > 0)) {
            // okay, entry existing and initialized. Now look at checked block range
            minStart = Math.min(minStart, aceEntry.firstBlock)
            maxEnd = Math.max(maxEnd, aceEntry.lastBlock)
        }
    })

    /*
        This could be further optimized by calculating the exact missing range for each
        ace entry. Right now I'm just determining the min/max values and for each entry
        that is incomplete just request the full range of blocks.
     */

    // check if any addressContractEvents are missing
    let eventsAreLoading = false
    const missingAceEntryAddresses = state.addresses.allIds.filter(entry => {
        const aceId = buildAdressContractEventId(entry, tokenId)
        const aceEntry = state.events.aceById[aceId]
        if (aceEntry === undefined) {
            // entry not existing at all
            return true
        }
        if (aceEntry.isLoading) {
            // ignore for now, will recheck once it's loaded
            eventsAreLoading = true // at least one ace entry is loading right now
            return false
        }
        if (aceEntry.firstBlock === 0) {
            // Freshly created, will recheck once it's loaded
            return false
        }
        if ((aceEntry.firstBlock > minStart) || (aceEntry.lastBlock < maxEnd)) {
            // incomplete range
            // console.log("AceEntry " + aceId + " has incomplete range " + aceEntry.firstBlock + ' - ' + aceEntry.lastBlock)
            // console.log("Expected range: " + minStart + " - " + maxEnd)
            return true
        }
        // valid entry that has full range covered. Fine :-)
        return false
    })

    return {
        token: token,
        etherscanUrl: etherscanUrl,
        missingAceEntryAddresses,
        transferEventIds,
        minStart,
        maxEnd,
        addresses: state.addresses.allIds,
        eventsAreLoading
    }
}
const mapDispatchToProps = dispatch => ({
    loadTokenTransferEvents: (firstBlock, lastBlock, tokenId, addressIds) => {
        dispatch(loadTokenTransferEvents(tokenId, firstBlock, lastBlock, addressIds))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenEventsContainer)
