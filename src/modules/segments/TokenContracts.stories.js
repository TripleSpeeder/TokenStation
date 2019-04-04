import React from 'react'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux';
import mockStore, {mockStore_nomatch, mockStore_filtered} from '../mocks/MockStore'
import TokenContracts from "./TokenContracts"


storiesOf('Segments/TokenContracts', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .add('default', () => <TokenContracts/>)

storiesOf('Segments/TokenContracts', module)
    .addDecorator(story => <Provider store={mockStore_filtered}>{story()}</Provider>)
    .add('filtered', () => <TokenContracts/>)

storiesOf('Segments/TokenContracts', module)
    .addDecorator(story => <Provider store={mockStore_nomatch}>{story()}</Provider>)
    .add('no match', () => <TokenContracts/>)

