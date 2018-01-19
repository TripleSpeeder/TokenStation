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

    // all currently watched addressIds
    const addressIds = Object.keys(state.addresses.byId)
    // all positive balance IDs
    const positiveBalanceIds = state.balance.positiveIds
    // all tokenIds
    let tokenIds = state.tokens.allIds

    const filterIsActive = (state.tokens.listState.filter.length > 0)
    if (filterIsActive)
        tokenIds = state.tokens.listState.matchedTokenIds

    // all BalanceEntries with positive balance
    const positiveBalances = positiveBalanceIds.map(id => state.balance.byId[id])

    // now search positiveBalances that match the watched addresses and the token filter
    const matchedBalances = Object.values(positiveBalances).filter(balanceEntry => {
        return (
            (addressIds.indexOf(balanceEntry.addressId) > -1) &&
            (tokenIds.indexOf(balanceEntry.tokenId) > -1)
        )
    })

    // now group the balances by token
    const balancesByToken = groupBy(matchedBalances, 'tokenId')

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
