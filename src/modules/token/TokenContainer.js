import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Token from "./Token"
import {connect} from "react-redux"
import {loadTokenSupply} from './tokenActions'
import {buildEtherscanLink} from '../../utils/etherscanUtils'


class TokenContainer extends PureComponent {
    constructor(props, context) {
        super(props, context)

        this.handleRefresh = this.handleRefresh.bind(this)
    }

    handleRefresh() {
        // currently only token supply is a value that might change frequently
        this.props.loadTokenSupply(this.props.tokenId)
    }

    render() {
            return <Token token={this.props.token}
                          etherscanUrl={this.props.etherscanUrl}
                          handleRefresh={this.handleRefresh}
            />
    }
}

TokenContainer.propTypes = {
    tokenId: PropTypes.number.isRequired,
    etherscanUrl: PropTypes.string.isRequired,
}

TokenContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const token = state.tokens.byId[ownProps.tokenId]
    const etherscanUrl = buildEtherscanLink(token.address)
    return {
        address: state.queryAddress.address,
        token: token,
        etherscanUrl: etherscanUrl
    }
}

const mapDispatchToProps = dispatch => ({
    loadTokenSupply: (tokenID) => {
        dispatch(loadTokenSupply(tokenID))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenContainer)