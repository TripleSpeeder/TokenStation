import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Overview from './Overview'
import {connect} from 'react-redux'
import groupBy from 'lodash/groupBy';
import {BALANCE_STATES} from '../balance/balanceActions'

class OverviewContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const {hasAccounts, balancesByToken} = this.props
        return (
            <Overview hasAccounts={hasAccounts} balancesByToken={balancesByToken}/>
        )
    }
}

OverviewContainer.propTypes = {
    hasAccounts: PropTypes.bool.isRequired,
    balancesByToken: PropTypes.object.isRequired
}

OverviewContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = state => {
    const hasAccounts = (state.addresses.allIds.length > 0)
    // all currently watched addressIds
    const addressIds = Object.keys(state.addresses.byId)
    // all positive balance IDs
    const positiveBalanceIds = state.balance.positiveIds
    // all balances that were loading while being hydrated
    const hydratedWhileLoadingBalances = Object.values(state.balance.byId).filter(balanceEntry => {
        return balanceEntry.balanceState === BALANCE_STATES.HYDRATED_WHILE_LOADING
    })
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
        hasAccounts,
        balancesByToken,
        hydratedWhileLoadingBalances,
    }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(OverviewContainer)
