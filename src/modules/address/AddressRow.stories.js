import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {Table} from 'semantic-ui-react'

import AddressRow from './AddressRow'
import {ADDRESS_TYPE_EXTERNAL, ADDRESS_TYPE_OWNED} from './addressActions'

export const props = {
    address: '0x0D0707963952f2fBA59dD06f2b425ace40b492Fe',
    ensName: 'cool.stuff.eth'
}

storiesOf('Modules/AddressRow', module)
    .addDecorator(story => <Table><Table.Body>{story()}</Table.Body></Table>)
    .add('owned', () => <AddressRow address={props.address} addressType={ADDRESS_TYPE_OWNED}/>)
    .add('owned+ens', () => <AddressRow address={props.address} addressType={ADDRESS_TYPE_OWNED} ensName={props.ensName}/>)
    .add('external', () => <AddressRow address={props.address} addressType={ADDRESS_TYPE_EXTERNAL} />)
    .add('external+ens', () => <AddressRow address={props.address} addressType={ADDRESS_TYPE_EXTERNAL} ensName={props.ensName}/>)
