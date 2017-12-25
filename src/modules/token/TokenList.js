import React from 'react'
import PropTypes from 'prop-types'
import {Item} from "semantic-ui-react"
import TokenContainer from "./TokenContainer"

const TokenList = (props) => {
    return (
        <Item.Group divided>
            {props.tokenIds.map((tokenId) => <TokenContainer
                    key={tokenId}
                    tokenId={tokenId}
                    showEmpty={props.showEmpty}
                />)
            }
        </Item.Group>
    )
}

TokenList.propTypes = {
    showEmpty: PropTypes.bool.isRequired,
}

export default TokenList
