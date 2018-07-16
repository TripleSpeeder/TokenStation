import React from 'react'
import {Header} from 'semantic-ui-react'
import EventFilterContainer from '../event/EventFilterContainer'
import TokenEventsContainer from '../event/TokenEventsContainer'

const Events = (props) => {
    return (
        <React.Fragment>
            <Header as={'h1'} block inverted color={'green'} textAlign={'center'}>Transfer Events</Header>
            <EventFilterContainer/>
            <TokenEventsContainer/>
        </React.Fragment>
    )
}

export default Events
