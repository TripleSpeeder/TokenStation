import React from 'react'
import PropTypes from 'prop-types'
import {Divider, Item, Progress, Visibility} from 'semantic-ui-react'
import TokenContainer from "./TokenContainer"
import {TOKEN_LIST_STATES} from './tokenActions'

const TokenList = (props) => {

    let progressBar = null
    if(props.listState === TOKEN_LIST_STATES.LOADING ) {
        const tokenName = props.currentlyLoadingToken ? props.currentlyLoadingToken.name : ''
        progressBar = <div>
            <Progress value={props.allTokenIds.length}
                                total={props.progressTotal}
                                color='green'
                                label={'Loading ' + tokenName}
                                size='small'/>
            <Divider/>
        </div>
    }

    const visibleTokenIds = props.filterIsActive ? props.visibleMatchedTokenIds : props.visibleTokenIds

    return (
        <div>
        {progressBar ? progressBar : null}
        <Item.Group divided>
            <Visibility onUpdate={props.visibilityUpdate}>
                {visibleTokenIds.map((tokenId) => <TokenContainer
                        key={tokenId}
                        tokenId={tokenId}
                        showEmpty={props.showEmpty}
                    />)}
            </Visibility>
        </Item.Group>
        </div>
    )
}

TokenList.propTypes = {
    showEmpty: PropTypes.bool.isRequired,
    progressTotal: PropTypes.number.isRequired,
}

export default TokenList
