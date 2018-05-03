import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import StoryRouter from 'storybook-react-router'
import {Provider} from 'react-redux'

import AddressList from './AddressList'
import mockStore from '../mocks/MockStore'

const props = {
    ownAddressIds: ['0xAccountAddress1', '0xAccountAddress2'],
    watchAddressIds: ['0xAccountAddress3', '0xAccountAddress4', '0xAccountAddress5', '0xAccountAddress6'],
    noIds: []
}

const actions = {
    reloadBalance: action('reloadBalance'),
    toggleCollapse: action('toggleCollapse')
}

storiesOf('Modules/AddressList', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .addDecorator(StoryRouter())
    .add('default', () => <AddressList
        ownAddressIds={props.ownAddressIds}
        watchAddressIds={props.watchAddressIds}
    />)
    .add('onlyWatched', () => <AddressList
        ownAddressIds={props.noIds}
        watchAddressIds={props.watchAddressIds}
    />)
    .add('onlyOwn', () => <AddressList
        ownAddressIds={props.ownAddressIds}
        watchAddressIds={props.noIds}
    />)
    .add('noAddresses', () => <AddressList
        ownAddressIds={props.noIds}
        watchAddressIds={props.noIds}
    />)
