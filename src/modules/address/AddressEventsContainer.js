import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {loadTokenTransferEvents} from '../token/tokenActions'
import {buildEtherscanLink} from '../../utils/etherscanUtils'
import {connect} from 'react-redux'

class AddressEventsContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.eventsLoaded = false
    }

    componentDidMount() {
        this.checkEventsLoaded(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.checkEventsLoaded(newProps)
    }

    checkEventsLoaded(props) {
        if (props.web3 && !this.eventsLoaded) {
            props.loadTokenTransferEvents(props.tokenId)
            this.eventsLoaded = true
        }
    }
    render() {
        return (
            <div>
                List {this.props.matchedEvents.length} transfer events for {this.props.address} for token {this.props.tokenId}
                <list>
                    {this.props.matchedEvents.map(event =>
                        <li key={event.eventId}>{event.event.args._from} -> {event.event.args._to}: {event.event.args._value.toString()}</li>
                    )}
                </list>
            </div>
        )
    }
}

AddressEventsContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
    address: PropTypes.string.isRequired
}

AddressEventsContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const address = ownProps.match.params.address
    const tokenId = parseInt(ownProps.match.params.tokenId, 10)
    const eventIds = state.addresses.byId[address].eventIds     // all eventIDs attached to address
    const events = eventIds.map(id => (state.events.byId[id]))  // get events from eventIds
    // I'm only interested in events matching current token (from url)
    const matchedEvents = events.filter(event => (event.tokenId === tokenId))
    return {
        web3: state.web3Instance.web3,
        tokenId,
        address,
        matchedEvents,
    }
}
const mapDispatchToProps = dispatch => ({
    loadTokenTransferEvents: (tokenId) => {
        dispatch(loadTokenTransferEvents(tokenId, 0, 'latest'))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressEventsContainer)

