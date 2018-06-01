import React from 'react'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux';
import mockStore from '../mocks/MockStore'
import {sidebarActions} from '../segments/Sidebar.stories'
import StoryRouter from 'storybook-react-router'
import TokenContractsScreen from "./TokenContractsScreen"


storiesOf('Screens/TokenContracts', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .addDecorator(StoryRouter())
    .add('default', () => <TokenContractsScreen
        clickItem={sidebarActions.clickSidebar}
        activeItem={'tokenContracts'}
    />)
