import React from 'react'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux';
import mockStore from '../mocks/MockStore'
import {sidebarActions} from '../segments/Sidebar.stories'
import OverviewScreen from './OverviewScreen'
import {overviewProps} from '../segments/Overview.stories'
import StoryRouter from 'storybook-react-router'


storiesOf('Screens/Overview', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .addDecorator(StoryRouter())
    .add('default', () => <OverviewScreen
        clickItem={sidebarActions.clickSidebar}
        activeItem={'overview'}
        hasAccounts={true}
        balancesByToken={overviewProps.balancesByToken}
    />)
