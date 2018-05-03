import React, {Component} from 'react'
import PropTypes from 'prop-types'
import BalanceItemDetail from './BalanceItemDetail'
import {connect} from 'react-redux'
import {BALANCE_STATES, reloadBalance} from './balanceActions'
import {showModal} from '../modal/modalActions'

class BalanceItemDetailContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <BalanceItemDetail address={this.props.address}
                               balance={this.props.balance}
                               reloadBalance={this.props.reloadBalance}
                               loading={this.props.loading}
                               url={this.props.url}
                               openTransferModal={this.props.openTransferModal}
            />
        )
    }
}

BalanceItemDetailContainer.propTypes = {
    address: PropTypes.string.isRequired,
    balance: PropTypes.object.isRequired,
    tokenBalanceId: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    reloadBalance: PropTypes.func.isRequired,
    openTransferModal: PropTypes.func.isRequired,
}

BalanceItemDetailContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const balanceEntry = state.balance.byId[ownProps.tokenBalanceId]
    const token = state.tokens.byId[balanceEntry.tokenId]
    const addressEntry = state.addresses.byId[balanceEntry.addressId]
    const balance = balanceEntry.balance.dividedBy(token.decimals)
    return {
        balance,
        address: addressEntry.address,
        addressType: addressEntry.type,
        loading: balanceEntry.balanceState===BALANCE_STATES.LOADING,
        url: "/"+addressEntry.address+"/transfers/"+token.id
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    reloadBalance: () => {
        dispatch(reloadBalance(ownProps.tokenBalanceId))
    },
    openTransferModal: () => {
        dispatch(showModal('TRANSFER_FORM_CONTAINER',
            {
                tokenBalanceId: ownProps.tokenBalanceId,
            }
        ))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(BalanceItemDetailContainer)

