import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Web3Gate from './web3Gate'
import {WEB3_STATES} from './web3Actions'

export const web3GateActions = {
    onRetry: action('onRetry'),
}

export const web3GateChildren = <p>gatewayed content</p>

storiesOf('Modules/web3Gate', module)
    .add('uninitialized', () => <Web3Gate state={WEB3_STATES.UNINITIALIZED}
                                          onRetry={web3GateActions.onRetry}>{web3GateChildren}</Web3Gate>)
    .add('loading', () => <Web3Gate state={WEB3_STATES.LOADING}
                                    onRetry={web3GateActions.onRetry}>{web3GateChildren}</Web3Gate>)
    .add('initalized', () => <Web3Gate state={WEB3_STATES.INITIALIZED}
                                       onRetry={web3GateActions.onRetry}>{web3GateChildren}</Web3Gate>)
    .add('error', () => <Web3Gate state={WEB3_STATES.ERROR}
                                  onRetry={web3GateActions.onRetry}>{web3GateChildren}</Web3Gate>)
