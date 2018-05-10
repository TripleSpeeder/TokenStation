import React from 'react'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux';
import mockStore from '../mocks/MockStore'
import AccountsScreen from './AccountsScreen'
import {sidebarActions} from '../segments/Sidebar.stories'

storiesOf('Screens/Accounts', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .add('default', () => <AccountsScreen clickItem={sidebarActions.clickSidebar} activeItem={'accounts'}/>)
