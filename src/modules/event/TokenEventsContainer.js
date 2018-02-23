import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {buildEtherscanLink} from '../../utils/etherscanUtils'
import {connect} from 'react-redux'
import {loadTokenTransferEvents} from '../token/tokenActions'
import {Header, Segment} from 'semantic-ui-react'

class TokenEventsContainer extends Component {
    constructor(props, context) {
        super(props, context)
    }

    componentDidMount() {
        this.checkEventsLoaded(this.props)
    }

    componentWillReceiveProps(newProps) {
        this.checkEventsLoaded(newProps)
    }

    checkEventsLoaded(props) {
        return true
    }

    render() {
        return (
            <Header block as='h2'>
                TODO: Show all transfer events of {this.props.token.name} involving currently watched addresses.
            </Header>
        )
    }
}

TokenEventsContainer.propTypes = {
    token: PropTypes.object.isRequired
}

TokenEventsContainer.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => {
    const tokenId = parseInt(ownProps.match.params.tokenId, 10)
    const token = state.tokens.byId[tokenId]
    const etherscanUrl = buildEtherscanLink(token.address)
    return {
        token: token,
        etherscanUrl: etherscanUrl
    }
}
const mapDispatchToProps = dispatch => ({
    loadTokenTransferEvents: (tokenId) => {
        dispatch(loadTokenTransferEvents(tokenId, 0, 'latest'))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenEventsContainer)
