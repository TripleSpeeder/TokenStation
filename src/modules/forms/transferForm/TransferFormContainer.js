import React, {Component} from 'react'
import PropTypes from 'prop-types'
import TransferForm from './TransferForm'
import {connect} from 'react-redux'
import {transferToken} from '../../token/tokenActions'

class TransferFormContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            amount: this.props.web3.toBigNumber('0'),
            toAddressValid: false,
            amountValid: false,
            rateValid: false
        }
    }

    onValidSubmit = (formData) => alert(JSON.stringify(formData));   // eslint-disable-line

    render() {
        const {fromAddress, tokenName, tokenSymbol, tokenBalance} = this.props

        // TODO: Calculate real gas costs
        const gasCosts = this.props.web3.toBigNumber('0.0022')
        // TODO: Get real balance
        const etherBalance = this.props.web3.toBigNumber('12.3456')

        return <TransferForm onValidSubmit={this.onValidSubmit}
                             onClose={this.props.closeModal}
                             fromAddress={fromAddress}
                             web3={this.props.web3}
                             tokenName={tokenName}
                             tokenSymbol={tokenSymbol}
                             tokenBalance={tokenBalance}
                             gasCosts={gasCosts}
                             etherBalance={etherBalance}
        />
    }
}

TransferFormContainer.propTypes = {
    fromAddress: PropTypes.string.isRequired,
    tokenName: PropTypes.string.isRequired,
    tokenSymbol: PropTypes.string.isRequired,
    tokenId: PropTypes.number.isRequired,
    tokenBalanceId: PropTypes.number.isRequired,
    tokenBalance: PropTypes.object.isRequired,
}

TransferFormContainer.defaultProps = {
}

const mapStateToProps = (state, ownProps) => {
    const balanceEntry = state.balance.byId[ownProps.tokenBalanceId]
    const fromAddress = state.addresses.byId[balanceEntry.addressId].address
    const token = state.tokens.byId[balanceEntry.tokenId]
    const tokenBalance = balanceEntry.balance.dividedBy(token.decimals)

    return {
        web3: state.web3Instance.web3,
        fromAddress,
        tokenBalance,
        tokenName: token.name,
        tokenSymbol: token.symbol,
        tokenId: token.id,
    }
}

const mapDispatchToProps = dispatch => ({
    transferToken: () => {
        dispatch(transferToken())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(TransferFormContainer)
