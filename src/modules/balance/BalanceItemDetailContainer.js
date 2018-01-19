import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BalanceItemDetail from './BalanceItemDetail'
import {connect} from 'react-redux'

class BalanceItemDetailContainer extends Component {
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
    const address = state.addresses.byId[balance.addressId].address
    return {
        balance: balance.balance,
        address
    }
}

export default connect(mapStateToProps)(BalanceItemDetailContainer)

