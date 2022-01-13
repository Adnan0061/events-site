import React, { Fragment } from 'react'
import { getAllEvents } from '../../dummy-data'
import EventList from '../../components/EventList'
import EventsSearch from '../../components/EventsSearch';
import { useRouter } from 'next/router';

function AllEventsPage () {
    const events = getAllEvents();
    const router = useRouter()

    const findEventHandler = (year, month) => {
        const fullpath = `/events/${year}/${month}`
        router.push(fullpath)
    }
    return (
        <Fragment>
            <EventsSearch onSearch={findEventHandler} />
            <EventList items={events} />
        </Fragment>
    )
}

export default AllEventsPage 
