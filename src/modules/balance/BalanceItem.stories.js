import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import StoryRouter from 'storybook-react-router'
import {Provider} from 'react-redux';

import {BigNumber} from 'bignumber.js'
import BalanceItem from './BalanceItem'
import {ADDRESS_TYPE_EXTERNAL, ADDRESS_TYPE_OWNED} from '../address/addressActions'
import {BALANCE_STATES} from './balanceActions'

// A super-simple mock of a redux store
const store = {
    getState: () => {
        return {
            balance: {
                allIds:['b1','b2','b3'],
                byId: {
                    b1: {
                        balanceId: "b1",
                        addressId: "a1",
                        tokenId: "1",
                        balance: BigNumber('100'),
                        balanceState: "initialized"
                    },
                    b2: {
                        balanceId: "b2",
                        addressId: "a2",
                        tokenId: "1",
                        balance: BigNumber('200'),
                        balanceState: "initialized"
                    },
                    b3: {
                        balanceId: "b3",
                        addressId: "a3",
                        tokenId: "1",
                        balance: BigNumber('300'),
                        balanceState: "initialized"
                    }
                }
            },
            tokens: {
                allIds: [1],
                byId: {
                    1: {
                        address: '0xContractAddress',
                        decimals: BigNumber(18),
                        eventIds: [],
                        id: 1,
                        imageUrl: null,
                        loading: false,
                        name: 'Arcade Network Token',
                        supply: {
                            loading: false,
                            supply: BigNumber(20000000)
                        },
                        symbol: 'ANT',
                        website: null,
                    }
                }
            },
            addresses: {
                allIds: ['0xAccountAddress1', '0xAccountAddress2', '0xAccountAddress3'],
                byId: {
                    a1: {
                        address: '0xAccountAddress1',
                        balanceState: BALANCE_STATES.INITIALIZED,
                        type: ADDRESS_TYPE_OWNED,
                    },
                    a2: {
                        address: '0xAccountAddress2',
                        balanceState: BALANCE_STATES.INITIALIZED,
                        type: ADDRESS_TYPE_OWNED,
                    },
                    a3: {
                        address: '0xAccountAddress3',
                        balanceState: BALANCE_STATES.INITIALIZED,
                        type: ADDRESS_TYPE_EXTERNAL,
                    }
                }
            },

        };
    },
    subscribe: () => 0,
    dispatch: action('dispatch'),
};

const props = {
    tokenName: 'Aragon Network Token',
    tokenSymbol: 'ANT',
    tokenBalances: Object.values(store.getState().balance.byId), // list of tokenBalances
    total: BigNumber('2588.50288453'),
    tokenEventsLinkOptions: {},
}

const actions = {
    reloadBalance: action('reloadBalance'),
    toggleCollapse: action('toggleCollapse')
}

storiesOf('BalanceItem', module)
    .addDecorator(story => <Provider store={store}>{story()}</Provider>)
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
