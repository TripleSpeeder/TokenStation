import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Table, Form} from 'semantic-ui-react'

const SelectableToken = (props) => {

    const {id, address, name, symbol, checked, onChange} = props

    return (
        <Table.Row>
            <Table.Cell collapsing>
                <Form.Checkbox checked={checked} onChange={onChange}/>
            </Table.Cell>
            <Table.Cell>
                {name} ({symbol})
            </Table.Cell>
        </Table.Row>
    )
}

SelectableToken.propTypes = {
    id: PropTypes.number.isRequired,
    checked: PropTypes.bool,
    address: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default SelectableToken
