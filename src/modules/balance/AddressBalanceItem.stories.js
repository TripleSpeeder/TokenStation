import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import StoryRouter from 'storybook-react-router'
import {Provider} from 'react-redux'

import BigNumber from 'bignumber.js'
import BalanceItem from './BalanceItem'
import mockStore from '../mocks/MockStore'
import AddressBalanceItem from './AddressBalanceItem'

const props = {
    ensName: 'vitalik.eth',
    address: '0x1b7750e1db62610b0b58e679f3c8895680eb0c89',
    /*tokenBalances: [
        mockStore.getState().balance.byId['b1'],
        mockStore.getState().balance.byId['b2'],
        mockStore.getState().balance.byId['b3']
    ],*/
    numTokens: 3,
}

const actions = {
    reloadBalance: action('reloadBalance'),
    toggleCollapse: action('toggleCollapse')
}

storiesOf('Modules/AddressBalanceItem', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .addDecorator(StoryRouter())
    .add('collapsed', () => <AddressBalanceItem loading={false}
                                         expanded={false}
                                         reloadBalance={actions.reloadBalance}
                                         toggleCollapse={actions.toggleCollapse}
                                         address={props.address}
                                         numTokens={props.numTokens}
    />)
    .add('collapsed.ens', () => <AddressBalanceItem loading={false}
                                                    expanded={false}
                                                    reloadBalance={actions.reloadBalance}
                                                    toggleCollapse={actions.toggleCollapse}
                                                    ensName={props.ensName}
                                                    address={props.address}
                                                    numTokens={props.numTokens}
    />)
    .add('expanded', () => <AddressBalanceItem loading={false}
                                               expanded={true}
                                               reloadBalance={actions.reloadBalance}
                                               toggleCollapse={actions.toggleCollapse}
                                               ensName={props.ensName}
                                               address={props.address}
                                               numTokens={props.numTokens}
    />)
/*
    .add('collapsed.loading', () => <AddressBalanceItem loading={true}
                                         expanded={false}
                                         reloadBalance={actions.reloadBalance}
                                         toggleCollapse={actions.toggleCollapse}
                                         tokenBalances={props.tokenBalances}
                                         tokenEventsLinkOptions={props.tokenEventsLinkOptions}
                                         tokenName={props.tokenName}
                                         tokenSymbol={props.tokenSymbol}
                                         total={props.total}
    />)
    .add('expanded.loading', () => <AddressBalanceItem loading={true}
                                        expanded={true}
                                        reloadBalance={actions.reloadBalance}
                                        toggleCollapse={actions.toggleCollapse}
                                        tokenBalances={props.tokenBalances}
                                        tokenEventsLinkOptions={props.tokenEventsLinkOptions}
                                        tokenName={props.tokenName}
                                        tokenSymbol={props.tokenSymbol}
                                        total={props.total}
    />)*/
