import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {buildEtherscanLink} from '../../utils/etherscanUtils'
import {addToken} from '../token/tokenActions'
import {reloadBalance} from './balanceActions'
import BalanceItem from './BalanceItem'

class BalanceItemContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <BalanceItem address={this.props.address}
                         reloadBalance={this.props.reloadBalance}
                         token={this.props.token.name}
                         balance={this.props.balanceEntry.balance}/>
        )
    }
}

BalanceItemContainer.propTypes = {

}

BalanceItemContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const balanceEntry = state.balance.byId[ownProps.balanceId]
    return {
        balanceEntry,
        address: state.addresses.byId[balanceEntry.addressId],
        token: state.tokens.byId[balanceEntry.tokenId],
    }
}

const mapDispatchToProps = dispatch => ({
    reloadBalance: (balanceId) => {
        dispatch(reloadBalance(balanceId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BalanceItemContainer)
