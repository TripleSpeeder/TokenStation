import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Table, Form} from 'semantic-ui-react'
import AddressDisplay from '../common/AddressDisplay'

const SelectableToken = (props) => {

    const {id, address, ensName, name, symbol, checked, onChange} = props

    return (
        <Table.Row>
            <Table.Cell collapsing>
                <Form.Checkbox checked={checked} onChange={onChange}/>
            </Table.Cell>
            <Table.Cell>
                <strong>{name}</strong>
            </Table.Cell>
            <Table.Cell>
                <strong>{symbol}</strong>
            </Table.Cell>
            <Table.Cell>
                <AddressDisplay address={address} ensName={ensName}/>
            </Table.Cell>
        </Table.Row>
    )
}

SelectableToken.propTypes = {
    id: PropTypes.string.isRequired,
    checked: PropTypes.bool,
    address: PropTypes.string.isRequired,
    ensName: PropTypes.string,
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default SelectableToken
