import React from 'react'
import EventList from '../components/EventList';
import { getFeaturedEvents } from '../dummy-data'

function HomePage () {
    const featuredEvents = getFeaturedEvents();

    return (
        <div>
            <EventList items={featuredEvents} />
        </div>
    )
}

export default HomePage
