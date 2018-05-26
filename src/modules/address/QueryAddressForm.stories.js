import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import QueryAddressForm from "./QueryAddressForm"

export const queryAddressFormProps = {
    validAddress: '0xAccountAddress1',
    invalidAddress: '0x111222333',
    emptyAddress: '',
}

export const queryAddressFormActions = {
    handleSubmit: action('handleSubmit'),
    handleChange: action('handeChange'),
};

storiesOf('Modules/QueryAddressForm', module)
    .add('empty', () => <QueryAddressForm
        valid={false}
        address={queryAddressFormProps.emptyAddress}
        handleSubmit={queryAddressFormActions.handleSubmit}
        handleChange={queryAddressFormActions.handleChange}
    />)
    .add('valid', () => <QueryAddressForm
        valid={true}
        address={queryAddressFormProps.validAddress}
        handleSubmit={queryAddressFormActions.handleSubmit}
        handleChange={queryAddressFormActions.handleChange}
    />)
    .add('invalid', () => <QueryAddressForm
        valid={false}
        address={queryAddressFormProps.invalidAddress}
        handleSubmit={queryAddressFormActions.handleSubmit}
        handleChange={queryAddressFormActions.handleChange}
    />)
