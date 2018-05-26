import React from 'react'
import PropTypes from 'prop-types'
import {Form} from "semantic-ui-react"

const QueryAddressForm = (props) => {

    const {handleChange, handleSubmit, valid, address,} = props

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Input inline
                            width={11}
                            name='address'
                            icon='diamond'
                            iconPosition='left'
                            placeholder='Address or ENS name'
                            error={!valid}
                            onChange={handleChange}
                            value={address}
                />
                <Form.Button
                    content='add address'
                    disabled={!valid}
                    width={6}
                />
            </Form.Group>
        </Form>
    )
}

QueryAddressForm.propTypes = {
    address: PropTypes.string,
    valid: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}

QueryAddressForm.defaultProps = {
    //myProp: <defaultValue>
}

export default QueryAddressForm
