import React from 'react';
import { storiesOf } from '@storybook/react';
import AddressDisplay from './AddressDisplay'

export const props = {
    address: '0x0D0707963952f2fBA59dD06f2b425ace40b492Fe',
    ensName: 'cool.stuff.eth'
}

storiesOf('Common/AddressDisplay', module)
    .add('default', () => <AddressDisplay address={props.address}/>)
    .add('withENS', () => <AddressDisplay address={props.address} ensName={props.ensName}/>)
