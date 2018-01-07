import React from 'react'
import PropTypes from 'prop-types'
import {Item, Visibility} from 'semantic-ui-react'
import TokenContainer from './TokenContainer'

const TokenList = (props) => {

    const visibleTokenIds = props.filterIsActive ? props.visibleMatchedTokenIds : props.visibleTokenIds

    return (
        <Visibility onUpdate={props.visibilityUpdate}>
            <Item.Group divided>
                {visibleTokenIds.map((tokenId) => <TokenContainer
                    key={tokenId}
                    tokenId={tokenId}
                />)}
            </Item.Group>
        </Visibility>
    )
}

TokenList.propTypes = {
    filterIsActive: PropTypes.bool.isRequired,
    visibleTokenIds: PropTypes.array.isRequired,
    visibleMatchedTokenIds: PropTypes.array.isRequired,
    visibilityUpdate: PropTypes.func.isRequired,
}

export default TokenList
