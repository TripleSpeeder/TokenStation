import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setBalanceByAddressAndToken} from './balanceActions'
import BalancesList from './BalancesList'
import groupBy from 'lodash/groupBy';

class BalancesListContainer extends Component {
    render() {
        return (
            <BalancesList balancesByToken={this.props.balancesByToken}/>
        )
    }
}

BalancesListContainer.propTypes = {
    //myProp: PropTypes.object.isRequired
}

BalancesListContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = state => {
    // create array of balanceIds that have a balance > 0 for any of the watched addresses
    const addressIds = Object.keys(state.addresses.byId)
    const balances = Object.values(state.balance.byId).filter(balanceEntry => {
        return (
            (addressIds.indexOf(balanceEntry.addressId) > -1) &&
            (balanceEntry.balance.greaterThan(0))
        )
    })

    // now group the balances by token
    const balancesByToken = groupBy(balances, 'tokenId')

    return {
        balancesByToken
    }
}

const mapDispatchToProps = dispatch => ({
    setBalanceByAddressAndToken: (addressId, tokenId, balance) => {
        dispatch(setBalanceByAddressAndToken(addressId, tokenId, balance))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BalancesListContainer)
