import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TokenBalanceItemDetail from './TokenBalanceItemDetail'
import {connect} from 'react-redux'
import {BALANCE_STATES, reloadBalance} from './balanceActions'
import {showModal} from '../modal/modalActions'

class TokenBalanceItemDetailContainer extends Component {
    render() {
        return (
            <TokenBalanceItemDetail address={this.props.address}
                                    addressType={this.props.addressType}
                                    amount={this.props.amount}
                                    decimals={this.props.decimals}
                                    reloadBalance={this.props.reloadBalance}
                                    loading={this.props.loading}
                                    url={this.props.url}
                                    openTransferModal={this.props.openTransferModal}
                                    ensName={this.props.ensName}
            />
        )
    }
}

TokenBalanceItemDetailContainer.propTypes = {
    address: PropTypes.string.isRequired,
    amount: PropTypes.object.isRequired,
    decimals: PropTypes.object.isRequired,
    tokenBalanceId: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    reloadBalance: PropTypes.func.isRequired,
    openTransferModal: PropTypes.func.isRequired,
}

TokenBalanceItemDetailContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const balanceEntry = state.balance.byId[ownProps.tokenBalanceId]
    const token = state.tokens.byId[balanceEntry.tokenId]
    const addressEntry = state.addresses.byId[balanceEntry.addressId]
    const amount = balanceEntry.balance
    const decimals = token.decimals
    return {
        amount,
        decimals,
        address: addressEntry.address,
        addressType: addressEntry.type,
        ensName: addressEntry.ensName,
        loading: balanceEntry.balanceState===BALANCE_STATES.LOADING,
        url: "/events/" + token.id + "/" + addressEntry.address
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

export default connect(mapStateToProps, mapDispatchToProps)(TokenBalanceItemDetailContainer)

