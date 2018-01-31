import React, {Component} from 'react'
import {connect} from 'react-redux'
import {reloadBalance} from './balanceActions'
import BalanceItem from './BalanceItem'
import _ from 'lodash'


class BalanceItemContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.reloadBalance = this.reloadBalance.bind(this)
    }

    reloadBalance() {
        this.props.tokenBalances.forEach(tokenBalance => {
            this.props.reloadBalance(tokenBalance.balanceId)
        })
    }

    render() {
        return (
            <BalanceItem tokenName={this.props.token.name}
                         tokenSymbol={this.props.token.symbol}
                         tokenBalances={this.props.tokenBalances}
                         total={this.props.total}
                         reloadBalance={this.reloadBalance}
                         loading={this.props.loading}
            />
        )
    }

    shouldComponentUpdate(nextProps) {
        // Render() should only ever be necessary when loading state, token itself or
        // it's total balance changes, i.e. an address was added/removed to
        // the watch list or the balance of an address changed.
        return (
            (!nextProps.total.equals(this.props.total)) ||
            (nextProps.tokenId !== this.props.tokenId) ||
            (nextProps.loading !== this.props.loading)
        )
    }
}

BalanceItemContainer.propTypes = {
}

BalanceItemContainer.defaultProps = {
   //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    // calculate total balance of all addresses
    const total = _.reduce(ownProps.tokenBalances, (sum, tokenBalance) => {
        return sum.plus(tokenBalance.balance)
    }, window.web3.toBigNumber(0) )

    // if any of the tokenBalances is loading, the whole container is loading
    let loading = false
    ownProps.tokenBalances.forEach(tokenBalance => {
        if (tokenBalance.isLoading)
            loading = true
    })

    return {
        token: state.tokens.byId[ownProps.tokenId],
        total,
        loading
    }
}

const mapDispatchToProps = dispatch => ({
    reloadBalance: (balanceId) => {
        dispatch(reloadBalance(balanceId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BalanceItemContainer)
