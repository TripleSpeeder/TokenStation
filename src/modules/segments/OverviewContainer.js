import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Overview from './Overview'
import {connect} from 'react-redux'
import groupBy from 'lodash/groupBy';

class OverviewContainer extends Component {
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
    const filterIsActive = (state.balance.listState.filter.length > 0)

    // get balanceIds to display
    const balanceIds = filterIsActive ? state.balance.listState.matchedBalanceIds : state.balance.positiveIds
    // map IDs to Entries
    const balanceEntries = balanceIds.map(id => state.balance.byId[id])
    // now group the balances by token
    const balancesByToken = groupBy(balanceEntries, 'tokenId')

    return {
        hasAccounts,
        balancesByToken,
    }
}

export default connect(mapStateToProps)(OverviewContainer)
