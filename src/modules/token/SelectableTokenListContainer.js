import React, {Component} from 'react'
import {connect} from "react-redux"
import {Grid, Divider, Checkbox, Pagination, Container} from 'semantic-ui-react'
import TokenListFilterContainer from './TokenListFilterContainer'
import SelectableTokenList from "./SelectableTokenList"
import TokenLoaderContainer from './TokenLoaderContainer'
import {changeTokenListPage, setFilterProps} from './tokenActions'

class SelectableTokenListContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.handleShowOnlyTrackedChange = this.handleShowOnlyTrackedChange.bind(this)
        this.handlePaginationChange = this.handlePaginationChange.bind(this)
    }

    handleShowOnlyTrackedChange(e, data) {
        const {checked} = data
        this.props.setShowTracked(checked)
    }

    handlePaginationChange(e, data) {
        const {activePage} = data
        this.props.setTokenListPage(activePage)
    }

    render() {
        let pager = null
        if (this.props.totalPages > 1) {
            pager = <Container textAlign={'center'}>
                        <Pagination activePage={this.props.activePage}
                                    onPageChange={this.handlePaginationChange}
                                    totalPages={this.props.totalPages}/>
                    </Container>

        }
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
                {pager}
            </React.Fragment>
            )
    }
}

const mapStateToProps = state => {
    const itemsPerPage = 20
    let totalPages = 1
    const activePage = state.tokens.listState.activePage
    const filterIsActive = state.tokens.listState.filterIsActive
    let tokenIds = filterIsActive ? state.tokens.listState.matchedTokenIds : state.tokens.allIds
    const showOnlyTracked = state.tokens.listState.showOnlyTracked
    const numVisibleTokens = tokenIds.length
    if (numVisibleTokens) {
        totalPages = Math.ceil(numVisibleTokens / itemsPerPage)
    }
    const sliceStart = (activePage-1)*itemsPerPage
    tokenIds = tokenIds.slice(sliceStart, sliceStart+itemsPerPage)
    return {
        tokenIds,
        showOnlyTracked,
        activePage,
        totalPages,
    }
}

const mapDispatchToProps = dispatch => ({
    setShowTracked: (showOnlyTracked) => {
        dispatch(setFilterProps({showOnlyTracked}))
    },
    setTokenListPage: (activePage) => {
        dispatch(changeTokenListPage(activePage))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(SelectableTokenListContainer)
