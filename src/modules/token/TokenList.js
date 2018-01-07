import React from 'react'
import PropTypes from 'prop-types'
import {Item, Progress} from 'semantic-ui-react'
import TokenContainer from "./TokenContainer"
import {TOKEN_LIST_STATES} from './tokenActions'

const TokenList = (props) => {

    let progressBar = null
    if(props.listState === TOKEN_LIST_STATES.LOADING ) {
        const tokenName = props.currentlyLoadingToken ? props.currentlyLoadingToken.name : ''
        progressBar = <Progress value={props.allTokenIds.length}
                                total={props.progressTotal}
                                color='green'
                                label={'Loading ' + tokenName}
                                size='small'/>
    }

    const tokenIds = props.filterIsActive ? props.matchedTokenIds : props.allTokenIds

    return (
        <div>
        {progressBar ? progressBar : null}
        <Item.Group divided>
            {tokenIds.map((tokenId) => <TokenContainer
                    key={tokenId}
                    tokenId={tokenId}
                    showEmpty={props.showEmpty}
                />)
            }
        </Item.Group>
        </div>
    )
}

TokenList.propTypes = {
    showEmpty: PropTypes.bool.isRequired,
    progressTotal: PropTypes.number.isRequired,
}

export default TokenList
