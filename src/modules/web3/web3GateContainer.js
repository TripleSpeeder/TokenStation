import React, {Component} from 'react'
import {initialize, stopBlockFilter} from './web3Actions'
import {connect} from 'react-redux'
import Web3Gate from './web3Gate'

class Web3GateContainer extends Component {

    componentDidMount() {
        this.props.initialize()
    }

    componentWillUnmount() {
        // Stop listening to new block events
        this.props.stopBlockFilter()
    }

    onRetry = () => {
        this.props.initialize()
    }

    render() {
        const {state, children} = this.props
        return <Web3Gate state={state} onRetry={this.onRetry} children={children}/>
    }
}

const mapStateToProps = (state) => ({
    state: state.web3Instance.state,
})

const mapDispatchToProps = dispatch => ({
    initialize: () => {
        dispatch(initialize())
    },
    stopBlockFilter: () => {
        dispatch(stopBlockFilter())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Web3GateContainer)
