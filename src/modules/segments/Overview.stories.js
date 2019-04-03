import React from 'react'
import {storiesOf} from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import {Provider} from 'react-redux';
import mockStore from '../mocks/MockStore'
import Overview from './Overview'

storiesOf('Segments/Overview', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .addDecorator(StoryRouter())
    .add('with accounts', () => <Overview
        hasAccounts={true}
    />)
    .add('no accounts', () => <Overview
        hasAccounts={false}
    />)
