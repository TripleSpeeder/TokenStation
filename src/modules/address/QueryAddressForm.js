import React from 'react'
import PropTypes from 'prop-types'
import {Form} from "semantic-ui-react"

const QueryAddressForm = (props) => {

    const {handleChange, handleSubmit, valid, address,} = props

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group inline>
                <Form.Input width={10}
                            name='address'
                            placeholder='Address'
                            error={!valid}
                            onChange={handleChange}
                            value={address}
                            label={'Add account'}
                />
                <Form.Button
                    content='Submit'
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
