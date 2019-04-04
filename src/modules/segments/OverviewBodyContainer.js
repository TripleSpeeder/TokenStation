
import PropTypes from "prop-types"
import {connect} from "react-redux"
import React, {Component} from "react"
import {default as _} from 'lodash'
import TokenBalancesList from "../balance/TokenBalancesList"
import {Message} from "semantic-ui-react"
import {Link} from "react-router-dom"
import AddressBalancesList from '../balance/AddressBalancesList'

class OverviewBodyContainer extends Component {
    render() {
        const {groupedBalances, showEmpty, hasAccounts, groupBy} = this.props

        // Do i have accounts at all?
        if (!hasAccounts) {
            return <Message>
                <Message.Header>
                    No accounts
                </Message.Header>
                <p>You have no watched or unlocked accounts. Open the <Link to={ {pathname: '/accounts/',} }>Account Manager</Link> to setup accounts.</p>
            </Message>
        }

        // Do i have any balances to display?
        else if (Object.keys(groupedBalances).length === 0) {
            return <Message>
                <Message.Header>
                    No balances
                </Message.Header>
                <Message.Content>
                    There are no token balances to display. Things you can try:
                </Message.Content>
                <Message.List>
                    <Message.Item>Change the filterstring</Message.Item>
                    {!showEmpty && <Message.Item>Enable "Show zero balances" above</Message.Item>}
                    <Message.Item>Open the <Link to={ {pathname: '/accounts/',} }>Account Manager</Link> to add additional accounts</Message.Item>
                    <Message.Item>Open the <Link to={ {pathname: '/tokenContracts/'} }>Token Manager</Link> to tracked additional tokens</Message.Item>
                </Message.List>
            </Message>
        }

        switch (groupBy) {
            case 'tokenId':
                return <TokenBalancesList balancesByToken={groupedBalances}/>
            case 'addressId':
                return <AddressBalancesList balancesByAddress={groupedBalances}/>
            default:
                return "Unhandled groupBy!"
        }
    }
}

OverviewBodyContainer.propTypes = {
    groupedBalances: PropTypes.array.isRequired,
    showEmpty: PropTypes.bool.isRequired,
    hasAccounts: PropTypes.bool.isRequired,
    groupBy: PropTypes.string.isRequired,
}

OverviewBodyContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const {showEmpty, groupBy} = ownProps
    const hasAccounts = (state.addresses.allIds.length > 0)
    const filterIsActive = (state.balance.listState.filter.length > 0)

    // get balanceIds to display
    const balanceIds = filterIsActive ? state.balance.listState.matchedBalanceIds : state.balance.allIds

    // map IDs to Entries
    let balanceEntries = balanceIds.map(id => state.balance.byId[id])

    // remove empty balances if necessary
    if (!showEmpty) {
        balanceEntries = balanceEntries.filter(entry => (entry.balance.greaterThan(0)))
    }

    // now group the balances by token or address
    const groupedBalancesObject = _.groupBy(balanceEntries, groupBy)

    // convert to array and sort it
    let groupedBalances
    if (groupBy === 'tokenId') {
        groupedBalances = Object.entries(groupedBalancesObject).sort((a, b) => {
            // entry[0] contains the tokenID. Look up the tokenName for comparison
            return (state.tokens.byId[a[0]].name.toUpperCase() < state.tokens.byId[b[0]].name.toUpperCase() ? -1 : 1)
        })
    } else if (groupBy === 'addressId') {
        // Sort addresses by ENS
        groupedBalances = Object.entries(groupedBalancesObject).sort((a,b) => {
            // entry[0] contains the addressID. Look up the address for comparison
            const addressA = state.addresses.byId[a[0]]
            const addressB = state.addresses.byId[b[0]]
            const stringA = addressA.ensName ? addressA.ensName : addressA.address
            const stringB = addressB.ensName ? addressB.ensName : addressB.address
            return (stringA.toUpperCase() < stringB.toUpperCase() ? -1 : 1 )
        })
    }
    return {
        hasAccounts,
        groupedBalances,
    }
}

export default connect(mapStateToProps)(OverviewBodyContainer)