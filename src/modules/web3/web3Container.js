import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import Web3Info from "./web3Info"
import {Segment} from 'semantic-ui-react'

class Web3Container extends Component {
    constructor(props, context) {
        super(props, context)
        this.filter = null
    }

    render() {
        const apiVersion = this.props.web3.version.api
        return <Segment textAlign='center'>
            <Web3Info apiVersion={apiVersion}
                         name={this.props.name}
                         block={this.props.block}
                         id={this.props.id}
                         nodeVersion={this.props.nodeVersion}
            />
        </Segment>
    }
}

Web3Container.propTypes = {
    web3: PropTypes.object,
    name: PropTypes.string,
    id: PropTypes.number,
    block: PropTypes.object,
    nodeVersion: PropTypes.string,
}

const mapStateToProps = (state) => ({
    web3: state.web3Instance.web3,
    name: state.web3Instance.name,
    id: state.web3Instance.id,
    block: state.web3Instance.block,
    nodeVersion: state.web3Instance.nodeVersion
})

export default connect(mapStateToProps)(Web3Container)
