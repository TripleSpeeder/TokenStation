import React from 'react'
import {storiesOf} from '@storybook/react'
import NetworkWarning from './NetworkWarning'


storiesOf('Modules/NetworkWarning', module)
    .add('Ropsten', () => <NetworkWarning networkId={3} networkName={'Ropsten'}/>)
    .add('Unknown', () => <NetworkWarning networkId={1234} networkName={'unknown'}/>)

