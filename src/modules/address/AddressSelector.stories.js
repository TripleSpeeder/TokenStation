import React from 'react'
import {storiesOf, action} from '@storybook/react'
import {Provider} from 'react-redux';
import mockStore from '../mocks/MockStore'
import AddressSelector from './AddressSelector'

export const addressSelectorProps = {
    addressResults: [
        mockStore.getState().addresses.byId["0xAccountAddress1"],
        mockStore.getState().addresses.byId["0xAccountAddress3"],
        mockStore.getState().addresses.byId["0xAccountAddress5"],
    ]
}

export const addressSelectorActions = {
    onAddressSelect: action('addressSelect'),
    onSearchChange: action('onSearchChange'),
}

storiesOf('Modules/AddressSelector', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .add('withResults', () => <AddressSelector onSearchChange={addressSelectorActions.onSearchChange}
                                             onAddressSelect={addressSelectorActions.onTokenSelect}
                                             results={addressSelectorProps.addressResults}
                                             value={'Address'}
    />)
    .add('preselected address', () => <AddressSelector onSearchChange={addressSelectorActions.onSearchChange}
                                                       onAddressSelect={addressSelectorActions.onTokenSelect}
                                                       value={addressSelectorProps.addressResults[0].address}
                                                       results={addressSelectorProps.addressResults.slice(0,1)}
    />)
    .add('preselected ENS', () => <AddressSelector onSearchChange={addressSelectorActions.onSearchChange}
                                                       onAddressSelect={addressSelectorActions.onTokenSelect}
                                                       value={addressSelectorProps.addressResults[0].ensName}
                                                       results={addressSelectorProps.addressResults.slice(0,1)}
    />)
