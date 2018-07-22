import React from 'react'
import {Header} from 'semantic-ui-react'
import EventFilterContainer from '../event/EventFilterContainer'
import EventLoaderContainer from '../event/EventLoaderContainer'
import TransferEventsListContainer from '../event/TransferEventsListContainer'

const Events = (props) => {
    return (
        <React.Fragment>
            <Header as={'h1'} block inverted color={'green'} textAlign={'center'}>Transfer Events</Header>
            <EventFilterContainer/>
            <EventLoaderContainer/>
            <TransferEventsListContainer/>
        </React.Fragment>
    )
}

export default Events
