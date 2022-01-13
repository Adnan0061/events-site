import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { getEventById } from '../../dummy-data'
import EventSummary from '../../components/EventDetail/EventSummary'
import EventLogistics from '../../components/EventDetail/EventLogistics'
import EventContent from '../../components/EventDetail/EventContent'

function EventDetailPage() {
    const router = useRouter()
    const eventId = router.query.eventId
    const event = getEventById(eventId)

    if(!event) {
        <p>no event found</p> 
    }
    return (
        <Fragment>
            <EventSummary title={event?.title} />
            <EventLogistics date={event?.date} address={event?.location} image={event?.image} imageAlt={event?.imageAlt} />
            <EventContent>
                <p>{event?.description}</p>
            </EventContent>
        </Fragment>
    )
}

export default EventDetailPage
