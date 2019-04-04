import React from 'react'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux'
import mockStore, {mockStore_virgin, mockStore_noAccounts} from '../mocks/MockStore'
import OverviewContainer from "./OverviewContainer"
import StoryRouter from "storybook-react-router"


storiesOf('Segments/OverviewContainer', module)
.addDecorator(StoryRouter())
.addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
.add('default', () => <OverviewContainer/>)

storiesOf('Segments/OverviewContainer', module)
.addDecorator(StoryRouter())
.addDecorator(story => <Provider store={mockStore_noAccounts}>{story()}</Provider>)
.add('no accounts', () => <OverviewContainer/>)
/*
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

*/