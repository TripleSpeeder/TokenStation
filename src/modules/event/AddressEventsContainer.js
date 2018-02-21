import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {loadTokenTransferEvents} from '../token/tokenActions'
import {connect} from 'react-redux'
import {Button, List} from 'semantic-ui-react'
import {buildAdressContractEventId} from './reducers/addressContractEventsByIdReducer'

class AddressEventsContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        this.checkEventsLoaded(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.checkEventsLoaded(newProps)
    }

    checkEventsLoaded(props) {
        if (props.web3 && !props.aceEntry) {
            props.loadTokenTransferEvents(0,0,props.tokenId, props.address)
        }
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

    render() {
        return (
            <div>
                <div>
                    List {this.props.events.length} transfer events for {this.props.address} for token {this.props.tokenId}.
                </div>
                <div>
                    Queried block {this.props.firstBlock} to {this.props.lastBlock}.
                    <Button onClick={this.loadMoreEvents}>Load more!</Button>
                </div>
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
    const isLoading = aceEntry ? aceEntry.isLoading : false
    const eventIds = aceEntry ? aceEntry.eventIds : undefined
    const firstBlock = aceEntry ? aceEntry.firstBlock : 0
    const lastBlock = aceEntry ? aceEntry.lastBlock : 0
    // get events from eventIds
    const events = eventIds ? eventIds.map(id => (state.events.byId[id])) : []
    return {
        web3: state.web3Instance.web3,
        tokenId,
        address,
        events,
        isLoading,
        firstBlock,
        lastBlock,
        aceEntry
    }
}
const mapDispatchToProps = (dispatch) => ({
    loadTokenTransferEvents: (firstBlock, lastBlock, tokenId, address) => {
        dispatch(loadTokenTransferEvents(tokenId, firstBlock, lastBlock, address))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressEventsContainer)

