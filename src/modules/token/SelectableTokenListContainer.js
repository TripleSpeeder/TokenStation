import React, {Component} from 'react'
import {connect} from "react-redux"
import {Grid, Divider, Checkbox} from 'semantic-ui-react'
import TokenListFilterContainer from './TokenListFilterContainer'
import SelectableTokenList from "./SelectableTokenList"
import TokenLoaderContainer from './TokenLoaderContainer'
import {setFilterProps} from './tokenActions'

class SelectableTokenListContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.handleShowOnlyTrackedChange = this.handleShowOnlyTrackedChange.bind(this)
    }

    handleShowOnlyTrackedChange(e, data) {
        const {checked} = data
        this.props.setShowTracked(checked)
    }

    render() {
        return (
            <React.Fragment>
                <TokenLoaderContainer/>
                <Grid verticalAlign='middle' columns={2} divided>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Checkbox toggle label='Only show tracked token' checked={this.props.showOnlyTracked} onChange={this.handleShowOnlyTrackedChange} />
                        </Grid.Column>
                        <Grid.Column  width={10}>
                            <TokenListFilterContainer target={'tokenlist'}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Divider/>
                <SelectableTokenList
                    tokenList={this.props.tokenIds}
                />
            </React.Fragment>
            )
    }
}

const mapStateToProps = state => {
    const filterIsActive = state.tokens.listState.filterIsActive
    const showOnlyTracked = state.tokens.listState.showOnlyTracked
    return {
        tokenIds: filterIsActive ? state.tokens.listState.matchedTokenIds : state.tokens.allIds,
        showOnlyTracked,
    }
}

const mapDispatchToProps = dispatch => ({
    setShowTracked: (showOnlyTracked) => {
        dispatch(setFilterProps({showOnlyTracked}))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(SelectableTokenListContainer)
