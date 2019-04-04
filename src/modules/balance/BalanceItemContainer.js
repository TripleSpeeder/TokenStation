import React, {Component} from 'react'
import {connect} from 'react-redux'
import BigNumber from 'bignumber.js'
import {BALANCE_STATES, reloadBalance} from './balanceActions'
import BalanceItem from './BalanceItem'
import _ from 'lodash'


class BalanceItemContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.reloadBalance = this.reloadBalance.bind(this)
        this.toggleCollapse = this.toggleCollapse.bind(this)
        this.state = {
            expanded: false
        }
    }

    reloadBalance() {
        this.props.tokenBalances.forEach(tokenBalance => {
            this.props.reloadBalance(tokenBalance.balanceId)
        })
    }

    toggleCollapse() {
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        return (
            <BalanceItem tokenName={this.props.token.name}
                         tokenSymbol={this.props.token.symbol}
                         tokenBalances={this.props.tokenBalances}
                         total={this.props.total}
                         reloadBalance={this.reloadBalance}
                         loading={this.props.loading}
                         tokenEventsLinkOptions={this.props.tokenEventsLinkOptions}
                         expanded={this.state.expanded}
                         toggleCollapse={this.toggleCollapse}
            />
        )
    }
}

BalanceItemContainer.propTypes = {
}

BalanceItemContainer.defaultProps = {
   //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const token = state.tokens.byId[ownProps.tokenId]

    // calculate total balance of all addresses
    const total = _.reduce(ownProps.tokenBalances, (sum, tokenBalance) => {
        return sum.plus(tokenBalance.balance)
    }, new BigNumber(0) ).dividedBy(token.decimals)

    // if any of the tokenBalances is loading, the whole container is loading
    let loading = false
    ownProps.tokenBalances.forEach(tokenBalance => {
        if (tokenBalance.balanceState === BALANCE_STATES.LOADING)
            loading = true
    })

    const tokenEventsLinkOptions = {
        pathname: '/events/' + ownProps.tokenId,
    }

    return {
        token,
        total,
        loading,
        tokenEventsLinkOptions,
    }
}

const mapDispatchToProps = dispatch => ({
    reloadBalance: (balanceId) => {
        dispatch(reloadBalance(balanceId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BalanceItemContainer)
