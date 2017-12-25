import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {setAPIVersion, setCurrentBlock, setNetwork, setNodeVersion, setWeb3Instance} from "./web3Actions"
import getWeb3 from "../../utils/getWeb3"

class Web3Container extends Component {
    constructor(props, context) {
        super(props, context)
        this.filter = null
    }

    componentDidMount() {
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

    setNodeInfo(web3) {
        web3.version.getNode((error, result) => {
            this.props.setNodeVersion(result)
        })
    }

    setAPIVersion(web3) {
        this.props.setAPIVersion(web3.version.api)
    }

    setNetworkInfo(web3) {
        web3.version.getNetwork((error, netId) => {
            let network = 'unknown'
            let networkID = 0
            switch (netId) {
                case "4447":
                    network = 'truffle test'
                    networkID = 4447
                    break
                case "1":
                    network = 'mainnet'
                    networkID = 1
                    break
                case "2":
                    network = 'Morden (deprecated!)'
                    networkID = 2
                    break
                case "3":
                    network = 'Ropsten'
                    networkID = 3
                    break
                case "4":
                    network = 'Rinkeby'
                    networkID = 4
                    break
                case "42":
                    network = 'Kovan'
                    networkID = 42
                    break
                case "61":
                    network = 'ETC'
                    networkID = 61
                    break
                case "62":
                    networkID = 62
                    network = 'ETC Testnet'
                    break
                default:
                    network = 'Unknown'
            }
            this.props.setNetwork(networkID, network)
        })
    }

    render() {
        return (
            <div>
                Network: {this.props.name} ({this.props.id}) | Block: {this.props.block.number} ({this.props.block.timestamp})
                | Web3 API version: {this.props.apiVersion} | Node version: {this.props.nodeVersion}
            </div>
        )
    }
}

Web3Container.propTypes = {
    //myProp: PropTypes.object.isRequired
}

Web3Container.defaultProps = {
    //myProp: <defaultValue>
}

const mapStateToProps = (state, ownProps) => ({
    web3: state.web3Instance.web3,
    name: state.web3Instance.name,
    id: state.web3Instance.id,
    block: state.web3Instance.block,
    apiVersion: state.web3Instance.apiVersion,
    nodeVersion: state.web3Instance.nodeVersion
})

const mapDispatchToProps = dispatch => ({
    setWeb3Instance: (web3) => {
        dispatch(setWeb3Instance(web3))
    },
    setCurrentBlock: (block) => {
        dispatch(setCurrentBlock(block))
    },
    setNetwork: (id, name) => {
        dispatch(setNetwork(id, name))
    },
    setNodeVersion: (nodeVersion) => {
        dispatch(setNodeVersion(nodeVersion))
    },
    setAPIVersion: (apiVersion) => {
        dispatch(setAPIVersion(apiVersion))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Web3Container)
