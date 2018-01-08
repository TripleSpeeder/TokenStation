import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Form} from 'semantic-ui-react'
import {queryAddressChange} from './queryAddressActions'


class QueryAddressForm extends Component {
    constructor(props, context) {
        super(props, context)

        // kraken4='0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0'
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, {name, value}) {
        // check for valid address
        const valid = (/^(0x)?[0-9a-f]{40}$/i.test(value))
        this.props.onQueryAddressChange(value, valid)
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group>
                    <Form.Input inline
                                name='address'
                                icon='diamond'
                                iconPosition='left'
                                label='Enter Address'
                                placeholder='Address or ENS name'
                                error={!this.props.valid}
                                onChange={this.handleChange}
                                value={this.props.address}
                    />
                </Form.Group>
            </Form>
        )
    }
}

let mapStateToProps = state => ({
	address: state.queryAddress.address,
    valid: state.queryAddress.valid
})

let mapDispatchToProps = dispatch => ({
    onQueryAddressChange: (address, valid) => {
        dispatch(queryAddressChange(address, valid))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryAddressForm)
