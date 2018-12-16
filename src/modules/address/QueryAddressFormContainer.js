import React, {Component} from 'react'
import {connect} from 'react-redux'

import {addNewAddress, ADDRESS_TYPE_EXTERNAL} from './addressActions'
import QueryAddressForm from './QueryAddressForm'


export const addressStates = {
    ADDRESS_RESOLVING: 'address_resolving', // valid ENS name entered, waiting for resolving
    ADDRESS_VALID: 'address_valid', // got a valid address
    ADDRESS_INVALID: 'address_invalid',
}

export class QueryAddressFormContainer extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            addressState: addressStates.ADDRESS_INVALID,
            address: '',
            ensName: '',
            input: '',
        }
        // kraken4='0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0'
    }

    handleChange = (e) => {
        const input=e.target.value
        let addressState = addressStates.ADDRESS_INVALID
        let address = ''
        let ensName = ''
        // check for valid input (raw address and ENS name)
        const validAddress = (/^(0x)?[0-9a-f]{40}$/i.test(input))
        const validENSName = (/.*\.eth$/i.test(input))
        if (validENSName) {
            // TODO: start resolving process
            addressState = addressStates.ADDRESS_RESOLVING
            ensName = input
            address = ''
        }
        else if(validAddress) {
            // TODO: Lookup reverse ENS entry
            addressState = addressStates.ADDRESS_VALID
            ensName = ''
            address = input
        }

        this.setState(
            {
                addressState,
                address,
                ensName,
                input,
            }
        )
    }

    handleSubmit = () => {
        const { address } = this.state
        this.props.addNewAddress(address, ADDRESS_TYPE_EXTERNAL)
        this.setState({
            addressState: addressStates.ADDRESS_INVALID,
            address: '',
            ensName: '',
            input: '',
        })
    }

    render() {
        const error = (this.state.addressState === addressStates.ADDRESS_INVALID)
        const loading = (this.state.addressState === addressStates.ADDRESS_RESOLVING)
        const disabled = (error || loading)
        return (
            <QueryAddressForm handleChange={this.handleChange}
                              handleSubmit={this.handleSubmit}
                              error = {error}
                              loading={loading}
                              disabled={disabled}
                              address={this.state.address}
                              ensName={this.state.ensName}
                              value={this.state.input}
            />
        )
    }
}

let mapDispatchToProps = dispatch => ({
    addNewAddress: (address, type) => {
        dispatch(addNewAddress(address, type))
    }
})

export default connect(null, mapDispatchToProps)(QueryAddressFormContainer)
