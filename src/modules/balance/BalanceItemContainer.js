import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {reloadBalance} from './balanceActions'
import BalanceItem from './BalanceItem'
import _ from 'lodash'


class BalanceItemContainer extends PureComponent {

    render() {
        return (
            <BalanceItem tokenName={this.props.token.name}
                         tokenSymbol={this.props.token.symbol}
                         tokenBalances={this.props.tokenBalances}
                         total={this.props.total}
            />
        )
    }

    shouldComponentUpdate(nextProps) {
        // Render() should only ever be necessary when the token itself or
        // it's total balance changes, i.e. an address was added/removed to
        // the watch list or the balance of an address changed.
        return ((!nextProps.total.equals(this.props.total)) ||
            (nextProps.tokenId !== this.props.tokenId))
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

    return {
        token: state.tokens.byId[ownProps.tokenId],
        total
    }
}

const mapDispatchToProps = dispatch => ({
    reloadBalance: (balanceId) => {
        dispatch(reloadBalance(balanceId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BalanceItemContainer)
