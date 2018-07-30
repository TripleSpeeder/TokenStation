import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Table, Form, Message} from 'semantic-ui-react'
import SelectableTokenContainer from "./SelectableTokenContainer"

const SelectableTokenList = (props) => {

    const {tokenList} = props

    if (tokenList.length) {
        return (
            <Table celled>
                <Table.Body>
                {tokenList.map((tokenId) => <SelectableTokenContainer
                    key={tokenId}
                    tokenId={tokenId}
                />)}
                </Table.Body>
            </Table>
        )
    } else {
        return (
            <Message negative>
                <Message.Header>No token contracts to display.</Message.Header>
                <Message.Content>Things you can try:</Message.Content>
                <Message.List items={['change/clear the filterstring', 'check if you are connected to the correct network']}>
                </Message.List>
            </Message>
        )
    }
}

SelectableTokenList.propTypes = {
    tokenList: PropTypes.array.isRequired
}

export default SelectableTokenList
