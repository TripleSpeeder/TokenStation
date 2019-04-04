import React, {Component} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {BALANCE_STATES, reloadBalance} from './balanceActions'
import AddressBalanceItem from './AddressBalanceItem'


class AddressBalanceItemContainer extends Component {
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
        const {addressId, ensName, numTokens, tokenBalances, loading} = this.props
        const {expanded} = this.state

        return (
            <AddressBalanceItem address={addressId}
                                ensName={ensName}
                                numTokens={numTokens}
                                tokenBalances={tokenBalances}
                                loading={loading}
                                expanded={expanded}
                                toggleCollapse={this.toggleCollapse}
                                reloadBalance={this.reloadBalance}
            />
        )
    }
}

AddressBalanceItemContainer.propTypes = {
    addressId: PropTypes.string.isRequired,
    ensName: PropTypes.string.isRequired,
    numTokens: PropTypes.number.isRequired,
    tokenBalances: PropTypes.array.isRequired,
}

AddressBalanceItemContainer.defaultProps = {
   //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const {addressId, tokenBalances} = ownProps
    const address = state.addresses.byId[addressId]

    let loading = false
    let numTokens = 0
    tokenBalances.forEach(tokenBalance => {
        // if any of the tokenBalances is loading, the whole container is loading
        if (tokenBalance.balanceState === BALANCE_STATES.LOADING)
            loading = true
        // count entries with balance > 0
        if (tokenBalance.balance.greaterThan(0))
            numTokens++
    })

    return {
        address: addressId,
        ensName: address.ensName,
        numTokens,
        loading,
    }
}

const mapDispatchToProps = dispatch => ({
    reloadBalance: (balanceId) => {
        dispatch(reloadBalance(balanceId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressBalanceItemContainer)
