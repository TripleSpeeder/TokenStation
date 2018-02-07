import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BalanceItemDetail from './BalanceItemDetail'
import {connect} from 'react-redux'
import {BALANCE_STATES, reloadBalance} from './balanceActions'

class BalanceItemDetailContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.reloadBalance = this.reloadBalance.bind(this)
    }

    render() {
        return (
            <BalanceItemDetail address={this.props.address}
                               balance={this.props.balance}
                               reloadBalance={this.reloadBalance}
                               loading={this.props.loading}
            />
        )
    }

    reloadBalance() {
        this.props.reloadBalance(this.props.tokenBalanceId)
    }
}

BalanceItemDetailContainer.propTypes = {
    address: PropTypes.string.isRequired,
    balance: PropTypes.object.isRequired,
    tokenBalanceId: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    reloadBalance: PropTypes.func.isRequired,
}

BalanceItemDetailContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const balanceEntry = state.balance.byId[ownProps.tokenBalanceId]
    const token = state.tokens.byId[balanceEntry.tokenId]
    const address = state.addresses.byId[balanceEntry.addressId].address
    const balance = balanceEntry.balance.dividedBy(token.decimals)
    return {
        balance,
        address,
        loading: balanceEntry.balanceState===BALANCE_STATES.LOADING,
    }
}

const mapDispatchToProps = dispatch => ({
    reloadBalance: (balanceId) => {
        dispatch(reloadBalance(balanceId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BalanceItemDetailContainer)

