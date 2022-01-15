import React, { Fragment } from 'react'
import { getAllEvents } from '../../helpers/api-util'
import EventList from '../../components/EventList'
import EventsSearch from '../../components/EventsSearch';
import { useRouter } from 'next/router';

function AllEventsPage (props) {
    const events = props.events;
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

export async function getStaticProps() {
    const events = await getAllEvents()

    return {
        props: {
            events: events
        },
        revalidate: 60
    }
}
export default AllEventsPage 
