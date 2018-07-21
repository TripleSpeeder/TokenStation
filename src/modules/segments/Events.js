import React from 'react'
import {Header} from 'semantic-ui-react'
import EventFilterContainer from '../event/EventFilterContainer'
import TokenEventsContainer from '../event/TokenEventsContainer'
import EventLoaderContainer from '../event/EventLoaderContainer'

const Events = (props) => {
    return (
        <React.Fragment>
            <Header as={'h1'} block inverted color={'green'} textAlign={'center'}>Transfer Events</Header>
            <EventFilterContainer/>
            <EventLoaderContainer/>
        </React.Fragment>
    )
    // TODO: Add TokenEventsContainer to display actual list of events
}

export default Events
