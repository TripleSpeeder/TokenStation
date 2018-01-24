import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {initialize, TOKEN_LIST_STATES} from './tokenActions'
import {connect} from 'react-redux'
import {Segment} from 'semantic-ui-react'
import TokenLoader from './TokenLoader'

class TokenLoaderContainer extends Component {
    constructor(props, context) {
        super(props, context)
        this.registryAddress = '0x5F0281910Af44bFb5fC7e86A404d0304B0e042F1'
        this.registryABI =  [{"constant":true,"inputs":[{"name":"_id","type":"uint256"}],"name":"token","outputs":[{"name":"addr","type":"address"},{"name":"tla","type":"string"},{"name":"base","type":"uint256"},{"name":"name","type":"string"},{"name":"owner","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_new","type":"address"}],"name":"setOwner","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_tla","type":"string"},{"name":"_base","type":"uint256"},{"name":"_name","type":"string"}],"name":"register","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":false,"inputs":[{"name":"_fee","type":"uint256"}],"name":"setFee","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_id","type":"uint256"},{"name":"_key","type":"bytes32"}],"name":"meta","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":false,"inputs":[{"name":"_addr","type":"address"},{"name":"_tla","type":"string"},{"name":"_base","type":"uint256"},{"name":"_name","type":"string"},{"name":"_owner","type":"address"}],"name":"registerAs","outputs":[{"name":"","type":"bool"}],"type":"function"},{"constant":true,"inputs":[{"name":"_tla","type":"string"}],"name":"fromTLA","outputs":[{"name":"id","type":"uint256"},{"name":"addr","type":"address"},{"name":"base","type":"uint256"},{"name":"name","type":"string"},{"name":"owner","type":"address"}],"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[],"name":"drain","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"tokenCount","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"}],"name":"unregister","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_addr","type":"address"}],"name":"fromAddress","outputs":[{"name":"id","type":"uint256"},{"name":"tla","type":"string"},{"name":"base","type":"uint256"},{"name":"name","type":"string"},{"name":"owner","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_key","type":"bytes32"},{"name":"_value","type":"bytes32"}],"name":"setMeta","outputs":[],"type":"function"},{"constant":true,"inputs":[],"name":"fee","outputs":[{"name":"","type":"uint256"}],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tla","type":"string"},{"indexed":true,"name":"id","type":"uint256"},{"indexed":false,"name":"addr","type":"address"},{"indexed":false,"name":"name","type":"string"}],"name":"Registered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tla","type":"string"},{"indexed":true,"name":"id","type":"uint256"}],"name":"Unregistered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"id","type":"uint256"},{"indexed":true,"name":"key","type":"bytes32"},{"indexed":false,"name":"value","type":"bytes32"}],"name":"MetaChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"old","type":"address"},{"indexed":true,"name":"current","type":"address"}],"name":"NewOwner","type":"event"}]
        this.continueLoadingAfterRehydrate = false
    }

    componentDidMount() {
        /*
        if ((this.props.listState === TOKEN_LIST_STATES.VIRGIN) && (this.props.web3)) {
            this.props.initialize(this.props.web3, this.registryABI, this.registryAddress)
        }

        // in case the list was in loading state while hydrating
        if ((this.props.listState === TOKEN_LIST_STATES.LOADING) && (this.props.web3)) {
            this.props.initialize(this.props.web3, this.registryABI, this.registryAddress, this.props.lastTokenId)
        }
        */
    }

    componentWillReceiveProps(newProps) {
        if ((newProps.listState === TOKEN_LIST_STATES.VIRGIN) && (newProps.web3)) {
            newProps.initialize(newProps.web3, this.registryABI, this.registryAddress)
        }

        // in case the list was in loading state while hydrating, continue initialisation
        if ((newProps.listState === TOKEN_LIST_STATES.LOADING) &&
            (newProps.web3) &&
            (!this.state.loadingStarted)) {
            this.setState({
                loadingStarted: true
            })
            newProps.initialize(
                newProps.web3,
                this.registryABI,
                this.registryAddress,
                newProps.lastTokenId,
                newProps.progressTotal)
        }

        // update local state if loading has finished
        if ((this.props.listState === TOKEN_LIST_STATES.LOADING) &&
            (newProps.listState === TOKEN_LIST_STATES.INITIALIZED)) {
            this.setState({
                loadingStarted: false
            })
        }
    }

    render() {
        if (this.props.isLoading) {
            return (
                <Segment>
                    <TokenLoader progressTotal={this.props.progressTotal}
                                 currentlyLoadingToken={this.props.currentlyLoadingToken}
                                 progressCurrent={this.props.progressCurrent}
                    />
                </Segment>
            )
        } else {
            return null
        }
    }
}

TokenLoaderContainer.propTypes = {
    progressTotal: PropTypes.number.isRequired,
    progressCurrent: PropTypes.number.isRequired,
    currentlyLoadingToken: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    listState: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
    // obtain last loaded token for progress display
    const lastTokenIdIndex = state.tokens.allIds.length - 1
    const lastTokenId = (lastTokenIdIndex >= 0) ? state.tokens.allIds[lastTokenIdIndex] : null
    const lastToken = lastTokenId ? state.tokens.byId[lastTokenId].name : ''
    const progressTotal = state.tokens.listState.total
    const progressCurrent = state.tokens.allIds.length
    const listState = state.tokens.listState.listState

    return {
        web3: state.web3Instance.web3,
        progressTotal,
        progressCurrent,
        currentlyLoadingToken: lastToken,
        lastTokenId,
        isLoading: (progressTotal > progressCurrent),
        listState,
    }
}

const mapDispatchToProps = dispatch => ({
    initialize: (web3, registryABI, registryAddress, lastTokenId, total) => {
        dispatch(initialize(web3, registryABI, registryAddress, lastTokenId, total))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(TokenLoaderContainer)

