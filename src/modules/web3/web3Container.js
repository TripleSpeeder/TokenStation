import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {
    initialize, setAPIVersion, setCurrentBlock, setNetwork, setNodeVersion, setWeb3Instance,
    stopBlockFilter
} from './web3Actions'
import getWeb3 from "../../utils/getWeb3"
import Web3Info from "./web3Info"

class Web3Container extends Component {
    constructor(props, context) {
        super(props, context)
        this.filter = null
    }

    componentDidMount() {
        this.props.initialize()
        /*
        getWeb3
            .then(results => {
                this.props.setWeb3Instance(results.web3)
                return results.web3
            })
            .then((web3) => {
                // get version and network info
                this.setNetworkInfo(web3)
                this.setNodeInfo(web3)
                this.setAPIVersion(web3)
                this.setCurrentBlockInfo(web3)
                this.startListenForBlocks(web3)
            })
        */
    }

    componentWillUnmount() {
        // Stop listening to new block events
        if (this.filter) {
            this.filter.stopWatching(function (error, result) {
                if (error) {
                    console.log("Error while stopWatching: " + error)
                }
            })
        }
    }

    startListenForBlocks(web3) {
        this.filter = web3.eth.filter('latest')
        this.filter.watch((error, blockHash) => {
            if (error) {
                console.log("*** web3Container error: " + error)
            } else {
                web3.eth.getBlock(blockHash, (error, block) => {
                    if (error) {
                        console.log("*** web3Container error: " + error)
                    } else {
                        this.props.setCurrentBlock(block)
                    }
                })
            }
        })

    }

    setCurrentBlockInfo(web3) {
        web3.eth.getBlock('latest', (error, block) => {
            this.props.setCurrentBlock(block)
        })

    }

    render() {
        const apiVersion = this.props.web3 ? this.props.web3.version.api : ''
        if (this.props.isLoading) {
            return <div>Web3 initializing...</div>
        } else {
            return <Web3Info apiVersion={apiVersion}
                             name={this.props.name}
                             block={this.props.block}
                             id={this.props.id}
                             nodeVersion={this.props.nodeVersion}
            />
        }
    }
}

Web3Container.propTypes = {
    //myProp: PropTypes.object.isRequired
}

Web3Container.defaultProps = {
    //myProp: <defaultValue>
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
