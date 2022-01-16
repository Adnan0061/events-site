import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { getFeaturedEvents, getEventById } from "../../helpers/api-util";
import EventSummary from "../../components/EventDetail/EventSummary";
import EventLogistics from "../../components/EventDetail/EventLogistics";
import EventContent from "../../components/EventDetail/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";
import Button from "../../components/ui/Button";
import Comments from "../../components/input/comments";
import Head from "next/head";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return(
    <Fragment>
      <ErrorAlert>
        <p>no event found</p>
      </ErrorAlert>
      <div className="center">
        <Button link="/events">Show All Events</Button>
      </div>
    </Fragment>
    )
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title} - Alt Events</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event?.title} />
      <EventLogistics
        date={event?.date}
        address={event?.location}
        image={event?.image}
        imageAlt={event?.imageAlt}
      />
      <EventContent>
        <p>{event?.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId)
  
  return {
    props: {
      selectedEvent: event
    },
    revalidate: 60
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map( event => ({params: {eventId: event.id}}))

  return {
    paths: paths,
    fallback: 'blocking'
  }
} 
export default EventDetailPage;
