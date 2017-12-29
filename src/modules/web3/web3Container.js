import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {initialize, setCurrentBlock, stopBlockFilter} from './web3Actions'
import Web3Info from "./web3Info"
import {Segment} from 'semantic-ui-react'

class Web3Container extends Component {
    constructor(props, context) {
        super(props, context)
        this.filter = null
    }

    componentDidMount() {
        this.props.initialize()
    }

    componentWillUnmount() {
        // Stop listening to new block events
        this.props.stopBlockFilter()
    }

    render() {
        const apiVersion = this.props.web3 ? this.props.web3.version.api : ''
        if (this.props.isLoading) {
            return <Segment>Web3 initializing...</Segment>
        } else {
            return <Segment>
                <Web3Info apiVersion={apiVersion}
                             name={this.props.name}
                             block={this.props.block}
                             id={this.props.id}
                             nodeVersion={this.props.nodeVersion}
                />
            </Segment>
        }
    }
}

Web3Container.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    web3: PropTypes.object,
    name: PropTypes.string,
    id: PropTypes.number,
    block: PropTypes.object,
    nodeVersion: PropTypes.string,
}

const mapStateToProps = (state, ownProps) => ({
    isLoading: state.web3Instance.isLoading,
    web3: state.web3Instance.web3,
    name: state.web3Instance.name,
    id: state.web3Instance.id,
    block: state.web3Instance.block,
    nodeVersion: state.web3Instance.nodeVersion
})

const mapDispatchToProps = dispatch => ({
    initialize: () => {
        dispatch(initialize())
    },
    setCurrentBlock: (block) => {
        dispatch(setCurrentBlock(block))
    },
    stopBlockFilter: () => {
        dispatch(stopBlockFilter())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Web3Container)
