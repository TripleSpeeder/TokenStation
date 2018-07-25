import React, {Component} from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import NetworkWarning from './NetworkWarning'

class NetworkWarningController extends Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        const {networkId, networkName} = this.props
        return (
            <NetworkWarning networkId={networkId} networkName={networkName}/>
        )
    }
}

NetworkWarningController.propTypes = {
    networkId: PropTypes.number.isRequired,
    networkName: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
    return {
        networkId: state.web3Instance.id,
        networkName: state.web3Instance.name,
    }
}

export default connect(mapStateToProps)(NetworkWarningController)
