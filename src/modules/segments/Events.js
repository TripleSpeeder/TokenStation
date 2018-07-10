import React from 'react'
import {Header} from 'semantic-ui-react'
import EventFilterContainer from '../event/EventFilterContainer'

const Events = (props) => {
    return (
        <React.Fragment>
            <Header as={'h1'} block inverted color={'green'} textAlign={'center'}>Transfer Events</Header>
            <EventFilterContainer/>
            <div>Event Selector Container here</div>
        </React.Fragment>
    )
}

export default Events
