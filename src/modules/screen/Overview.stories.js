import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Overview from './Overview'
import StoryRouter from 'storybook-react-router'

const actions = {
    clickSidebar: action('clickSidebar')
}

storiesOf('Overview', module)
    .addDecorator(StoryRouter())
    .add('default', () => <Overview hasAccounts={true}/>)
    .add('no accounts', () => <Overview hasAccounts={false}/>)
