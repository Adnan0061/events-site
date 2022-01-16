import Head from 'next/head';
import React, { useEffect } from 'react'
import EventList from '../components/EventList';
import { getFeaturedEvents } from '../helpers/api-util'

function HomePage (props) {
    // console.log(props.events)
    return (
        <div>
            <Head>
                <title>Home Page - Alt Events</title>
                <meta name='description' content='This is the homepage of Alt Events'/>
            </Head>
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
        },
        revalidate: 1800
    }
}

export default HomePage