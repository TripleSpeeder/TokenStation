import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setBalanceByAddressAndToken} from './balanceActions'
import {Button} from 'semantic-ui-react'
import BalancesList from './BalancesList'

class BalancesListContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <BalancesList balanceIds={this.props.balanceIds}/>
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
    // create array of balanceIds that have a balance > 0
    const addressIds = Object.keys(state.addresses.byId)
    const balances = Object.values(state.balance.byId).filter(balanceEntry => {
        return (
            (addressIds.indexOf(balanceEntry.addressId) > -1) &&
            (balanceEntry.balance.greaterThan(0))
        )
    })

    return {
        // map balances back to their Ids
        balanceIds: balances.map(balance => (balance.balanceId))
    }
}

const mapDispatchToProps = dispatch => ({
    setBalanceByAddressAndToken: (addressId, tokenId, balance) => {
        dispatch(setBalanceByAddressAndToken(addressId, tokenId, balance))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BalancesListContainer)
