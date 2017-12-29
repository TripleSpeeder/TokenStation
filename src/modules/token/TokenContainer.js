import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import Token from "./Token"
import {connect} from "react-redux"
import {loadTokenSupply} from './tokenActions'


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
                          handleRefresh={this.handleRefresh}/>
    }
}

TokenContainer.propTypes = {
    tokenId: PropTypes.number.isRequired,
}

TokenContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => ({
    web3: state.web3Instance.web3,
    address: state.queryAddress.address,
    token: state.tokens.byId[ownProps.tokenId]
})

const mapDispatchToProps = dispatch => ({
    loadTokenSupply: (tokenID) => {
        dispatch(loadTokenSupply(tokenID))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenContainer)