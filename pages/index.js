import React, { useEffect } from 'react'
import EventList from '../components/EventList';
import { getFeaturedEvents } from '../helpers/api-util'

function HomePage (props) {
    // console.log(props.events)
    return (
        <div>
            <EventList items={props.events} />
        </div>
    )
}


export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents()
    // console.log(featuredEvents)
    return {
        props: {
            events: featuredEvents
        }
    }
}

export default HomePage