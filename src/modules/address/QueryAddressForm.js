import React from 'react'
import PropTypes from 'prop-types'
import {Form} from "semantic-ui-react"

const QueryAddressForm = (props) => {

    const {handleChange, handleSubmit, loading, disabled, error, address, ensName, value} = props
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group inline>
                <Form.Input width={10}
                            name='address'
                            placeholder='Address or ENS Name'
                            error={error}
                            loading={loading}
                            onChange={handleChange}
                            value={value}
                            label={'Add account'}
                />
                <Form.Button
                    content='Submit'
                    disabled={disabled}
                    width={6}
                />
            </Form.Group>
        </Form>
    )
}

QueryAddressForm.propTypes = {
    address: PropTypes.string,
    ensName: PropTypes.string,
    value: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}

QueryAddressForm.defaultProps = {
    //myProp: <defaultValue>
}

export default QueryAddressForm
