import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {buildEtherscanLink} from '../../utils/etherscanUtils'
import {connect} from 'react-redux'
import {loadTokenTransferEvents} from '../token/tokenActions'
import {Segment} from 'semantic-ui-react'

class TokenEventsContainer extends Component {
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
            props.loadTokenTransferEvents(props.token.id)
            this.eventsLoaded = true
        }
    }

    render() {
        if (this.props.isLoading) {
            return <Segment>Web3 initializing...</Segment>
        } else {
            return (
                <Segment>
                    <h4>Showing {this.props.token.eventIds.length} events of ERC20 token
                        contract {this.props.token.name}</h4>
                </Segment>
            )
        }
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
    return {
        web3: state.web3Instance.web3,
        token: token,
        etherscanUrl: etherscanUrl
    }
}
const mapDispatchToProps = dispatch => ({
    loadTokenTransferEvents: (tokenId) => {
        dispatch(loadTokenTransferEvents(tokenId, 0, 'latest'))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenEventsContainer)
