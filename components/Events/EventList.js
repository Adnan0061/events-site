import React from 'react'
import EventItem from './EventItem'
EventItem
import classes from './EventList.module.css'

function EventList({items}) {

    return (
        <ul  className={classes.list}>
            {
                items?.map(event => (
                    <EventItem key={event?.id} title={event?.title} image={event?.image} date={event?.date} location={event?.location} id={event?.id} />
                ))
            }
        </ul>
    )
}

export default EventList
