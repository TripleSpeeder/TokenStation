import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BalanceItemDetail from './BalanceItemDetail'
import {connect} from 'react-redux'

class BalanceItemDetailContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <BalanceItemDetail address={this.props.address} balance={this.props.balance}/>
        )
    }
}

BalanceItemDetailContainer.propTypes = {
    address: PropTypes.string.isRequired,
    balance: PropTypes.object.isRequired,
}

BalanceItemDetailContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const balance = state.balance.byId[ownProps.tokenBalanceId]
    const address = state.addresses.byId[balance.addressId]
    return {
        balance: balance.balance,
        address
    }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BalanceItemDetailContainer)

