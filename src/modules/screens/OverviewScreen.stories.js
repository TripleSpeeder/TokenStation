import React from 'react'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux';
import mockStore from '../mocks/MockStore'
import OverviewScreen from './OverviewScreen'
import StoryRouter from 'storybook-react-router'


storiesOf('Screens/Overview', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .addDecorator(StoryRouter())
    .add('default', () => <OverviewScreen
        hasAccounts={true}
    />)
