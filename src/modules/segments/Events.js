import React from 'react'
import EventFilterContainer from '../event/EventFilterContainer'
import EventLoaderContainer from '../event/EventLoaderContainer'
import TransferEventsListContainer from '../event/TransferEventsListContainer'
import ScreenHeader from '../layout/ScreenHeader'

const Events = () => {
    return (
        <React.Fragment>
            <ScreenHeader title={'Transfer Events'}/>
            <EventFilterContainer/>
            <EventLoaderContainer/>
            <TransferEventsListContainer/>
        </React.Fragment>
    )
}

export default Events
