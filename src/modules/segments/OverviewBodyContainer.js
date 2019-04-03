
import PropTypes from "prop-types"
import {connect} from "react-redux"
import React, {Component} from "react"
import {groupBy} from "lodash"
import BalancesList from "../balance/BalancesList"
import {Message} from "semantic-ui-react"
import {Link} from "react-router-dom"

class OverviewBodyContainer extends Component {
    render() {
        const {balancesByToken, hideEmpty} = this.props
        let body
        if (Object.keys(balancesByToken).length) {
            body = <BalancesList balancesByToken={balancesByToken}/>
        }
        else {
            body = <Message>
                <Message.Header>
                    No balances
                </Message.Header>
                <Message.Content>
                    There are no token balances to display. Things you can try:
                </Message.Content>
                <Message.List>
                    <Message.Item>Change the filterstring</Message.Item>
                    {hideEmpty && <Message.Item>Toggle "Hide empty balances" above</Message.Item>}
                    <Message.Item>Open the <Link to={ {pathname: '/accounts/',} }>Account Manager</Link> to add additional accounts</Message.Item>
                    <Message.Item>Open the <Link to={ {pathname: '/tokenContracts/'} }>Token Manager</Link> to tracked additional tokens</Message.Item>
                </Message.List>
            </Message>
        }

        return body
    }
}

OverviewBodyContainer.propTypes = {
    hideEmpty: PropTypes.bool.isRequired,
    balancesByToken: PropTypes.object.isRequired
}

OverviewBodyContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const {hideEmpty} = ownProps
    const filterIsActive = (state.balance.listState.filter.length > 0)

    // get balanceIds to display
    const balanceIds = filterIsActive ? state.balance.listState.matchedBalanceIds : state.balance.allIds

    // map IDs to Entries
    let balanceEntries = balanceIds.map(id => state.balance.byId[id])

    // remove empty balances if necessary
    if (hideEmpty) {
        balanceEntries = balanceEntries.filter(entry => (entry.balance.greaterThan(0)))
    }

    // now group the balances by token
    const balancesByToken = groupBy(balanceEntries, 'tokenId')

    return {
        balancesByToken,
    }
}

export default connect(mapStateToProps)(OverviewBodyContainer)