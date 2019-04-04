import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {BALANCE_STATES, reloadBalance} from './balanceActions'
import AddressBalanceItemDetail from './AddressBalanceItemDetail'

class AddressBalanceItemDetailContainer extends Component {
    render() {
        const {tokenBalance, tokenName, tokenSymbol, reloadBalance, loading} = this.props
        return (
            <AddressBalanceItemDetail tokenBalance={tokenBalance}
                                      tokenSymbol={tokenSymbol}
                                      tokenName={tokenName}
                                      reloadBalance={reloadBalance}
                                      loading={loading}
            />
        )
    }
}

AddressBalanceItemDetailContainer.propTypes = {
    tokenBalanceId: PropTypes.string.isRequired,
    tokenBalance: PropTypes.object.isRequired,
    tokenName: PropTypes.string.isRequired,
    tokenSymbol: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    reloadBalance: PropTypes.func.isRequired,
}

AddressBalanceItemDetailContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const balanceEntry = state.balance.byId[ownProps.tokenBalanceId]
    const token = state.tokens.byId[balanceEntry.tokenId]
    const tokenBalance = balanceEntry.balance.dividedBy(token.decimals)
    return {
        tokenBalance,
        tokenName: token.name,
        tokenSymbol: token.symbol,
        loading: balanceEntry.balanceState===BALANCE_STATES.LOADING,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    reloadBalance: () => {
        dispatch(reloadBalance(ownProps.tokenBalanceId))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressBalanceItemDetailContainer)

