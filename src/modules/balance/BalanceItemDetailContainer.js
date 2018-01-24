import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BalanceItemDetail from './BalanceItemDetail'
import {connect} from 'react-redux'
import {reloadBalance} from './balanceActions'

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
    tokenBalanceId: PropTypes.number.isRequired,
}

BalanceItemDetailContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const balance = state.balance.byId[ownProps.tokenBalanceId]
    const address = state.addresses.byId[balance.addressId].address
    return {
        balance: balance.balance,
        address
    }
}

const mapDispatchToProps = dispatch => ({
    reloadBalance: (balanceId) => {
        dispatch(reloadBalance(balanceId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BalanceItemDetailContainer)

