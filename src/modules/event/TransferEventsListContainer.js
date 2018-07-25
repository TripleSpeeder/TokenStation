import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {buildAdressContractEventId} from './reducers/addressContractEventsByIdReducer'
import TransferEventsList from './TransferEventsList'
import {Container, Pagination} from 'semantic-ui-react'
import {changeTransferEventListPage} from './eventActions'

class TransferEventsListContainer extends Component {

    constructor(props, context) {
        super(props, context)
        this.handlePaginationChange = this.handlePaginationChange.bind(this)
    }

    handlePaginationChange(e, data) {
        const {activePage} = data
        this.props.setTransferEventListPage(activePage)
    }

    render() {
        const {aceEventIds, totalPages, activePage} = this.props

        let pager = null
        if (totalPages > 1) {
            pager = <Container textAlign={'center'}>
                <Pagination activePage={activePage}
                            onPageChange={this.handlePaginationChange}
                            totalPages={totalPages}/>
            </Container>
        }

        return (
            <React.Fragment>
                <TransferEventsList transferEventIds={aceEventIds}/>
                {pager}
            </React.Fragment>
        )
    }
}

TransferEventsListContainer.propTypes = {
    token: PropTypes.object
}

TransferEventsListContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state) => {
    const tokenId = state.tokens.selector.selectedTokenId
    const addressId = state.addresses.selector.selectedAddressId
    const activePage = state.events.listState.activePage

    const itemsPerPage = 15
    let totalPages = 1
    let aceEntry = undefined
    let aceEventIds = []

    // first try to get aceEntry
    if (tokenId && addressId) {
        const aceId = buildAdressContractEventId(addressId, tokenId)
        aceEntry = state.events.aceById[aceId]
    }

    // if there is an aceEntry get actual events and prepare paginator
    if (aceEntry) {
        aceEventIds = aceEntry.eventIds
        totalPages = Math.ceil(aceEventIds.length / itemsPerPage)
        const sliceStart = (activePage-1)*itemsPerPage
        aceEventIds = aceEventIds.slice(sliceStart, sliceStart+itemsPerPage)
    }

    return {
        aceEventIds,
        activePage,
        totalPages,
    }
}

const mapDispatchToProps = dispatch => ({
    setTransferEventListPage: (activePage) => {
        dispatch(changeTransferEventListPage(activePage))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(TransferEventsListContainer)
