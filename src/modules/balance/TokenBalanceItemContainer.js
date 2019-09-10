import React, {Component} from 'react'
import {connect} from 'react-redux'
import BN from 'bn.js'
import {BALANCE_STATES, reloadBalance} from './balanceActions'
import TokenBalanceItem from './TokenBalanceItem'
import _ from 'lodash'


class TokenBalanceItemContainer extends Component {
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
            <TokenBalanceItem tokenName={this.props.token.name}
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

TokenBalanceItemContainer.propTypes = {
}

TokenBalanceItemContainer.defaultProps = {
   //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const token = state.tokens.byId[ownProps.tokenId]

    // calculate total balance of all addresses
    let total = _.reduce(ownProps.tokenBalances, (sum, tokenBalance) => {
        return sum.add(tokenBalance.balance)
    }, new BN(0) )
    /*
    if (token.decimals > 0) {
        total = total.div(new BN(token.decimals))
    }
     */

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

export default connect(mapStateToProps, mapDispatchToProps)(TokenBalanceItemContainer)
