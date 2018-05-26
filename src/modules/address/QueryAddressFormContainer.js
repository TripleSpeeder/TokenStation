import React, {Component} from 'react'
import {connect} from 'react-redux'

import {addNewAddress, ADDRESS_TYPE_EXTERNAL} from './addressActions'
import QueryAddressForm from './QueryAddressForm'


class QueryAddressFormContainer extends Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            valid: false,
            address: ''
        }
        // kraken4='0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0'
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const address=e.target.value
        // check for valid address
        const valid = (/^(0x)?[0-9a-f]{40}$/i.test(address))
        this.setState(
            {
                valid: valid,
                address: address,
            }
        )
    }

    handleSubmit = () => {
        const { address } = this.state
        this.props.addNewAddress(address, ADDRESS_TYPE_EXTERNAL)
        this.setState({
            valid: false,
            address: ''
        })
    }

    render() {
        return (
            <QueryAddressForm handleChange={this.handleChange}
                              handleSubmit={this.handleSubmit}
                              valid={this.state.valid}
                              address={this.state.address}
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
