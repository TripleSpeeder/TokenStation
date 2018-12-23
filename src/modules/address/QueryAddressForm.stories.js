import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import QueryAddressForm from "./QueryAddressForm"

export const queryAddressFormProps = {
    validAddress: '0xAccountAddress1',
    invalidAddress: '0x111222333',
    emptyAddress: '',
    resolvableENS: 'michael.eth',
    nonResolvableENS: 'not.resolving.eth',
}

export const queryAddressFormActions = {
    handleSubmit: action('handleSubmit'),
    handleChange: action('handeChange'),
};

storiesOf('Modules/QueryAddressForm', module)
    .add('empty', () => <QueryAddressForm
        loading={false}
        disabled={true}
        error={false}
        value={queryAddressFormProps.emptyAddress}
        handleSubmit={queryAddressFormActions.handleSubmit}
        handleChange={queryAddressFormActions.handleChange}
    />)
    .add('valid address', () => <QueryAddressForm
        loading={false}
        disabled={false}
        error={false}
        address={queryAddressFormProps.validAddress}
        value={queryAddressFormProps.validAddress}
        handleSubmit={queryAddressFormActions.handleSubmit}
        handleChange={queryAddressFormActions.handleChange}
    />)
    .add('invalid address', () => <QueryAddressForm
        loading={false}
        disabled={true}
        error={true}
        address={queryAddressFormProps.emptyAddress}
        value={queryAddressFormProps.invalidAddress}
        handleSubmit={queryAddressFormActions.handleSubmit}
        handleChange={queryAddressFormActions.handleChange}
    />)
    .add('resolving ENS', () => <QueryAddressForm
        loading={true}
        disabled={true}
        error={false}
        address={queryAddressFormProps.emptyAddress}
        value={queryAddressFormProps.resolvableENS}
        ensName={queryAddressFormProps.resolvableENS}
        handleSubmit={queryAddressFormActions.handleSubmit}
        handleChange={queryAddressFormActions.handleChange}
    />)
    .add('resolved ENS', () => <QueryAddressForm
        loading={false}
        disabled={false}
        error={false}
        address={queryAddressFormProps.validAddress}
        value={queryAddressFormProps.resolvableENS}
        ensName={queryAddressFormProps.resolvableENS}
        handleSubmit={queryAddressFormActions.handleSubmit}
        handleChange={queryAddressFormActions.handleChange}
    />)
    .add('non-resolved ENS', () => <QueryAddressForm
        loading={false}
        disabled={true}
        error={true}
        address={queryAddressFormProps.emptyAddress}
        value={queryAddressFormProps.nonResolvableENS}
        ensName={queryAddressFormProps.nonResolvableENS}
        handleSubmit={queryAddressFormActions.handleSubmit}
        handleChange={queryAddressFormActions.handleChange}
    />)
