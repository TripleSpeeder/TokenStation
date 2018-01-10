import React, {Component} from 'react'
import {connect} from "react-redux"
import {addToken, initialize, showMoreItems} from './tokenActions'
import TokenList from "./TokenList"
import {Divider} from 'semantic-ui-react'
import TokenListFilterContainer from './TokenListFilterContainer'

class TokenListContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.visibilityUpdate = this.visibilityUpdate.bind(this)
    }

    componentWillReceiveProps(newProps) {
        /*
        if (newProps.address && (newProps.address !== this.props.address)) {
            // got a new query address. Clear all existing balances and start updating them.
            this.props.clearBalances()
            this.obtainBalances(newProps.address)
        }*/
    }

    visibilityUpdate(e, {calculations}) {
        if (calculations.bottomVisible) {
            // bottom of list is visible. Try loading more items.
            if (this.props.filterIsActive) {
                if (this.props.matchedTokenIds.length > this.props.visibleMatchedTokenIds.length)
                    this.props.showMoreItems();
            } else {
                if (this.props.allTokenIds.length > this.props.visibleTokenIds.length)
                    this.props.showMoreItems();
            }
        }
    }

    render() {
        return (
            <div>
                <TokenListFilterContainer/>
                <Divider/>
                <TokenList
                    filterIsActive={this.props.filterIsActive}
                    visibleTokenIds={this.props.visibleTokenIds}
                    visibleMatchedTokenIds={this.props.visibleMatchedTokenIds}
                    visibilityUpdate={this.visibilityUpdate}
                />
            </div>
            )
    }
}

// Specifies the default values for props:
TokenListContainer.defaultProps = {
    showEmpty: true
};

const mapStateToProps = state => {
    // obtain last loaded token for progress display
    const lastTokenIdIndex = state.tokens.allIds.length-1
    const lastTokenId = (lastTokenIdIndex >= 0) ? state.tokens.allIds[lastTokenIdIndex] : null
    const lastToken = lastTokenId ? state.tokens.byId[lastTokenId] : null
    const displayCount = state.tokens.listState.displayCount
    const filterIsActive = (state.tokens.listState.filter.length > 0)

    return {
        web3: state.web3Instance.web3,
        visibleTokenIds: state.tokens.allIds.slice(0, displayCount),
        allTokenIds: state.tokens.allIds,
        filterIsActive: filterIsActive,
        matchedTokenIds: state.tokens.listState.matchedTokenIds,
        visibleMatchedTokenIds: state.tokens.listState.matchedTokenIds.slice(0, displayCount),
        listState: state.tokens.listState.listState,
        progressTotal: state.tokens.listState.total,
        currentlyLoadingToken: lastToken
    }
}

const mapDispatchToProps = dispatch => ({
    addToken: (tokenId, token) => {
        dispatch(addToken(tokenId, token))
    },
    initialize: (web3, registryABI, registryAddress) =>
    {
        dispatch(initialize(web3, registryABI, registryAddress))
    },
    showMoreItems: () => {
        dispatch(showMoreItems())
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(TokenListContainer)
