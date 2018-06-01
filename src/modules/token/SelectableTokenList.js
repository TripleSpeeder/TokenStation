import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {Table, Form} from 'semantic-ui-react'
import SelectableTokenContainer from "./SelectableTokenContainer"

const SelectableTokenList = (props) => {

    const {tokenList} = props

    return (
        <Table celled>
            {tokenList.map((tokenId) => <SelectableTokenContainer
                key={tokenId}
                tokenId={tokenId}
            />)}
        </Table>
    )
}

SelectableTokenList.propTypes = {
    tokenList: PropTypes.array.isRequired
}

export default SelectableTokenList
