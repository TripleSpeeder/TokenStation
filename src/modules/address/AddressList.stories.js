import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import StoryRouter from 'storybook-react-router'
import {Provider} from 'react-redux'

import AddressList from './AddressList'
import mockStore from '../mocks/MockStore'

export const addressListProps = {
    ownAddressIds: ['0xAccountAddress1', '0xAccountAddress2'],
    watchAddressIds: ['0xAccountAddress3', '0xAccountAddress4', '0xAccountAddress5', '0xAccountAddress6'],
    noIds: []
}

storiesOf('Modules/AddressList', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .addDecorator(StoryRouter())
    .add('default', () => <AddressList
        ownAddressIds={addressListProps.ownAddressIds}
        watchAddressIds={addressListProps.watchAddressIds}
    />)
    .add('onlyWatched', () => <AddressList
        ownAddressIds={addressListProps.noIds}
        watchAddressIds={addressListProps.watchAddressIds}
    />)
    .add('onlyOwn', () => <AddressList
        ownAddressIds={addressListProps.ownAddressIds}
        watchAddressIds={addressListProps.noIds}
    />)
    .add('noAddresses', () => <AddressList
        ownAddressIds={addressListProps.noIds}
        watchAddressIds={addressListProps.noIds}
    />)
