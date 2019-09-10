import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import StoryRouter from 'storybook-react-router'
import {Provider} from 'react-redux'
import BN from 'bn.js'
import TokenBalanceItem from './TokenBalanceItem'
import mockStore from '../mocks/MockStore'

const props = {
    tokenName: 'Arcade Network Token',
    tokenSymbol: 'ANT',
    tokenBalances: [
        mockStore.getState().balance.byId['b1'],
        mockStore.getState().balance.byId['b2'],
        mockStore.getState().balance.byId['b3']
    ],
    total: new BN('2588502884530000000000'),
    tokenDecimals: new BN(18),
    tokenEventsLinkOptions: {},
}

const actions = {
    reloadBalance: action('reloadBalance'),
    toggleCollapse: action('toggleCollapse')
}

storiesOf('Modules/TokenBalanceItem', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .addDecorator(StoryRouter())
    .add('collapsed', () => <TokenBalanceItem loading={false}
                                              expanded={false}
                                              reloadBalance={actions.reloadBalance}
                                              toggleCollapse={actions.toggleCollapse}
                                              tokenBalances={props.tokenBalances}
                                              tokenDecimals={props.tokenDecimals}
                                              tokenEventsLinkOptions={props.tokenEventsLinkOptions}
                                              tokenName={props.tokenName}
                                              tokenSymbol={props.tokenSymbol}
                                              total={props.total}
    />)
    .add('expanded', () => <TokenBalanceItem loading={false}
                                             expanded={true}
                                             reloadBalance={actions.reloadBalance}
                                             toggleCollapse={actions.toggleCollapse}
                                             tokenBalances={props.tokenBalances}
                                             tokenDecimals={props.tokenDecimals}
                                             tokenEventsLinkOptions={props.tokenEventsLinkOptions}
                                             tokenName={props.tokenName}
                                             tokenSymbol={props.tokenSymbol}
                                             total={props.total}
    />)
    .add('collapsed.loading', () => <TokenBalanceItem loading={true}
                                                      expanded={false}
                                                      reloadBalance={actions.reloadBalance}
                                                      toggleCollapse={actions.toggleCollapse}
                                                      tokenBalances={props.tokenBalances}
                                                      tokenDecimals={props.tokenDecimals}
                                                      tokenEventsLinkOptions={props.tokenEventsLinkOptions}
                                                      tokenName={props.tokenName}
                                                      tokenSymbol={props.tokenSymbol}
                                                      total={props.total}
    />)
    .add('expanded.loading', () => <TokenBalanceItem loading={true}
                                                     expanded={true}
                                                     reloadBalance={actions.reloadBalance}
                                                     toggleCollapse={actions.toggleCollapse}
                                                     tokenBalances={props.tokenBalances}
                                                     tokenDecimals={props.tokenDecimals}
                                                     tokenEventsLinkOptions={props.tokenEventsLinkOptions}
                                                     tokenName={props.tokenName}
                                                     tokenSymbol={props.tokenSymbol}
                                                     total={props.total}
    />)
