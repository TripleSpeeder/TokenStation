import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Token from "./Token"
import {connect} from "react-redux"
import {loadTokenSupply} from './tokenActions'
import {buildEtherscanLink} from '../../utils/etherscanUtils'


class TokenContainer extends Component {
    constructor(props, context) {
        super(props, context)

        this.handleRefresh = this.handleRefresh.bind(this)
    }

    handleRefresh() {
        // currently only token supply is a value that might change frequently
        this.props.loadTokenSupply(this.props.tokenId)
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.token.supply.supply !== this.props.token.supply.supply)
            return true
        if (nextProps.token.supply.loading!== this.props.token.supply.loading)
            return true
        return false
    }

    componentDidMount() {
        // Check if the token details are already loaded
        if (this.props.token.supply.supply === undefined)
        {
            this.props.loadTokenSupply(this.props.tokenId)
        }
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