import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {buildEtherscanLink} from '../../utils/etherscanUtils'
import {connect} from 'react-redux'
import {loadTokenTransferEvents} from '../token/tokenActions'
import {Header} from 'semantic-ui-react'
import {buildAdressContractEventId} from './reducers/addressContractEventsByIdReducer'
import AddressEventsList from './AddressEventsList'

class TokenEventsContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

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
        /*
        For each address check if ace-entry is existing, Collect all missing addresses.
        then trigger loadTokenTransferEvents, providing missing addresses.

        Bonus points for also checking the already queried block ranges of all ace entries and
        fetch missing blockranges if necessary, so in the end all watched addresses have
        have the same blockrange checked.
        */
        if (props.web3 && props.missingAceEntryAddresses.length) {
            props.loadTokenTransferEvents(0, 0, props.token.id, props.missingAceEntryAddresses)
        }

    }

    render() {
        return (
            <div>
                <Header block as='h2'>
                    {this.props.token.name} token transfers
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
    const etherscanUrl = buildEtherscanLink(token.address)
    // check if any addressContractEvents are not yet loaded
    const missingAceEntryAddresses = state.addresses.allIds.filter(entry => {
        const aceId = buildAdressContractEventId(entry, tokenId)
        return (state.events.aceById[aceId] === undefined)
    })
    const transferEventIds = token.eventIds
    return {
        web3: state.web3Instance.isLoading ? null : state.web3Instance.web3,
        token: token,
        etherscanUrl: etherscanUrl,
        missingAceEntryAddresses,
        transferEventIds
    }
}
const mapDispatchToProps = dispatch => ({
    loadTokenTransferEvents: (firstBlock, lastBlock, tokenId, addressIds) => {
        dispatch(loadTokenTransferEvents(tokenId, firstBlock, lastBlock, addressIds))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenEventsContainer)
