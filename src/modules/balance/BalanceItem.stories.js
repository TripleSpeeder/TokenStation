import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import StoryRouter from 'storybook-react-router'
import {Provider} from 'react-redux'

import BigNumber from 'bignumber.js'
import BalanceItem from './BalanceItem'
import mockStore from '../mocks/MockStore'

const props = {
    tokenName: 'Arcade Network Token',
    tokenSymbol: 'ANT',
    tokenBalances: [
        mockStore.getState().balance.byId['b1'],
        mockStore.getState().balance.byId['b2'],
        mockStore.getState().balance.byId['b3']
    ],
    total: new BigNumber('2588.50288453'),
    tokenEventsLinkOptions: {},
}

const actions = {
    reloadBalance: action('reloadBalance'),
    toggleCollapse: action('toggleCollapse')
}

storiesOf('Modules/BalanceItem', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .addDecorator(StoryRouter())
    .add('collapsed', () => <BalanceItem loading={false}
                                         expanded={false}
                                         reloadBalance={actions.reloadBalance}
                                         toggleCollapse={actions.toggleCollapse}
                                         tokenBalances={props.tokenBalances}
                                         tokenEventsLinkOptions={props.tokenEventsLinkOptions}
                                         tokenName={props.tokenName}
                                         tokenSymbol={props.tokenSymbol}
                                         total={props.total}
    />)
    .add('expanded', () => <BalanceItem loading={false}
                                        expanded={true}
                                        reloadBalance={actions.reloadBalance}
                                        toggleCollapse={actions.toggleCollapse}
                                        tokenBalances={props.tokenBalances}
                                        tokenEventsLinkOptions={props.tokenEventsLinkOptions}
                                        tokenName={props.tokenName}
                                        tokenSymbol={props.tokenSymbol}
                                        total={props.total}
    />)
    .add('collapsed.loading', () => <BalanceItem loading={true}
                                         expanded={false}
                                         reloadBalance={actions.reloadBalance}
                                         toggleCollapse={actions.toggleCollapse}
                                         tokenBalances={props.tokenBalances}
                                         tokenEventsLinkOptions={props.tokenEventsLinkOptions}
                                         tokenName={props.tokenName}
                                         tokenSymbol={props.tokenSymbol}
                                         total={props.total}
    />)
    .add('expanded.loading', () => <BalanceItem loading={true}
                                        expanded={true}
                                        reloadBalance={actions.reloadBalance}
                                        toggleCollapse={actions.toggleCollapse}
                                        tokenBalances={props.tokenBalances}
                                        tokenEventsLinkOptions={props.tokenEventsLinkOptions}
                                        tokenName={props.tokenName}
                                        tokenSymbol={props.tokenSymbol}
                                        total={props.total}
    />)
