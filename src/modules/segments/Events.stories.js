import React from 'react'
import {storiesOf} from '@storybook/react'
import {Provider} from 'react-redux';
import mockStore, {mockStore_virgin, mockStore_loading, mockStore_nomatch, mockStore_filtered} from '../mocks/MockStore'
import Events from './Events'


storiesOf('Segments/Events', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .add('having events', () => <Events/>)

storiesOf('Segments/Events', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .add('no events', () => <Events/>)

storiesOf('Segments/Events', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .add('no addresses', () => <Events/>)

storiesOf('Segments/Events', module)
    .addDecorator(story => <Provider store={mockStore}>{story()}</Provider>)
    .add('no contracts', () => <Events/>)
