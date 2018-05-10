import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import StoryRouter from 'storybook-react-router'
import {Provider} from 'react-redux';
import mockStore from '../mocks/MockStore'
import Overview from './Overview'

export const overviewProps = {
    // keys: tokenID, values: Arrays of balance entries
    balancesByToken: {
        1: [mockStore.getState().balance.byId['b1'],
            mockStore.getState().balance.byId['b2'],
            mockStore.getState().balance.byId['b3']],
        2: [mockStore.getState().balance.byId['b4']],
        3: [mockStore.getState().balance.byId['b5'],
            mockStore.getState().balance.byId['b6']]
    },
    emptyObject: {}
}

const actions = {
    clickSidebar: action('clickSidebar')
}

storiesOf('Segments/Overview', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .addDecorator(StoryRouter())
    .add('default', () => <Overview
        hasAccounts={true}
        balancesByToken={overviewProps.balancesByToken}
    />)
    .add('no accounts', () => <Overview
        hasAccounts={false}
        balancesByToken={overviewProps.emptyObject}
    />)
    .add('no balances', () => <Overview
        hasAccounts={true}
        balancesByToken={overviewProps.emptyObject}
    />)
