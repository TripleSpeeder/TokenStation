import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Table, Form} from 'semantic-ui-react'

const SelectableToken = (props) => {

    const {id, address, name, symbol, checked, onToggle} = props

    return (
        <Table.Row>
            <Table.Cell collapsing>
                <Form.Checkbox checked={checked} onChange={onToggle}/>
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
    onToggle: PropTypes.func.isRequired,
}

SelectableToken.defaultProps = {
    checked: false
}

export default SelectableToken
