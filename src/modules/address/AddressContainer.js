import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {removeAddressThunk} from './addressActions'
import {BALANCE_STATES} from '../balance/balanceActions'
import AddressRow from './AddressRow'


class AddressContainer extends PureComponent {

    handleRemove = () => {
        this.props.removeAddress(this.props.addressId)
    }

    render() {
        return <AddressRow address={this.props.address}
                           addressType={this.props.addressType}
                           ensName={this.props.ensName}
                           handleRemove={this.handleRemove}
        />
    }
}

AddressContainer.propTypes = {
    addressId: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    ensName: PropTypes.string,
    removeAddress: PropTypes.func.isRequired,
    progressTotal: PropTypes.number.isRequired,
    progressCurrent: PropTypes.number.isRequired
}

AddressContainer.defaultProps = {}

const mapStateToProps = (state, ownProps) => {
    const addressEntry = state.addresses.byId[ownProps.addressId]
    const progressTotal = state.tokens.listState.total
    // count all balance entries that include addressId
    const matchedBalanceEntries = Object.values(state.balance.byId).filter(entry => {
        return ((entry.addressId === ownProps.addressId) &&
            (entry.balanceState === BALANCE_STATES.INITIALIZED))
    })
    const progressCurrent = matchedBalanceEntries.length

    return {
        address: addressEntry.address,
        addressType: addressEntry.type,
        ensName: addressEntry.ensName,
        balancesState: addressEntry.balancesState,
        progressTotal,
        progressCurrent
    }
}

const mapDispatchToProps = dispatch => ({
    removeAddress: (addressId) => {
        dispatch(removeAddressThunk(addressId))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddressContainer)
