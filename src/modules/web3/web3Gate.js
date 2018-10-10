import React, {Component, Children} from 'react'
import PropTypes from 'prop-types'
import {initialize, stopBlockFilter} from './web3Actions'
import {connect} from 'react-redux'
import ModalLoader from '../common/ModalLoader'

class Web3Gate extends Component {

    componentDidMount() {
        this.props.initialize()
    }

    componentWillUnmount() {
        // Stop listening to new block events
        this.props.stopBlockFilter()
    }

    render() {
        if (this.props.web3)
        {
            // Load the dapp.
            return Children.only(this.props.children)
        }

        return (
            <ModalLoader content={"Waiting on web3 initialization"}/>
        )
    }}

Web3Gate.propTypes = {
    web3: PropTypes.object
}

const mapStateToProps = (state, ownProps) => ({
    isLoading: state.web3Instance.isLoading,
    web3: state.web3Instance.web3,
})

const mapDispatchToProps = dispatch => ({
    initialize: () => {
        dispatch(initialize())
    },
    stopBlockFilter: () => {
    dispatch(stopBlockFilter())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Web3Gate)
