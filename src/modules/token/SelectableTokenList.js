import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Table, Form, Message} from 'semantic-ui-react'
import SelectableTokenContainer from "./SelectableTokenContainer"

const SelectableTokenList = (props) => {

    const {tokenList} = props

    if (tokenList.length) {
        return (
            <Table celled>
                {tokenList.map((tokenId) => <SelectableTokenContainer
                    key={tokenId}
                    tokenId={tokenId}
                />)}
            </Table>
        )
    } else {
        return (
            <Message negative>
                <Message.Header>No token contracts available</Message.Header>
                <p>Try clearing the filter string.</p>
            </Message>
        )
    }
}

SelectableTokenList.propTypes = {
    tokenList: PropTypes.array.isRequired
}

export default SelectableTokenList
