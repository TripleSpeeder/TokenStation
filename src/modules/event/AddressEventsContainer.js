import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {loadTokenTransferEvents} from '../token/tokenActions'
import {connect} from 'react-redux'
import {Button, Header, List} from 'semantic-ui-react'
import {buildAdressContractEventId} from './reducers/addressContractEventsByIdReducer'
import AddressEventsList from './AddressEventsList'

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
                <Header block as='h2'>
                    Transfer history of {this.props.token.name} tokens for {this.props.address}
                </Header>
                <Header as='h3'>
                    Queried block {this.props.firstBlock} to {this.props.lastBlock}. <Button loading={this.props.isLoading} disabled={this.props.isLoading} onClick={this.loadMoreEvents}>Load more!</Button>
                </Header>
                <AddressEventsList transferEventIds={this.props.transferEventIds}
                                   address={this.props.address}
                />
            </div>
        )
    }
}

AddressEventsContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
    address: PropTypes.string.isRequired,
    tokenId: PropTypes.number.isRequired,
}

AddressEventsContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const address = ownProps.match.params.address.toLowerCase()
    const tokenId = parseInt(ownProps.match.params.tokenId, 10)
    const token = state.tokens.byId[tokenId]
    // get all eventIds for address-tokenId combination
    const aceId = buildAdressContractEventId(address, tokenId)
    const aceEntry = state.events.aceById[aceId]
    const isLoading = aceEntry ? aceEntry.isLoading : false
    const eventIds = aceEntry ? aceEntry.eventIds : []
    const firstBlock = aceEntry ? aceEntry.firstBlock : 0
    const lastBlock = aceEntry ? aceEntry.lastBlock : 0
    return {
        web3: state.web3Instance.isLoading ? null : state.web3Instance.web3,
        tokenId,
        address,
        transferEventIds: eventIds,
        isLoading,
        firstBlock,
        lastBlock,
        aceEntry,
        token
    }
}
const mapDispatchToProps = (dispatch) => ({
    loadTokenTransferEvents: (firstBlock, lastBlock, tokenId, address) => {
        dispatch(loadTokenTransferEvents(tokenId, firstBlock, lastBlock, [address]))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressEventsContainer)

