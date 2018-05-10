import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import Sidebar from './Sidebar'
import {Grid} from 'semantic-ui-react'

export const sidebarActions = {
    clickSidebar: action('clickSidebar')
}

storiesOf('Segments/Sidebar', module)
    .addDecorator(story => <Grid padded>
        <Grid.Column width={4}>
            {story()}
        </Grid.Column>
        <Grid.Column>screen content here</Grid.Column>
    </Grid>)

    .add('overview', () => <Sidebar activeItem={'overview'} clickItem={sidebarActions.clickSidebar}/>)
    .add('accounts', () => <Sidebar activeItem={'accounts'} clickItem={sidebarActions.clickSidebar}/>)
    .add('token', () => <Sidebar activeItem={'token'} clickItem={sidebarActions.clickSidebar}/>)

