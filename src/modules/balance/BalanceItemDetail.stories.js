import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import StoryRouter from 'storybook-react-router';
import {Table} from 'semantic-ui-react'

import {BigNumber} from 'bignumber.js';
import BalanceItemDetail from "./BalanceItemDetail"
import {ADDRESS_TYPE_EXTERNAL, ADDRESS_TYPE_OWNED} from '../address/addressActions'

export const props = {
    address: '0x267be1C1D684F78cb4F6a176C4911b741E4Ffdc0',
    balance: BigNumber('234.12345678901'),
    url: 'https://some.link'
}

export const actions = {
    openTransferModal: action('openTransferModal'),
    reloadBalance: action('reloadBalance'),
};

storiesOf('BalanceItemDetail', module)
    .addDecorator(StoryRouter())
    .addDecorator(story => (<Table>{story()}</Table>))
    .add('external', () => <BalanceItemDetail address={props.address}
                                              balance={props.balance}
                                              url={props.url}
                                              openTransferModal={actions.openTransferModal}
                                              reloadBalance={actions.reloadBalance}
                                              loading={false}
                                              addressType={ADDRESS_TYPE_EXTERNAL}
    />)
    .add('extloading', () => <BalanceItemDetail address={props.address}
                                                balance={props.balance}
                                                url={props.url}
                                                openTransferModal={actions.openTransferModal}
                                                reloadBalance={actions.reloadBalance}
                                                loading={true}
                                                addressType={ADDRESS_TYPE_EXTERNAL}
    />)
    .add('own', () => <BalanceItemDetail address={props.address}
                                              balance={props.balance}
                                              url={props.url}
                                              openTransferModal={actions.openTransferModal}
                                              reloadBalance={actions.reloadBalance}
                                              loading={false}
                                              addressType={ADDRESS_TYPE_OWNED}
    />)
    .add('ownloading', () => <BalanceItemDetail address={props.address}
                                                balance={props.balance}
                                                url={props.url}
                                                openTransferModal={actions.openTransferModal}
                                                reloadBalance={actions.reloadBalance}
                                                loading={true}
                                                addressType={ADDRESS_TYPE_OWNED}
    />)

