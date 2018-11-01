import React from 'react'
import {storiesOf} from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import {action} from '@storybook/addon-actions'
import {Provider} from 'react-redux'
import AddressList from './AddressList'
import mockStore from '../mocks/MockStore'
import {ETH_ENABLE_STATES} from '../web3/web3Actions'

export const addressListProps = {
    ownAddressIds: ['0xAccountAddress1', '0xAccountAddress2'],
    watchAddressIds: ['0xAccountAddress3', '0xAccountAddress4', '0xAccountAddress5', '0xAccountAddress6'],
    noIds: []
}

export const AddressListActions = {
    ethEnable: action('ethEnable'),
}

storiesOf('Modules/AddressList', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .addDecorator(StoryRouter())
    .add('default', () => <AddressList
        ownAddressIds={addressListProps.ownAddressIds}
        watchAddressIds={addressListProps.watchAddressIds}
        ethEnableState={ETH_ENABLE_STATES.GRANTED}
        ethEnable={AddressListActions.ethEnable}
    />)
    .add('onlyOwn', () => <AddressList
        ownAddressIds={addressListProps.ownAddressIds}
        watchAddressIds={addressListProps.noIds}
        ethEnableState={ETH_ENABLE_STATES.GRANTED}
        ethEnable={AddressListActions.ethEnable}
    />)
    .add('onlyWatched', () => <AddressList
        ownAddressIds={addressListProps.noIds}
        watchAddressIds={addressListProps.watchAddressIds}
        ethEnableState={ETH_ENABLE_STATES.REJECTED}
        ethEnable={AddressListActions.ethEnable}
    />)
    .add('wait for grant', () => <AddressList
        ownAddressIds={addressListProps.noIds}
        watchAddressIds={addressListProps.noIds}
        ethEnableState={ETH_ENABLE_STATES.WAITING}
        ethEnable={AddressListActions.ethEnable}
    />)
    .add('noAddresses', () => <AddressList
        ownAddressIds={addressListProps.noIds}
        watchAddressIds={addressListProps.noIds}
        ethEnableState={ETH_ENABLE_STATES.GRANTED}
        ethEnable={AddressListActions.ethEnable}
    />)
