import React, {Component} from 'react'
import {connect} from "react-redux"
import {Divider} from 'semantic-ui-react'
import TokenListFilterContainer from './TokenListFilterContainer'
import SelectableTokenList from "./SelectableTokenList"
import TokenLoaderContainer from './TokenLoaderContainer'

class SelectableTokenListContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <React.Fragment>
                <TokenLoaderContainer/>
                <TokenListFilterContainer/>
                <Divider/>
                <SelectableTokenList
                    tokenList={this.props.tokenIds}
                />
            </React.Fragment>
            )
    }
}

const mapStateToProps = state => {
    const filterIsActive = state.tokens.listState.filter.length
    return {
        tokenIds: filterIsActive ? state.tokens.listState.matchedTokenIds : state.tokens.allIds,
    }
}

const mapDispatchToProps = dispatch => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(SelectableTokenListContainer)
