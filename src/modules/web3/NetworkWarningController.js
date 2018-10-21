import React, {Component} from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/es/connect/connect'
import NetworkWarning from './NetworkWarning'
import Grid from 'semantic-ui-react/dist/es/collections/Grid/Grid'

class NetworkWarningController extends Component {
    render() {
        const {networkId, networkName} = this.props
        if (networkId === 1) {
            // mainnet. No need for a warning!
            return null
        }

        return (
            <Grid.Row>
                <NetworkWarning networkId={networkId} networkName={networkName}/>
            </Grid.Row>
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
