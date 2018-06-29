import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import TokenLoader from './TokenLoader'

class TokenLoaderContainer extends Component {
    render() {
        return (
            <TokenLoader progressTotal={this.props.progressTotal}
                         currentlyLoadingToken={this.props.currentlyLoadingToken}
                         progressCurrent={this.props.progressCurrent}
            />
        )
    }
}

TokenLoaderContainer.propTypes = {
    progressTotal: PropTypes.number.isRequired,
    progressCurrent: PropTypes.number.isRequired,
    currentlyLoadingToken: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
    // obtain last loaded token for progress display
    const lastTokenIdIndex = state.tokens.allIds.length - 1
    const lastTokenId = (lastTokenIdIndex >= 0) ? state.tokens.allIds[lastTokenIdIndex] : null
    const lastToken = lastTokenId ? state.tokens.byId[lastTokenId].name : ''
    const progressTotal = state.tokens.listState.total
    const progressCurrent = state.tokens.allIds.length

    return {
        progressTotal,
        progressCurrent,
        currentlyLoadingToken: lastToken,
        lastTokenId,
        isLoading: (progressTotal > progressCurrent),
    }
}

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(TokenLoaderContainer)

