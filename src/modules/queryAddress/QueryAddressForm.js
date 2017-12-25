import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Form} from 'semantic-ui-react'
import {setQueryAddress} from "./queryAddressActions"


class QueryAddressForm extends Component {
    constructor(props, context) {
        super(props, context)

        // kraken4='0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0'
        this.state = {
            address: '',
            addressValid: false,
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e, {name, value}) {
        this.setState({[name]: value})
        // check for valid address
        this.setState({addressValid: (/^(0x)?[0-9a-f]{40}$/i.test(value))})
    }

    handleSubmit = () => {
        const { address } = this.state
        this.props.onAddressSelected(address)
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
                                error={!this.state.addressValid}
                                onChange={this.handleChange}
                    />
                    <Form.Button content='submit' disabled={!this.state.addressValid}/>
                </Form.Group>
            </Form>
        )
    }
}

let mapStateToProps = state => ({
	//address: state.address
})

let mapDispatchToProps = dispatch => ({
    onAddressSelected: (address) => {
        dispatch(setQueryAddress(address))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(QueryAddressForm)