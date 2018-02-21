import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {loadTokenTransferEvents} from '../token/tokenActions'
import {connect} from 'react-redux'
import {List} from 'semantic-ui-react'
import {buildAdressContractEventId} from './reducers/addressContractEventsByIdReducer'

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
            props.loadTokenTransferEvents(props.tokenId, props.address)
            this.eventsLoaded = true
        }
    }

    render() {
        return (
            <div>
                List {this.props.events.length} transfer events for {this.props.address} for token {this.props.tokenId}
                <List>
                    {this.props.events.map(event =>
                        <li key={event.transferEventId}>{event.transferEvent.args._from} -> {event.transferEvent.args._to}: {event.transferEvent.args._value.toString()}</li>
                    )}
                </List>
                {this.props.isLoading ? <div>Loading!!!</div> : <div>not loading...</div>}
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
    const address = ownProps.match.params.address.toLowerCase()
    const tokenId = parseInt(ownProps.match.params.tokenId, 10)
    // get all eventIds for address-tokenId combination
    const aceId = buildAdressContractEventId(address, tokenId)
    const aceEntry = state.events.aceById[aceId]
    const isLoading = aceEntry ? aceEntry.isLoading : true
    const eventIds = aceEntry ? aceEntry.eventIds : undefined
    // get events from eventIds
    const events = eventIds ? eventIds.map(id => (state.events.byId[id])) : []
    return {
        web3: state.web3Instance.web3,
        tokenId,
        address,
        events,
        isLoading,
    }
}
const mapDispatchToProps = dispatch => ({
    loadTokenTransferEvents: (tokenId, address) => {
        dispatch(loadTokenTransferEvents(tokenId, 0, 'latest', address))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressEventsContainer)

