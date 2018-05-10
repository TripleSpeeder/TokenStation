import React from 'react'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux';
import mockStore from '../mocks/MockStore'
import Accounts from './Accounts'


storiesOf('Segments/Accounts', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .add('default', () => <Accounts/>)
