import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import {Table} from 'semantic-ui-react'
import BN from 'bn.js';
import AddressBalanceItemDetail from './AddressBalanceItemDetail'

export const props = {
    tokenName: 'District0x network token',
    tokenSymbol: 'DNT',
    balance: new BN(234.12345678901),
}

export const actions = {
    reloadBalance: action('reloadBalance'),
};

storiesOf('Modules/AddressBalanceItemDetail', module)
    .addDecorator(StoryRouter())
    .addDecorator(story => (<Table>{story()}</Table>))
    .add('external', () => <AddressBalanceItemDetail tokenName={props.tokenName}
                                                     tokenSymbol={props.tokenSymbol}
                                                     tokenBalance={props.balance}
                                                     reloadBalance={actions.reloadBalance}
                                                     loading={false}
    />)
    .add('external.loading', () => <AddressBalanceItemDetail tokenName={props.tokenName}
                                                     tokenSymbol={props.tokenSymbol}
                                                     tokenBalance={props.balance}
                                                     reloadBalance={actions.reloadBalance}
                                                     loading={true}
    />)
