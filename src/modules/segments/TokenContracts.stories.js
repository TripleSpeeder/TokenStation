import React from 'react'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux';
import mockStore, {mockStore_virgin, mockStore_loading, mockStore_nomatch, mockStore_filtered} from '../mocks/MockStore'
import TokenContracts from "./TokenContracts"


storiesOf('Segments/TokenContracts', module)
    .addDecorator(story => <Provider store={mockStore_virgin}>{story()}</Provider>)
    .add('virgin', () => <TokenContracts/>)

storiesOf('Segments/TokenContracts', module)
    .addDecorator(story => <Provider store={mockStore_loading}>{story()}</Provider>)
    .add('contracts loading', () => <TokenContracts/>)

storiesOf('Segments/TokenContracts', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .add('contracts loaded', () => <TokenContracts/>)

storiesOf('Segments/TokenContracts', module)
    .addDecorator(story => <Provider store={mockStore_filtered}>{story()}</Provider>)
    .add('filtered', () => <TokenContracts/>)

storiesOf('Segments/TokenContracts', module)
    .addDecorator(story => <Provider store={mockStore_nomatch}>{story()}</Provider>)
    .add('no match', () => <TokenContracts/>)

