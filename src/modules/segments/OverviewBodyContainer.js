
import PropTypes from "prop-types"
import {connect} from "react-redux"
import React, {Component} from "react"
import {groupBy} from "lodash"
import BalancesList from "../balance/BalancesList"
import {Message} from "semantic-ui-react"
import {Link} from "react-router-dom"

class OverviewBodyContainer extends Component {
    render() {
        const {balancesByToken, showEmpty, hasAccounts} = this.props

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
        else if (Object.keys(balancesByToken).length === 0) {
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

        return <BalancesList balancesByToken={balancesByToken}/>
    }
}

OverviewBodyContainer.propTypes = {
    balancesByToken: PropTypes.object.isRequired,
    showEmpty: PropTypes.bool.isRequired,
    hasAccounts: PropTypes.bool.isRequired,
}

OverviewBodyContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const {showEmpty} = ownProps
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

    // now group the balances by token
    const balancesByToken = groupBy(balanceEntries, 'tokenId')

    return {
        hasAccounts,
        balancesByToken,
    }
}

export default connect(mapStateToProps)(OverviewBodyContainer)