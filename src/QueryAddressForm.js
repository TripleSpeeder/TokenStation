import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {setQueryAddress} from "./actions"
import {Form} from 'semantic-ui-react'


class QueryAddressForm extends Component {
    constructor(props, context) {
        super(props, context)
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

QueryAddressForm.propTypes = {
    //myProp: PropTypes.object.isRequired
}

QueryAddressForm.defaultProps = {
    //myProp: <defaultValue>
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
