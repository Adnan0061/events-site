import Head from 'next/head';
import Script from 'next/script';
import React, { useEffect } from 'react'
import EventList from '../components/Events/EventList';
import NewsletterRegistration from '../components/input/newsletter-registration';
import ChatwootWidget from '../components/layout/ChatwootWidget';
import { getFeaturedEvents } from '../helpers/api-util'

function HomePage (props) {
    return (
        <div>
            <Head>
                <title>Home Page - Alt Events</title>
                <meta name='description' content='This is the homepage of Alt Events'/>
            </Head>
            <ChatwootWidget />
            <NewsletterRegistration />
            {props.events ? <EventList items={props.events} /> : <p>No events found</p>}
        </div>
    )

}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents()
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    }
}

export default HomePage