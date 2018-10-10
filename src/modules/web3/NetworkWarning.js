import React from 'react'
import PropTypes from 'prop-types'
import {Icon, Message} from 'semantic-ui-react'

const NetworkWarning = (props) => {
    const {networkId, networkName} = props

    return(
        <Message size={'small'} icon warning>
            <Icon name='warning' />
            <Message.Content>
                <Message.Header>
                    You are not connected to mainnet!
                </Message.Header>
                Your current network: {networkName} (ID: {networkId})
            </Message.Content>
        </Message>
    )
}

NetworkWarning.propTypes = {
    networkId: PropTypes.number.isRequired,
    networkName: PropTypes.string.isRequired
}


export default NetworkWarning
