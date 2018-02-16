import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {buildEtherscanLink} from '../../utils/etherscanUtils'
import {connect} from 'react-redux'

class TokenEventsContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div>
                <h4>Showing all events of ERC20 token contract {this.props.token.name}</h4>
            </div>
        )
    }
}

TokenEventsContainer.propTypes = {
    tokenId: PropTypes.number.isRequired,
    token: PropTypes.object.isRequired
}

TokenEventsContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const tokenId = ownProps.match.params.tokenId
    const token = state.tokens.byId[tokenId]
    const etherscanUrl = buildEtherscanLink(token.address)
    return {
        token: token,
        etherscanUrl: etherscanUrl
    }
}
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(TokenEventsContainer)
