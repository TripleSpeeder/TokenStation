import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Sidebar from './Sidebar'

const actions = {
    clickSidebar: action('clickSidebar')
}

storiesOf('Sidebar', module)
    .add('overview', () => <Sidebar activeItem={'overview'} clickItem={actions.clickSidebar}/>)
    .add('accounts', () => <Sidebar activeItem={'accounts'} clickItem={actions.clickSidebar}/>)
    .add('token', () => <Sidebar activeItem={'token'} clickItem={actions.clickSidebar}/>)

