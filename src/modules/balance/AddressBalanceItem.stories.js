import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import StoryRouter from 'storybook-react-router'
import {Provider} from 'react-redux'
import mockStore from '../mocks/MockStore'
import AddressBalanceItem from './AddressBalanceItem'

const props = {
    ensName: 'vitalik.eth',
    address: '0x1b7750e1db62610b0b58e679f3c8895680eb0c89',
    tokenBalances: [
        mockStore.getState().balance.byId['b1'],
        mockStore.getState().balance.byId['b4'],
    ],
    numTokens: 2,
}

const actions = {
    reloadBalance: action('reloadBalance'),
    toggleCollapse: action('toggleCollapse'),
}

storiesOf('Modules/AddressBalanceItem', module)
.addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
.addDecorator(StoryRouter())
.add('collapsed', () => <AddressBalanceItem address={props.address}
                                            loading={false}
                                            expanded={false}
                                            reloadBalance={actions.reloadBalance}
                                            toggleCollapse={actions.toggleCollapse}
                                            numTokens={props.numTokens}
                                            tokenBalances={props.tokenBalances}
/>)
.add('collapsed.ens', () => <AddressBalanceItem loading={false}
                                                expanded={false}
                                                reloadBalance={actions.reloadBalance}
                                                toggleCollapse={actions.toggleCollapse}
                                                ensName={props.ensName}
                                                address={props.address}
                                                numTokens={props.numTokens}
                                                tokenBalances={props.tokenBalances}
/>)
.add('expanded', () => <AddressBalanceItem loading={false}
                                           expanded={true}
                                           reloadBalance={actions.reloadBalance}
                                           toggleCollapse={actions.toggleCollapse}
                                           ensName={props.ensName}
                                           address={props.address}
                                           numTokens={props.numTokens}
                                           tokenBalances={props.tokenBalances}
/>)
