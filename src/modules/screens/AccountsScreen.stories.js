import React from 'react'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux';
import mockStore from '../mocks/MockStore'
import AccountsScreen from './AccountsScreen'
import StoryRouter from 'storybook-react-router'

storiesOf('Screens/Accounts', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .addDecorator(StoryRouter())
    .add('default', () => <AccountsScreen/>)
