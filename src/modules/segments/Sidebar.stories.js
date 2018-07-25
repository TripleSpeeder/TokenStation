import React from 'react'
import {storiesOf} from '@storybook/react'
import StoryRouter from 'storybook-react-router';
import Sidebar from './Sidebar'
import {Grid} from 'semantic-ui-react'

storiesOf('Segments', module)
    .addDecorator(StoryRouter())
    .addDecorator(story => <Grid padded>
        <Grid.Column width={4}>
            {story()}
        </Grid.Column>
        <Grid.Column>screen content here</Grid.Column>
    </Grid>)

    .add('Sidebar', () => <Sidebar/>)

