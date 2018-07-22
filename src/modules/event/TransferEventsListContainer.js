import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {buildAdressContractEventId} from './reducers/addressContractEventsByIdReducer'
import TransferEventsList from './TransferEventsList'

class TransferEventsListContainer extends Component {

    render() {
        const {aceEventIds} = this.props
        return (
            <TransferEventsList transferEventIds={aceEventIds}/>
        )
    }
}

TransferEventsListContainer.propTypes = {
    token: PropTypes.object
}

TransferEventsListContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state) => {
    const tokenId = state.tokens.selector.selectedTokenId
    const addressId = state.addresses.selector.selectedAddressId
    let aceEntry = undefined
    if (tokenId && addressId) {
        const aceId = buildAdressContractEventId(addressId, tokenId)
        aceEntry = state.events.aceById[aceId]
    }

    return {
        aceEventIds: aceEntry ? aceEntry.eventIds : []
    }
}

export default connect(mapStateToProps)(TransferEventsListContainer)
