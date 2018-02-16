import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {buildEtherscanLink} from '../../utils/etherscanUtils'
import {connect} from 'react-redux'
import {loadTokenTransferEvents} from '../token/tokenActions'

class TokenEventsContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            eventsLoaded: false
        }
    }

    componentDidMount() {
        // Check if the token details are already loaded
        if (!this.state.eventsLoaded)
        {
            this.props.loadTokenTransferEvents(this.props.token.id)
            this.setState({eventsLoaded: true})
        }
    }

    render() {
        return (
            <div>
                <h4>Showing {this.props.token.eventIds.length} events of ERC20 token contract {this.props.token.name}</h4>
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
    return {
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
